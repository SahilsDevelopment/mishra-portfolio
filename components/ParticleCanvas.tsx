"use client";

import { useEffect, useRef } from "react";
import { glowByTimeOfDay, particleConfig, type Season } from "@/lib/seasons";
import { useSeason } from "./SeasonProvider";

type Particle = {
  x: number; y: number; vx: number; vy: number; s: number;
  col: string; a: number; va: number; ph: number;
};
type Ripple = { x: number; y: number; rd: number; l: number };
type BurstParticle = {
  x: number; y: number; vx: number; vy: number; s: number;
  col: string; a: number; va: number; l: number;
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export function ParticleCanvas() {
  const { season, timeOfDay, reducedMotion, registerBurst } = useSeason();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    season: null as Season | null,
    glow: 1,
    still: false,
    W: 0,
    H: 0,
    t: 0,
    ps: [] as Particle[],
    ripples: [] as Ripple[],
    bursts: [] as BurstParticle[],
    draw: null as null | (() => void),
  });

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const st = state.current;
    st.still = reducedMotion;
    let raf = 0;

    const size = () => {
      st.W = cv.width = window.innerWidth;
      st.H = cv.height = window.innerHeight;
    };

    const make = (init: boolean): Particle => {
      const c = particleConfig[st.season!];
      const fog = c.shape === "fog";
      return {
        x: fog && !init ? -c.sz[1] : rand(c.shape === "rain" ? -250 : 0, st.W),
        y: init || fog ? rand(0, st.H) : c.vy[0] < 0 ? st.H + 10 : -10,
        vx: rand(c.vx[0], c.vx[1]),
        vy: rand(c.vy[0], c.vy[1]),
        s: rand(c.sz[0], c.sz[1]),
        col: pick(c.c),
        a: rand(0, 6.28),
        va: rand(-0.03, 0.03),
        ph: rand(0, 6.28),
      };
    };

    const draw = () => {
      if (!st.season) return;
      const { W, H } = st;
      ctx.clearRect(0, 0, W, H);
      st.t += 0.016;
      const sh = particleConfig[st.season].shape;

      st.ps.forEach((p) => {
        if (!st.still) {
          p.x += p.vx + Math.sin(st.t + p.ph) * 0.35;
          p.y += p.vy;
          p.a += p.va;
        }
        const mg = sh === "fog" ? 200 : 14;
        if (p.y > H + mg || p.y < -mg || p.x < -mg || p.x > W + mg) {
          if (sh === "rain" && p.y > H && Math.random() < 0.3) {
            st.ripples.push({ x: p.x, y: H - rand(4, 60), rd: 0, l: 1 });
          }
          Object.assign(p, make(false));
          if (sh !== "fog") p.x = rand(sh === "rain" ? -250 : 0, W);
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = p.col;
        if (sh === "petal") {
          ctx.rotate(p.a);
          ctx.globalAlpha = 0.85;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, 6.28);
          ctx.fill();
        } else if (sh === "glow") {
          const al = Math.min(1, (0.35 + 0.55 * Math.abs(Math.sin(st.t * 1.3 + p.ph))) * st.glow);
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.s * 3);
          g.addColorStop(0, p.col);
          g.addColorStop(1, "rgba(255,226,122,0)");
          ctx.globalAlpha = al;
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(0, 0, p.s * 3, 0, 6.28);
          ctx.fill();
        } else if (sh === "rain") {
          const m = Math.hypot(p.vx, p.vy);
          ctx.strokeStyle = `rgba(220,236,246,${0.12 + p.s / 55})`;
          ctx.lineWidth = p.s > 18 ? 1.6 : 1;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo((-p.vx / m) * p.s, (-p.vy / m) * p.s);
          ctx.stroke();
        } else {
          const g2 = ctx.createRadialGradient(0, 0, 0, 0, 0, p.s);
          g2.addColorStop(0, "rgba(232,240,255,.17)");
          g2.addColorStop(1, "rgba(232,240,255,0)");
          ctx.fillStyle = g2;
          ctx.beginPath();
          ctx.arc(0, 0, p.s, 0, 6.28);
          ctx.fill();
        }
        ctx.restore();
      });

      st.ripples = st.ripples.filter((q) => {
        q.rd += 0.9;
        q.l -= 0.03;
        if (q.l <= 0) return false;
        ctx.strokeStyle = `rgba(220,236,246,${q.l * 0.55})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(q.x, q.y, q.rd, q.rd * 0.3, 0, 0, 6.28);
        ctx.stroke();
        return true;
      });

      st.bursts = st.bursts.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy = p.vy * 0.96 + (sh === "glow" ? -0.03 : 0.14);
        p.a += p.va;
        p.l -= 0.012;
        if (p.l <= 0) return false;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.globalAlpha = Math.min(1, p.l * 1.4);
        ctx.fillStyle = p.col;
        ctx.beginPath();
        if (sh === "petal") {
          ctx.rotate(p.a);
          ctx.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, 6.28);
        } else {
          ctx.arc(0, 0, sh === "glow" ? p.s * 1.6 : p.s, 0, 6.28);
        }
        ctx.fill();
        ctx.restore();
        return true;
      });
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    st.draw = () => {
      if (!st.season) return;
      // Fewer particles on small screens: cheaper to draw and less visual noise.
      const scale = Math.min(1, Math.max(0.45, st.W / 1000));
      st.ps = Array.from({ length: Math.round(particleConfig[st.season].n * scale) }, () => make(true));
      if (st.still) draw();
    };

    const onResize = () => {
      size();
      if (st.still) draw();
    };

    size();
    st.draw();
    if (!st.still) raf = requestAnimationFrame(loop);
    window.addEventListener("resize", onResize);

    registerBurst((x, y) => {
      if (st.still || !st.season) return;
      const c = particleConfig[st.season];
      const z: [number, number] = c.shape === "rain" ? [2, 3.5] : c.shape === "fog" ? [2.5, 5] : c.sz;
      for (let i = 0; i < 30; i++) {
        const a = rand(0, 6.28);
        const sp = rand(2, 7.5);
        st.bursts.push({
          x, y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 2,
          s: rand(z[0], z[1]) * 1.3,
          col: pick(c.c),
          a: rand(0, 6.28),
          va: rand(-0.15, 0.15),
          l: 1,
        });
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      registerBurst(null);
      st.draw = null;
    };
  }, [reducedMotion, registerBurst]);

  useEffect(() => {
    state.current.glow = glowByTimeOfDay[timeOfDay];
  }, [timeOfDay]);

  useEffect(() => {
    state.current.season = season;
    state.current.draw?.();
  }, [season]);

  return <canvas id="fx" ref={canvasRef} aria-hidden="true" />;
}
