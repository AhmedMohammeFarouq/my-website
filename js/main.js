/**
 * Main JavaScript File
 * Controls animations, dynamic content, and interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 0. Preloader Reveal
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add("slide-up");
      }, 1200); // 1.2s minimum splash time for premium feel
    }
  });

  // 1. Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-links a");
  const navIcon = hamburger.querySelector("i");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("active");
    if (mobileMenu.classList.contains("active")) {
      navIcon.classList.remove("ph-list");
      navIcon.classList.add("ph-x");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      navIcon.classList.remove("ph-x");
      navIcon.classList.add("ph-list");
      document.body.style.overflow = "";
    }
  };

  hamburger.addEventListener("click", toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // 2. Navbar Scroll State
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 3. Typing Effect for Hero Title
  const typingText = document.querySelector(".typing-text");
  const phrases = [
    "Front-End Developer",
    "Angular Specialist",
    "UI Engineer",
    "Web Performance Expert",
    "Creative Coder",
  ];
  let phraseIndex = 0;
  let letterIndex = 0;
  let currentPhrase = "";
  let isDeleting = false;
  let typeSpeed = 100;

  const type = () => {
    const fullPhrase = phrases[phraseIndex];

    if (isDeleting) {
      currentPhrase = fullPhrase.substring(0, letterIndex - 1);
      letterIndex--;
      typeSpeed = 50; // Faster deleting
    } else {
      currentPhrase = fullPhrase.substring(0, letterIndex + 1);
      letterIndex++;
      typeSpeed = 100;
    }

    typingText.textContent = currentPhrase;

    if (!isDeleting && currentPhrase === fullPhrase) {
      typeSpeed = 2000; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && currentPhrase === "") {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before new phrase
    }

    setTimeout(type, typeSpeed);
  };

  // Wait a bit before animating the typing effect
  setTimeout(type, 1500);

  // 4. Projects Data (15 items) & Dynamic Injection
  const projects = [
    {
      id: 1,
      title: "Linked-Posts Social Media App",
      desc: "Built a responsive social platform with authentication, real-time chat, posts creation, likes, comments, sharing, and personalized recommendations.",
      tech: ["Angular", "NgRx", "Flowbite", "Tailwind"],
      category: "angular",
      img: "../images/postLink.png",
      liveLink: "",
      githubLink: "",
    },
    {
      id: 2,
      title: "FreshCart App ",
      desc: "Responsive Angular e-commerce app with authentication, cart, payment integration, multi-language support & API integration",
      tech: ["Angular", "NaRx", "Flowbite"],
      category: "angular",
      img: "../images/E-commer.png",
      liveLink: "https://freshcart-alpha-peach.vercel.app/",
      githubLink: "https://github.com/AhmedMohammeFarouq/freshcart.git",
    },
    {
      id: 3,
      title: "Yummy Food Recipes Web App ",
      desc: "API integration, search, filtering and dynamic recipe details Built a responsive app to explore meals by category, area, and ingredients with real-time data fetching.",
      tech: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "API"],
      category: "fullstack",
      img: "../images/Yumm.png",
      liveLink: "https://ahmedmohammefarouq.github.io/yummy-project/",
      githubLink: "https://github.com/AhmedMohammeFarouq/yummy-project.git",
    },
    {
      id: 4,
      title: "Movies Web App ",
      desc: "Movie search, details, and recommendations. Built a responsive app to explore movies by category, search for titles, and view detailed information with real-time API integration.",
      tech: ["Angular", "Bootstrap", "JavaScript", "API"],
      category: "fullstack",
      img: "../images/Movies.png",
      liveLink: "https://movies-one-lyart.vercel.app/",
      githubLink: "https://github.com/AhmedMohammeFarouq/movies",
    },
    {
      id: 5,
      title: "Store Management System ",
      desc: "CRUD operations, search, image upload & category management. Streamlined product management with efficient CRUD operations and dynamic search functionality",
      tech: ["HTML5", "CSS3", "JavaScript", "API"],
      category: "fullstack",
      img: "../images/SM.png",
      liveLink: "https://ahmedmohammefarouq.github.io/Store-Mangament-System/ ",
      githubLink:
        "https://github.com/AhmedMohammeFarouq/Store-Mangament-System.git",
    },
    {
      id: 6,
      title: "Simply Recipes – Recipe Website ",
      desc: "responsive layout & clean UI. Built a recipe site with structured pages and intuitive navigation.",
      tech: ["HTML5", "CSS3", "JavaScript"],
      category: "fullstack",
      img: "../images/Recipes.png",
      liveLink: "https://ahmedmohammefarouq.github.io/simply-Recipes/",
      githubLink: "https://github.com/AhmedMohammeFarouq/simply-Recipes.git",
    },
    {
      id: 7,
      title: "Queueing Theory Simulation",
      desc: "Interactive simulation of queueing systems.",
      tech: ["HTML5", "CSS3", "JavaScript"],
      category: "fullstack",
      img: "../images/qu.png",
      liveLink: "https://ahmedmohammefarouq.github.io/Queueing-Theory/",
      githubLink: "https://github.com/AhmedMohammeFarouq/Queueing-Theory.git",
    },
    {
      id: 8,
      title: "DevFolio – Personal Portfolio",
      desc: "Clean, responsive portfolio showcasing projects and skills.",
      tech: ["HTML5", "CSS3", "JavaScript"],
      category: "ui",
      img: "../images/DevFolio.png",
      liveLink: "https://dev-folio-ashen.vercel.app/",
      githubLink: "https://github.com/AhmedMohammeFarouq/DevFolio.git",
    },
    {
      id: 9,
      title: "Daniels Project",
      desc: "Responsive design with Bootstrap, showcasing a modern UI for a fictional company.",
      tech: ["HTML5", "css3", "Bootstrap", "JavaScript"],
      category: "ui",
      img: "../images/Daniels.png",
      liveLink: "https://daniels-project-six.vercel.app/",
      githubLink: "https://github.com/AhmedMohammeFarouq/Daniels-Project.git",
    },
    {
      id: 10,
      title: "Bookmark – Social Media Platform",
      desc: "A sleek, responsive social media platform with user authentication, post creation, and interactive features.",
      tech: ["HTML5", "CSS3", "JavaScript"],
      category: "fullstack",
      img: "../images/Bookmark.png",
      liveLink: "https://ahmedmohammefarouq.github.io/Bookmark/",
      githubLink: "https://github.com/AhmedMohammeFarouq/Bookmark.git",
    },
    {
      id: 11,
      title: "Random Quote Generator",
      desc: "A simple web app that fetches and displays random quotes from an API, with a clean and responsive design.",
      tech: ["HTML5", "JS", "Bootstrap", "API"],
      category: "ui",
      img: "../images/Random-Quote.png",
      liveLink: "https://ahmedmohammefarouq.github.io/Random-Quote/",
      githubLink: "https://github.com/AhmedMohammeFarouq/Random-Quote.git",
    },
    {
      id: 12,
      title: "Bakery – Food Ordering Platform",
      desc: "A responsive food ordering platform with user authentication, menu browsing, and order management features.",
      tech: ["HTML5", "CSS3", "JavaScript"],
      category: "ui",
      img: "../images/Bakery.png",
      liveLink: "https://bakery-six-beta.vercel.app/",
      githubLink: "https://github.com/AhmedMohammeFarouq/Bakery.git",
    }
  ];

  const projectsGrid = document.getElementById("projects-grid");

  // Generate Projects HTML
  const renderProjects = () => {
    projectsGrid.innerHTML = "";
    projects.forEach((project) => {
      const projectEl = document.createElement("div");
      projectEl.className = `project-card ${project.category}`;
      projectEl.dataset.category = project.category;

      projectEl.innerHTML = `
                <div class="project-img-wrapper">
                    <img src="${project.img}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${project.liveLink || "#"}" target="_blank" rel="noopener noreferrer" aria-label="Live Demo"><i class="ph-bold ph-link"></i>Live</a>
                            <a href="${project.githubLink || "#"}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repo"><i class="ph-bold ph-github-logo"></i>Github</a>
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.desc}</p>
                    <div class="project-tech">
                        ${project.tech.map((t) => `<span class="tech-pill">${t}</span>`).join("")}
                    </div>
                </div>
            `;
      projectsGrid.appendChild(projectEl);
    });
  };

  renderProjects();

  // 5. Project Filtering Logic
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.classList.remove("hide");
          // Add tiny delay for reflow to allow transition
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          setTimeout(() => {
            card.classList.add("hide");
          }, 300); // Wait for transition to finish
        }
      });
    });
  });

  // 6. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right",
  );

  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  };

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver(
    revealCallback,
    revealOptions,
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // 7. Active Nav Link Update on Scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // 8. Certificates Implementation
  const certificates = [
    {
      title: "Front-End Development (Angular) ",
      issuer: "Route IT Training Center",
      date: "March 2026",
      image:
        "../images/AngularWithRoute.png",
    },
    {
      title: "Front-End Development (React) ",
      issuer: "Pioneers of Digital Egypt (DEPI)",
      date: "02 Aug 2025 – 06 Sep 2025",
      image:
        "../images/React2.png",
    },
    {
      title: "Front-End Development",
      issuer: " New Horizons",
      date: "June 2024 - July 2025",
      image:
        "../images/NewHorizons.jpg",
    },
    {
      title: "Business English Certificate",
      issuer: "Berlitz Training Center",
      date: "June 2025 - July 2025",
      image:
        "../images/Berlitz.png",
    },
    {
      title: "English",
      issuer: "Berlitz Training Center",
      date: "June 2023 - July 2024",
      image:
        "../images/CertificatefromBerlitz.jpg",
    },
  ];

  const certGrid = document.getElementById("certificates-grid");
  if (certGrid) {
    certificates.forEach((cert, index) => {
      const certCard = document.createElement("div");
      certCard.className = "cert-card";
      certCard.onclick = () => window.openCertModal(index);

      certCard.innerHTML = `
                <div class="cert-card-img">
                    <img src="${cert.image}" alt="${cert.title}" loading="lazy" />
                </div>
                <div class="cert-card-info">
                    <h3 class="cert-card-title">${cert.title}</h3>
                    <h4 class="cert-card-issuer">${cert.issuer}</h4>
                    <span class="cert-card-date">${cert.date}</span>
                </div>
            `;
      certGrid.appendChild(certCard);
    });
  }

  // Global Modal Functions
  const certModal = document.getElementById("certModal");

  window.openCertModal = (index) => {
    if (!certModal) return;

    const cert = certificates[index];

    document.getElementById("cert-modal-img").src = cert.image;
    document.getElementById("cert-modal-img").alt = cert.title;
    document.getElementById("cert-modal-title").textContent = cert.title;
    document.getElementById("cert-modal-issuer").textContent = cert.issuer;
    document.getElementById("cert-modal-date").textContent = cert.date;

    certModal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  window.closeCertModal = () => {
    if (!certModal) return;
    certModal.classList.remove("active");
    document.body.style.overflow = "";
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      window.closeCertModal();
    }
  });

  // Run once on load to populate the Hero Animations
  setTimeout(() => {
    const heroElements = document.querySelectorAll(
      "#hero .reveal-left, #hero .reveal-right",
    );
    heroElements.forEach((el) => el.classList.add("active"));
  }, 100);

  // 9. Accomplishments / Testimonials
  // const testimonials = [
  //   {
  //     text: "Working with Ahmed has been a fantastic experience. He is truly one of the best! When it comes to leadership, he is absolutely top-notch. His communication skills, organization, and ability to create engaging content are outstanding. Honestly, hats off to him! This is not just a compliment; it's firsthand experience working with him.",
  //     name: "Youssef Shaaban",
  //     role: "Full Stack Developer",
  //     avatar:
  //       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  //   },
  //   {
  //     text: "Ahmed's dedication to quality front-end development is unmatched. He has an incredible passion for learning and adapting new technologies. His expertise in Angular translates directly to robust, scalable applications.",
  //     name: "Abdelrahman",
  //     role: "Senior Software Engineer",
  //     avatar:
  //       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  //   },
  //   {
  //     text: "We collaborated on several complex web projects, and Ahmed always delivered pixel-perfect UI. His attention to detail and proficiency in modern CSS features made him an invaluable asset to our team.",
  //     name: "Nourhan El-Sayed",
  //     role: "Frontend Team Lead",
  //     avatar:
  //       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  //   },
  //   {
  //     text: "I was extremely impressed with Ahmed's ability to optimize performance bottlenecks. He single-handedly improved our application's load time by refactoring components and introducing lazy loading techniques efficiently.",
  //     name: "Omar Hassan",
  //     role: "System Architect",
  //     avatar:
  //       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  //   },
  //   {
  //     text: "A versatile developer who understands both sides of the application. His capacity to seamlessly integrate REST and GraphQL APIs into the Angular frontend makes development cycles significantly faster.",
  //     name: "Mona Ibrahim",
  //     role: "Backend Engineer",
  //     avatar:
  //       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  //   },
  //   {
  //     text: "Reliable, creative, and highly professional! Ahmed approaches every single ticket with a problem-solving mindset and produces maintainable code that saves hours for the rest of the team.",
  //     name: "Karim Wael",
  //     role: "Project Manager",
  //     avatar:
  //       "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  //   },
  // ];

  const testimonialsGrid = document.getElementById("testimonials-container");
  if (testimonialsGrid) {
    testimonials.forEach((testimonial) => {
      const card = document.createElement("div");
      card.className = "testimonial-card";
      card.innerHTML = `
        <p class="testimonial-text">"${testimonial.text}"</p>
        <div class="testimonial-author">
          <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar" loading="lazy" />
          <div class="testimonial-meta">
            <h4>${testimonial.name}</h4>
            <span>${testimonial.role}</span>
          </div>
        </div>
      `;
      testimonialsGrid.appendChild(card);
    });

    // Testimonial Nav & Auto-Scroll Logic
    const btnPrev = document.getElementById("testimonial-prev");
    const btnNext = document.getElementById("testimonial-next");
    const scrollAmount = window.innerWidth < 768 ? window.innerWidth - 60 : 480;

    const scrollNext = () => {
      // If we reached the end, snap back to the beginning
      if (
        testimonialsGrid.scrollLeft + testimonialsGrid.clientWidth >=
        testimonialsGrid.scrollWidth - 10
      ) {
        testimonialsGrid.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        testimonialsGrid.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    };

    const scrollPrev = () => {
      testimonialsGrid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    };

    // Attach to buttons only if they exist
    if (btnNext) btnNext.addEventListener("click", scrollNext);
    if (btnPrev) btnPrev.addEventListener("click", scrollPrev);

    // Auto-scroll every 3.5 seconds inside fixed time interval
    let autoScrollTimer = setInterval(scrollNext, 3500);

    // Pause the timer when the user is hovering over or touching the testimonials layout
    testimonialsGrid.parentElement.addEventListener("mouseenter", () =>
      clearInterval(autoScrollTimer),
    );
    testimonialsGrid.parentElement.addEventListener("mouseleave", () => {
      autoScrollTimer = setInterval(scrollNext, 3500);
    });

    testimonialsGrid.parentElement.addEventListener(
      "touchstart",
      () => clearInterval(autoScrollTimer),
      { passive: true },
    );
    testimonialsGrid.parentElement.addEventListener(
      "touchend",
      () => {
        autoScrollTimer = setInterval(scrollNext, 3500);
      },
      { passive: true },
    );
  }

  // 10. Custom Chat Widget Logic
  const chatWidget = document.getElementById("chat-widget");
  const chatToggleBtn = document.getElementById("chat-toggle-btn");
  const chatCloseHeader = document.getElementById("chat-close-header");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatBody = document.getElementById("chat-body");
  const chatTooltip = document.getElementById("chat-tooltip");

  if (chatWidget && chatToggleBtn) {
    // Show tooltip shortly after load to grab attention
    setTimeout(() => {
      if (!chatWidget.classList.contains("is-open") && chatTooltip) {
        chatTooltip.style.transform = "translateX(0)";
        chatTooltip.style.opacity = "1";
      }
    }, 2000);

    // Hide tooltip after a few seconds automatically
    setTimeout(() => {
      if (chatTooltip) {
        chatTooltip.style.transform = "translateX(10px)";
        chatTooltip.style.opacity = "0";
      }
    }, 8000);

    // Toggle Chat Window
    const toggleChat = () => {
      chatWidget.classList.toggle("is-open");
      if (chatWidget.classList.contains("is-open") && chatInput) {
        chatInput.focus();
      }
    };

    chatToggleBtn.addEventListener("click", toggleChat);
    if (chatCloseHeader) {
      chatCloseHeader.addEventListener("click", () => {
        chatWidget.classList.remove("is-open");
      });
    }

    // Handle Mock Message Sending
    if (chatForm) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message && chatBody) {
          // Append User Message
          const userMsgEl = document.createElement("div");
          userMsgEl.className = "chat-message user-message";
          userMsgEl.textContent = message;
          chatBody.appendChild(userMsgEl);

          chatInput.value = "";
          chatBody.scrollTop = chatBody.scrollHeight;

          // Mock Agent Response after delay
          setTimeout(() => {
            const agentMsgEl = document.createElement("div");
            agentMsgEl.className = "chat-message agent-message";
            agentMsgEl.textContent =
              "Thanks for reaching out! This is a mock interaction, but you can always reach me directly via email or social links.";
            chatBody.appendChild(agentMsgEl);
            chatBody.scrollTop = chatBody.scrollHeight;
          }, 1500);
        }
      });
    }
  }
});
