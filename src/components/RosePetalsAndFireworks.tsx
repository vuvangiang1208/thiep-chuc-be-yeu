import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  spin: number;
  opacity: number;
  swingRange: number;
  swingSpeed: number;
  swingOffset: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
  gravity: number;
  fadeSpeed: number;
}

export default function RosePetalsAndFireworks() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let petals: Petal[] = [];
    let sparks: Spark[] = [];
    let fireworkTimer = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Initialize initial petals
    const petalCount = 28;
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 12 + 8,
        speedY: Math.random() * 1.0 + 0.6,
        speedX: Math.random() * 0.8 - 0.4,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.02 - 0.01,
        opacity: Math.random() * 0.5 + 0.4,
        swingRange: Math.random() * 15 + 5,
        swingSpeed: Math.random() * 0.012 + 0.005,
        swingOffset: Math.random() * 100,
      });
    }

    const createFirework = (targetX: number, targetY: number) => {
      // Warm, sweet fairytale shades of pink, rose gold, and champagne sparklers
      const colors = [
        "rgba(251, 113, 133, 0.9)", // rose-400
        "rgba(244, 114, 182, 0.9)", // pink-400
        "rgba(244, 63, 94, 0.85)",  // rose-500
        "rgba(249, 168, 212, 0.9)", // pink-300
        "rgba(253, 244, 255, 0.95)", // light fuchsia spark
        "rgba(254, 215, 170, 0.95)", // warm amber
      ];

      const sparkCount = Math.floor(Math.random() * 25) + 30;
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 1.2;
        sparks.push({
          x: targetX,
          y: targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          size: Math.random() * 2.5 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          gravity: 0.04,
          fadeSpeed: Math.random() * 0.015 + 0.01,
        });
      }
    };

    const drawPetal = (p: Petal) => {
      if (!ctx) return;
      ctx.save();
      
      const calculatedX = p.x + Math.sin(p.swingOffset) * p.swingRange;
      ctx.translate(calculatedX, p.y);
      ctx.rotate(p.angle);

      // Create beautiful shaded rose petal look
      const gradient = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
      gradient.addColorStop(0, `rgba(251, 113, 133, ${p.opacity})`); // Deep rose-pink
      gradient.addColorStop(0.6, `rgba(244, 143, 177, ${p.opacity * 0.85})`); // Soft pink
      gradient.addColorStop(1, `rgba(255, 235, 238, ${p.opacity * 0.4})`); // Pale tip

      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      // Draw gentle organic oval leaf/rose petal shape
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(-p.size * 1.3, -p.size * 1.1, -p.size * 1.5, p.size * 0.8, 0, p.size * 1.2);
      ctx.bezierCurveTo(p.size * 1.5, p.size * 0.8, p.size * 1.3, -p.size * 1.1, 0, -p.size);
      
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const updateAndRender = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Launch fireworks periodically at randomized coords
      fireworkTimer++;
      if (fireworkTimer > 210) { // Every ~3.5 seconds
        const randomX = Math.random() * (canvas.width - 200) + 100;
        const randomY = Math.random() * (canvas.height * 0.6) + 100;
        createFirework(randomX, randomY);
        fireworkTimer = 0;
      }

      // 2. Animate and Render Pink Sparks (Firework remnants)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += s.gravity; // apply subtle pull
        s.vx *= 0.985; // friction
        s.alpha -= s.fadeSpeed;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        
        // Add subtle magical halo glow to sparks
        ctx.shadowBlur = 4;
        ctx.shadowColor = s.color;
        
        ctx.fill();
        ctx.restore();
      }

      // 3. Animate and Render Floating Rose Petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.angle += p.spin;
        p.swingOffset += p.swingSpeed;

        // Reset if petal hits bottom of viewport or goes too far out
        if (p.y > canvas.height + 40) {
          p.y = -40;
          p.x = Math.random() * canvas.width;
          p.opacity = Math.random() * 0.5 + 0.4;
          p.size = Math.random() * 12 + 8;
        }

        drawPetal(p);
      }

      animationId = requestAnimationFrame(updateAndRender);
    };

    updateAndRender();

    // Trigger initial couple of sweet bursts right at load
    setTimeout(() => {
      createFirework(canvas.width * 0.25, canvas.height * 0.3);
    }, 400);
    setTimeout(() => {
      createFirework(canvas.width * 0.75, canvas.height * 0.25);
    }, 1800);

    // Dynamic clean click event to spawn lovely sparks
    const handleCanvasClick = (e: MouseEvent) => {
      createFirework(e.clientX, e.clientY);
    };
    window.addEventListener("click", handleCanvasClick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("click", handleCanvasClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="rose-fireworks-backdrop"
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}
