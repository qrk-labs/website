import { useTheme } from "@/lib/theme";
import React, { useRef, useEffect } from "react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const CursorFollow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {theme} = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    let targetX = width / 2;
    let targetY = height / 2;
    let posX = targetX;
    let posY = targetY;

    let lastX = targetX;
    let lastY = targetY;

    let velocity = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      // Lerp to smooth follow
      posX = lerp(posX, targetX, 0.1);
      posY = lerp(posY, targetY, 0.1);

      // Calculate velocity
      const dx = posX - lastX;
      const dy = posY - lastY;
      velocity = Math.sqrt(dx * dx + dy * dy);

      lastX = posX;
      lastY = posY;

      // Map velocity to radius
      const baseRadius = 150;
      const radius = baseRadius + Math.min(velocity * 10, 50);

      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(posX, posY, 0, posX, posY, radius);

      gradient.addColorStop(0, theme === 'dark' ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)");
      gradient.addColorStop(1, theme === 'dark' ? "rgba(255, 255, 255, 0)" : "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: -9999,
      }}
    />
  );
};

export default CursorFollow;