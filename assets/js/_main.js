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
    var loadQueue = [];
    var activeLoads = 0;
    var maxConcurrentLoads = 2;
    var isChinese = (document.documentElement.lang || "").toLowerCase().indexOf("zh") === 0;
    var labels = {
      loading: isChinese ? "正在加载视频" : "Loading video",
      error: isChinese ? "视频加载失败，请使用播放控件重试" : "Video failed to load. Use the controls to retry."
    };

    function prepareFrame(video) {
      var frame = video.parentElement;
      var placeholder;

      if (!frame || !frame.classList.contains("lazy-video-frame")) {
        frame = document.createElement("span");
        frame.className = "lazy-video-frame";

        var requestedWidth = video.getAttribute("width");
        if (requestedWidth) {
          frame.style.width = requestedWidth;
          video.removeAttribute("width");
        }

        video.parentNode.insertBefore(frame, video);
        frame.appendChild(video);

        placeholder = document.createElement("span");
        placeholder.className = "lazy-video-placeholder";
        placeholder.setAttribute("role", "status");
        placeholder.setAttribute("aria-live", "polite");
        frame.appendChild(placeholder);
      } else {
        placeholder = frame.querySelector(".lazy-video-placeholder");
      }

      placeholder.textContent = labels.loading;

      function markReady() {
        frame.classList.remove("has-error");
        frame.classList.add("is-ready");
        placeholder.setAttribute("aria-hidden", "true");
      }

      video.addEventListener("loadedmetadata", function () {
        if (video.videoWidth && video.videoHeight &&
            !video.classList.contains("project-card__media") &&
            !video.closest(".custom-video-grid")) {
          frame.style.aspectRatio = video.videoWidth + " / " + video.videoHeight;
        }
      });
      video.addEventListener("loadeddata", markReady);
      video.addEventListener("canplay", markReady);
      video.addEventListener("playing", markReady);
      video.addEventListener("error", function () {
        frame.classList.remove("is-ready");
        frame.classList.add("has-error");
        placeholder.removeAttribute("aria-hidden");
        placeholder.textContent = labels.error;
        video.controls = true;
      });

      return frame;
    }

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

    function playVideo(video) {
      video.play().catch(function () {
        video.controls = true;
      });
    }

    function drainLoadQueue() {
      while (activeLoads < maxConcurrentLoads && loadQueue.length) {
        var video = loadQueue.shift();
        video.dataset.queued = "false";
        video.dataset.loading = "true";
        activeLoads += 1;

        var released = false;
        var timeoutId;
        function releaseSlot() {
          if (released) return;
          released = true;
          window.clearTimeout(timeoutId);
          video.dataset.loading = "false";
          activeLoads -= 1;
          drainLoadQueue();
        }

        video.addEventListener("loadeddata", releaseSlot, { once: true });
        video.addEventListener("error", releaseSlot, { once: true });
        timeoutId = window.setTimeout(releaseSlot, 12000);
        loadVideo(video);
        if (autoPlay && video.dataset.nearViewport === "true") playVideo(video);
      }
    }

    function requestVideo(video) {
      if (video.dataset.loading === "true" || video.dataset.queued === "true") return;
      if (video.dataset.loaded === "true") {
        if (autoPlay && video.dataset.nearViewport === "true") playVideo(video);
        return;
      }
      video.dataset.queued = "true";
      loadQueue.push(video);
      drainLoadQueue();
    }

    videos.forEach(function (video) {
      prepareFrame(video);
      video.muted = true;
      video.playsInline = true;
      if (!autoPlay) {
        video.controls = true;
        video.removeAttribute("autoplay");
      }
    });

    if (!("IntersectionObserver" in window)) {
      videos.forEach(function (video) {
        video.dataset.nearViewport = "true";
        requestVideo(video);
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.isIntersecting) {
          video.dataset.nearViewport = "true";
          requestVideo(video);
        } else {
          video.dataset.nearViewport = "false";
          video.pause();
        }
      });
    }, { rootMargin: "120px 0px", threshold: 0.1 });

    videos.forEach(function (video) { observer.observe(video); });
  }

  function initSite() {
    initNavigation();
    initVideos();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSite);
  } else {
    initSite();
  }
})();
