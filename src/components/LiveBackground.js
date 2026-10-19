"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function LiveBackground() {
  const canvasRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let lastTime = performance.now();
    let isVisible = true;

    const isHome = pathname === '/';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Canvas sizing
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (prefersReducedMotion) {
        drawStaticBackground();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Blobs setup (Crimson, Rose, Clinical Blue)
    const blobs = [
      { xRatio: 0.2, yRatio: 0.25, radius: 360, color: '193, 18, 31', alpha: 0.08, speedX: 0.0003, speedY: 0.0004, phase: 0 },
      { xRatio: 0.8, yRatio: 0.45, radius: 420, color: '244, 63, 94', alpha: 0.06, speedX: 0.00025, speedY: 0.00035, phase: 2 },
      { xRatio: 0.45, yRatio: 0.75, radius: 400, color: '56, 189, 248', alpha: 0.045, speedX: 0.0002, speedY: 0.0003, phase: 4 }
    ];

    const drawStaticBackground = () => {
      ctx.clearRect(0, 0, width, height);
      blobs.forEach((b) => {
        const bx = width * b.xRatio;
        const by = height * b.yRatio;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, b.radius);
        grad.addColorStop(0, `rgba(${b.color}, ${b.alpha * 1.2})`);
        grad.addColorStop(1, `rgba(${b.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    if (prefersReducedMotion) {
      drawStaticBackground();
      return () => window.removeEventListener('resize', handleResize);
    }

    // Nodes setup
    const nodeCount = isMobile ? (isHome ? 20 : 12) : (isHome ? 44 : 22);
    const nodes = [];
    const maxSpeed = isHome ? 20 : 12; // px per second

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * maxSpeed,
        vy: (Math.random() - 0.5) * maxSpeed,
        radius: Math.random() * 1.4 + 1.6,
        alpha: Math.random() * 0.25 + 0.3
      });
    }

    // Blood packet pulse dots traveling along active lines
    const pulses = [];
    const maxPulses = isHome ? 5 : 2;

    // Mouse tracking & ripples
    const mouse = { x: -1000, y: -1000, active: false };
    const ripples = [];
    let mouseTimeout;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouse.active = false;
      }, 2000);
    };

    const handlePointerDown = (e) => {
      if (ripples.length < 6) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          maxRadius: 130,
          alpha: 0.35
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Tab visibility handling to pause RAF
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Main render loop
    const render = (time) => {
      if (!isVisible) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw large ambient soft drifting blobs
      blobs.forEach((b) => {
        const offsetX = Math.sin(time * b.speedX + b.phase) * 60;
        const offsetY = Math.cos(time * b.speedY + b.phase) * 50;
        const bx = width * b.xRatio + offsetX;
        const by = height * b.yRatio + offsetY;

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, b.radius);
        grad.addColorStop(0, `rgba(${b.color}, ${b.alpha})`);
        grad.addColorStop(1, `rgba(${b.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Update nodes position & mouse nudge
      const connectionDist = isMobile ? 100 : 135;
      const activePairs = [];

      nodes.forEach((n) => {
        n.x += n.vx * dt;
        n.y += n.vy * dt;

        // Bounce gently off canvas edges
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        else if (n.x > width) { n.x = width; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        else if (n.y > height) { n.y = height; n.vy *= -1; }

        // Subtle desktop mouse interaction (gentle drift within 120px)
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 1) {
            const force = (1 - dist / 120) * 35;
            n.x += (dx / dist) * force * dt;
            n.y += (dy / dist) * force * dt;
          }
        }
      });

      // 3. Draw connecting lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.14;
            ctx.strokeStyle = `rgba(193, 18, 31, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            activePairs.push({ a: nodes[i], b: nodes[j] });
          }
        }
      }

      // 4. Manage and draw pulses (traveling packets)
      if (activePairs.length > 0 && pulses.length < maxPulses && Math.random() < 0.035) {
        const pair = activePairs[Math.floor(Math.random() * activePairs.length)];
        pulses.push({
          from: pair.a,
          to: pair.b,
          progress: 0,
          speed: Math.random() * 0.35 + 0.3
        });
      }

      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed * dt;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const px = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.progress;
        const py = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.progress;

        ctx.fillStyle = 'rgba(193, 18, 31, 0.75)';
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Draw nodes (dots)
      nodes.forEach((n) => {
        ctx.fillStyle = `rgba(193, 18, 31, ${n.alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 6. Draw click ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 120 * dt;
        rip.alpha -= 0.45 * dt;

        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(193, 18, 31, ${rip.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearTimeout(mouseTimeout);
    };
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
