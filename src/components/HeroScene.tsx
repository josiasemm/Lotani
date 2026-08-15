import { useEffect, useRef, useState } from "react";
import conjunto from "@/assets/Conjunto_1.svg";
import frame1 from "@/assets/Group_2_fixed.svg";
import frame2 from "@/assets/Group_5_fixed.svg";
import frame3 from "@/assets/Group_8_fixed.svg";
import frame4 from "@/assets/Group_9_fixed.svg";

const FRAMES = [frame1, frame2, frame3, frame4];

// Plataforma/roca con su elipse de sombra dentro de Conjunto_1: cx=215, cy=539
const PLATFORM = { x: 215, y: 539 };

export function HeroScene() {
  const [i, setI] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const markerRef = useRef<SVGCircleElement>(null);
  const [spot, setSpot] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % FRAMES.length), 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const update = () => {
      const svg = svgRef.current;
      const marker = markerRef.current;
      if (!svg || !marker) return;
      const svgRect = svg.getBoundingClientRect();
      const dot = marker.getBoundingClientRect();
      setSpot({
        left: dot.left + dot.width / 2 - svgRect.left,
        top: dot.top + dot.height / 2 - svgRect.top,
      });
    };
    update();
    const ro = new ResizeObserver(update);
    if (svgRef.current) ro.observe(svgRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        ref={svgRef}
        viewBox="0 95 412 480"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        className="size-full"
      >
        <image href={conjunto} x="0" y="0" width="412" height="917" preserveAspectRatio="none" />
        <circle ref={markerRef} cx={PLATFORM.x} cy={PLATFORM.y} r="0.5" fill="none" />
      </svg>

      {spot && (
        <div
          className="absolute w-[180px] sm:w-[200px]"
          style={{ left: spot.left, top: spot.top, transform: "translate(-50%, -88%)" }}
        >
          <div className="relative aspect-[300/119] w-full">
            {FRAMES.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 size-full object-contain"
                style={{ opacity: idx === i ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
