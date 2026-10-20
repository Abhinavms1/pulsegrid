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

    // Canvas sizing (2x DPR for ultra-crisp Retina rendering)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
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

    // ─── Color Palette ───
    const CRIMSON = { r: 193, g: 18, b: 31 };
    const AZURE = { r: 37, g: 99, b: 235 };
    const SLATE = { r: 15, g: 23, b: 42 };

    // ─── 1. Kerala Regional Logistics Hubs (Structured Statewide Network Topology) ───
    // Fixed strategic geographic coordinates (normalized 0..1) with organic drift
    const hubConfigs = [
      { id: 'KL-01', code: 'CAN', name: 'Kannur Hub', xR: 0.16, yR: 0.20 },
      { id: 'KL-02', code: 'CLT', name: 'Kozhikode Regional', xR: 0.28, yR: 0.32 },
      { id: 'KL-03', code: 'PGT', name: 'Palakkad Corridor', xR: 0.42, yR: 0.24 },
      { id: 'KL-04', code: 'TCR', name: 'Thrissur Central', xR: 0.44, yR: 0.42 },
      { id: 'KL-05', code: 'COK', name: 'Kochi Metro Gateway', xR: 0.50, yR: 0.56 },
      { id: 'KL-06', code: 'IDK', name: 'Idukki Highland', xR: 0.68, yR: 0.44 },
      { id: 'KL-07', code: 'KTM', name: 'Kottayam Center', xR: 0.60, yR: 0.62 },
      { id: 'KL-08', code: 'ALP', name: 'Alappuzha Coastal', xR: 0.54, yR: 0.74 },
      { id: 'KL-09', code: 'QLN', name: 'Kollam Medical Hub', xR: 0.72, yR: 0.72 },
      { id: 'KL-10', code: 'TRV', name: 'Thiruvananthapuram Command', xR: 0.82, yR: 0.84 },
      { id: 'KL-11', code: 'WND', name: 'Wayanad Relay', xR: 0.32, yR: 0.18 },
      { id: 'KL-12', code: 'MLP', name: 'Malappuram Transit', xR: 0.34, yR: 0.46 }
    ];

    // Filter hubs for mobile to avoid crowding
    const activeHubConfigs = isMobile ? hubConfigs.slice(0, 7) : hubConfigs;

    const hubs = activeHubConfigs.map((cfg, idx) => ({
      ...cfg,
      baseX: cfg.xR,
      baseY: cfg.yR,
      x: cfg.xR * width,
      y: cfg.yR * height,
      pulsePhase: idx * 0.7,
      pingRadius: 6,
      pingAlpha: 0.4,
      lastPacketTime: 0
    }));

    // Arterial trunk routes connecting hubs into a clear medical logistics graph
    const arterialRoutes = [
      [0, 1], [1, 11], [1, 2], [1, 3], [2, 3], [3, 4], [3, 11],
      [4, 5], [4, 6], [5, 6], [6, 7], [6, 8], [7, 8], [8, 9]
    ].filter(([a, b]) => a < hubs.length && b < hubs.length);

    // ─── 2. Tributary Relay Nodes (Secondary Community Donors & Hospitals) ───
    const tributaryCount = isMobile ? 12 : 24;
    const tributaries = [];
    for (let i = 0; i < tributaryCount; i++) {
      const parentHubIdx = i % hubs.length;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (isMobile ? 50 : 85) + 30;
      tributaries.push({
        parentIdx: parentHubIdx,
        angle,
        dist,
        orbitSpeed: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.2 + 1.8,
        alpha: Math.random() * 0.25 + 0.35,
        x: 0,
        y: 0
      });
    }

    // ─── 3. Blood Transit Packets (Emergency Blood in Transit) ───
    const packetCount = isMobile ? 4 : 8;
    const packets = [];
    for (let i = 0; i < packetCount; i++) {
      const routeIdx = Math.floor(Math.random() * arterialRoutes.length);
      const [from, to] = arterialRoutes[routeIdx];
      packets.push({
        fromIdx: from,
        toIdx: to,
        routeIdx,
        progress: Math.random(),
        speed: Math.random() * 0.22 + 0.18,
        tailLength: isMobile ? 14 : 22
      });
    }

    // ─── 4. Continuous ECG Cardiac Lifeline ───
    const ecg = {
      yR: isMobile ? 0.38 : 0.48, // Y position across hero / middle
      x: -120,
      speed: isMobile ? 130 : 190,
      amplitude: isMobile ? 18 : 26,
      wavelength: 240, // distance between heartbeat spikes
      trailLength: isMobile ? 260 : 380
    };

    // ─── 5. Ambient Soft Background Gradients ───
    const ambientBlobs = [
      { xR: 0.18, yR: 0.22, r: isMobile ? 200 : 360, color: CRIMSON, alpha: 0.042, phase: 0 },
      { xR: 0.84, yR: 0.40, r: isMobile ? 220 : 400, color: AZURE, alpha: 0.035, phase: 2.1 },
      { xR: 0.50, yR: 0.80, r: isMobile ? 200 : 360, color: CRIMSON, alpha: 0.032, phase: 4.2 }
    ];

    // ─── 6. Mouse Tracking & Cardiac Ripples ───
    const mouse = { x: -1000, y: -1000, active: false };
    const ripples = [];
    let mouseTimeout;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => { mouse.active = false; }, 3000);
    };

    const handlePointerDown = (e) => {
      if (ripples.length < 5) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 4,
          maxRadius: isMobile ? 180 : 280,
          alpha: 0.45
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Tab visibility handling
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

    // ─── Static Fallback for prefers-reduced-motion ───
    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      drawCoordinateGrid(0);
      drawArterialRoutes(1);
      hubs.forEach(h => {
        h.x = h.baseX * width;
        h.y = h.baseY * height;
        drawHub(h, 0);
      });
    };

    if (prefersReducedMotion) {
      drawStatic();
      return () => window.removeEventListener('resize', handleResize);
    }

    // ─── Render Subroutines ───

    // A. Draw Structured Geometric Grid with Interactive Rubber-Sheet Elastic Flexing
    const GRID_SIZE = isMobile ? 48 : 56;

    const drawCoordinateGrid = (time) => {
      ctx.lineWidth = 0.75;

      // Draw vertical lines with mouse-interactive flex
      for (let x = 0; x <= width + GRID_SIZE; x += GRID_SIZE) {
        const isAccent = (Math.round(x / GRID_SIZE) % 4 === 0);
        ctx.strokeStyle = isAccent
          ? `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0.065)`
          : `rgba(${SLATE.r}, ${SLATE.g}, ${SLATE.b}, 0.038)`;

        ctx.beginPath();
        for (let y = 0; y <= height; y += 32) {
          let flexX = x;
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150 && dist > 1) {
              const pull = (1 - dist / 150) * 8;
              flexX += (dx / dist) * pull;
            }
          }
          if (y === 0) ctx.moveTo(flexX, y);
          else ctx.lineTo(flexX, y);
        }
        ctx.stroke();
      }

      // Draw horizontal lines with mouse-interactive flex
      for (let y = 0; y <= height + GRID_SIZE; y += GRID_SIZE) {
        const isAccent = (Math.round(y / GRID_SIZE) % 4 === 0);
        ctx.strokeStyle = isAccent
          ? `rgba(${AZURE.r}, ${AZURE.g}, ${AZURE.b}, 0.055)`
          : `rgba(${SLATE.r}, ${SLATE.g}, ${SLATE.b}, 0.038)`;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 32) {
          let flexY = y;
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150 && dist > 1) {
              const pull = (1 - dist / 150) * 8;
              flexY += (dy / dist) * pull;
            }
          }
          if (x === 0) ctx.moveTo(x, flexY);
          else ctx.lineTo(x, flexY);
        }
        ctx.stroke();
      }

      // Draw precision coordinate crosshairs and micro-dots at intersections
      for (let x = 0; x <= width; x += GRID_SIZE) {
        for (let y = 0; y <= height; y += GRID_SIZE) {
          const isMajor = (Math.round(x / GRID_SIZE) % 4 === 0 && Math.round(y / GRID_SIZE) % 4 === 0);

          if (isMajor) {
            // Precision Crosshair (+)
            ctx.strokeStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0.22)`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x - 3, y);
            ctx.lineTo(x + 3, y);
            ctx.moveTo(x, y - 3);
            ctx.lineTo(x, y + 3);
            ctx.stroke();
          } else {
            // Micro-dot
            ctx.fillStyle = `rgba(${SLATE.r}, ${SLATE.g}, ${SLATE.b}, 0.09)`;
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    // B. Draw Arterial Supply Routes Connecting Hubs
    const drawArterialRoutes = (heartbeatSurge) => {
      arterialRoutes.forEach(([fromIdx, toIdx], idx) => {
        const from = hubs[fromIdx];
        const to = hubs[toIdx];
        if (!from || !to) return;

        // Route line with heartbeat pulse surge
        const baseAlpha = (idx % 2 === 0 ? 0.20 : 0.14) * heartbeatSurge;
        ctx.strokeStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, ${baseAlpha})`;
        ctx.lineWidth = 1.2 * heartbeatSurge;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        // Secondary subtle inner guide track (dashed)
        ctx.strokeStyle = `rgba(${AZURE.r}, ${AZURE.g}, ${AZURE.b}, ${0.10 * heartbeatSurge})`;
        ctx.lineWidth = 0.7;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    };

    // C. Draw Hub Node (Concentric rings, glow halo, telemetry tag)
    const drawHub = (h, time, heartbeatSurge) => {
      // 1. Concentric radar ping ring expanding outward
      h.pingRadius += 18 * 0.016;
      h.pingAlpha -= 0.007;
      if (h.pingAlpha <= 0 || h.pingRadius > (isMobile ? 36 : 48)) {
        h.pingRadius = 6;
        h.pingAlpha = 0.35;
      }
      ctx.strokeStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, ${h.pingAlpha})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(h.x, h.y, h.pingRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Soft Ambient Halo Glow
      const haloR = (isMobile ? 22 : 32) * heartbeatSurge;
      const glowGrad = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, haloR);
      glowGrad.addColorStop(0, `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0.18)`);
      glowGrad.addColorStop(1, `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0)`);
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(h.x, h.y, haloR, 0, Math.PI * 2);
      ctx.fill();

      // 3. Outer Ring
      const outerR = (isMobile ? 6.5 : 8) * heartbeatSurge;
      ctx.strokeStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0.85)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(h.x, h.y, outerR, 0, Math.PI * 2);
      ctx.stroke();

      // 4. Solid Crimson Core
      const coreR = (isMobile ? 3.2 : 4) * heartbeatSurge;
      ctx.fillStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0.95)`;
      ctx.beginPath();
      ctx.arc(h.x, h.y, coreR, 0, Math.PI * 2);
      ctx.fill();

      // 5. Crisp White Center Pinpoint
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(h.x, h.y, 1.4, 0, Math.PI * 2);
      ctx.fill();

      // 6. Micro Telemetry Code Tag (Desktop only)
      if (!isMobile) {
        ctx.font = '600 8.5px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillStyle = `rgba(${SLATE.r}, ${SLATE.g}, ${SLATE.b}, 0.38)`;
        ctx.fillText(`${h.code}`, h.x + 10, h.y - 6);
      }
    };

    // D. Draw Continuous Cardiac ECG Lifeline Waveform
    const drawEcgWaveform = (dt, time) => {
      ecg.x += ecg.speed * dt;
      if (ecg.x > width + ecg.trailLength + 100) {
        ecg.x = -100;
      }

      const centerY = height * ecg.yR;
      const startX = Math.max(0, ecg.x - ecg.trailLength);
      const endX = Math.min(width, ecg.x);

      if (endX <= startX) return;

      // Draw ECG phosphor wave
      ctx.lineWidth = 1.8;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.beginPath();
      let isFirst = true;

      for (let px = startX; px <= endX; px += 3) {
        const localPos = (px % ecg.wavelength);
        let yOffset = 0;

        // Authentic Electrocardiogram Waveform Formula (P-Q-R-S-T)
        if (localPos < 20) {
          // Flat baseline
          yOffset = 0;
        } else if (localPos >= 20 && localPos < 40) {
          // P-Wave (gentle atrial depolarization bump)
          const p = (localPos - 20) / 20;
          yOffset = -Math.sin(p * Math.PI) * (ecg.amplitude * 0.28);
        } else if (localPos >= 40 && localPos < 55) {
          // Baseline PR interval
          yOffset = 0;
        } else if (localPos >= 55 && localPos < 63) {
          // Q-Dip (septal depolarization dip)
          const q = (localPos - 55) / 8;
          yOffset = Math.sin(q * Math.PI) * (ecg.amplitude * 0.22);
        } else if (localPos >= 63 && localPos < 78) {
          // R-Spike (massive ventricular contraction spike!)
          const r = (localPos - 63) / 15;
          if (r < 0.45) {
            yOffset = -(r / 0.45) * ecg.amplitude * 1.5;
          } else {
            yOffset = -ecg.amplitude * 1.5 + ((r - 0.45) / 0.55) * (ecg.amplitude * 1.5 + ecg.amplitude * 0.45);
          }
        } else if (localPos >= 78 && localPos < 88) {
          // S-Dip (deep rebound)
          const s = (localPos - 78) / 10;
          yOffset = Math.sin(s * Math.PI) * (ecg.amplitude * 0.45);
        } else if (localPos >= 88 && localPos < 115) {
          // ST segment
          yOffset = 0;
        } else if (localPos >= 115 && localPos < 155) {
          // T-Wave (ventricular repolarization wave)
          const t = (localPos - 115) / 40;
          yOffset = -Math.sin(t * Math.PI) * (ecg.amplitude * 0.45);
        } else {
          // TP baseline until next beat
          yOffset = 0;
        }

        // Phosphor fade along the trail
        const trailProgress = (px - startX) / (endX - startX);
        const alpha = Math.max(0.04, trailProgress * 0.26);

        const py = centerY + yOffset;
        if (isFirst) {
          ctx.moveTo(px, py);
          isFirst = false;
        } else {
          ctx.lineTo(px, py);
        }
      }

      ctx.strokeStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0.32)`;
      ctx.stroke();

      // Glowing scanhead point at the tip of the ECG wave
      if (endX > 0 && endX < width) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(endX, centerY, 2.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0.75)`;
        ctx.beginPath();
        ctx.arc(endX, centerY, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // ─── Main Animation Render Loop ───
    const render = (time) => {
      if (!isVisible) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Global Cardiac 72 BPM Heartbeat Rhythm ("lub-dub" pulse wave)
      const heartbeatCycle = (time * 0.0012) % 1; // ~0.83s period (72 BPM)
      let heartbeatSurge = 1.0;
      if (heartbeatCycle < 0.12) {
        // First beat (Systole)
        heartbeatSurge = 1.0 + Math.sin((heartbeatCycle / 0.12) * Math.PI) * 0.25;
      } else if (heartbeatCycle >= 0.16 && heartbeatCycle < 0.28) {
        // Second beat (Diastole)
        heartbeatSurge = 1.0 + Math.sin(((heartbeatCycle - 0.16) / 0.12) * Math.PI) * 0.15;
      }

      // 1. Ambient Background Drifting Glow Blobs
      ambientBlobs.forEach(b => {
        const ox = Math.sin(time * 0.0003 + b.phase) * 60;
        const oy = Math.cos(time * 0.00035 + b.phase) * 50;
        const bx = width * b.xR + ox;
        const by = height * b.yR + oy;

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
        grad.addColorStop(0, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${b.alpha * heartbeatSurge})`);
        grad.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Structured Coordinate Grid with Interactive Elastic Warp
      drawCoordinateGrid(time);

      // 3. Update Hub Positions with Gentle Organic Breathing
      hubs.forEach((h, idx) => {
        const swayX = Math.sin(time * 0.0008 + idx) * 8;
        const swayY = Math.cos(time * 0.0009 + idx * 1.5) * 6;
        h.x = h.baseX * width + swayX;
        h.y = h.baseY * height + swayY;
      });

      // 4. Draw Arterial Network Routes Connecting the Hubs
      drawArterialRoutes(heartbeatSurge);

      // 5. Update & Draw Tributary Relay Nodes
      tributaries.forEach(t => {
        const parent = hubs[t.parentIdx];
        if (!parent) return;

        t.angle += t.orbitSpeed * dt;
        t.x = parent.x + Math.cos(t.angle) * t.dist;
        t.y = parent.y + Math.sin(t.angle) * t.dist;

        // Line to parent hub
        ctx.strokeStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0.14)`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(parent.x, parent.y);
        ctx.lineTo(t.x, t.y);
        ctx.stroke();

        // Relay dot
        ctx.fillStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, ${t.alpha * heartbeatSurge})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 6. Update & Draw Active Blood Transit Packets along Arterial Routes
      packets.forEach(p => {
        p.progress += p.speed * dt;
        if (p.progress >= 1) {
          p.progress = 0;
          // Swap or pick another connected route
          p.routeIdx = (p.routeIdx + 1) % arterialRoutes.length;
          const [f, t] = arterialRoutes[p.routeIdx];
          p.fromIdx = f;
          p.toIdx = t;
        }

        const from = hubs[p.fromIdx];
        const to = hubs[p.toIdx];
        if (!from || !to) return;

        const currX = from.x + (to.x - from.x) * p.progress;
        const currY = from.y + (to.y - from.y) * p.progress;

        // Trailing motion glow tail
        const tailX = from.x + (to.x - from.x) * Math.max(0, p.progress - 0.08);
        const tailY = from.y + (to.y - from.y) * Math.max(0, p.progress - 0.08);

        const tailGrad = ctx.createLinearGradient(tailX, tailY, currX, currY);
        tailGrad.addColorStop(0, `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0)`);
        tailGrad.addColorStop(1, `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0.8)`);

        ctx.strokeStyle = tailGrad;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(currX, currY);
        ctx.stroke();

        // Glowing blood unit packet head
        const packetGlow = ctx.createRadialGradient(currX, currY, 0, currX, currY, 8);
        packetGlow.addColorStop(0, `rgba(255, 255, 255, 0.95)`);
        packetGlow.addColorStop(0.35, `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0.9)`);
        packetGlow.addColorStop(1, `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, 0)`);
        ctx.fillStyle = packetGlow;
        ctx.beginPath();
        ctx.arc(currX, currY, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(currX, currY, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // 7. Draw Regional Logistics Hubs
      hubs.forEach(h => {
        drawHub(h, time, heartbeatSurge);
      });

      // 8. Interactive Mouse Laser Tether (Connects nearest hubs to cursor)
      if (mouse.active && !isMobile) {
        // Find 2 closest hubs to cursor
        const sorted = [...hubs].sort((a, b) => {
          const da = Math.pow(a.x - mouse.x, 2) + Math.pow(a.y - mouse.y, 2);
          const db = Math.pow(b.x - mouse.x, 2) + Math.pow(b.y - mouse.y, 2);
          return da - db;
        });

        sorted.slice(0, 2).forEach(h => {
          const dx = mouse.x - h.x;
          const dy = mouse.y - h.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 260) {
            const alpha = (1 - dist / 260) * 0.35;
            ctx.strokeStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.setLineDash([3, 4]);
            ctx.beginPath();
            ctx.moveTo(h.x, h.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.setLineDash([]);

            // Distance beacon ring at mouse
            ctx.strokeStyle = `rgba(${AZURE.r}, ${AZURE.g}, ${AZURE.b}, ${alpha * 0.8})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2);
            ctx.stroke();
          }
        });
      }

      // 9. Continuous ECG Cardiac Lifeline
      if (isHome) {
        drawEcgWaveform(dt, time);
      }

      // 10. Click Shockwaves (Radial cardiac pulse)
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 170 * dt;
        rip.alpha -= 0.38 * dt;

        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(${CRIMSON.r}, ${CRIMSON.g}, ${CRIMSON.b}, ${rip.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary inner echo
        if (rip.radius > 25) {
          ctx.strokeStyle = `rgba(${AZURE.r}, ${AZURE.g}, ${AZURE.b}, ${rip.alpha * 0.6})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius - 20, 0, Math.PI * 2);
          ctx.stroke();
        }
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
