/* Lightweight site interactions: responsive navigation and viewport-aware media. */
(function () {
  "use strict";

  function initNavigation() {
    var toggle = document.querySelector(".site-nav__toggle");
    var links = document.querySelector(".site-nav__links");
    if (!toggle || !links) return;

    function closeMenu() {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var open = !links.classList.contains("is-open");
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".site-nav")) closeMenu();
    });
  }

  function initVideos() {
    var videos = Array.prototype.slice.call(document.querySelectorAll("video.lazy-video"));
    if (!videos.length) return;

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var saveData = Boolean(navigator.connection && navigator.connection.saveData);
    var autoPlay = !reducedMotion && !saveData;

    function loadVideo(video) {
      if (video.dataset.loaded === "true") return;
      var sources = video.querySelectorAll("source[data-src]");
      Array.prototype.forEach.call(sources, function (source) {
        source.src = source.dataset.src;
        source.removeAttribute("data-src");
      });
      video.dataset.loaded = "true";
      video.load();
    }

    videos.forEach(function (video) {
      video.muted = true;
      video.playsInline = true;
      if (!autoPlay) {
        video.controls = true;
        video.removeAttribute("autoplay");
      }
    });

    if (!("IntersectionObserver" in window)) {
      videos.forEach(function (video) {
        loadVideo(video);
        if (autoPlay) video.play().catch(function () {});
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.isIntersecting) {
          loadVideo(video);
          if (autoPlay) video.play().catch(function () {});
        } else {
          video.pause();
        }
      });
    }, { rootMargin: "260px 0px", threshold: 0.1 });

    videos.forEach(function (video) { observer.observe(video); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavigation();
    initVideos();
  });
})();
