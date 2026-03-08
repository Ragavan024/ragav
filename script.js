/* ============================================
   RAGAVAN.S PORTFOLIO - SCRIPT.JS
   Three.js 3D, Particles, Typed Text, Themes
   ============================================*/

// ─── REALISTIC COMPUTER LOADER ───
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const loaderRoom = document.querySelector('.loader-room');
  const osProgressBar = document.getElementById('osProgressBar');
  const osStatus = document.getElementById('osStatus');

  const statusMsgs = [
    'Booting System...',
    'Loading Kernel...',
    'Mounting File Systems...',
    'Initializing Graphics...',
    'Starting UI Environment...',
    'Welcome RAGAVAN.S'
  ];

  let progress = 0;

  const interval = setInterval(() => {
    // Slower progress for realism
    progress += Math.random() * 4;

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      osProgressBar.style.width = '100%';
      osStatus.textContent = 'System Ready.';

      // The Zoom-In Transition
      setTimeout(() => {
        // Add class to scale the room massively
        loaderRoom.classList.add('zoom-in');

        // Wait for the scale animation to cover the screen, then hide loader
        setTimeout(() => {
          loader.classList.add('hidden');
          initAll(); // Start the actual portfolio site

          // Completely remove from DOM after fade out to prevent lag/stuck issues
          setTimeout(() => {
            if (loader.parentNode) {
              loader.parentNode.removeChild(loader);
            }
          }, 1500);
        }, 1500); // Increased slightly to match new CSS transition time
      }, 500); // Brief pause at 100%

    } else {
      osProgressBar.style.width = progress + '%';

      const msgIdx = Math.min(Math.floor((progress / 100) * statusMsgs.length), statusMsgs.length - 1);
      osStatus.textContent = statusMsgs[msgIdx];
    }
  }, 100);
});

function initAll() {
  initCursor();
  initNavbar();
  initTypedText();
  initHeroParticles();
  initThreeHeroGlobe();
  initProjectCanvas();
  initSkillSphere();
  initScrollAnimations();
  initSkillBars();
  initThemeSwitcher();
  initContactForm();
  initHamburger();
  initSectionActiveLink();
}

// ─── CUSTOM CURSOR ───
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .project-card, .contact-card, .skill-category, .edu-card, .info-item, .social-link').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

// ─── NAVBAR ───
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ─── TYPED TEXT ───
function initTypedText() {
  const texts = [
    'Diploma Final Year Student',
    'Aspiring B.Tech Engineer',
    'IoT Enthusiast',
    'Full Stack Learner',
    'Smart System Builder',
    'Future Innovator'
  ];
  const el = document.getElementById('typedText');
  let ti = 0, ci = 0, deleting = false;

  function type() {
    const cur = texts[ti];
    if (!deleting) {
      el.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = cur.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % texts.length;
      }
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  type();
}

// ─── HERO PARTICLE FIELD ───
function initHeroParticles() {
  const container = document.getElementById('heroParticles');
  const W = window.innerWidth;
  const H = window.innerHeight;

  for (let i = 0; i < 80; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const opacity = Math.random() * 0.5 + 0.1;
    const dur = Math.random() * 20 + 10;
    const x = Math.random() * W;
    const y = Math.random() * H;
    const delay = Math.random() * -20;

    p.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: ${Math.random() > 0.5 ? 'var(--accent)' : 'var(--accent2)'};
      left: ${x}px; top: ${y}px;
      opacity: ${opacity};
      animation: floatParticle ${dur}s ${delay}s infinite linear;
      pointer-events: none;
    `;
    container.appendChild(p);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0% { transform: translateY(0) translateX(0) scale(1); opacity: inherit; }
      33% { transform: translateY(-120px) translateX(40px) scale(1.2); }
      66% { transform: translateY(-60px) translateX(-30px) scale(0.9); }
      100% { transform: translateY(-200px) translateX(10px) scale(1); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ─── THREE.JS HERO GLOBE ───
function initThreeHeroGlobe() {
  const canvas = document.getElementById('threeCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const W = 420, H = 420;
  canvas.width = W; canvas.height = H;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
  camera.position.z = 3;

  // --- Wireframe Globe ---
  const sphGeo = new THREE.SphereGeometry(1, 32, 32);
  const sphMat = new THREE.MeshBasicMaterial({
    color: getComputedColor('--accent'),
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const globe = new THREE.Mesh(sphGeo, sphMat);
  scene.add(globe);

  // --- Core sphere ---
  const coreGeo = new THREE.SphereGeometry(0.7, 64, 64);
  const coreMat = new THREE.MeshPhongMaterial({
    color: 0x0a0a20,
    emissive: getComputedColor('--accent'),
    emissiveIntensity: 0.05,
    transparent: true,
    opacity: 0.9,
    shininess: 80
  });
  const coreSphere = new THREE.Mesh(coreGeo, coreMat);
  scene.add(coreSphere);

  // --- Glowing ring ---
  const ringGeo = new THREE.TorusGeometry(1.3, 0.015, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: getComputedColor('--accent2'), transparent: true, opacity: 0.6 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 4;
  scene.add(ring);

  const ring2Geo = new THREE.TorusGeometry(1.1, 0.01, 16, 100);
  const ring2 = new THREE.Mesh(ring2Geo, new THREE.MeshBasicMaterial({ color: getComputedColor('--accent'), transparent: true, opacity: 0.4 }));
  ring2.rotation.x = -Math.PI / 3;
  ring2.rotation.y = Math.PI / 6;
  scene.add(ring2);

  // --- Floating nodes ---
  const nodeGroup = new THREE.Group();
  const nodeMat = new THREE.MeshBasicMaterial({ color: getComputedColor('--accent'), transparent: true, opacity: 0.8 });
  const nodeGeo = new THREE.SphereGeometry(0.03, 8, 8);

  const nodePositions = [];
  for (let i = 0; i < 30; i++) {
    const phi = Math.acos(-1 + (2 * i) / 30);
    const theta = Math.sqrt(30 * Math.PI) * phi;
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi);
    const node = new THREE.Mesh(nodeGeo, nodeMat);
    node.position.set(x, y, z);
    nodeGroup.add(node);
    nodePositions.push(new THREE.Vector3(x, y, z));
  }

  // --- Lines between nodes ---
  nodePositions.forEach((a, i) => {
    nodePositions.forEach((b, j) => {
      if (j <= i) return;
      if (a.distanceTo(b) < 0.7) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([a, b]);
        const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: getComputedColor('--accent2'), transparent: true, opacity: 0.15 }));
        nodeGroup.add(line);
      }
    });
  });

  scene.add(nodeGroup);

  // --- Floating particles ---
  const partGeo = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 200; i++) {
    const r = 1.6 + Math.random() * 0.6;
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    positions.push(
      r * Math.sin(theta) * Math.cos(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(theta)
    );
  }
  partGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const partMat = new THREE.PointsMaterial({ color: getComputedColor('--accent'), size: 0.02, transparent: true, opacity: 0.5 });
  const particles = new THREE.Points(partGeo, partMat);
  scene.add(particles);

  // --- Lighting ---
  const ambLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambLight);
  const dirLight = new THREE.DirectionalLight(0x7c3aed, 2);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);
  const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 1.5);
  dirLight2.position.set(-5, -3, -3);
  scene.add(dirLight2);

  // --- Mouse interaction ---
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // --- Animation loop ---
  function animate() {
    requestAnimationFrame(animate);
    const t = Date.now() * 0.001;

    globe.rotation.y += 0.003;
    globe.rotation.x += 0.0008;
    nodeGroup.rotation.y += 0.004;
    nodeGroup.rotation.x = Math.sin(t * 0.3) * 0.2;
    particles.rotation.y -= 0.001;
    ring.rotation.z += 0.005;
    ring2.rotation.z -= 0.003;

    // Gentle camera drift based on mouse
    camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Pulse core
    const s = 1 + Math.sin(t * 2) * 0.03;
    coreSphere.scale.set(s, s, s);

    renderer.render(scene, camera);
  }
  animate();
}

// ─── THREE.JS PROJECT BACKGROUND ───
function initProjectCanvas() {
  const canvas = document.getElementById('projectsCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const W = window.innerWidth, H = canvas.parentElement.offsetHeight || 800;
  canvas.width = W; canvas.height = H;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(W, H);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
  camera.position.z = 5;

  // Grid of dots
  const geo = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 500; i++) {
    positions.push(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10
    );
  }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: getComputedColor('--accent'), size: 0.04, transparent: true, opacity: 0.7 });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  function animate() {
    requestAnimationFrame(animate);
    pts.rotation.y += 0.0005;
    pts.rotation.x += 0.0003;
    renderer.render(scene, camera);
  }
  animate();
}

// ─── THREE.JS SKILL SPHERE ───
function initSkillSphere() {
  const canvas = document.getElementById('skillSphere');
  if (!canvas || typeof THREE === 'undefined') return;

  const SIZE = Math.min(window.innerWidth * 0.5, 500);
  canvas.width = SIZE; canvas.height = SIZE;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(SIZE, SIZE);
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
  camera.position.z = 4;

  const skills = ['Python', 'HTML', 'CSS', 'JS', 'IoT', 'SQL', 'C/C++', 'Linux', 'Git', 'Arduino', 'Sensors', 'AI'];
  const group = new THREE.Group();

  // Create skill labels as 3D sprites (using canvas textures)
  skills.forEach((label, i) => {
    const phi = Math.acos(-1 + (2 * i) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    const r = 1.5;
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    // Tiny glowing dot
    const geo = new THREE.SphereGeometry(0.06, 12, 12);
    const mat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? getComputedColor('--accent') : getComputedColor('--accent2'),
      transparent: true, opacity: 0.9
    });
    const dot = new THREE.Mesh(geo, mat);
    dot.position.set(x, y, z);
    group.add(dot);

    // Pulsing sphere around dot
    const pulseGeo = new THREE.SphereGeometry(0.1, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? getComputedColor('--accent') : getComputedColor('--accent2'),
      transparent: true, opacity: 0.15, wireframe: true
    });
    const pulse = new THREE.Mesh(pulseGeo, pulseMat);
    pulse.position.set(x, y, z);
    group.add(pulse);
  });

  // Wireframe sphere container
  const sGeo = new THREE.SphereGeometry(1.5, 20, 20);
  const sMat = new THREE.MeshBasicMaterial({ color: getComputedColor('--accent'), wireframe: true, transparent: true, opacity: 0.08 });
  group.add(new THREE.Mesh(sGeo, sMat));

  // Inner glowing sphere
  const innerGeo = new THREE.SphereGeometry(0.4, 32, 32);
  const innerMat = new THREE.MeshBasicMaterial({ color: getComputedColor('--accent'), transparent: true, opacity: 0.1 });
  group.add(new THREE.Mesh(innerGeo, innerMat));

  scene.add(group);

  const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambLight);

  let autoRotateX = 0.004, autoRotateY = 0.006;

  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += autoRotateY;
    group.rotation.x += autoRotateX;
    renderer.render(scene, camera);
  }
  animate();

  // Mouse control
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / SIZE - 0.5;
    const y = (e.clientY - rect.top) / SIZE - 0.5;
    autoRotateX = y * 0.02;
    autoRotateY = x * 0.02;
  });
  canvas.addEventListener('mouseleave', () => {
    autoRotateX = 0.004;
    autoRotateY = 0.006;
  });
}

// ─── SCROLL ANIMATIONS ───
function initScrollAnimations() {
  const targets = document.querySelectorAll('.edu-item, .project-card, .skill-category, .contact-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), idx * 100);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  targets.forEach(el => observer.observe(el));
}

// ─── SKILL BARS ───
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => observer.observe(b));
}

// ─── THEME SWITCHER ───
function initThemeSwitcher() {
  const btns = document.querySelectorAll('.theme-btn');
  const html = document.documentElement;

  // Load saved theme
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(saved);

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      setTheme(theme);
      localStorage.setItem('portfolio-theme', theme);
    });
  });

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    btns.forEach(b => b.classList.toggle('active', b.getAttribute('data-theme') === theme));
  }
}

// ─── CONTACT FORM ───
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

    setTimeout(() => {
      success.classList.add('show');
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
      setTimeout(() => success.classList.remove('show'), 4000);
    }, 1500);
  });
}

// ─── HAMBURGER MENU ───
function initHamburger() {
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  let open = false;

  ham.addEventListener('click', () => {
    open = !open;
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    const spans = ham.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      open = false;
      menu.classList.remove('open');
      document.body.style.overflow = '';
      ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// ─── ACTIVE NAV LINK ───
function initSectionActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
  });
}

// ─── UTILITY: get CSS var computed as THREE color ───
function getComputedColor(varName) {
  const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  // Convert hex or named colors to THREE-compatible hex number
  if (val.startsWith('#')) return parseInt(val.replace('#', ''), 16);
  // Fallback colors
  const fallbacks = {
    '--accent': 0x7c3aed,
    '--accent2': 0x06b6d4,
    '--clr-1': 0x7c3aed,
    '--clr-2': 0x06b6d4
  };
  return fallbacks[varName] || 0x7c3aed;
}

// ─── HERO CANVAS BACKGROUND (Lines Grid) ───
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, mouse = { x: -999, y: -999 };
  const NODES = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    NODES.length = 0;
    for (let i = 0; i < 60; i++) {
      NODES.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 1
      });
    }
  }
  resize();
  window.addEventListener('resize', resize);

  document.getElementById('hero').addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function getAccentHex() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const map = {
      dark: '124,58,237',
      light: '109,40,217',
      cyber: '0,255,65',
      ocean: '0,149,255',
      forest: '34,197,94'
    };
    return map[theme] || '124,58,237';
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, W, H);
    const clr = getAccentHex();

    NODES.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      // Draw node
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${clr}, 0.6)`;
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < NODES.length; i++) {
      for (let j = i + 1; j < NODES.length; j++) {
        const dx = NODES[i].x - NODES[j].x;
        const dy = NODES[i].y - NODES[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const alpha = (1 - dist / 150) * 0.3;
          ctx.strokeStyle = `rgba(${clr}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(NODES[i].x, NODES[i].y);
          ctx.lineTo(NODES[j].x, NODES[j].y);
          ctx.stroke();
        }
      }

      // Mouse connections
      const mdx = NODES[i].x - mouse.x;
      const mdy = NODES[i].y - mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 200) {
        const alpha = (1 - mdist / 200) * 0.6;
        ctx.strokeStyle = `rgba(${clr}, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(NODES[i].x, NODES[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
  animate();
})();
