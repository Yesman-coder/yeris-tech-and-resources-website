"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { useLanguage } from "@/components/language-provider";

type ModelMode = "rotate" | "materials" | "inspect";

const NEON_COLORS = [
  "#00ff41",
  "#00cc33",
  "#00bfff",
  "#9966ff",
  "#ffb300",
  "#ff4444",
  "#00ffff",
  "#ff00ff",
  "#39ff14",
  "#ffffff",
];

interface ModelViewProps {
  lang: "en" | "es";
  onExit: () => void;
}

export function ModelView({ lang, onExit }: ModelViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<InstanceType<typeof OrbitControls> | null>(null);
  const animFrameRef = useRef<number>(0);
  const { t } = useLanguage();

  // Pause controls.update() while GSAP owns the camera
  const isAnimatingCameraRef = useRef(false);

  const meshesRef = useRef<THREE.Mesh[]>([]);
  const origPositionsRef = useRef<Map<THREE.Mesh, THREE.Vector3>>(new Map());
  const origMaterialsRef = useRef<
    Map<THREE.Mesh, THREE.Material | THREE.Material[]>
  >(new Map());
  const modelCenterRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const inspectedRef = useRef(false);

  // Zoom-in state
  const focusedMeshRef = useRef<THREE.Mesh | null>(null);
  const savedCamRef = useRef<{
    pos: THREE.Vector3;
    target: THREE.Vector3;
  } | null>(null);
  const mouseDownPosRef = useRef<{ x: number; y: number } | null>(null);

  const modeRef = useRef<ModelMode>("rotate");
  const [mode, setMode] = useState<ModelMode>("rotate");
  const [hasMultipleMeshes, setHasMultipleMeshes] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  // ── ESC ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onExit]);

  // ── Core camera animation (works around OrbitControls interference) ────────
  const animateCameraTo = useCallback(
    (newPos: THREE.Vector3, newTarget: THREE.Vector3, duration = 0.8) => {
      const camera = cameraRef.current;
      const controls = controlsRef.current;
      if (!camera || !controls) return;

      // Pause the controls so update() doesn't override GSAP each frame
      isAnimatingCameraRef.current = true;
      controls.enabled = false;

      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(controls.target);

      const tl = gsap.timeline({
        onComplete: () => {
          // Re-sync OrbitControls' internal spherical state from the new position
          controls.target.copy(newTarget);
          controls.update();
          controls.enabled = true;
          isAnimatingCameraRef.current = false;
        },
      });

      tl.to(
        controls.target,
        {
          x: newTarget.x,
          y: newTarget.y,
          z: newTarget.z,
          duration,
          ease: "power3.inOut",
        },
        0,
      );
      tl.to(
        camera.position,
        {
          x: newPos.x,
          y: newPos.y,
          z: newPos.z,
          duration,
          ease: "power3.inOut",
        },
        0,
      );
    },
    [],
  );

  // ── Zoom to a specific mesh part ───────────────────────────────────────────
  const zoomToMesh = useCallback(
    (mesh: THREE.Mesh) => {
      const camera = cameraRef.current;
      const controls = controlsRef.current;
      if (!camera || !controls) return;

      // Force fresh world matrices (GSAP may have moved the mesh since last render)
      mesh.updateWorldMatrix(true, false);

      // World-space bounding box → center and radius
      const worldBox = new THREE.Box3().setFromObject(mesh);
      const worldCenter = worldBox.getCenter(new THREE.Vector3());
      const worldSize = worldBox.getSize(new THREE.Vector3());
      const radius = Math.max(worldSize.x, worldSize.y, worldSize.z, 0.05) / 2;

      // Keep current orbit angle; pull back enough to frame the part
      const camToCenter = camera.position.clone().sub(worldCenter);
      if (camToCenter.length() < 0.001) camToCenter.set(0, 0, 1);
      const camDist = Math.max(radius * 5, 0.2);
      const newCamPos = worldCenter
        .clone()
        .add(camToCenter.normalize().multiplyScalar(camDist));

      // Save current state for zoom-out (only on the first focus)
      if (!focusedMeshRef.current) {
        savedCamRef.current = {
          pos: camera.position.clone(),
          target: controls.target.clone(),
        };
      }
      focusedMeshRef.current = mesh;
      setIsFocused(true);

      animateCameraTo(newCamPos, worldCenter);
    },
    [animateCameraTo],
  );

  // ── Zoom back out to saved state ──────────────────────────────────────────
  const zoomOut = useCallback(() => {
    if (!savedCamRef.current) return;
    animateCameraTo(savedCamRef.current.pos, savedCamRef.current.target);
    focusedMeshRef.current = null;
    savedCamRef.current = null;
    setIsFocused(false);
  }, [animateCameraTo]);

  // ── Three.js setup ─────────────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setClearColor(0x020202);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.01, 100);
    camera.position.set(0, 1, 4);
    cameraRef.current = camera;

    scene.add(new THREE.AmbientLight(0x00ff41, 0.15));
    const sun = new THREE.DirectionalLight(0xffffff, 2.5);
    sun.position.set(5, 8, 5);
    sun.castShadow = true;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x00cc33, 0.6);
    fill.position.set(-5, 2, -3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0x004488, 0.4);
    rim.position.set(0, -3, -5);
    scene.add(rim);

    scene.add(new THREE.GridHelper(10, 20, 0x002200, 0x001100));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 0.01;
    controls.maxDistance = 20;
    controlsRef.current = controls;

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      "/3d/mouse.glb",
      (gltf: { scene: THREE.Group }) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;

        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        new THREE.Box3().setFromObject(model).getCenter(modelCenterRef.current);

        const meshes: THREE.Mesh[] = [];
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            meshes.push(child);
            origPositionsRef.current.set(child, child.position.clone());
            origMaterialsRef.current.set(
              child,
              Array.isArray(child.material)
                ? child.material.map((m: THREE.Material) => m.clone())
                : child.material.clone(),
            );
          }
        });

        meshesRef.current = meshes;
        scene.add(model);

        camera.position.set(0, size.y * scale * 0.3, maxDim * scale * 2.2);
        controls.target.set(0, 0, 0);
        controls.update();

        setHasMultipleMeshes(meshes.length > 1);
        setIsLoading(false);
      },
      undefined,
      () => {
        setLoadError("failed to load model");
        setIsLoading(false);
      },
    );

    // Render loop — skip controls.update() while GSAP is driving the camera
    function animate() {
      animFrameRef.current = requestAnimationFrame(animate);
      if (!isAnimatingCameraRef.current) controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Click-to-zoom (inspect mode only, ignores drags)
    const raycaster = new THREE.Raycaster();

    const onMouseDown = (e: MouseEvent) => {
      mouseDownPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = (e: MouseEvent) => {
      const down = mouseDownPosRef.current;
      if (!down) return;
      if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return;
      if (modeRef.current !== "inspect") return;

      const rect = renderer.domElement.getBoundingClientRect();
      raycaster.setFromCamera(
        new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1,
        ),
        camera,
      );

      const hits = raycaster.intersectObjects(meshesRef.current, false);
      if (hits.length > 0) {
        zoomToMesh(hits[0].object as THREE.Mesh);
      } else {
        zoomOut();
      }
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mouseup", onMouseUp);

    // Resize
    const obs = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    obs.observe(container);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      obs.disconnect();
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      renderer.domElement.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  // ── Mode operations ────────────────────────────────────────────────────────
  const applyRandomMaterials = useCallback(() => {
    meshesRef.current.forEach((mesh) => {
      const color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
      mesh.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.25,
        roughness: 0.3,
        metalness: 0.7,
      });
    });
  }, []);

  const restoreMaterials = useCallback(() => {
    meshesRef.current.forEach((mesh) => {
      const orig = origMaterialsRef.current.get(mesh);
      if (orig) mesh.material = orig as THREE.Material;
    });
  }, []);

  const explodeParts = useCallback(() => {
    const center = modelCenterRef.current;
    inspectedRef.current = true;
    const count = meshesRef.current.length;
    const DISTANCE = 1.8;

    meshesRef.current.forEach((mesh, i) => {
      mesh.updateWorldMatrix(true, false);
      const worldPos = new THREE.Vector3();
      mesh.getWorldPosition(worldPos);

      const dir = worldPos.clone().sub(center);
      if (dir.length() < 0.05) {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / Math.max(count, 1));
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        dir.set(
          Math.sin(phi) * Math.cos(theta),
          Math.cos(phi),
          Math.sin(phi) * Math.sin(theta),
        );
      }
      dir.normalize();

      const worldTarget = worldPos.clone().add(dir.multiplyScalar(DISTANCE));

      mesh.parent?.updateWorldMatrix(true, false);
      const invParent = new THREE.Matrix4();
      if (mesh.parent) invParent.copy(mesh.parent.matrixWorld).invert();
      const localTarget = worldTarget.clone().applyMatrix4(invParent);

      gsap.to(mesh.position, {
        x: localTarget.x,
        y: localTarget.y,
        z: localTarget.z,
        duration: 1.2,
        ease: "elastic.out(1, 0.7)",
      });
    });
  }, []);

  const reassembleParts = useCallback(() => {
    inspectedRef.current = false;
    zoomOut();
    meshesRef.current.forEach((mesh) => {
      const orig = origPositionsRef.current.get(mesh)!;
      gsap.to(mesh.position, {
        x: orig.x,
        y: orig.y,
        z: orig.z,
        duration: 0.9,
        ease: "power3.inOut",
      });
    });
  }, [zoomOut]);

  const switchMode = useCallback(
    (next: ModelMode) => {
      const prev = modeRef.current;
      modeRef.current = next;
      setMode(next);

      if (prev === "materials" && next !== "materials") restoreMaterials();
      if (prev === "inspect" && next !== "inspect") reassembleParts();

      if (next === "materials") applyRandomMaterials();
      if (next === "inspect") {
        if (inspectedRef.current) reassembleParts();
        else explodeParts();
      }
    },
    [applyRandomMaterials, restoreMaterials, explodeParts, reassembleParts],
  );

  // ── Hint text ──────────────────────────────────────────────────────────────
  const hint = (() => {
    if (mode === "rotate")
      return lang === "en"
        ? "drag to rotate · scroll to zoom · right-drag to pan"
        : "arrastra para rotar · scroll para zoom · clic derecho para mover";
    if (mode === "materials")
      return lang === "en"
        ? "click [materials] again to randomize colors"
        : "click [materiales] de nuevo para aleatorizar";
    if (isFocused)
      return lang === "en"
        ? "click another part or empty space to zoom back"
        : "click otra parte o espacio vacío para alejar";
    return lang === "en"
      ? "click a part to zoom in · click [inspect] again to reassemble"
      : "click una parte para acercar · click [inspect] para ensamblar";
  })();

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#020202",
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#00cc33",
            fontFamily: "'Courier New', monospace",
            fontSize: 13,
            letterSpacing: "0.05em",
          }}
        >
          {"// loading 3d model..."}
        </div>
      )}
      {loadError && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ff4444",
            fontFamily: "'Courier New', monospace",
            fontSize: 13,
          }}
        >
          {"// " + loadError}
        </div>
      )}

      {!isLoading && !loadError && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            display: "flex",
            gap: 6,
            zIndex: 10,
          }}
        >
          <button
            onClick={() => switchMode("rotate")}
            className={mode === "rotate" ? "t-btn" : "t-btn t-btn-secondary"}
            style={{
              fontSize: 10,
              padding: "4px 12px",
              letterSpacing: "0.1em",
            }}
          >
            {t("rotar", "rotate")}
          </button>
          <button
            onClick={() => switchMode("materials")}
            className={mode === "materials" ? "t-btn" : "t-btn t-btn-secondary"}
            style={{
              fontSize: 10,
              padding: "4px 12px",
              letterSpacing: "0.1em",
            }}
          >
            {t("materiales", "materials")}
          </button>
          {hasMultipleMeshes && (
            <button
              onClick={() => switchMode("inspect")}
              className={mode === "inspect" ? "t-btn" : "t-btn t-btn-secondary"}
              style={{
                fontSize: 10,
                padding: "4px 12px",
                letterSpacing: "0.1em",
              }}
            >
              {t("inspeccionar", "inspect")}
            </button>
          )}
          {mode === "inspect" && isFocused && (
            <button
              onClick={zoomOut}
              className="t-btn t-btn-secondary"
              style={{
                fontSize: 10,
                padding: "4px 12px",
                letterSpacing: "0.1em",
              }}
            >
              {t("← atras", "← back")}
            </button>
          )}
          <button
            onClick={onExit}
            className="t-btn t-btn-secondary"
            style={{ fontSize: 10, padding: "4px 12px" }}
          >
            {"esc"}
          </button>
        </div>
      )}

      {!isLoading && !loadError && (
        <p
          style={{
            position: "absolute",
            bottom: 12,
            left: 14,
            color: "#003309",
            fontSize: 11,
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.05em",
            pointerEvents: "none",
            margin: 0,
          }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
