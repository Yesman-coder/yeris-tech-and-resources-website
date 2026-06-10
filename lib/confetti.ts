import confetti from "canvas-confetti";

function playCelebrationSound() {
  try {
    const ctx = new AudioContext();
    // Ascending fanfare: C5 E5 G5 C6 E6
    const notes = [523, 659, 784, 1047, 1319];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      const t = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
      osc.start(t);
      osc.stop(t + 0.55);
    });
  } catch {
    // AudioContext unavailable
  }
}

export function fireConfetti() {
  playCelebrationSound();

  // Center burst
  confetti({ particleCount: 120, spread: 80, origin: { x: 0.5, y: 0.6 } });

  // Left cannon
  setTimeout(() => {
    confetti({ particleCount: 70, angle: 60, spread: 55, origin: { x: 0, y: 0.65 } });
  }, 250);

  // Right cannon
  setTimeout(() => {
    confetti({ particleCount: 70, angle: 120, spread: 55, origin: { x: 1, y: 0.65 } });
  }, 450);

  // Final big overhead shower
  setTimeout(() => {
    confetti({
      particleCount: 180,
      spread: 110,
      startVelocity: 50,
      origin: { x: 0.5, y: 0.4 },
    });
  }, 700);
}
