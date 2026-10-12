"use client";

import { useEffect, useRef } from "react";

const LINE_COUNT = 70;
const STEP_PX = 6;

export function WaveBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time: number) => {
      const t = reduced ? 0 : time * 0.00035;
      context.clearRect(0, 0, width, height);
      context.lineWidth = 0.8;

      for (let i = 0; i < LINE_COUNT; i += 1) {
        const p = i / (LINE_COUNT - 1);
        const twist = (p - 0.5) * 2;
        context.strokeStyle = `rgba(74, 92, 106, ${0.1 + (1 - Math.abs(twist)) * 0.22})`;
        context.beginPath();

        for (let x = 0; x <= width + STEP_PX; x += STEP_PX) {
          const u = x / width;
          const ribbon = Math.sin(u * Math.PI * 1.6 + t) * height * 0.32 * twist;
          const swell = Math.sin(u * Math.PI * 2.4 - t * 0.8 + p * 0.9) * height * 0.12;
          const drift = Math.sin(u * Math.PI * 0.9 + t * 0.5) * height * 0.08;
          const y = height * 0.55 + ribbon + swell + drift;
          if (x === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.stroke();
      }

      if (!reduced) frame = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] w-full"
    />
  );
}
