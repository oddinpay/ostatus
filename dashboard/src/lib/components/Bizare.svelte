<script lang="ts">
  import { onMount } from "svelte";

  const animations = [
    { id: "radial-pulse", title: "Radial Pulse", setup: setupRadialPulse },
    { id: "orbital-pulse", title: "Orbital Pulse", setup: setupOrbitalPulse },
    { id: "pendulum-wave", title: "Pendulum Wave", setup: setupPendulumWave },
    { id: "pulse-wave", title: "Pulse Wave", setup: setupPulseWave },
    { id: "quantum-atom", title: "Quantum Atom", setup: setupAtom },
    { id: "star-field", title: "Star Field", setup: setupStarField },
    { id: "classic-star", title: "Classic Star", setup: setupClassicStar },
    { id: "binary-rain", title: "Binary Rain", setup: setupBinaryRain },
    { id: "earth", title: "Earth Rain", setup: setupEarth },
    { id: "vault", title: "Vault", setup: setupVault },
    { id: "star-vault", title: "Star Vault", setup: setupStarVault },
    { id: "card", title: "Card", setup: setupCard },
    { id: "card-cyber", title: "Cyber Card", setup: setupCyberCard },
    { id: "card-fintech", title: "Fintech Card", setup: setupFintechCard },
    {
      id: "twinkling-stars",
      title: "Twinkling Stars",
      setup: setupTwinklingStars,
    },
    {
      id: "orbiting-planets",
      title: "Orbiting Planets",
      setup: setupOrbitingPlanets,
    },
    { id: "moon-phases", title: "Moon Phases", setup: setupMoonPhases },
    {
      id: "shooting-stars",
      title: "Shooting Stars",
      setup: setupShootingStars,
    },
    {
      id: "concentric-rings",
      title: "Concentric Rings",
      setup: setupConcentricRings,
    },
    { id: "sun-canvas", title: "Solar Flare", setup: setupSun },
    { id: "moon-canvas", title: "Lunar Phase", setup: setupMoon },
    { id: "star-canvas", title: "Supernova", setup: setupBigStar },
    {
      id: "sequential-pulse",
      title: "Sequential Pulse",
      setup: setupSequentialPulse,
    },
    {
      id: "oscillating-dots",
      title: "Oscillating Dots",
      setup: setupOscillatingDots,
    },
    { id: "pulsing-grid", title: "Pulsing Grid", setup: setupPulsingGrid },
    { id: "spiral-galaxy", title: "Spiral Galaxy", setup: setupSpiralGalaxy },
    {
      id: "rotating-torus",
      title: "Rotating Torus",
      setup: setupRotatingTorus,
    },
    { id: "dna-helix", title: "DNA Helix", setup: setupDNAHelix },
    {
      id: "geometric-morph",
      title: "Geometric Morph",
      setup: setupGeometricMorph,
    },
    { id: "hypercube", title: "Hypercube 4D", setup: setupHypercube },
    { id: "vortex-field", title: "Vortex Field", setup: setupVortexField },
    { id: "lissajous", title: "Lissajous Curve", setup: setupLissajous },
    { id: "stream", title: "Data Stream", setup: setupStream },
    {
      id: "interference",
      title: "Wave Interference",
      setup: setupInterference,
    },
    { id: "fractal-tree", title: "Fractal Growth", setup: setupFractalTree },
    { id: "neural-net", title: "Neural Link", setup: setupNeuralNet },
    { id: "quantum-cloud", title: "Quantum Cloud", setup: setupQuantumCloud },
  ];

  function getCtx(id: string) {
    const container = document.getElementById(`canvas-${id}`);
    if (!container) return null;
    container.innerHTML = "";

    const canvas = document.createElement("canvas");
    const dpr = window.devicePixelRatio || 1;

    const rect = container.getBoundingClientRect();
    const size = rect.width;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext("2d", { alpha: true })!;
    ctx.scale(dpr, dpr);

    const internalScale = size / 180;
    ctx.scale(internalScale, internalScale);

    container.appendChild(canvas);
    return ctx;
  }

  function setupRadialPulse() {
    const ctx = getCtx("radial-pulse");
    if (!ctx) return;
    const animate = (ts: number) => {
      let time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      for (let i = 0; i < 8; i++) {
        const phase = (time * 0.35 + i / 8) % 1;
        const r = phase * 75;
        if (r < 5) continue;
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - phase})`;
        for (let j = 0; j < 12; j++) {
          const a = (j / 12) * Math.PI * 2;
          ctx.beginPath();
          ctx.arc(
            90 + Math.cos(a) * r,
            90 + Math.sin(a) * r,
            2.5 * (1 - phase * 0.5),
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  // A cluster of many twinkling stars
  function setupStarField() {
    const ctx = getCtx("star-field");
    if (!ctx) return;
    const stars = Array.from({ length: 15 }, () => ({
      x: Math.random() * 180,
      y: Math.random() * 180,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 2 + 1,
    }));

    const animate = (ts: number) => {
      const time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      stars.forEach((s, i) => {
        const twinkle = Math.abs(Math.sin(time * s.speed + i));
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupAtom() {
    const ctx = getCtx("quantum-atom");
    if (!ctx) return;

    const size = 180;
    const center = size / 2;

    const animate = (ts: number) => {
      const time = ts * 0.001;

      // 1. Better Trails: Clear with a fade for smooth "ghost" effects
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)"; // Adjust transparency for trail length
      ctx.fillRect(0, 0, size, size);

      // 2. Nucleus with "Breathing" Glow
      const pulse = Math.sin(time * 2.5) * 1.5;

      // Core
      ctx.shadowBlur = 10;
      ctx.shadowColor = "white";
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(center, center, 4 + pulse, 0, Math.PI * 2);
      ctx.fill();

      // Outer Halo
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx.beginPath();
      ctx.arc(center, center, 10 + pulse * 2, 0, Math.PI * 2);
      ctx.fill();

      const orbits = [
        { rx: 65, ry: 22, speed: 2.2, angle: 0 },
        { rx: 65, ry: 22, speed: 1.8, angle: Math.PI / 3 },
        { rx: 65, ry: 22, speed: 2.6, angle: -Math.PI / 3 },
      ];

      orbits.forEach((orb) => {
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(orb.angle);

        // 3. Crisp Orbit Path
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, orb.rx, orb.ry, 0, 0, Math.PI * 2);
        ctx.stroke();

        // 4. Glowing Electron
        const eTime = time * orb.speed;
        const x = Math.cos(eTime) * orb.rx;
        const y = Math.sin(eTime) * orb.ry;

        ctx.shadowBlur = 8;
        ctx.shadowColor = "white";
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupOrbitalPulse() {
    const ctx = getCtx("orbital-pulse");
    if (!ctx) return;
    const orbits = [15, 25, 35, 45, 55, 65].map((r) => ({
      r,
      dots: 6 + Math.floor(r / 5),
    }));
    const animate = (ts: number) => {
      let time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      orbits.forEach((o) => {
        const phase = (time * 0.5 - (o.r / 75) * 1.5) % 1;
        const effect = Math.max(0, Math.sin(phase * Math.PI) * 2);
        for (let i = 0; i < o.dots; i++) {
          const a = (i / o.dots) * Math.PI * 2;
          ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + effect / 2})`;
          ctx.beginPath();
          ctx.arc(
            90 + Math.cos(a) * (o.r + effect),
            90 + Math.sin(a) * (o.r + effect),
            2 + effect,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      });
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupPendulumWave() {
    const ctx = getCtx("pendulum-wave");
    if (!ctx) return;
    const animate = (ts: number) => {
      let time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      const angle = Math.sin(time * 0.5 * Math.PI) * (Math.PI / 12);
      for (let i = 0; i < 15; i++) {
        const px = 90 - 15 * 4 + i * 8;
        const bx = px + Math.sin(angle) * 90;
        const by = 20 + Math.cos(angle) * 90;
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.beginPath();
        ctx.moveTo(px, 20);
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(bx, by, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupPulseWave() {
    const ctx = getCtx("pulse-wave");
    if (!ctx) return;
    const rings = [
      { r: 15, c: 6 },
      { r: 30, c: 12 },
      { r: 45, c: 18 },
      { r: 60, c: 24 },
      { r: 75, c: 30 },
    ];
    const animate = (ts: number) => {
      let time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      rings.forEach((ring, idx) => {
        for (let i = 0; i < ring.c; i++) {
          const a = (i / ring.c) * Math.PI * 2;
          const rP = Math.sin(time * 2 - idx * 0.4) * 3;
          const op = 0.4 + Math.sin(time * 2 - idx * 0.4 + i * 0.2) * 0.6;
          ctx.fillStyle = `rgba(255,255,255,${op})`;
          ctx.beginPath();
          ctx.arc(
            90 + Math.cos(a) * (ring.r + rP),
            90 + Math.sin(a) * (ring.r + rP),
            2,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      });
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupConcentricRings() {
    const ctx = getCtx("concentric-rings");
    if (!ctx) return;
    const animate = (ts: number) => {
      let time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      for (let r = 0; r < 5; r++) {
        const rad = ((r + 1) / 5) * 75;
        const count = 6 + r * 6;
        const rot = r % 2 === 0 ? time * 0.2 : -time * 0.2;
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2 + rot;
          const sz = 2 + Math.sin(time + r * 0.7) * 1.5 + r / 2;
          ctx.fillStyle = `rgba(255,255,255,${0.6 + Math.sin(time + r * 0.7) * 0.4})`;
          ctx.beginPath();
          ctx.arc(
            90 + Math.cos(a) * rad,
            90 + Math.sin(a) * rad,
            sz,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupSequentialPulse() {
    const ctx = getCtx("sequential-pulse");
    if (!ctx) return;
    const animate = (ts: number) => {
      let time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2;
        const pF = Math.sin(((time * 0.5 + i / 16) % 1) * Math.PI * 2);
        const x = 90 + Math.cos(a) * (70 + pF * 5);
        const y = 90 + Math.sin(a) * (70 + pF * 5);
        ctx.strokeStyle = `rgba(255,255,255,${0.1 + pF * 0.2})`;
        ctx.beginPath();
        ctx.moveTo(90, 90);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, 2 + pF * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupOscillatingDots() {
    const ctx = getCtx("oscillating-dots");
    if (!ctx) return;
    const animate = (ts: number) => {
      let time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      for (let row = 0; row < 5; row++) {
        const yBase = 90 - 2 * 15 + row * 15;
        for (let i = 0; i < 20; i++) {
          const x = 90 - 19 * 4 + i * 8;
          const off =
            Math.sin(time * (1 + row * 0.2) + i * 0.2 + row * 0.5) *
            (4 + row * 2);
          ctx.fillStyle = "rgba(255,255,255,0.9)";
          ctx.beginPath();
          ctx.arc(x, yBase + off, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupEarth() {
    const ctx = getCtx("earth");
    if (!ctx) return;
    const size = 180;
    const center = size / 2;

    const animate = (ts: number) => {
      const time = ts * 0.001;
      ctx.clearRect(0, 0, size, size);

      ctx.save();
      ctx.translate(center, center);

      // Rotate the Earth over time
      const rotation = time * 0.5; // adjust speed here
      ctx.rotate(rotation);

      // Draw planet body
      const planetGrad = ctx.createRadialGradient(-5, -5, 10, 0, 0, 45);
      planetGrad.addColorStop(0, "#ffffff");
      planetGrad.addColorStop(1, "#dddddd");
      ctx.fillStyle = planetGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 45, 0, Math.PI * 2);
      ctx.fill();

      // Draw continent shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.beginPath();
      ctx.arc(15, 0, 20, 0, Math.PI * 2); // shadow rotates with the Earth
      ctx.fill();

      // Draw atmosphere glow (still centered)
      const grad = ctx.createRadialGradient(0, 0, 40, 0, 0, 55);
      grad.addColorStop(0, "rgba(100,180,255,0.05)");
      grad.addColorStop(1, "rgba(100,180,255,0.15)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, 55, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  // 1. THE SUN
  function setupSun() {
    const ctx = getCtx("sun-canvas");
    if (!ctx) return;
    const animate = (ts: number) => {
      const time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      const pulse = Math.sin(time * 2) * 8;
      const grad = ctx.createRadialGradient(90, 90, 0, 90, 90, 60 + pulse);
      grad.addColorStop(0, "white");
      grad.addColorStop(0.2, "rgba(255, 255, 255, 0.4)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(90, 90, 80, 0, Math.PI * 2);
      ctx.fill();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  // 2. THE EARTH
  function setupOrbit() {
    const ctx = getCtx("earth-canvas");
    if (!ctx) return;
    const animate = (ts: number) => {
      const time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      // Atmosphere
      ctx.fillStyle = "rgba(100, 180, 255, 0.15)";
      ctx.beginPath();
      ctx.arc(90, 90, 55, 0, Math.PI * 2);
      ctx.fill();
      // Planet Body
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(90, 90, 45, 0, Math.PI * 2);
      ctx.fill();
      // Moving Continent Shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      const shift = Math.sin(time * 0.5) * 10;
      ctx.beginPath();
      ctx.arc(80 + shift, 85, 20, 0, Math.PI * 2);
      ctx.fill();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  // 3. THE MOON
  function setupMoon() {
    const ctx = getCtx("moon-canvas");
    if (!ctx) return;
    const animate = () => {
      ctx.clearRect(0, 0, 180, 180);
      ctx.save();
      ctx.translate(90, 90);
      ctx.rotate(-0.3);
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(25, -15, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      requestAnimationFrame(animate);
    };
    animate();
  }

  // 4. THE STAR
  function setupBigStar() {
    const ctx = getCtx("star-canvas");
    if (!ctx) return;
    const animate = (ts: number) => {
      const time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      const glow = Math.abs(Math.sin(time * 3));
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.shadowBlur = 15 * glow;
      ctx.shadowColor = "white";
      // 4-point star cross
      ctx.beginPath();
      ctx.moveTo(90, 20);
      ctx.lineTo(90, 160);
      ctx.moveTo(20, 90);
      ctx.lineTo(160, 90);
      ctx.stroke();
      // Center glow
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(90, 90, 4, 0, Math.PI * 2);
      ctx.fill();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupPulsingGrid() {
    const ctx = getCtx("pulsing-grid");
    if (!ctx) return;
    const animate = (ts: number) => {
      let time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      const bF = Math.sin(time * 0.5) * 0.2 + 1.0;
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          if (r === 2 && c === 2) continue;
          const bX = (c - 2) * 15,
            bY = (r - 2) * 15;
          const dist = Math.sqrt(bX * bX + bY * bY);
          const a = Math.atan2(bY, bX);
          const rW = Math.sin((time - dist / 80) * Math.PI * 2) * 4;
          const x = 90 + bX * bF + Math.cos(a) * rW;
          const y = 90 + bY * bF + Math.sin(a) * rW;
          ctx.fillStyle = `rgba(200, 220, 255, ${0.5 + Math.sin(time * 1.5 + a * 3) * 0.2})`;
          ctx.beginPath();
          ctx.arc(
            x,
            y,
            (1.5 + (1 - dist / 80) * 1.5) *
              (Math.sin(time * 2 + (dist / 80) * 5) * 0.6 + 1),
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupSpiralGalaxy() {
    const ctx = getCtx("spiral-galaxy");
    if (!ctx) return;
    const parts = Array.from({ length: 200 }, () => {
      const d = Math.pow(Math.random(), 0.5) * 75;
      const arm = Math.floor(Math.random() * 3);
      return {
        d,
        a: Math.log(d / 5) / 0.2 + (arm / 3) * Math.PI * 2,
        arm,
        sz: 1 + Math.random() * 1.5,
        op: 0.3 + Math.random() * 0.7,
        sp: 0.8 + Math.random() * 0.4,
      };
    });
    let lastTime = 0;
    const animate = (ts: number) => {
      const dt = (ts - lastTime) * 0.001;
      lastTime = ts;
      ctx.clearRect(0, 0, 180, 180);
      parts.forEach((p) => {
        p.a += 0.1 * (1 / Math.sqrt(p.d / 10)) * p.sp * dt * 50;
        const x = 90 + Math.cos(p.a) * p.d,
          y = 90 + Math.sin(p.a) * p.d;
        const pulse =
          Math.sin((ts * 0.0005 + p.arm / 3) * Math.PI * 2) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(220,220,255,${p.op * pulse})`;
        ctx.beginPath();
        ctx.arc(x, y, p.sz * pulse, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupRotatingTorus() {
    const ctx = getCtx("rotating-torus");
    if (!ctx) return;
    const animate = (ts: number) => {
      let time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      for (let i = 0; i < 20; i++) {
        const u = (i / 20) * Math.PI * 2;
        for (let j = 0; j < 10; j++) {
          const v = (j / 10) * Math.PI * 2;
          const x3d = (40 + 15 * Math.cos(v)) * Math.cos(u + time);
          const y3d = (40 + 15 * Math.cos(v)) * Math.sin(u + time);
          const z3d = 15 * Math.sin(v);
          const scale = 150 / (150 + z3d);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + scale * 0.5})`;
          ctx.beginPath();
          ctx.arc(
            90 + x3d * scale,
            90 + y3d * scale,
            1.5 * scale,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupDNAHelix() {
    const ctx = getCtx("dna-helix");
    if (!ctx) return;
    const animate = (ts: number) => {
      let time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      for (let i = 0; i < 20; i++) {
        const y = 30 + i * 6;
        const wave = Math.sin(time * 2 + i * 0.3) * 40;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(90 + wave, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.beginPath();
        ctx.arc(90 - wave, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.beginPath();
        ctx.moveTo(90 + wave, y);
        ctx.lineTo(90 - wave, y);
        ctx.stroke();
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupGeometricMorph() {
    const ctx = getCtx("geometric-morph");
    if (!ctx) return;
    const animate = (ts: number) => {
      let time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);
      const m = Math.abs(Math.sin(time * 0.5));
      ctx.beginPath();
      for (let a = 0; a < Math.PI * 2; a += 0.05) {
        const r =
          60 /
          Math.pow(
            Math.pow(Math.abs(Math.cos(a)), 2 + m * 4) +
              Math.pow(Math.abs(Math.sin(a)), 2 + m * 4),
            1 / (2 + m * 4),
          );
        const x = 90 + Math.cos(a) * r,
          y = 90 + Math.sin(a) * r;
        if (a === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "white";
      ctx.stroke();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupStarVault() {
    const ctx = getCtx("star-vault");
    if (!ctx) return;
    const size = 180;
    const center = size / 2;

    const colors = {
      bodyStart: "#1a1a1a",
      bodyEnd: "#000000",
      metalLight: "#ffffff",
      metalMid: "#71717a",
      metalDark: "#27272a",
      glow: "rgba(255, 255, 255, 0.2)",
    };

    // Path function with rotation support
    const starPath = (s: number, rotationOffset: number) => {
      const points = 5;
      const outer = 55 * s;
      const inner = 24 * s;
      let angle = (Math.PI / 2) * 3 + rotationOffset;
      const step = Math.PI / points;

      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outer : inner;
        ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        angle += step;
      }
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      const now = Date.now();
      const time = now * 0.002;
      const rotation = now * 0.0005; // Slow, elegant spin
      const pulse = 1 + 0.02 * Math.sin(time);

      ctx.save();
      ctx.translate(center, center);

      // 1. Background Glow (pulsing)
      ctx.shadowBlur = 35;
      ctx.shadowColor = colors.glow;

      // 2. Star Body
      starPath(pulse, rotation);
      const bodyGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 60 * pulse);
      bodyGrad.addColorStop(0, colors.bodyStart);
      bodyGrad.addColorStop(1, colors.bodyEnd);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      ctx.shadowBlur = 0;

      // 3. Metallic Bezel (The rim)
      // Note: The rim gradient stays fixed while the star spins under it
      const rimGrad = ctx.createLinearGradient(-50, -50, 50, 50);
      rimGrad.addColorStop(0, colors.metalLight);
      rimGrad.addColorStop(0.2, colors.metalDark);
      rimGrad.addColorStop(0.5, colors.metalMid);
      rimGrad.addColorStop(0.8, colors.metalDark);
      rimGrad.addColorStop(1, colors.metalLight);

      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 4;
      starPath(pulse, rotation);
      ctx.stroke();

      // 4. Glass Shine Sweep
      ctx.save();
      starPath(pulse, rotation);
      ctx.clip();

      // The tan function creates that signature "quick flash" effect
      const sweep = Math.tan(time * 0.4) * 130;
      const shineGrad = ctx.createLinearGradient(sweep, -60, sweep + 30, 60);
      shineGrad.addColorStop(0, "transparent");
      shineGrad.addColorStop(0.5, "rgba(255,255,255,0.2)");
      shineGrad.addColorStop(1, "transparent");

      ctx.fillStyle = shineGrad;
      ctx.fillRect(-100, -100, 200, 200);
      ctx.restore();

      ctx.restore();
      requestAnimationFrame(animate);
    };

    animate();
  }

  function setupVault() {
    const ctx = getCtx("vault");
    if (!ctx) return;
    const size = 180;
    const center = size / 2;

    const colors = {
      bodyStart: "#1a1a1a",
      bodyEnd: "#000000",
      metalLight: "#ffffff",
      metalMid: "#71717a",
      metalDark: "#27272a",
      tickColor: "#e2e8f0",
      glow: "rgba(255, 255, 255, 0.15)",
    };

    const shieldPath = (s: number) => {
      ctx.beginPath();
      ctx.moveTo(-40 * s, -45 * s);
      ctx.quadraticCurveTo(0, -60 * s, 40 * s, -45 * s);
      ctx.quadraticCurveTo(45 * s, 10 * s, 35 * s, 30 * s);
      ctx.lineTo(0, 55 * s);
      ctx.lineTo(-35 * s, 30 * s);
      ctx.quadraticCurveTo(-45 * s, 10 * s, -40 * s, -45 * s);
      ctx.closePath();
    };

    const drawTick = (s: number) => {
      ctx.save();
      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(255,255,255,0.2)";

      ctx.beginPath();
      ctx.moveTo(-12 * s, 2 * s);
      ctx.lineTo(-4 * s, 12 * s);
      ctx.lineTo(16 * s, -12 * s);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const tickGrad = ctx.createLinearGradient(-10, -10, 10, 10);
      tickGrad.addColorStop(0, "#ffffff");
      tickGrad.addColorStop(0.5, "#94a3b8");
      tickGrad.addColorStop(1, "#475569");

      ctx.strokeStyle = tickGrad;
      ctx.lineWidth = 7 * s;
      ctx.stroke();

      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.lineWidth = 2 * s;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      const time = Date.now() * 0.002;
      const pulse = 1 + 0.02 * Math.sin(time);

      ctx.save();
      ctx.translate(center, center);

      ctx.shadowBlur = 30;
      ctx.shadowColor = colors.glow;

      shieldPath(pulse);
      const bodyGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 60 * pulse);
      bodyGrad.addColorStop(0, colors.bodyStart);
      bodyGrad.addColorStop(1, colors.bodyEnd);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      ctx.shadowBlur = 0;

      const rimGrad = ctx.createLinearGradient(-50, -50, 50, 50);
      rimGrad.addColorStop(0, colors.metalLight);
      rimGrad.addColorStop(0.2, colors.metalDark);
      rimGrad.addColorStop(0.5, colors.metalMid);
      rimGrad.addColorStop(0.8, colors.metalDark);
      rimGrad.addColorStop(1, colors.metalLight);

      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 4;
      shieldPath(pulse);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      shieldPath(pulse * 0.94);
      ctx.stroke();

      drawTick(pulse);

      ctx.save();
      shieldPath(pulse);
      ctx.clip();
      const sweep = Math.tan(time * 0.4) * 120;
      const shineGrad = ctx.createLinearGradient(sweep, -50, sweep + 20, 50);
      shineGrad.addColorStop(0, "transparent");
      shineGrad.addColorStop(0.5, "rgba(255,255,255,0.15)");
      shineGrad.addColorStop(1, "transparent");
      ctx.fillStyle = shineGrad;
      ctx.fillRect(-100, -100, 200, 200);
      ctx.restore();

      ctx.restore();
      requestAnimationFrame(animate);
    };

    animate();
  }

  function setupHypercube() {
    const ctx = getCtx("hypercube");
    if (!ctx) return;
    let time = 0;

    const vertices: number[][] = [];
    for (let i = 0; i < 16; i++) {
      vertices.push([
        i & 1 ? 1 : -1,
        i & 2 ? 1 : -1,
        i & 4 ? 1 : -1,
        i & 8 ? 1 : -1,
      ]);
    }

    const animate = (ts: number) => {
      time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);

      const projected: { x: number; y: number; z: number; w: number }[] = [];

      vertices.forEach((v) => {
        let [x, y, z, w] = v;

        const cosXY = Math.cos(time * 0.5);
        const sinXY = Math.sin(time * 0.5);
        let x1 = x * cosXY - y * sinXY;
        let y1 = x * sinXY + y * cosXY;

        const cosZW = Math.cos(time);
        const sinZW = Math.sin(time);
        let z1 = z * cosZW - w * sinZW;
        let w1 = z * sinZW + w * cosZW;

        const distance4D = 2.5;
        const factor4D = 1 / (distance4D - w1);
        const x3d = x1 * factor4D;
        const y3d = y1 * factor4D;
        const z3d = z1 * factor4D;

        const distance3D = 2;
        const factor3D = 1 / (distance3D - z3d);
        const finalX = 90 + x3d * factor3D * 180;
        const finalY = 90 + y3d * factor3D * 180;

        projected.push({ x: finalX, y: finalY, z: z1, w: w1 });
      });

      ctx.lineWidth = 1;
      for (let i = 0; i < 16; i++) {
        for (let j = i + 1; j < 16; j++) {
          let diff = 0;
          let val = i ^ j;
          while (val > 0) {
            if (val & 1) diff++;
            val >>= 1;
          }

          if (diff === 1) {
            const p = projected[i];
            const q = projected[j];
            const avgW = (p.w + q.w) / 2;
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + (avgW + 1) * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      projected.forEach((p) => {
        const size = (p.w + 1.2) * 1.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + (p.w + 1) * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size > 0 ? size : 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupVortexField() {
    const ctx = getCtx("vortex-field");
    if (!ctx) return;
    let time = 0;
    const animate = () => {
      time += 0.05;
      ctx.clearRect(0, 0, 180, 180);
      for (let i = 0; i < 150; i++) {
        let angle = i * 0.1 + time * 0.2;
        let r = Math.sqrt(i) * 7;
        let x = 90 + Math.cos(angle) * r;
        let y = 90 + Math.sin(angle) * r;
        ctx.fillStyle = `rgba(255,255,255,${1 - r / 90})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(animate);
    };
    animate();
  }

  function setupLissajous() {
    const ctx = getCtx("lissajous");
    if (!ctx) return;
    let time = 0;
    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, 180, 180);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      for (let t = 0; t < Math.PI * 2; t += 0.05) {
        let x = 90 + Math.sin(3 * t + time) * 70;
        let y = 90 + Math.sin(2 * t + time * 0.5) * 70;
        if (t === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      requestAnimationFrame(animate);
    };
    animate();
  }

  function setupTwinklingStars() {
    const ctx = getCtx("twinkling-stars");
    if (!ctx) return;

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * 180,
      y: Math.random() * 180,
      radius: Math.random() * 1.5,
      brightness: Math.random(),
      delta: 0.01 + Math.random() * 0.02,
    }));

    const animate = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, 180, 180);

      stars.forEach((s) => {
        s.brightness += s.delta;
        if (s.brightness > 1 || s.brightness < 0) s.delta *= -1;
        ctx.fillStyle = `rgba(255,255,255,${s.brightness})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  function setupOrbitingPlanets() {
    const ctx = getCtx("orbiting-planets");
    if (!ctx) return;

    const planets = [
      { radius: 15, speed: 0.02, size: 4, angle: 0, color: "white" },
      { radius: 25, speed: 0.015, size: 3, angle: Math.PI / 2, color: "white" },
      { radius: 35, speed: 0.01, size: 2, angle: Math.PI, color: "white" },
    ];

    const cx = 90;
    const cy = 90;

    const animate = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, 180, 180);

      // Draw sun
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();

      // Draw planets
      planets.forEach((p) => {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  function setupMoonPhases() {
    const ctx = getCtx("moon-phases");
    if (!ctx) return;

    let phase = 0;

    const animate = () => {
      ctx.fillRect(0, 0, 180, 180);

      const cx = 90;
      const cy = 90;
      const r = 30;

      // Base full moon
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Shadow for phase
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      const shift = Math.sin(phase) * r * 2;
      ctx.arc(cx + shift, cy, r, 0, Math.PI * 2);
      ctx.fill();

      phase += 0.01;
      requestAnimationFrame(animate);
    };

    animate();
  }

  function setupShootingStars() {
    const ctx = getCtx("shooting-stars");
    if (!ctx) return;

    const width = 180;
    const height = 180;
    const centerX = width / 2;
    const centerY = height / 2;

    const stars: any[] = [];

    const animate = () => {
      // Fill background with solid black
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Occasionally add new shooting star from center
      if (Math.random() < 0.02) {
        const angle = Math.random() * 2 * Math.PI; // random direction
        const speed = 2 + Math.random() * 2;
        stars.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          length: 8 + Math.random() * 10,
          alpha: 1,
          fade: 0.02 + Math.random() * 0.02,
        });
      }

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];

        // Draw glowing tail
        const gradient = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.vx * s.length,
          s.y - s.vy * s.length,
        );
        gradient.addColorStop(0, `rgba(255,255,255,${s.alpha})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * s.length, s.y - s.vy * s.length);
        ctx.stroke();

        // Update position and alpha
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.fade;

        // Remove if off screen or faded out
        if (s.x < 0 || s.x > width || s.y < 0 || s.y > height || s.alpha <= 0)
          stars.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  function setupBinaryRain() {
    const ctx = getCtx("binary-rain");
    if (!ctx) return;

    const columns = 18;
    const drops = Array(columns).fill(0);

    const animate = (ts: number) => {
      const time = ts * 0.001;

      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, 180, 180);

      ctx.fillStyle = "white";
      ctx.font = "6px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? "1" : "0";
        const x = i * 10;
        const y = drops[i] * 10;

        ctx.fillText(text, x, y);

        if (y > 180 && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  function setupStream() {
    const ctx = getCtx("stream");
    if (!ctx) return;
    let time = 0;
    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, 180, 180);
      ctx.font = "8px monospace";
      ctx.textAlign = "center";
      for (let i = 0; i < 12; i++) {
        let angle = (i / 12) * Math.PI * 2;
        for (let j = 0; j < 8; j++) {
          let r = 20 + j * 10;
          let char = Math.random() > 0.5 ? "1" : "0";
          let op = ((time + j * 5) % 20) / 20;
          ctx.fillStyle = `rgba(255,255,255,${op})`;
          ctx.fillText(
            char,
            90 + Math.cos(angle) * r,
            90 + Math.sin(angle) * r,
          );
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
  }

  function setupInterference() {
    const ctx = getCtx("interference");
    if (!ctx) return;
    let time = 0;
    const animate = () => {
      time += 0.08;
      ctx.clearRect(0, 0, 180, 180);
      for (let x = 0; x < 180; x += 5) {
        for (let y = 0; y < 180; y += 5) {
          const d1 = Math.sqrt((x - 60) ** 2 + (y - 90) ** 2);
          const d2 = Math.sqrt((x - 120) ** 2 + (y - 90) ** 2);
          const v = Math.sin(d1 * 0.15 - time) + Math.sin(d2 * 0.15 + time);
          const opacity = (v + 2) / 4;
          if (opacity > 0.7) {
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
            ctx.fillRect(x, y, 2, 2);
          }
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
  }

  function setupFractalTree() {
    const ctx = getCtx("fractal-tree");
    if (!ctx) return;
    let time = 0;
    const drawBranch = (
      x: number,
      y: number,
      len: number,
      angle: number,
      depth: number,
    ) => {
      if (depth > 8) return;
      const x2 = x + Math.cos(angle) * len;
      const y2 = y + Math.sin(angle) * len;
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + (1 - depth / 8) * 0.8})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      const bend = Math.sin(time) * 0.4;
      drawBranch(x2, y2, len * 0.76, angle - 0.5 + bend, depth + 1);
      drawBranch(x2, y2, len * 0.76, angle + 0.5 + bend, depth + 1);
    };
    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, 180, 180);
      drawBranch(90, 160, 38, -Math.PI / 2, 0);
      requestAnimationFrame(animate);
    };
    animate();
  }

  function setupClassicStar() {
    const ctx = getCtx("classic-star");
    if (!ctx) return;

    const animate = (ts: number) => {
      const time = ts * 0.001;
      ctx.clearRect(0, 0, 180, 180);

      const x = 90;
      const y = 90;
      const spikes = 5;
      const outerRadius = 65;
      const innerRadius = 30; // Determines how "sharp" the star is

      // Subtle shimmering effect
      const shimmer = Math.sin(time * 3) * 5;

      ctx.save();
      ctx.translate(x, y);
      // Add a very slow rotation to make it feel premium
      ctx.rotate(time * 0.2);

      ctx.beginPath();
      let rot = (Math.PI / 2) * 3;
      let step = Math.PI / spikes;

      // Drawing the five-pointed path
      ctx.moveTo(0, -outerRadius - shimmer);
      for (let i = 0; i < spikes; i++) {
        let curX = Math.cos(rot) * (outerRadius + shimmer);
        let curY = Math.sin(rot) * (outerRadius + shimmer);
        ctx.lineTo(curX, curY);
        rot += step;

        curX = Math.cos(rot) * innerRadius;
        curY = Math.sin(rot) * innerRadius;
        ctx.lineTo(curX, curY);
        rot += step;
      }
      ctx.lineTo(0, -outerRadius - shimmer);
      ctx.closePath();

      // Styling to match your white theme
      ctx.lineWidth = 3;
      ctx.strokeStyle = "white";
      ctx.stroke();

      // Add a soft inner glow
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.restore();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupFintechCard() {
    const ctx = getCtx("card-fintech");
    if (!ctx) return;
    const size = 200;
    const center = size / 2;

    const colors = {
      base: "#121212",
      gold: "#d4af37",
      logoColor: "#f0f0f0",
      glow: "rgba(255, 255, 255, 0.4)",
      text: "rgba(255, 255, 255, 0.8)",
    };

    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      const time = Date.now() * 0.001;

      const tiltX = Math.sin(time * 0.8) * 4;
      const tiltY = Math.cos(time * 0.8) * 2;

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate((tiltX * Math.PI) / 180);

      const cardW = 130;
      const cardH = 82;
      const r = 10;

      // 1. Background Shadow
      ctx.shadowBlur = 35;
      ctx.shadowColor = "rgba(0,0,0,0.5)";

      // 2. Main Card Body
      ctx.beginPath();
      ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, r);
      ctx.fillStyle = "#0d0d0d";
      ctx.fill();
      ctx.shadowBlur = 0;

      // 3. Glowing Border
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, r);
      ctx.shadowBlur = 6;
      ctx.shadowColor = colors.glow;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // 4. Subtle Sheen
      ctx.save();
      ctx.clip();
      const sheenX = Math.sin(time * 0.8) * 160 - 40;
      const sheenGrad = ctx.createLinearGradient(sheenX, -50, sheenX + 30, 50);
      sheenGrad.addColorStop(0, "transparent");
      sheenGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.04)");
      sheenGrad.addColorStop(1, "transparent");
      ctx.fillStyle = sheenGrad;
      ctx.fillRect(-cardW, -cardH, cardW * 2, cardH * 2);
      ctx.restore();

      // 5. Gold Chip
      ctx.save();
      ctx.translate(-46, -10);
      const chipW = 16;
      const chipH = 12;
      const chipGrad = ctx.createLinearGradient(0, 0, chipW, chipH);
      chipGrad.addColorStop(0, "#f5e0a3");
      chipGrad.addColorStop(0.5, colors.gold);
      chipGrad.addColorStop(1, "#8a6d1d");
      ctx.fillStyle = chipGrad;
      ctx.beginPath();
      ctx.roundRect(0, 0, chipW, chipH, 2.5);
      ctx.fill();
      ctx.restore();

      // 6. Refined Small Typography
      ctx.fillStyle = colors.text;
      ctx.letterSpacing = "1.5px";
      ctx.font = "500 7px 'Inter', sans-serif";
      ctx.fillText("0123 4567 8901 2345", -46, 22);

      ctx.letterSpacing = "0.5px";
      ctx.font = "400 4px 'Inter', sans-serif";
      ctx.globalAlpha = 0.5;
      ctx.fillText("VALID THRU", -46, 32);

      ctx.globalAlpha = 0.8;
      ctx.font = "500 5px 'Inter', sans-serif";
      ctx.fillText("12/28", -18, 32);
      ctx.globalAlpha = 1.0;

      // 7. THE EXACT LOGO SHAPE (Geometric "0")
      ctx.save();
      ctx.translate(50, -26);

      const w = 7.5; // Outer Width
      const h = 11; // Outer Height
      const thickness = 2.2;
      const radius = 3.5; // Outer corner radius

      ctx.fillStyle = colors.logoColor;

      // We use "even-odd" winding rule to create the hole
      ctx.beginPath();

      // Outer Path (Clockwise)
      ctx.roundRect(-w / 2, -h / 2, w, h, radius);

      // Inner Path (Counter-clockwise to cut out the center)
      const iw = w - thickness;
      const ih = h - thickness;
      const ir = radius - thickness / 2;
      ctx.roundRect(iw / 2, -ih / 2, -iw, ih, ir);

      ctx.fill("evenodd");
      ctx.restore();

      ctx.restore();
      requestAnimationFrame(animate);
    };

    animate();
  }

  function setupCyberCard() {
    const ctx = getCtx("card-cyber");
    if (!ctx) return;
    const size = 200;
    const center = size / 2;

    const colors = {
      body: "#0a0a0a", // Deep void black
      accent: "#eab308", // Your original gold
      text: "rgba(255, 255, 255, 0.7)",
      trace: "rgba(234, 179, 8, 0.2)", // Faint gold circuits
      glitch: "rgba(255, 255, 255, 0.1)",
    };

    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      const time = Date.now() * 0.002;

      // 1. Dynamic Tilt & Jitter
      // Subtle "digital jitter" added to the tilt
      const jitter = Math.random() > 0.98 ? Math.random() * 2 : 0;
      const tilt = Math.sin(time * 0.5) * 4 + jitter;

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate((tilt * Math.PI) / 180);

      const cardW = 125;
      const cardH = 78;

      // 2. Base Layer: The "Carbon" Body
      ctx.beginPath();
      ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, 4);
      ctx.fillStyle = colors.body;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.fill();
      ctx.shadowBlur = 0;

      // 3. Cyber-Grid Texture
      ctx.save();
      ctx.clip();
      ctx.strokeStyle = colors.trace;
      ctx.lineWidth = 0.3;
      for (let i = -cardW; i < cardW; i += 6) {
        ctx.beginPath();
        ctx.moveTo(i, -cardH);
        ctx.lineTo(i + 20, cardH); // Slanted grid lines
        ctx.stroke();
      }

      // 4. Animated Data "Scanline"
      const scanPos = ((time * 50) % (cardH + 60)) - (cardH / 2 + 30);
      ctx.fillStyle = "rgba(234, 179, 8, 0.05)";
      ctx.fillRect(-cardW / 2, scanPos, cardW, 2);
      ctx.restore();

      // 5. Hard Industrial Border
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1;
      ctx.setLineDash([30, 5, 10, 5]); // Broken "tech" line style
      ctx.lineDashOffset = -time * 10;
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // 6. The "Processor" Chip
      ctx.save();
      ctx.translate(-45, -15);
      // Outer glow for the chip
      ctx.shadowBlur = 10;
      ctx.shadowColor = colors.accent;
      ctx.fillStyle = colors.accent;
      ctx.fillRect(0, 0, 16, 12);

      // Internal chip detail
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(2, 2, 12, 8);
      ctx.restore();

      // 7. HUD / UI Elements
      ctx.fillStyle = colors.accent;
      ctx.font = "bold 5px monospace";
      ctx.fillText("CORP_ID: 882-X", 15, -25);

      // Bottom "Loading" Bar
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.strokeRect(15, 25, 40, 4);
      const progress = (Math.sin(time) * 0.5 + 0.5) * 40;
      ctx.fillRect(15, 25, progress, 4);

      ctx.restore();
      requestAnimationFrame(animate);
    };

    animate();
  }

  function setupCard() {
    const ctx = getCtx("card");
    if (!ctx) return;
    const size = 200;
    const center = size / 2;

    const colors = {
      bodyStart: "#1a1a1a",
      bodyEnd: "#000000",
      metalLight: "#ffffff",
      metalMid: "#71717a",
      metalDark: "#27272a",
      chipGold: "#eab308",
      glow: "rgba(255, 255, 255, 0.12)",
    };

    const cardPath = (w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, r);
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      const time = Date.now() * 0.002;

      const tilt = Math.sin(time * 0.5) * 5;
      const pulse = 1 + 0.01 * Math.sin(time);

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate((tilt * Math.PI) / 180);

      const cardW = 120 * pulse;
      const cardH = 76 * pulse;
      const radius = 8 * pulse;

      ctx.shadowBlur = 25;
      ctx.shadowColor = colors.glow;

      cardPath(cardW, cardH, radius);
      const bodyGrad = ctx.createLinearGradient(
        -cardW / 2,
        -cardH / 2,
        cardW / 2,
        cardH / 2,
      );
      bodyGrad.addColorStop(0, colors.bodyStart);
      bodyGrad.addColorStop(1, colors.bodyEnd);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      ctx.shadowBlur = 0;

      const rimGrad = ctx.createLinearGradient(-cardW, -cardH, cardW, cardH);
      rimGrad.addColorStop(0, colors.metalLight);
      rimGrad.addColorStop(0.3, colors.metalDark);
      rimGrad.addColorStop(0.5, colors.metalMid);
      rimGrad.addColorStop(0.7, colors.metalDark);
      rimGrad.addColorStop(1, colors.metalLight);

      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 2.5;
      cardPath(cardW, cardH, radius);
      ctx.stroke();

      ctx.save();
      ctx.translate(-40 * pulse, -10 * pulse);
      const chipW = 18 * pulse;
      const chipH = 14 * pulse;
      ctx.beginPath();
      ctx.roundRect(0, 0, chipW, chipH, 2);
      const chipGrad = ctx.createLinearGradient(0, 0, chipW, chipH);
      chipGrad.addColorStop(0, "#fbbf24");
      chipGrad.addColorStop(0.5, "#b45309");
      chipGrad.addColorStop(1, "#f59e0b");
      ctx.fillStyle = chipGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(chipW * 0.2, 0, 0.1, chipH);
      ctx.strokeRect(chipW * 0.5, 0, 0.1, chipH);
      ctx.strokeRect(chipW * 0.8, 0, 0.1, chipH);
      ctx.restore();

      ctx.save();
      cardPath(cardW, cardH, radius);
      ctx.clip();
      const sweep = Math.tan(time * 0.4) * 150;
      const shineGrad = ctx.createLinearGradient(sweep, -50, sweep + 40, 50);
      shineGrad.addColorStop(0, "transparent");
      shineGrad.addColorStop(0.5, "rgba(255,255,255,0.15)");
      shineGrad.addColorStop(1, "transparent");
      ctx.fillStyle = shineGrad;
      ctx.fillRect(-100, -100, 200, 200);
      ctx.restore();

      ctx.fillStyle = "rgba(255,255,255,0.2)";
      for (let i = 0; i < 4; i++) {
        ctx.fillText("....", -40 + i * 22, 25);
      }

      ctx.restore();
      requestAnimationFrame(animate);
    };

    animate();
  }

  function setupNeuralNet() {
    const ctx = getCtx("neural-net");
    if (!ctx) return;

    const size = 180;
    const dots = Array.from({ length: 28 }, () => ({
      x: Math.random() * size,
      y: Math.random() * size,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      ctx.lineWidth = 0.8;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0 || d.x > size) d.vx *= -1;
        if (d.y < 0 || d.y > size) d.vy *= -1;

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < dots.length; j++) {
          const d2 = dots[j];
          const dist = Math.hypot(d.x - d2.x, d.y - d2.y);

          if (dist < 60) {
            const opacity = 1 - dist / 60;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;

            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };

    animate();
  }

  function setupQuantumCloud() {
    const ctx = getCtx("quantum-cloud");
    if (!ctx) return;

    let time = 0;
    const size = 180;
    const center = size / 2;

    const blobs = [
      { r: 45, speed: 0.005, phase: 0, color: "rgba(255, 255, 255, 0.4)" },
      { r: 55, speed: 0.007, phase: 2, color: "rgba(200, 230, 255, 0.3)" },
      { r: 40, speed: 0.004, phase: 4, color: "rgba(255, 255, 255, 0.5)" },
    ];

    const animate = () => {
      time += 0.01;

      ctx.clearRect(0, 0, size, size);

      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI * 2) / 6 + time * 0.5;

        const offset = Math.sin(time + i) * 15;
        const x = center + Math.cos(angle) * (20 + offset);
        const y = center + Math.sin(angle * 0.8) * (15 + offset);

        const gradientSize = 50 + Math.sin(time + i) * 10;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, gradientSize);

        grad.addColorStop(0, "rgba(255, 255, 255, 0.7)");
        grad.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, gradientSize, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  onMount(() => {
    animations.forEach((a) => a.setup());
  });
</script>

<h1>Bizare</h1>

<div class="container">
  {#each animations as anim}
    <div class="animation-container">
      <div class="corner top-left">
        <svg viewBox="0 0 512 512"
          ><polygon
            points="448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288"
            fill="currentColor"
          /></svg
        >
      </div>
      <div class="corner top-right">
        <svg viewBox="0 0 512 512"
          ><polygon
            points="448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288"
            fill="currentColor"
          /></svg
        >
      </div>
      <div class="corner bottom-left">
        <svg viewBox="0 0 512 512"
          ><polygon
            points="448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288"
            fill="currentColor"
          /></svg
        >
      </div>
      <div class="corner bottom-right">
        <svg viewBox="0 0 512 512"
          ><polygon
            points="448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288"
            fill="currentColor"
          /></svg
        >
      </div>

      <div class="animation-title">{anim.title}</div>
      <div id="canvas-{anim.id}" class="circle-container"></div>
    </div>
  {/each}
</div>

<style>
  :global(body) {
    background: #000;
    color: white;
    font-family: "Courier New", monospace;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    margin: 0;
    overflow-x: hidden;
  }

  h1 {
    margin-bottom: 30px;
    font-size: 1rem;
    letter-spacing: 4px;
    text-align: center;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.8);
  }

  .container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 1100px;
    justify-items: center;
  }

  @media (min-width: 480px) {
    .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 768px) {
    .container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 1024px) {
    .container {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .animation-container {
    position: relative;
    width: 100%;
    max-width: 240px;
    aspect-ratio: 1 / 1;
    background: #000;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition:
      background 0.3s ease,
      border-color 0.3s ease;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .circle-container {
    width: 180px;
    height: 180px;
    max-width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }

  @media (hover: hover) {
    .animation-container:hover {
      border-color: rgba(255, 255, 255, 0.4);
      background: rgba(255, 255, 255, 0.05);
    }
    .animation-container:hover .top-left {
      top: -8px;
      left: -8px;
      opacity: 1;
    }
    .animation-container:hover .top-right {
      top: -8px;
      right: -8px;
      opacity: 1;
    }
    .animation-container:hover .bottom-left {
      bottom: -8px;
      left: -8px;
      opacity: 1;
    }
    .animation-container:hover .bottom-right {
      bottom: -8px;
      right: -8px;
      opacity: 1;
    }
    .animation-container:hover .animation-title {
      opacity: 1;
    }
  }

  .animation-title {
    position: absolute;
    top: 15px;
    width: 100%;
    text-align: center;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: white;
    font-weight: bold;
    opacity: 0.4;
    transition: opacity 0.3s ease;
  }

  .corner {
    position: absolute;
    width: 14px;
    height: 14px;
    color: #fff;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .top-left {
    top: 5px;
    left: 5px;
  }
  .top-right {
    top: 5px;
    right: 5px;
    transform: rotate(90deg);
  }
  .bottom-left {
    bottom: 5px;
    left: 5px;
    transform: rotate(-90deg);
  }
  .bottom-right {
    bottom: 5px;
    right: 5px;
    transform: rotate(180deg);
  }
</style>
