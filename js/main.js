/**
 * AHMED MOHAMED FAROUK - PORTFOLIO CORE JAVASCRIPT
 * Award-Winning Creative Technology & High-Performance Mouse Physics Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. PRELOADER REVEAL
  // ------------------------------------------------------------------------
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("fade-out");
        setTimeout(() => {
          preloader.style.display = "none";
        }, 900);
      }, 900);
    });
  }

  // ------------------------------------------------------------------------
  // 2. FINE POINTER / TOUCH DEVICE DETECTION
  // ------------------------------------------------------------------------
  const finePointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
  let isFinePointer = finePointerMedia.matches;

  finePointerMedia.addEventListener("change", (e) => {
    isFinePointer = e.matches;
    if (!isFinePointer) {
      if (cursorDot) cursorDot.style.display = "none";
      if (cursorRing) cursorRing.style.display = "none";
      document.body.classList.remove("cursor-hover");
      // Reset card transforms
      document.querySelectorAll(".tilt-card").forEach((c) => {
        c.style.transform = "none";
      });
      // Reset button transforms
      document.querySelectorAll(".magnetic-btn, .social-circle").forEach((b) => {
        b.style.transform = "none";
      });
    } else {
      if (cursorDot) cursorDot.style.display = "block";
      if (cursorRing) cursorRing.style.display = "block";
    }
  });

  // ------------------------------------------------------------------------
  // 3. MOUSE PHYSICS: DUAL-LAYER TRAILING CURSOR (DESKTOP ONLY)
  // ------------------------------------------------------------------------
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");
  const ambientTorch = document.getElementById("ambient-torch");

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isMoving = false;

  if (isFinePointer) {
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;

      // Instant dot movement
      if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      }

      // Ambient torch following
      if (ambientTorch) {
        ambientTorch.style.left = `${mouseX}px`;
        ambientTorch.style.top = `${mouseY}px`;
      }
    });

    // Smooth lerp loop for outer trailing ring (60fps buttery spring physics)
    const renderCursor = () => {
      if (cursorRing && isMoving && isFinePointer) {
        const lerpFactor = 0.18;
        ringX += (mouseX - ringX) * lerpFactor;
        ringY += (mouseY - ringY) * lerpFactor;

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
      }
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Hover expansion on interactive elements
    const interactiveTargets = "a, button, input, textarea, .tilt-card, .filter-btn, .magnetic-btn, .social-circle, .t-tab";
    document.addEventListener("mouseover", (e) => {
      if (isFinePointer && e.target.closest(interactiveTargets)) {
        document.body.classList.add("cursor-hover");
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (isFinePointer && e.target.closest(interactiveTargets)) {
        document.body.classList.remove("cursor-hover");
      }
    });

    // ------------------------------------------------------------------------
    // 4. MOUSE PHYSICS: DYNAMIC BORDER SPOTLIGHT & 3D TILT CARDS
    // ------------------------------------------------------------------------
    const tiltCards = document.querySelectorAll(".tilt-card");
    const tiltIntensity = 12; // degrees

    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        if (!isFinePointer) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Dynamic coordinate border spotlight update
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        // 3D Tilt calculation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
        const rotateY = ((x - centerX) / centerX) * tiltIntensity;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      });

      card.addEventListener("mouseleave", () => {
        if (!isFinePointer) return;
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });
    });

    // ------------------------------------------------------------------------
    // 5. MOUSE PHYSICS: MAGNETIC BUTTONS
    // ------------------------------------------------------------------------
    const magneticButtons = document.querySelectorAll(".magnetic-btn, .social-circle");

    magneticButtons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        if (!isFinePointer) return;
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - btnCenterX;
        const deltaY = e.clientY - btnCenterY;

        const pullForce = 0.32;
        btn.style.transform = `translate(${deltaX * pullForce}px, ${deltaY * pullForce}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        if (!isFinePointer) return;
        btn.style.transform = "translate(0px, 0px)";
      });
    });
  }

  // ------------------------------------------------------------------------
  // 6. MOBILE NAVIGATION DRAWER
  // ------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");
  const drawerBackdrop = document.getElementById("mobile-drawer-backdrop");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link, .mobile-cta-btn");

  const openDrawer = () => {
    mobileDrawer?.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    mobileDrawer?.classList.remove("active");
    document.body.style.overflow = "";
  };

  hamburgerBtn?.addEventListener("click", openDrawer);
  drawerCloseBtn?.addEventListener("click", closeDrawer);
  drawerBackdrop?.addEventListener("click", closeDrawer);

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  // ------------------------------------------------------------------------
  // 7. NAVBAR SCROLL EFFECT
  // ------------------------------------------------------------------------
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  // ------------------------------------------------------------------------
  // 6. INTERACTIVE TECH TERMINAL (CARD 2)
  // ------------------------------------------------------------------------
  const termTabs = document.querySelectorAll(".t-tab");
  const termOutput = document.getElementById("terminal-output");
  const termInput = document.getElementById("terminal-input");

  const mernArchitectureText = `
<div class="terminal-line"><span class="terminal-prompt">></span> <span class="terminal-accent">inspect --stack=MERN</span></div>
<div class="terminal-line"><span class="terminal-json-key">Client:</span> React.js 18 (Hooks, Suspense, Zustand State Engine)</div>
<div class="terminal-line"><span class="terminal-json-key">Server:</span> Node.js v20.x + Express.js High-Throughput REST Gateway</div>
<div class="terminal-line"><span class="terminal-json-key">Database:</span> MongoDB 7.0 (Mongoose Aggregation Pipelines & B-Tree Indexing)</div>
<div class="terminal-line"><span class="terminal-json-key">Auth & Cache:</span> Stateless JWT Token Refresh + Redis Micro-caching</div>
<div class="terminal-line"><span class="terminal-success">✔ Status: 100% Operational & Production-Ready</span></div>
`;

  const meanArchitectureText = `
<div class="terminal-line"><span class="terminal-prompt">></span> <span class="terminal-accent">inspect --stack=MEAN</span></div>
<div class="terminal-line"><span class="terminal-json-key">Client:</span> Angular 17+ (Signals, NgRx, RxJS Reactive Observables)</div>
<div class="terminal-line"><span class="terminal-json-key">Server:</span> Node.js Enterprise Distributed Runtime + Express Routers</div>
<div class="terminal-line"><span class="terminal-json-key">Database:</span> MongoDB Enterprise with Schema Invariants</div>
<div class="terminal-line"><span class="terminal-json-key">Architecture:</span> Clean Architecture, Dependency Injection & TypeScript Strict</div>
<div class="terminal-line"><span class="terminal-success">✔ Status: 100% Operational & Scalable</span></div>
`;

  termTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      termTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const stack = tab.dataset.stack;
      if (termOutput) {
        if (stack === "mern") {
          termOutput.innerHTML = mernArchitectureText;
        } else {
          termOutput.innerHTML = meanArchitectureText;
        }
      }
    });
  });

  // Terminal Command Line Processor
  if (termInput && termOutput) {
    termInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = termInput.value.trim().toLowerCase();
        termInput.value = "";

        const cmdRow = document.createElement("div");
        cmdRow.className = "terminal-line";
        cmdRow.innerHTML = `<span class="terminal-prompt">$</span> ${cmd}`;
        termOutput.appendChild(cmdRow);

        const responseRow = document.createElement("div");
        responseRow.className = "terminal-line";

        switch (cmd) {
          case "help":
            responseRow.innerHTML = `<span class="terminal-accent">Available commands:</span> help, stack, bench, ping, whoami, clear, contact`;
            break;
          case "stack":
            responseRow.innerHTML = `<span class="terminal-json-key">Stacks:</span> MERN (React, Node, Express, Mongo) | MEAN (Angular, Node, Express, Mongo)`;
            break;
          case "bench":
          case "benchmark":
            responseRow.innerHTML = `<span class="terminal-success">⚡ Latency: 38ms | Throughput: 12,400 req/sec | Error Rate: 0.00%</span>`;
            break;
          case "ping":
            responseRow.innerHTML = `<span class="terminal-success">64 bytes from api.ahmedfarouk.dev: icmp_seq=1 ttl=116 time=28.4 ms</span>`;
            break;
          case "whoami":
            responseRow.innerHTML = `Ahmed Mohamed Farouk — Full-Stack Engineer (MERN & MEAN Specialist)`;
            break;
          case "contact":
            responseRow.innerHTML = `Email: <a href="mailto:ahmedmohammedfarouq@gmail.com" style="color:#38bdf8;text-decoration:underline;">ahmedmohammedfarouq@gmail.com</a>`;
            break;
          case "clear":
            termOutput.innerHTML = "";
            return;
          default:
            responseRow.innerHTML = `<span style="color:#ef4444;">command not found: "${cmd}". Type 'help' for available commands.</span>`;
            break;
        }

        termOutput.appendChild(responseRow);
        termOutput.scrollTop = termOutput.scrollHeight;
      }
    });
  }

  // ------------------------------------------------------------------------
  // 7. REAL-TIME COUNTERS (CARD 3) ON SCROLL
  // ------------------------------------------------------------------------
  const counters = document.querySelectorAll(".counter-val");
  let animatedCounters = false;

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute("data-target"));
      const isDecimal = counter.getAttribute("data-decimal") === "true";
      const prefix = counter.getAttribute("data-prefix") || "";
      const suffix = counter.getAttribute("data-suffix") || "";

      let current = 0;
      const duration = 1600; // ms
      const startTime = performance.now();

      const step = (timestamp) => {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        current = easeOut * target;

        if (isDecimal) {
          counter.textContent = `${prefix}${current.toFixed(2)}${suffix}`;
        } else {
          counter.textContent = `${prefix}${Math.floor(current)}${suffix}`;
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = `${prefix}${target}${suffix}`;
        }
      };

      requestAnimationFrame(step);
    });
  };

  const metricsCard = document.querySelector(".bento-card-metrics");
  if (metricsCard) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedCounters) {
            animateCounters();
            animatedCounters = true;
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(metricsCard);
  }

  // ------------------------------------------------------------------------
  // 8. SIMULATED GITHUB HEATMAP (CARD 4 & MOBILE PULSE)
  // ------------------------------------------------------------------------
  const heatmapContainers = document.querySelectorAll(".github-heatmap");
  if (heatmapContainers.length > 0) {
    heatmapContainers.forEach((container) => {
      container.innerHTML = "";
      const totalCells = 104; // 26 cols * 4 rows
      for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement("div");
        cell.className = "heat-cell";
        // Deterministic pseudo-randomness for realistic git activity pattern
        const rand = (Math.sin(i * 99) + 1) / 2;
        if (rand > 0.85) {
          cell.classList.add("heat-4");
        } else if (rand > 0.6) {
          cell.classList.add("heat-3");
        } else if (rand > 0.35) {
          cell.classList.add("heat-2");
        } else if (rand > 0.15) {
          cell.classList.add("heat-1");
        }
        container.appendChild(cell);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 9. FULL-STACK PROJECTS ECOSYSTEM (12+ REAL PROJECTS)
  // ------------------------------------------------------------------------
  const projectsData = [
    {
      id: 1,
      title: "Linked-Posts Full-Stack Social App",
      desc: "Architected a responsive social network featuring JWT authentication, real-time message exchange, MongoDB post feed, dynamic likes, and comment threads.",
      tech: ["Angular", "Node.js", "Express", "MongoDB", "NgRx", "Tailwind"],
      category: "mean",
      img: "./images/postLink.png",
      liveLink: "",
      githubLink: "https://github.com/AhmedMohammeFarouq",
    },
    {
      id: 2,
      title: "FreshCart E-Commerce Platform",
      desc: "Full-scale enterprise commerce system with multi-tier product catalog, shopping cart state management, checkout payments, and multi-language support.",
      tech: ["Angular", "NaRx", "Node APIs", "Flowbite", "Tailwind"],
      category: "mean",
      img: "./images/E-commer.png",
      liveLink: "https://freshcart-alpha-peach.vercel.app/",
      githubLink: "https://github.com/AhmedMohammeFarouq/freshcart.git",
    },
    {
      id: 3,
      title: "Movies Stream & Discovery Engine",
      desc: "High-performance entertainment discovery engine with real-time external API streams, dynamic search indexing, and category filtering.",
      tech: ["Angular", "JavaScript", "REST APIs", "Bootstrap 5"],
      category: "mean",
      img: "./images/Movies.png",
      liveLink: "https://movies-one-lyart.vercel.app/",
      githubLink: "https://github.com/AhmedMohammeFarouq/movies",
    },
    {
      id: 4,
      title: "Yummy Food Recipes Web App",
      desc: "Dynamic culinary web application consuming recipe APIs with faceted search by ingredients, areas, and meal categories.",
      tech: ["JavaScript", "REST APIs", "HTML5", "CSS3", "Bootstrap"],
      category: "backend",
      img: "./images/Yumm.png",
      liveLink: "https://ahmedmohammefarouq.github.io/yummy-project/",
      githubLink: "https://github.com/AhmedMohammeFarouq/yummy-project.git",
    },
    {
      id: 5,
      title: "Store Management System (Inventory CRUD)",
      desc: "Robust product inventory manager with full CRUD cycles, dynamic keyword search, image management, and category sorting.",
      tech: ["JavaScript", "CRUD Architecture", "HTML5", "CSS3"],
      category: "backend",
      img: "./images/SM.png",
      liveLink: "https://ahmedmohammefarouq.github.io/Store-Mangament-System/",
      githubLink: "https://github.com/AhmedMohammeFarouq/Store-Mangament-System.git",
    },
    {
      id: 6,
      title: "Simply Recipes Platform",
      desc: "Structured culinary documentation system with semantic layout, intuitive navigation pathways, and lightweight asset loading.",
      tech: ["HTML5", "CSS3", "JavaScript", "Clean UI"],
      category: "ui",
      img: "./images/Recipes.png",
      liveLink: "https://ahmedmohammefarouq.github.io/simply-Recipes/",
      githubLink: "https://github.com/AhmedMohammeFarouq/simply-Recipes.git",
    },
    {
      id: 7,
      title: "Queueing Theory Computer Science Simulation",
      desc: "Interactive mathematical algorithm visualizer demonstrating M/M/1 and M/M/c queuing models, wait times, and server utilization curves.",
      tech: ["JavaScript", "CS Algorithms", "Canvas/DOM", "CSS3"],
      category: "backend",
      img: "./images/qu.png",
      liveLink: "https://ahmedmohammefarouq.github.io/Queueing-Theory/",
      githubLink: "https://github.com/AhmedMohammeFarouq/Queueing-Theory.git",
    },
    {
      id: 8,
      title: "DevFolio Professional Portfolio",
      desc: "Clean developer portfolio emphasizing high readability, modular component structure, and smooth mobile responsiveness.",
      tech: ["HTML5", "CSS3", "JavaScript"],
      category: "ui",
      img: "./images/DevFolio.png",
      liveLink: "https://dev-folio-ashen.vercel.app/",
      githubLink: "https://github.com/AhmedMohammeFarouq/DevFolio.git",
    },
    {
      id: 9,
      title: "Daniels Corporate Showcase",
      desc: "Corporate business portal showcasing service grids, team profiles, and testimonial carousels with responsive layout.",
      tech: ["Bootstrap", "JavaScript", "HTML5", "CSS3"],
      category: "ui",
      img: "./images/Daniels.png",
      liveLink: "https://daniels-project-six.vercel.app/",
      githubLink: "https://github.com/AhmedMohammeFarouq/Daniels-Project.git",
    },
    {
      id: 10,
      title: "Bookmark Social Interaction Hub",
      desc: "Interactive social utility application featuring user authentication flows, post publishing, and interactive bookmarking.",
      tech: ["JavaScript", "HTML5", "CSS3", "Local State"],
      category: "mern",
      img: "./images/Bookmark.png",
      liveLink: "https://ahmedmohammefarouq.github.io/Bookmark/",
      githubLink: "https://github.com/AhmedMohammeFarouq/Bookmark.git",
    },
    {
      id: 11,
      title: "Bakery Food Ordering Platform",
      desc: "Online ordering digital menu with product selection, cart totals calculation, and streamlined order submission.",
      tech: ["JavaScript", "CSS3", "HTML5", "E-Commerce"],
      category: "ui",
      img: "./images/Bakery.png",
      liveLink: "https://bakery-six-beta.vercel.app/",
      githubLink: "https://github.com/AhmedMohammeFarouq/Bakery.git",
    },
    {
      id: 12,
      title: "Dynamic Quote Generator & API Consumer",
      desc: "Real-time asynchronous API consumer generating inspirational quotes with clipboard copying and dynamic UI state changes.",
      tech: ["JavaScript", "Fetch API", "Bootstrap", "HTML5"],
      category: "backend",
      img: "./images/Random-Quote.png",
      liveLink: "https://ahmedmohammefarouq.github.io/Random-Quote/",
      githubLink: "https://github.com/AhmedMohammeFarouq/Random-Quote.git",
    }
  ];

  const projectsGrid = document.getElementById("projects-grid");

  const renderProjects = () => {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = "";

    projectsData.forEach((project) => {
      const card = document.createElement("div");
      card.className = `project-card tilt-card w-full bg-white/[0.025] border border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col justify-between ${project.category}`;
      card.dataset.category = project.category;

      const liveUrl = project.liveLink || project.githubLink;
      const liveBtn = `<a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn text-xs font-semibold py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors text-center w-full bg-[#38bdf8]/10 hover:bg-[#38bdf8] text-[#38bdf8] hover:text-[#08080c] border border-[#38bdf8]/30"><i class="ph-bold ph-arrow-square-out"></i> Live Demo</a>`;
      const githubBtn = `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="project-link-btn text-xs font-semibold py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors text-center w-full bg-white/[0.04] hover:bg-white/10 text-slate-200 border border-white/10"><i class="ph-bold ph-github-logo"></i> GitHub</a>`;

      const categoryBadge = project.category.toUpperCase();
      const badgeColorClass = project.category === "mean" ? "badge-mean" : (project.category === "mern" ? "badge-mern" : "badge-general");

      card.innerHTML = `
        <div class="tilt-card-inner flex flex-col justify-between h-full">
          <div>
            <div class="project-thumb-wrap w-full aspect-video rounded-xl overflow-hidden mb-4 bg-black/40 relative">
              <img src="${project.img}" alt="${project.title}" class="w-full h-full object-cover" loading="lazy" />
              <div class="project-overlay absolute inset-0 bg-black/75 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                ${liveBtn}
                ${githubBtn}
              </div>
            </div>
            <div class="project-card-header mb-3">
              <div class="project-title-row flex items-start justify-between gap-2 mb-2">
                <h3 class="text-base sm:text-lg font-bold text-white leading-snug">${project.title}</h3>
                <span class="project-stack-badge ${badgeColorClass} text-[10px] uppercase font-mono px-2 py-0.5 rounded">${categoryBadge}</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">${project.desc}</p>
            </div>
          </div>
          <div>
            <div class="project-tech-chips flex flex-wrap gap-1.5 mb-3">
              ${project.tech.map((t) => `<span class="tech-chip text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">${t}</span>`).join("")}
            </div>
            <div class="project-footer-links grid grid-cols-2 gap-2 pt-3 border-t border-white/[0.08] w-full">
              ${liveBtn}
              ${githubBtn}
            </div>
          </div>
        </div>
      `;

      // Re-attach mouse coordinate tracking and 3D tilt (desktop fine pointer only)
      card.addEventListener("mousemove", (e) => {
        if (!isFinePointer) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
        const rotateY = ((x - centerX) / centerX) * tiltIntensity;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener("mouseleave", () => {
        if (!isFinePointer) return;
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });

      projectsGrid.appendChild(card);
    });
  };

  renderProjects();

  // Project Category Filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      const cards = document.querySelectorAll(".project-card");

      cards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("hide");
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.9)";
          setTimeout(() => {
            card.classList.add("hide");
          }, 250);
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 10. CERTIFICATES & LIGHTBOX MODAL
  // ------------------------------------------------------------------------
  const certsData = [
    {
      title: "Front-End Development (Angular Enterprise Architecture)",
      issuer: "Route IT Training Center",
      date: "March 2026",
      image: "./images/AngularWithRoute.png",
    },
    {
      title: "Front-End Development (React Ecosystem)",
      issuer: "Pioneers of Digital Egypt (DEPI)",
      date: "02 Aug 2025 – 06 Sep 2025",
      image: "./images/React2.png",
    },
    {
      title: "Professional Front-End Engineering",
      issuer: "New Horizons",
      date: "June 2024 - July 2025",
      image: "./images/NewHorizons.jpg",
    },
    {
      title: "Business English Certificate",
      issuer: "Berlitz Training Center",
      date: "June 2025 - July 2025",
      image: "./images/Berlitz.png",
    },
    {
      title: "English Language Proficiency",
      issuer: "Berlitz Training Center",
      date: "June 2023 - July 2024",
      image: "./images/CertificatefromBerlitz.jpg",
    },
  ];

  const certsGrid = document.getElementById("certificates-grid");
  const certModal = document.getElementById("certModal");
  const modalImg = document.getElementById("cert-modal-img");
  const modalTitle = document.getElementById("cert-modal-title");
  const modalIssuer = document.getElementById("cert-modal-issuer");
  const modalDate = document.getElementById("cert-modal-date");

  if (certsGrid) {
    certsData.forEach((cert, idx) => {
      const card = document.createElement("div");
      card.className = "cert-card tilt-card bg-white/[0.025] border border-white/[0.08] rounded-2xl p-4 sm:p-5 w-full cursor-pointer hover:border-white/20 transition-all";
      card.innerHTML = `
        <div class="tilt-card-inner flex flex-col justify-between h-full">
          <div class="cert-img-wrap w-full aspect-video rounded-xl overflow-hidden bg-black relative mb-3">
            <img src="${cert.image}" alt="${cert.title}" class="w-full h-full object-cover" loading="lazy" />
            <div class="cert-zoom-icon absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white"><i class="ph-bold ph-arrows-out-simple"></i></div>
          </div>
          <div class="cert-info">
            <h3 class="cert-title text-base font-bold text-white mb-1 leading-snug">${cert.title}</h3>
            <h4 class="cert-issuer text-xs text-[#38bdf8] font-mono mb-1">${cert.issuer}</h4>
            <span class="cert-date text-[11px] text-slate-400 font-mono">${cert.date}</span>
          </div>
        </div>
      `;

      // 3D Tilt (desktop fine pointer only)
      card.addEventListener("mousemove", (e) => {
        if (!isFinePointer) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener("mouseleave", () => {
        if (!isFinePointer) return;
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });

      card.addEventListener("click", () => openCertModal(idx));
      certsGrid.appendChild(card);
    });
  }

  window.openCertModal = (idx) => {
    const cert = certsData[idx];
    if (!cert || !certModal) return;
    modalImg.src = cert.image;
    modalTitle.textContent = cert.title;
    modalIssuer.textContent = cert.issuer;
    modalDate.textContent = cert.date;
    certModal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  window.closeCertModal = () => {
    if (!certModal) return;
    certModal.classList.remove("active");
    document.body.style.overflow = "";
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCertModal();
  });

  // ------------------------------------------------------------------------
  // 11. REAL-TIME CSS VARIABLE HUD TUNER
  // ------------------------------------------------------------------------
  const colorPills = document.querySelectorAll(".hud-color-pill");
  colorPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      colorPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      const color = pill.dataset.color;
      const root = document.documentElement;

      if (color === "cyan") {
        root.style.setProperty("--spotlight-color", "rgba(56, 189, 248, 0.16)");
        root.style.setProperty("--spotlight-border", "rgba(56, 189, 248, 0.5)");
        root.style.setProperty("--primary", "#38bdf8");
      } else if (color === "purple") {
        root.style.setProperty("--spotlight-color", "rgba(168, 85, 247, 0.18)");
        root.style.setProperty("--spotlight-border", "rgba(168, 85, 247, 0.55)");
        root.style.setProperty("--primary", "#a855f7");
      } else if (color === "emerald") {
        root.style.setProperty("--spotlight-color", "rgba(16, 185, 129, 0.18)");
        root.style.setProperty("--spotlight-border", "rgba(16, 185, 129, 0.55)");
        root.style.setProperty("--primary", "#10b981");
      } else if (color === "amber") {
        root.style.setProperty("--spotlight-color", "rgba(245, 158, 11, 0.18)");
        root.style.setProperty("--spotlight-border", "rgba(245, 158, 11, 0.55)");
        root.style.setProperty("--primary", "#f59e0b");
      }
    });
  });

  // ------------------------------------------------------------------------
  // 12. LYRO AI CHAT WIDGET
  // ------------------------------------------------------------------------
  const chatToggleBtn = document.getElementById("chat-toggle-btn");
  const chatWindow = document.getElementById("chat-window");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatBody = document.getElementById("chat-body");
  const chatCloseHeader = document.getElementById("chat-close-header");

  const toggleChat = () => {
    chatWindow?.classList.toggle("active");
  };

  chatToggleBtn?.addEventListener("click", toggleChat);
  chatCloseHeader?.addEventListener("click", toggleChat);

  if (chatForm && chatInput && chatBody) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const userText = chatInput.value.trim();
      if (!userText) return;

      const userBubble = document.createElement("div");
      userBubble.className = "chat-message user-message";
      userBubble.textContent = userText;
      chatBody.appendChild(userBubble);
      chatInput.value = "";
      chatBody.scrollTop = chatBody.scrollHeight;

      // Simulated Intelligent Response
      setTimeout(() => {
        const agentBubble = document.createElement("div");
        agentBubble.className = "chat-message agent-message";
        agentBubble.innerHTML = `Thanks for reaching out! Ahmed specializes in building high-scale MERN and MEAN applications. You can reach him directly at <a href="mailto:ahmedmohammedfarouq@gmail.com" style="color:#38bdf8;text-decoration:underline;">ahmedmohammedfarouq@gmail.com</a>.`;
        chatBody.appendChild(agentBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 700);
    });
  }
});
