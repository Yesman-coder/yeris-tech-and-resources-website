"use client";

import { ResponseLine } from "../useTerminal";
import { CommandAction } from "./useMode";

const WMO_CODES: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Icy fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Light showers",
  81: "Showers",
  82: "Heavy showers",
  85: "Snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm + hail",
  99: "Thunderstorm + heavy hail",
};

const useWeather = () => {
  const execute = ({ setHistory, id, cmd, lang }: CommandAction & {}) => {
    const capturedLang = lang;

    setHistory((h) => [
      ...h,
      {
        id,
        input: cmd,
        response: [
          {
            type: "plain",
            content:
              capturedLang === "en"
                ? "// requesting location access..."
                : "// solicitando acceso a ubicación...",
          },
        ],
      },
    ]);

    void (async () => {
      let fullResponse: ResponseLine[];
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 8000,
          }),
        );
        const { latitude: lat, longitude: lon } = pos.coords;

        const [geoRes, wxRes] = await Promise.all([
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
          ),
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m`,
          ),
        ]);

        const [geo, wx] = await Promise.all([geoRes.json(), wxRes.json()]);

        const city = (geo.city || geo.locality || "Unknown") as string;
        const cc = (geo.countryCode || "") as string;
        const location = cc ? `${city}, ${cc}` : city;
        const temp = ((wx.current?.temperature_2m as number) ?? 0).toFixed(1);
        const code = (wx.current?.weathercode as number) ?? 0;
        const wind = ((wx.current?.windspeed_10m as number) ?? 0).toFixed(1);
        const humidity = (wx.current?.relativehumidity_2m as number) ?? 0;
        const condition = WMO_CODES[code] ?? "Unknown";
        const pad = (l: string, v: string) => `  ${l.padEnd(12)}${v}`;

        fullResponse = [
          {
            type: "text",
            content:
              capturedLang === "en"
                ? `// weather for ${location}`
                : `// clima en ${location}`,
            color: "#00ff41",
          },
          {
            type: "plain",
            content: "  ─────────────────────────",
            color: "#006620",
          },
          {
            type: "text",
            content: pad("CONDITION", condition),
            color: "#00ff41",
          },
          {
            type: "text",
            content: pad("TEMP", `${temp}°C`),
            color: "#00ff41",
          },
          {
            type: "text",
            content: pad("HUMIDITY", `${humidity}%`),
            color: "#00ff41",
          },
          {
            type: "text",
            content: pad("WIND", `${wind} km/h`),
            color: "#00ff41",
          },
          {
            type: "plain",
            content: "  ─────────────────────────",
            color: "#006620",
          },
          {
            type: "text",
            content: "// open-meteo.com",
            color: "#004d13",
          },
        ];
      } catch (err: unknown) {
        const code = (err as GeolocationPositionError)?.code;
        const denied = code === 1;
        fullResponse = [
          {
            type: "text",
            content:
              capturedLang === "en"
                ? denied
                  ? "// location access denied — allow it in your browser settings"
                  : "// could not fetch weather data"
                : denied
                  ? "// acceso denegado — permite la ubicación en tu navegador"
                  : "// no se pudo obtener el clima",
          },
        ];
      }

      setHistory((h) =>
        h.map((e) =>
          e.id === id
            ? { ...e, version: (e.version ?? 0) + 1, response: fullResponse }
            : e,
        ),
      );
    })();

    return;
  };
  return execute;
};

export default useWeather;
