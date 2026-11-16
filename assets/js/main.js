/* Renders the header, footer and page content from assets/js/data.js.
   You normally don't need to edit this file — change data.js instead. */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var PROJECTS = window.PROJECTS || [];
  var LINKS = SITE.links || {};
  var page = document.body.getAttribute("data-page");

  /* ---------- helpers ---------- */

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function projectUrl(p) {
    return "project.html?id=" + encodeURIComponent(p.id);
  }

  function initials(text) {
    var words = String(text || "").trim().split(/\s+/).filter(Boolean);
    if (!words.length) return "";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  /* ---------- icons ---------- */

  var BRAND = {
    linkedin:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    github:
      "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    itch:
      "M3.13 1.338C2.08 1.96.02 4.328 0 4.95v1.03c0 1.303 1.22 2.45 2.325 2.45 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.07 2.41 2.4 2.41 1.328 0 2.362-1.102 2.362-2.41 0 1.308 1.137 2.41 2.466 2.41h.024c1.33 0 2.466-1.102 2.466-2.41 0 1.308 1.034 2.41 2.363 2.41 1.33 0 2.4-1.102 2.4-2.41 0 1.308 1.106 2.41 2.435 2.41C22.78 8.43 24 7.282 24 5.98V4.95c-.02-.62-2.082-2.99-3.13-3.612-3.253-.114-5.508-.134-8.87-.133-3.362 0-7.945.053-8.87.133zm6.376 6.477a2.74 2.74 0 0 1-.468.602c-.5.49-1.19.795-1.947.795a2.786 2.786 0 0 1-1.95-.795c-.182-.178-.32-.37-.446-.59-.127.222-.303.412-.486.59a2.788 2.788 0 0 1-1.95.795c-.092 0-.187-.025-.264-.052-.107 1.113-.152 2.176-.168 2.95v.005l-.006 1.167c.02 2.334-.23 7.564 1.03 8.85 1.952.454 5.545.662 9.15.663 3.605 0 7.198-.21 9.15-.664 1.26-1.284 1.01-6.514 1.03-8.848l-.006-1.167v-.004c-.016-.775-.06-1.838-.168-2.95-.077.026-.172.052-.263.052a2.788 2.788 0 0 1-1.95-.795c-.184-.178-.36-.368-.486-.59-.127.22-.265.412-.447.59a2.786 2.786 0 0 1-1.95.794c-.76 0-1.446-.303-1.948-.793a2.74 2.74 0 0 1-.468-.602 2.738 2.738 0 0 1-.463.602 2.787 2.787 0 0 1-1.95.794h-.16a2.787 2.787 0 0 1-1.95-.793 2.738 2.738 0 0 1-.464-.602zm-2.004 2.59v.002c.795.002 1.5 0 2.373.953.687-.072 1.406-.108 2.125-.107.72 0 1.438.035 2.125.107.873-.953 1.578-.95 2.372-.953.376 0 1.876 0 2.92 2.934l1.123 4.028c.832 2.995-.266 3.068-1.636 3.07-2.03-.075-3.156-1.55-3.156-3.025-1.124.184-2.436.276-3.748.277-1.312 0-2.624-.093-3.748-.277 0 1.475-1.125 2.95-3.156 3.026-1.37-.004-2.468-.077-1.636-3.072l1.122-4.027c1.045-2.934 2.545-2.934 2.92-2.934zM12 12.714c-.002.002-2.14 1.964-2.523 2.662l1.4-.056v1.22c0 .056.56.033 1.123.007.562.026 1.124.05 1.124-.008v-1.22l1.4.055C14.138 14.677 12 12.713 12 12.713z",
  };

  var STROKE = {
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    external: '<path d="M14 5h5v5M19 5l-8 8M11 7H6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5"/>',
    play: '<path d="M8 5.5v13l11-6.5z"/>',
    file: '<path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7zM14 3v4h4M9 13h6M9 17h6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><ellipse cx="12" cy="12" rx="3.8" ry="9"/>',
  };

  function icon(name) {
    if (BRAND[name]) {
      return '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="' + BRAND[name] + '"/></svg>';
    }
    return (
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      (STROKE[name] || "") +
      "</svg>"
    );
  }

  /* ---------- shared pieces ---------- */

  var SOCIALS = [
    { key: "linkedin", label: "LinkedIn" },
    { key: "github", label: "GitHub" },
    { key: "itch", label: "itch.io" },
    { key: "email", label: "Email" },
  ];

  function socialHref(key) {
    var value = LINKS[key];
    if (!value) return "";
    return key === "email" ? "mailto:" + value : value;
  }

  // Icon-only buttons (header) or icon + label buttons (footer).
  function socialList(options) {
    var items = SOCIALS.filter(function (s) {
      return LINKS[s.key] && (options.email || s.key !== "email");
    }).map(function (s) {
      var external = s.key === "email" ? "" : ' target="_blank" rel="noopener noreferrer"';
      if (options.labels) {
        return '<li><a class="social-btn" href="' + esc(socialHref(s.key)) + '"' + external + ">" + icon(s.key) + "<span>" + s.label + "</span></a></li>";
      }
      return '<li><a class="icon-btn" href="' + esc(socialHref(s.key)) + '"' + external + ' aria-label="' + s.label + '" title="' + s.label + '">' + icon(s.key) + "</a></li>";
    });
    return '<ul class="social' + (options.labels ? " social--labels" : "") + '">' + items.join("") + "</ul>";
  }

  function tagList(tags) {
    if (!tags || !tags.length) return "";
    return (
      '<ul class="tags">' +
      tags
        .map(function (t) {
          return "<li>" + esc(t) + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function coverHtml(p, eager) {
    if (p.cover) {
      var position = p.coverPosition ? ' style="object-position:' + esc(p.coverPosition) + '"' : "";
      return '<img src="' + esc(p.cover) + '" alt="" ' + (eager ? "" : 'loading="lazy" ') + 'decoding="async"' + position + ">";
    }
    var hue = typeof p.hue === "number" ? p.hue : 20;
    return '<div class="cover-ph" style="--h:' + hue + '" aria-hidden="true"><span>' + esc(initials(p.title)) + "</span></div>";
  }

  function cardHtml(p, index) {
    var meta = [p.year || p.duration, p.engine].filter(Boolean).map(esc).join(" · ");
    return (
      '<li class="card-item" style="--i:' + index + '">' +
      '<a class="card" href="' + projectUrl(p) + '">' +
      '<div class="cover">' + coverHtml(p) + "</div>" +
      '<div class="card-body">' +
      '<p class="card-meta">' + meta + "</p>" +
      '<h3 class="card-title">' + esc(p.title) + "</h3>" +
      '<p class="card-text">' + esc(p.tagline) + "</p>" +
      tagList(p.tags) +
      "</div></a></li>"
    );
  }

  /* ---------- header ---------- */

  function renderHeader() {
    var mount = $("#site-header");
    if (!mount) return;
    var current = page === "home" ? "home" : "projects";
    function navLink(href, label, key) {
      return '<li><a href="' + href + '"' + (key === current ? ' aria-current="page"' : "") + ">" + label + "</a></li>";
    }
    mount.innerHTML =
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<header class="site-header"><div class="wrap header-inner">' +
      '<a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">' + esc(initials(SITE.name)) + "</span>" +
      '<span class="brand-name">' + esc(SITE.name) + "</span></a>" +
      '<nav class="site-nav" id="site-nav" aria-label="Main">' +
      '<ul class="nav-links">' +
      navLink("index.html", "Home", "home") +
      navLink("projects.html", "Projects", "projects") +
      '<li><a href="#contact">Contact</a></li>' +
      "</ul>" +
      socialList({ email: false, labels: false }) +
      "</nav>" +
      '<div class="header-tools">' +
      '<button class="icon-btn theme-toggle" type="button" aria-label="Switch colour theme" title="Switch colour theme">' +
      '<span class="theme-sun">' + icon("sun") + '</span><span class="theme-moon">' + icon("moon") + "</span></button>" +
      '<button class="icon-btn nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="site-nav">' +
      '<span class="nav-open-icon">' + icon("menu") + '</span><span class="nav-close-icon">' + icon("close") + "</span></button>" +
      "</div></div></header>";

    var header = $(".site-header", mount);
    var toggle = $(".nav-toggle", mount);

    function setOpen(open) {
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("is-open"));
    });
    $("#site-nav", mount).addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 800) setOpen(false);
    });

    $(".theme-toggle", mount).addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  /* ---------- footer ---------- */

  function renderFooter() {
    var mount = $("#site-footer");
    if (!mount) return;
    var email = LINKS.email
      ? '<a class="footer-email" href="mailto:' + esc(LINKS.email) + '">' + esc(LINKS.email) + "</a>"
      : "";
    mount.innerHTML =
      '<footer class="site-footer" id="contact"><div class="wrap">' +
      '<div class="footer-main">' +
      '<div><p class="eyebrow">Contact</p>' +
      '<h2 class="footer-title">' + esc(SITE.contactTitle || "Get in touch") + "</h2>" +
      (SITE.contactText ? '<p class="footer-text">' + esc(SITE.contactText) + "</p>" : "") +
      email +
      "</div>" +
      socialList({ email: true, labels: true }) +
      "</div>" +
      '<div class="footer-bottom">' +
      "<p>© " + new Date().getFullYear() + " " + esc(SITE.name) + "</p>" +
      '<a href="#top">Back to top ↑</a>' +
      "</div></div></footer>";
  }

  /* ---------- home page ---------- */

  function renderHome() {
    var main = $("#main");
    var featured = PROJECTS.filter(function (p) {
      return p.featured;
    }).slice(0, 3);
    if (!featured.length) featured = PROJECTS.slice(0, 3);

    var eyebrow = [SITE.role, SITE.location].filter(Boolean).map(esc).join(" · ");
    var bio = (SITE.bio || [])
      .map(function (t) {
        return "<p>" + esc(t) + "</p>";
      })
      .join("");
    var facts = (SITE.facts || [])
      .map(function (f) {
        return "<div><dt>" + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd></div>";
      })
      .join("");
    var status =
      SITE.status && SITE.status.text
        ? '<p class="status' + (SITE.status.available ? " status--on" : "") + '"><span class="status-dot" aria-hidden="true"></span>' + esc(SITE.status.text) + "</p>"
        : "";
    var resume = SITE.resume
      ? '<a class="btn btn--ghost" href="' + esc(SITE.resume) + '" target="_blank" rel="noopener noreferrer">' + icon("file") + "Résumé</a>"
      : "";

    main.innerHTML =
      '<section class="hero"><div class="wrap hero-grid">' +
      '<div class="hero-copy">' +
      '<p class="eyebrow">' + eyebrow + "</p>" +
      '<h1 class="hero-title">Hi, I\'m ' + esc(SITE.name) + '. <span class="hero-title-sub">' + esc(SITE.headline) + "</span></h1>" +
      '<div class="hero-bio">' + bio + "</div>" +
      '<div class="btn-row">' +
      '<a class="btn btn--primary" href="projects.html">View all projects' + icon("arrowRight") + "</a>" +
      '<a class="btn btn--ghost" href="#contact">Get in touch</a>' +
      resume +
      "</div></div>" +
      '<aside class="inspector" aria-label="At a glance">' +
      (SITE.photo ? '<img class="inspector-photo" src="' + esc(SITE.photo) + '" alt="Portrait of ' + esc(SITE.name) + '" decoding="async">' : "") +
      '<p class="inspector-head"><span aria-hidden="true"></span>details</p>' +
      '<dl class="inspector-list">' + facts + "</dl>" +
      status +
      "</aside>" +
      "</div></section>" +
      '<section class="section"><div class="wrap">' +
      '<div class="section-head">' +
      '<div><p class="eyebrow">Selected work</p><h2 class="section-title">Highlighted projects</h2></div>' +
      '<a class="link-arrow" href="projects.html">All projects' + icon("arrowRight") + "</a>" +
      "</div>" +
      '<ul class="card-grid card-grid--featured">' + featured.map(cardHtml).join("") + "</ul>" +
      '<div class="section-cta">' +
      '<a class="btn btn--primary btn--lg" href="projects.html">View all ' + PROJECTS.length + " projects" + icon("arrowRight") + "</a>" +
      "</div>" +
      "</div></section>";

    document.title = SITE.name + " · " + SITE.role;
  }

  /* ---------- all projects page ---------- */

  function renderProjects() {
    var main = $("#main");
    var tags = [];
    PROJECTS.forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        if (tags.indexOf(t) === -1) tags.push(t);
      });
    });

    main.innerHTML =
      '<section class="section section--top"><div class="wrap">' +
      '<p class="eyebrow">Portfolio</p>' +
      '<h1 class="page-title">All projects</h1>' +
      (SITE.projectsIntro ? '<p class="page-lead">' + esc(SITE.projectsIntro) + "</p>" : "") +
      '<div class="filters" role="group" aria-label="Filter projects by tag">' +
      '<button class="chip" type="button" data-tag="" aria-pressed="true">All</button>' +
      tags
        .map(function (t) {
          return '<button class="chip" type="button" data-tag="' + esc(t) + '" aria-pressed="false">' + esc(t) + "</button>";
        })
        .join("") +
      "</div>" +
      '<p class="result-count" aria-live="polite"></p>' +
      '<ul class="card-grid" id="project-list"></ul>' +
      "</div></section>";

    var list = $("#project-list");
    var count = $(".result-count");
    var filters = $(".filters");

    function show(tag) {
      var shown = PROJECTS.filter(function (p) {
        return !tag || (p.tags || []).indexOf(tag) !== -1;
      });
      list.innerHTML = shown.map(cardHtml).join("");
      count.textContent = shown.length + (shown.length === 1 ? " project" : " projects") + (tag ? " tagged “" + tag + "”" : "");
      Array.prototype.forEach.call(filters.querySelectorAll(".chip"), function (chip) {
        chip.setAttribute("aria-pressed", chip.getAttribute("data-tag") === tag ? "true" : "false");
      });
    }

    filters.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (chip) show(chip.getAttribute("data-tag"));
    });

    show("");
    document.title = "Projects · " + SITE.name;
  }

  /* ---------- not found (404.html and unknown project ids) ---------- */

  function renderNotFound(title, text) {
    $("#main").innerHTML =
      '<section class="section section--top"><div class="wrap notfound">' +
      '<p class="eyebrow">Error 404</p>' +
      '<h1 class="page-title">' + esc(title) + "</h1>" +
      '<p class="page-lead">' + esc(text) + "</p>" +
      '<div class="btn-row">' +
      '<a class="btn btn--primary" href="projects.html">View all projects' + icon("arrowRight") + "</a>" +
      '<a class="btn btn--ghost" href="index.html">Back to home</a>' +
      "</div></div></section>";
    document.title = title + " · " + SITE.name;
  }

  /* ---------- single project page ---------- */

  var LINK_BUTTONS = [
    { key: "itch", label: "Play on itch.io", icon: "itch" },
    { key: "steam", label: "View on Steam", icon: "external" },
    { key: "website", label: "Website", icon: "globe" },
    { key: "trailer", label: "Watch trailer", icon: "play" },
    { key: "github", label: "Source code", icon: "github" },
  ];

  function renderProject() {
    var main = $("#main");
    var id = new URLSearchParams(window.location.search).get("id");
    var index = -1;
    PROJECTS.forEach(function (p, i) {
      if (p.id === id) index = i;
    });

    if (index === -1) {
      renderNotFound("Project not found", "That project does not exist, or the link is out of date.");
      return;
    }

    var p = PROJECTS[index];
    var links = p.links || {};

    var buttons = LINK_BUTTONS.filter(function (b) {
      return links[b.key];
    })
      .map(function (b, i) {
        return (
          '<a class="btn ' + (i === 0 ? "btn--primary" : "btn--ghost") + '" href="' + esc(links[b.key]) + '" target="_blank" rel="noopener noreferrer">' +
          icon(b.icon) + b.label + "</a>"
        );
      })
      .join("");

    var media = p.video
      ? '<div class="media media--video"><iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(p.video) +
        '" title="' + esc(p.title) + ' video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
      : '<div class="media cover">' + coverHtml(p, true) + "</div>";

    var details = [
      ["Context", p.context],
      ["Role", p.role],
      ["Engine", p.engine],
      ["Language", p.language],
      ["Team", p.team],
      ["Duration", p.duration],
      ["Platform", p.platform],
      ["Year", p.year],
    ]
      .filter(function (row) {
        return row[1];
      })
      .map(function (row) {
        return "<div><dt>" + row[0] + "</dt><dd>" + esc(row[1]) + "</dd></div>";
      })
      .join("");

    var overview = (p.overview || [])
      .map(function (t) {
        return "<p>" + esc(t) + "</p>";
      })
      .join("");

    var contributions = (p.contributions || []).length
      ? '<section class="block"><h2>Responsibilities</h2><ul class="bullets">' +
        p.contributions
          .map(function (t) {
            return "<li>" + esc(t) + "</li>";
          })
          .join("") +
        "</ul></section>"
      : "";

    var highlights = (p.highlights || []).length
      ? '<section class="block"><h2>My contributions</h2>' +
        p.highlights
          .map(function (h) {
            return (
              '<article class="highlight"><h3>' + esc(h.title) + "</h3>" +
              (h.text ? "<p>" + esc(h.text) + "</p>" : "") +
              (h.code ? '<pre class="code" tabindex="0"><code>' + highlightCode(h.code, languageFor("", h.lang || "cpp")) + "</code></pre>" : "") +
              (h.blocks || []).map(blockHtml).join("") +
              "</article>"
            );
          })
          .join("") +
        "</section>"
      : "";

    var takeaways = (p.takeaways || []).length
      ? '<section class="block"><h2>My takeaways</h2><ul class="bullets">' +
        p.takeaways
          .map(function (t) {
            return "<li>" + esc(t) + "</li>";
          })
          .join("") +
        "</ul></section>"
      : "";

    var gallery = (p.gallery || []).length
      ? '<section class="block gallery-block"><h2>Gallery</h2><ul class="gallery">' +
        p.gallery
          .map(function (g) {
            return (
              '<li><button class="gallery-item zoom" type="button" aria-label="Enlarge image">' +
              '<img src="' + esc(g.src) + '" alt="' + esc(g.alt || "") + '" loading="lazy" decoding="async"></button></li>'
            );
          })
          .join("") +
        "</ul></section>"
      : "";

    var prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
    var next = PROJECTS[(index + 1) % PROJECTS.length];
    var pager =
      PROJECTS.length > 1
        ? '<nav class="pager" aria-label="More projects">' +
          '<a class="pager-link" href="' + projectUrl(prev) + '"><span class="pager-dir">' + icon("arrowLeft") + "Previous</span><span class=\"pager-title\">" + esc(prev.title) + "</span></a>" +
          '<a class="pager-link pager-link--next" href="' + projectUrl(next) + '"><span class="pager-dir">Next' + icon("arrowRight") + "</span><span class=\"pager-title\">" + esc(next.title) + "</span></a>" +
          "</nav>"
        : "";

    main.innerHTML =
      '<article class="section section--top project"><div class="wrap">' +
      '<a class="back-link" href="projects.html">' + icon("arrowLeft") + "All projects</a>" +
      '<header class="project-head">' +
      '<h1 class="page-title">' + esc(p.title) + "</h1>" +
      '<p class="page-lead">' + esc(p.tagline) + "</p>" +
      tagList(p.tags) +
      (buttons ? '<div class="btn-row">' + buttons + "</div>" : "") +
      "</header>" +
      media +
      '<div class="project-layout">' +
      '<aside class="project-aside"><h2 class="aside-title">Details</h2><dl class="inspector-list">' + details + "</dl></aside>" +
      '<div class="project-body">' +
      (overview ? '<section class="block"><h2>Overview</h2>' + overview + "</section>" : "") +
      contributions +
      highlights +
      takeaways +
      "</div></div>" +
      gallery +
      pager +
      "</div></article>";

    document.title = p.title + " · " + SITE.name;
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", p.tagline || "");

    setupCodeFiles(main);
    setupLightbox(main);
  }

  /* ---------- content blocks inside a contribution ----------
     A block is either a string (paragraph), { images: [{ src, alt }], columns: 2 }
     or { code: "path/to/File.cpp", label: "File.cpp" }. */

  function blockHtml(block) {
    if (typeof block === "string") return "<p>" + esc(block) + "</p>";
    if (block.images) {
      return (
        '<div class="shots' + (block.columns === 2 ? " shots--2" : "") + '">' +
        block.images
          .map(function (image) {
            return (
              '<button class="shot zoom" type="button" aria-label="Enlarge image">' +
              '<img src="' + esc(image.src) + '" alt="' + esc(image.alt || "") + '" loading="lazy" decoding="async"></button>'
            );
          })
          .join("") +
        "</div>"
      );
    }
    if (block.code) {
      var label = block.label || block.code.split("/").pop();
      var language = languageFor(block.code, block.lang);
      return (
        '<details class="code-file" data-src="' + esc(block.code) + '" data-lang="' + language + '">' +
        '<summary><span class="code-name">' + esc(label) + "</span>" +
        (language ? '<span class="code-lang">' + LANGUAGES[language].label + "</span>" : "") +
        '<span class="code-hint"></span></summary>' +
        '<pre class="code" tabindex="0"><code>Loading…</code></pre></details>'
      );
    }
    return "";
  }

  // Source files are fetched the first time their block is opened.
  function setupCodeFiles(root) {
    Array.prototype.forEach.call(root.querySelectorAll(".code-file"), function (details) {
      details.addEventListener("toggle", function () {
        if (!details.open || details.getAttribute("data-loaded")) return;
        details.setAttribute("data-loaded", "1");
        var code = $("code", details);
        var src = details.getAttribute("data-src");
        fetch(src)
          .then(function (response) {
            if (!response.ok) throw new Error(response.status);
            return response.text();
          })
          .then(function (text) {
            var source = text.replace(/\r\n?/g, "\n").replace(/\t/g, "    ").replace(/\s+$/, "");
            code.innerHTML = highlightCode(source, details.getAttribute("data-lang"));
          })
          .catch(function () {
            code.innerHTML = 'Could not load the file here. <a href="' + esc(src) + '">Open ' + esc(src.split("/").pop()) + "</a>";
          });
      });
    });
  }

  /* ---------- syntax highlighting, per language ----------
     The language comes from the file extension (.h/.cpp -> C++, .cs -> C#) or from
     an explicit `lang: "cpp" | "csharp"` on the block. */

  function wordSet(list) {
    var set = {};
    list.split(" ").forEach(function (word) {
      set[word] = true;
    });
    return set;
  }

  var LANGUAGES = {
    cpp: {
      label: "C++",
      control: wordSet("if else for while do switch case default break continue return goto try catch throw co_await co_return co_yield"),
      keyword: wordSet(
        "alignas alignof auto class const consteval constexpr const_cast decltype delete dynamic_cast enum explicit export extern false final friend " +
          "inline mutable namespace new noexcept nullptr operator override private protected public reinterpret_cast sizeof static static_assert " +
          "static_cast struct template this thread_local true typedef typeid typename union using virtual volatile " +
          "void bool char wchar_t char8_t char16_t char32_t short int long float double signed unsigned size_t " +
          "int8 int16 int32 int64 uint8 uint16 uint32 uint64 int8_t int16_t int32_t int64_t uint8_t uint16_t uint32_t uint64_t"
      ),
      // Unreal Engine naming: FVector, UObject, AActor, TArray, EState, IInterface, SWidget
      typePattern: /^[FUATEIS][A-Z][A-Za-z0-9]*$/,
      macros: true, // ALL_CAPS identifiers are macros (UPROPERTY, UE_LOG, ...)
    },
    csharp: {
      label: "C#",
      control: wordSet("if else for foreach in while do switch case default break continue return goto try catch finally throw yield await"),
      keyword: wordSet(
        "abstract as async base checked class const delegate enum event explicit extern false fixed get implicit init interface internal is lock " +
          "namespace new null operator out override params partial private protected public readonly record ref sealed set sizeof stackalloc static " +
          "struct this true typeof unchecked unsafe using var virtual volatile when where " +
          "void bool byte sbyte char decimal double float int uint long ulong short ushort object string dynamic nint nuint"
      ),
      typePattern: null,
      staticDot: true, // PascalCase before "." is a type: Vector3.up, Debug.Log
    },
  };

  var EXTENSIONS = { h: "cpp", hh: "cpp", hpp: "cpp", inl: "cpp", c: "cpp", cc: "cpp", cpp: "cpp", cxx: "cpp", cs: "csharp" };

  function languageFor(path, explicit) {
    if (explicit && LANGUAGES[explicit]) return explicit;
    var extension = String(path || "").split(".").pop().toLowerCase();
    return EXTENSIONS[extension] || "";
  }

  var TOKEN = new RegExp(
    "(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)|" + // 1 comment
      "([@$]{0,2}\"(?:[^\"\\\\\\n]|\\\\.)*\"|'(?:[^'\\\\\\n]|\\\\.)+')|" + // 2 string / char
      "(^[ \\t]*#[ \\t]*[a-z]+)|" + // 3 preprocessor directive
      "\\b(0[xX][0-9a-fA-F]+|\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fFuUlLdDmM]*)\\b|" + // 4 number
      "([A-Za-z_]\\w*)", // 5 identifier
    "gm"
  );
  var NOT_A_TYPE = wordSet("as is new return throw else case typeof out ref in using namespace goto delete");

  function highlightCode(source, languageKey) {
    var lang = LANGUAGES[languageKey];
    if (!lang) return esc(source);

    // Names declared in this snippet, so they are coloured consistently wherever they are used.
    var declaredTypes = {};
    var variables = {};
    var found;
    var typeDecl = /\b(?:class|struct|enum|interface)\s+(?:class\s+)?(?:[A-Z0-9_]+_API\s+)?([A-Za-z_]\w*)/g;
    while ((found = typeDecl.exec(source))) declaredTypes[found[1]] = true;
    var variableDecl = /\b([A-Za-z_][\w.:]*)(?:<[^<>;(){}]*>)?(?:\[\])?[*&]?\s+[*&]?([A-Za-z_]\w*)\s*(?=[;=,)])/g;
    while ((found = variableDecl.exec(source))) {
      if (!NOT_A_TYPE[found[1]] && !lang.control[found[1]]) variables[found[2]] = true;
    }

    function span(cls, text) {
      return '<span class="tok-' + cls + '">' + esc(text) + "</span>";
    }

    function classify(word, start, end, previousWord) {
      if (lang.control[word]) return "control";
      if (lang.keyword[word]) return "keyword";

      var before = source.slice(Math.max(0, start - 24), start).replace(/\s+$/, "");
      var after = source.slice(end, end + 48);
      var afterTrimmed = after.replace(/^\s+/, "");
      var isCall = afterTrimmed.charAt(0) === "(";
      var isMember = /(\.|->)$/.test(before);
      var isPascal = /^[A-Z]/.test(word);

      if (isMember) return isCall ? "function" : "";
      // UPROPERTY, UE_LOG, COLDTURKEY_API, DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams
      if (lang.macros && /^(?:[A-Z][A-Z0-9_]{2,}|[A-Z][A-Z0-9]+_[A-Z0-9_]+_\w+)$/.test(word)) return "macro";
      if (previousWord === "new" && isPascal) return "type";
      if (afterTrimmed.slice(0, 2) === "::") return "type";
      if (isCall) return declaredTypes[word] && /^[;{}]?$/.test(before.slice(-1)) ? "type" : "function";
      if (declaredTypes[word]) return "type";
      if (lang.typePattern && lang.typePattern.test(word)) return "type";
      if (!isPascal) return "";
      if (variables[word]) return "";
      var generic = /^<[\w\s,.<>*\[\]]*>\s*(\(?)/.exec(afterTrimmed);
      if (generic) return generic[1] && previousWord !== "new" ? "function" : "type"; // GetComponent<T>() vs List<T>
      if ((/<$/.test(before) && /^\s*[>,]/.test(after)) || (/,$/.test(before) && /^\s*>/.test(after))) return "type"; // generic argument
      if (/^\s+[*&]?[A-Za-z_]/.test(after) || /^[*&]+\s*[A-Za-z_]/.test(afterTrimmed)) return "type"; // Type name
      if (lang.staticDot && (afterTrimmed.charAt(0) === "." || /^\[\]/.test(afterTrimmed))) return "type"; // Type.Member, Type[]
      if (lang.staticDot && /\($/.test(before) && afterTrimmed.charAt(0) === ")") return "type"; // typeof(Type), (Type) cast
      if ((/[:\[]$/.test(before) && afterTrimmed.charAt(0) !== ")") ||/^(as|is|class|struct|enum|interface|public|typename)$/.test(previousWord)) return "type";
      return "";
    }

    var html = "";
    var last = 0;
    var previousWord = "";
    var match;
    TOKEN.lastIndex = 0;
    while ((match = TOKEN.exec(source))) {
      var text = match[0];
      var between = source.slice(last, match.index);
      html += esc(between);
      if (/\S/.test(between)) previousWord = "";
      last = match.index + text.length;

      if (match[1] !== undefined) html += span("comment", text);
      else if (match[2] !== undefined) html += span("string", text);
      else if (match[3] !== undefined) {
        html += span("pre", text);
        // #include <header> : colour the header like a string
        var include = /^[ \t]*<[^>\n]+>/.exec(source.slice(last));
        if (include && /include$/.test(text)) {
          html += span("string", include[0]);
          last += include[0].length;
          TOKEN.lastIndex = last;
        }
      } else if (match[4] !== undefined) html += span("number", text);
      else {
        var cls = classify(text, match.index, last, previousWord);
        html += cls ? span(cls, text) : esc(text);
      }
      previousWord = match[5] !== undefined ? text : "";
    }
    return html + esc(source.slice(last));
  }

  /* ---------- image lightbox (every .zoom button on the page) ---------- */

  function setupLightbox(root) {
    var buttons = Array.prototype.slice.call(root.querySelectorAll(".zoom"));
    if (!buttons.length) return;
    var images = buttons.map(function (button) {
      var image = $("img", button);
      return { src: image.getAttribute("src"), alt: image.getAttribute("alt") };
    });
    var dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Image viewer");
    dialog.innerHTML =
      '<div class="lightbox-inner">' +
      '<img alt="">' +
      '<div class="lightbox-bar">' +
      '<button class="icon-btn" type="button" data-action="prev" aria-label="Previous image">' + icon("arrowLeft") + "</button>" +
      '<span class="lightbox-count"></span>' +
      '<button class="icon-btn" type="button" data-action="next" aria-label="Next image">' + icon("arrowRight") + "</button>" +
      '<button class="icon-btn" type="button" data-action="close" aria-label="Close">' + icon("close") + "</button>" +
      "</div></div>";
    document.body.appendChild(dialog);

    var img = $("img", dialog);
    var counter = $(".lightbox-count", dialog);
    var current = 0;

    function go(i) {
      current = (i + images.length) % images.length;
      img.src = images[current].src;
      img.alt = images[current].alt || "";
      counter.textContent = current + 1 + " / " + images.length;
    }

    root.addEventListener("click", function (e) {
      var item = e.target.closest(".zoom");
      if (!item) return;
      go(buttons.indexOf(item));
      if (dialog.showModal) dialog.showModal();
      else dialog.setAttribute("open", "");
    });

    dialog.addEventListener("click", function (e) {
      var button = e.target.closest("[data-action]");
      var action = button && button.getAttribute("data-action");
      if (action === "prev") go(current - 1);
      else if (action === "next") go(current + 1);
      else if (action === "close" || e.target === dialog) dialog.close();
    });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") go(current - 1);
      if (e.key === "ArrowRight") go(current + 1);
    });
  }

  /* ---------- boot ---------- */

  renderHeader();
  renderFooter();
  if (page === "home") renderHome();
  else if (page === "projects") renderProjects();
  else if (page === "project") renderProject();
  else if (page === "notfound") renderNotFound("Page not found", "The page you were looking for does not exist or has moved.");
})();
