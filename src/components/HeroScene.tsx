import { useEffect, useState } from "react";
import conjunto from "@/assets/Conjunto_1.svg";
import frame1 from "@/assets/Group_2.svg";
import frame2 from "@/assets/Group_5.svg";
import frame3 from "@/assets/Group_8.svg";
import frame4 from "@/assets/Group_9.svg";

const FRAMES = [frame1, frame2, frame3, frame4];

export function HeroScene() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % FRAMES.length), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <svg
      viewBox="0 140 412 480"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className="absolute inset-0 size-full"
    >
      <image href={conjunto} x="0" y="0" width="412" height="917" preserveAspectRatio="none" />
      {FRAMES.map((src, idx) => (
        <image
          key={src}
          href={src}
          x="161"
          y="497"
          width="90"
          height="42"
          preserveAspectRatio="xMidYMax meet"
          opacity={idx === i ? 1 : 0}
        />
      ))}
    </svg>
  );
}