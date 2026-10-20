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

    // Canvas sizing (2x DPR for crisp rendering)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width, height;

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setCanvasSize();

    const handleResize = () => {
      setCanvasSize();
      if (prefersReducedMotion) drawStatic();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // ─── Configuration ───
    const CRIMSON = { r: 193, g: 18, b: 31 };
    const CRIMSON_LIGHT = { r: 220, g: 50, b: 60 };
    const NAVY = { r: 11, g: 27, b: 43 };

    // Dot grid spacing
    const GRID_SPACING = isMobile ? 44 : 36;
    const DOT_RADIUS = 1.3;
    const DOT_ALPHA_BASE = 0.06;

    // Floating nodes (blood cells / network hubs)
    const nodeCount = isMobile ? (isHome ? 28 : 14) : (isHome ? 55 : 25);
    const maxSpeed = isHome ? 18 : 10;
    const connectionDist = isMobile ? 110 : 155;

    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * maxSpeed,
        vy: (Math.random() - 0.5) * maxSpeed,
        radius: Math.random() * 1.6 + 2.0,
        alpha: Math.random() * 0.3 + 0.45,
        pulsePhase: Math.random() * Math.PI * 2,
        isHub: Math.random() < 0.15 // 15% are larger "hub" nodes
      });
    }

    // Traveling pulse packets
    const pulses = [];
    const maxPulses = isHome ? 8 : 3;

    // ECG heartbeat waves (horizontal traveling ECG lines)
    const ecgLines = [];
    const MAX_ECG = isHome ? 3 : 1;
    const spawnEcg = () => ({
      y: Math.random() * height * 0.6 + height * 0.15,
      x: -100,
      speed: isMobile ? 100 : 160,
      alpha: Math.random() * 0.12 + 0.06,
      lineWidth: Math.random() * 0.6 + 1.0,
      amplitude: Math.random() * 18 + 10,
      frequency: Math.random() * 0.04 + 0.03,
      spikeInterval: Math.random() * 120 + 80,
      lastSpike: 0
    });

    // Soft ambient gradient blobs
    const blobs = [
      { xR: 0.15, yR: 0.2, r: isMobile ? 220 : 380, color: CRIMSON, alpha: 0.045, sx: 0.0003, sy: 0.0004, phase: 0 },
      { xR: 0.82, yR: 0.35, r: isMobile ? 250 : 440, color: CRIMSON_LIGHT, alpha: 0.035, sx: 0.00025, sy: 0.00035, phase: 2 },
      { xR: 0.5, yR: 0.78, r: isMobile ? 200 : 380, color: { r: 56, g: 130, b: 200 }, alpha: 0.025, sx: 0.0002, sy: 0.0003, phase: 4 }
    ];

    // Radial pulse rings (expanding from random nodes)
    const rings = [];
    const MAX_RINGS = isHome ? 4 : 2;

    // Mouse tracking
    const mouse = { x: -1000, y: -1000, active: false };
    const ripples = [];
    let mouseTimeout;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => { mouse.active = false; }, 2500);
    };

    const handlePointerDown = (e) => {
      if (ripples.length < 5) {
        ripples.push({ x: e.clientX, y: e.clientY, radius: 0, maxRadius: 160, alpha: 0.3 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Tab visibility
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

    // ─── Draw helpers ───

    // Draw a faint dot grid across the canvas
    const drawDotGrid = (time) => {
      const waveOffset = time * 0.0003;
      for (let gx = 0; gx < width + GRID_SPACING; gx += GRID_SPACING) {
        for (let gy = 0; gy < height + GRID_SPACING; gy += GRID_SPACING) {
          // Subtle breathing wave: dots near mouse or near center glow slightly brighter
          const distToCenter = Math.sqrt(
            Math.pow(gx - width / 2, 2) + Math.pow(gy - height / 2, 2)
          );
          const wave = Math.sin(distToCenter * 0.005 - waveOffset) * 0.5 + 0.5;
          let alpha = DOT_ALPHA_BASE + wave * 0.04;

          // Brighten dots near mouse
          if (mouse.active) {
            const dm = Math.sqrt(Math.pow(gx - mouse.x, 2) + Math.pow(gy - mouse.y, 2));
            if (dm < 180) {
              alpha += (1 - dm / 180) * 0.15;
            }
          }

          ctx.fillStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(gx, gy, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Draw ECG heartbeat line
    const drawEcgLine = (ecg, time) => {
      ctx.strokeStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, ${ecg.alpha})`;
      ctx.lineWidth = ecg.lineWidth;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();

      const trailLength = 280;
      const startX = Math.max(0, ecg.x - trailLength);

      for (let px = startX; px <= ecg.x && px <= width; px += 2) {
        const localX = px - ecg.x + trailLength;
        const fadeIn = Math.min(1, localX / 40);
        const fadeOut = Math.min(1, (trailLength - localX) / 60);

        // Normal flatline with periodic spike
        const distFromSpike = (px % ecg.spikeInterval);
        let yOff = 0;
        if (distFromSpike < 30) {
          const t = distFromSpike / 30;
          if (t < 0.2) yOff = -ecg.amplitude * 2.5 * (t / 0.2);
          else if (t < 0.35) yOff = -ecg.amplitude * 2.5 + ecg.amplitude * 5.5 * ((t - 0.2) / 0.15);
          else if (t < 0.5) yOff = ecg.amplitude * 3.0 - ecg.amplitude * 4.5 * ((t - 0.35) / 0.15);
          else if (t < 0.7) yOff = -ecg.amplitude * 1.5 + ecg.amplitude * 2.0 * ((t - 0.5) / 0.2);
          else yOff = ecg.amplitude * 0.5 * (1 - (t - 0.7) / 0.3);
        }

        const py = ecg.y + yOff;
        if (px === startX) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    };

    // ─── Static fallback ───
    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      drawDotGrid(0);
      blobs.forEach(b => {
        const bx = width * b.xR;
        const by = height * b.yR;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
        grad.addColorStop(0, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${b.alpha * 1.5})`);
        grad.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, b.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    if (prefersReducedMotion) {
      drawStatic();
      return () => window.removeEventListener('resize', handleResize);
    }

    // ─── Main render ───
    const render = (time) => {
      if (!isVisible) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1 — Dot grid (breathing)
      if (isHome) drawDotGrid(time);

      // 2 — Ambient blobs
      blobs.forEach(b => {
        const ox = Math.sin(time * b.sx + b.phase) * 70;
        const oy = Math.cos(time * b.sy + b.phase) * 55;
        const bx = width * b.xR + ox;
        const by = height * b.yR + oy;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
        grad.addColorStop(0, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${b.alpha})`);
        grad.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3 — Update + draw nodes
      const activePairs = [];

      nodes.forEach(n => {
        n.x += n.vx * dt;
        n.y += n.vy * dt;

        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        else if (n.x > width) { n.x = width; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        else if (n.y > height) { n.y = height; n.vy *= -1; }

        // Mouse interaction — attract gently within 140px
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 && dist > 1) {
            const force = (1 - dist / 140) * 40;
            n.x += (dx / dist) * force * dt;
            n.y += (dy / dist) * force * dt;
          }
        }

        // Gentle pulse breathing on node size
        const pulse = Math.sin(time * 0.002 + n.pulsePhase) * 0.3 + 1;
        const drawRadius = n.isHub ? (n.radius * 1.8 * pulse) : (n.radius * pulse);
        const drawAlpha = n.isHub ? Math.min(n.alpha + 0.15, 0.85) : n.alpha;

        // Hub nodes get a faint glow halo
        if (n.isHub) {
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, drawRadius * 5);
          glow.addColorStop(0, `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0.08)`);
          glow.addColorStop(1, `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(n.x, n.y, drawRadius * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw node dot
        ctx.fillStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, ${drawAlpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, drawRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4 — Connecting lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.18;
            ctx.strokeStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            activePairs.push({ a: nodes[i], b: nodes[j] });
          }
        }
      }

      // 5 — Mouse proximity connecting lines (connect to nearest nodes)
      if (mouse.active && !isMobile) {
        nodes.forEach(n => {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const alpha = (1 - dist / 200) * 0.2;
            ctx.strokeStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        });
      }

      // 6 — Traveling pulse packets
      if (activePairs.length > 0 && pulses.length < maxPulses && Math.random() < 0.05) {
        const pair = activePairs[Math.floor(Math.random() * activePairs.length)];
        pulses.push({ from: pair.a, to: pair.b, progress: 0, speed: Math.random() * 0.4 + 0.35 });
      }

      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed * dt;
        if (pulse.progress >= 1) { pulses.splice(p, 1); continue; }
        const px = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.progress;
        const py = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.progress;

        // Glowing pulse dot
        const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, 8);
        glowGrad.addColorStop(0, `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0.7)`);
        glowGrad.addColorStop(1, `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0)`);
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // 7 — Radial pulse rings from hub nodes
      if (rings.length < MAX_RINGS && Math.random() < 0.008) {
        const hubNodes = nodes.filter(n => n.isHub);
        if (hubNodes.length > 0) {
          const src = hubNodes[Math.floor(Math.random() * hubNodes.length)];
          rings.push({ x: src.x, y: src.y, radius: 4, maxRadius: isMobile ? 100 : 180, alpha: 0.25 });
        }
      }

      for (let r = rings.length - 1; r >= 0; r--) {
        const ring = rings[r];
        ring.radius += 55 * dt;
        ring.alpha -= 0.18 * dt;
        if (ring.alpha <= 0 || ring.radius >= ring.maxRadius) { rings.splice(r, 1); continue; }
        ctx.strokeStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, ${ring.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 8 — ECG heartbeat waves (only on home)
      if (isHome) {
        if (ecgLines.length < MAX_ECG && Math.random() < 0.006) {
          ecgLines.push(spawnEcg());
        }

        for (let e = ecgLines.length - 1; e >= 0; e--) {
          const ecg = ecgLines[e];
          ecg.x += ecg.speed * dt;
          if (ecg.x > width + 300) { ecgLines.splice(e, 1); continue; }
          drawEcgLine(ecg, time);
        }
      }

      // 9 — Click ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 130 * dt;
        rip.alpha -= 0.4 * dt;
        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) { ripples.splice(r, 1); continue; }
        ctx.strokeStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, ${rip.alpha})`;
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
