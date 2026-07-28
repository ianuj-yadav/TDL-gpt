import React, { useEffect, useRef } from 'react';

export default function QuantumMeshBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(56, 189, 248, ' : 'rgba(192, 132, 252, ',
      alpha: Math.random() * 0.5 + 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space radial background
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      grad.addColorStop(0, '#060b18');
      grad.addColorStop(0.5, '#030712');
      grad.addColorStop(1, '#020409');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render glowing ambient mesh spots
      ctx.fillStyle = 'rgba(56, 189, 248, 0.05)';
      ctx.beginPath();
      ctx.arc(width * 0.2, height * 0.25, 300, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(168, 85, 247, 0.05)';
      ctx.beginPath();
      ctx.arc(width * 0.8, height * 0.7, 350, 0, Math.PI * 2);
      ctx.fill();

      // Connect nodes with lines
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = (1 - dist / 140) * 0.15;
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color === 'rgba(56, 189, 248, ' ? '#38bdf8' : '#c084fc';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
