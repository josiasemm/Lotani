import { useEffect, useState } from "react";
import frame1 from "@/assets/Group_2_fixed.svg";
import frame2 from "@/assets/Group_5_fixed.svg";
import frame3 from "@/assets/Group_8_fixed.svg";
import frame4 from "@/assets/Group_9_fixed.svg";

const FRAMES = [frame1, frame2, frame3, frame4];

export function TurtleLoop() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % FRAMES.length), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mt-6 flex h-[120px] w-full items-end justify-center">
      <div className="relative h-[48px] w-[120px]">
        {FRAMES.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            width={120}
            height={48}
            className="absolute inset-0 size-full object-contain"
            style={{ opacity: idx === i ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}