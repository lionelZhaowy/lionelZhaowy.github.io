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

  function initTheme() {
    var root = document.documentElement;
    var toggle = document.querySelector(".site-nav__theme");
    var label = toggle && toggle.querySelector(".theme-toggle__label");
    var themeColor = document.querySelector("#theme-color");
    if (!toggle) return;

    var isChinese = (root.lang || "").toLowerCase().indexOf("zh") === 0;

    function applyTheme(theme, persist) {
      var isDark = theme === "dark";
      root.setAttribute("data-theme", isDark ? "dark" : "light");
      root.style.colorScheme = isDark ? "dark" : "light";
      toggle.setAttribute("aria-pressed", String(isDark));

      var nextLabel = isDark
        ? (isChinese ? "切换到浅色主题" : "Switch to light theme")
        : (isChinese ? "切换到深色主题" : "Switch to dark theme");
      toggle.setAttribute("aria-label", nextLabel);
      toggle.title = nextLabel;
      if (label) label.textContent = nextLabel;
      if (themeColor) themeColor.setAttribute("content", isDark ? "#0b111b" : "#ffffff");

      if (persist) {
        try { window.localStorage.setItem("site-theme", isDark ? "dark" : "light"); } catch (error) {}
      }
    }

    applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light", false);
    toggle.addEventListener("click", function () {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  }

  function initVideos() {
    var videos = Array.prototype.slice.call(document.querySelectorAll("video.lazy-video"));
    if (!videos.length) return;

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var connection = navigator.connection;
    var saveData = Boolean(connection && connection.saveData);
    var autoPlay = !reducedMotion && !saveData;
    var prepareDistance = connection && /(^|-)2g$/.test(connection.effectiveType) ? 240 : 720;
    var records = [];
    var recordByVideo = new WeakMap();
    var loadQueue = [];
    var activeLoads = 0;
    var drainTimer = null;
    var pageHidden = false;
    var isChinese = (document.documentElement.lang || "").toLowerCase().indexOf("zh") === 0;
    var labels = {
      loading: isChinese ? "正在加载视频" : "Loading video",
      error: isChinese ? "视频加载失败" : "Video failed to load",
      retry: isChinese ? "重试视频" : "Retry video",
      play: isChinese ? "播放视频" : "Play video"
    };

    function pageActive() {
      return !document.hidden && !pageHidden;
    }

    function setState(record, state) {
      record.state = state;
      record.video.dataset.videoState = state;
    }

    function prepareFrame(video) {
      var frame = video.parentElement;
      if (!frame || !frame.classList.contains("lazy-video-frame")) {
        frame = document.createElement("span");
        frame.className = "lazy-video-frame";
        var requestedWidth = video.getAttribute("width");
        if (requestedWidth && requestedWidth.indexOf("%") !== -1) {
          frame.style.width = requestedWidth;
          video.removeAttribute("width");
        }
        video.parentNode.insertBefore(frame, video);
        frame.appendChild(video);
      }
      var placeholder = frame.querySelector(".lazy-video-placeholder");
      if (!placeholder) {
        placeholder = document.createElement("span");
        placeholder.className = "lazy-video-placeholder";
        placeholder.setAttribute("role", "status");
        placeholder.setAttribute("aria-live", "polite");
        frame.appendChild(placeholder);
      }
      if (video.getAttribute("poster")) frame.classList.add("has-poster");
      return { frame: frame, placeholder: placeholder };
    }

    function showAction(record, label) {
      if (!record.action) {
        record.action = document.createElement("button");
        record.action.type = "button";
        record.action.className = "lazy-video-retry";
        record.action.addEventListener("click", function () {
          record.userPaused = false;
          record.blocked = false;
          if (record.state === "error") {
            record.started = false;
            record.frame.classList.remove("has-error");
            record.placeholder.textContent = labels.loading;
            setState(record, "idle");
          }
          record.manualPlay = true;
          if (!record.visible) {
            record.frame.scrollIntoView({ block: "center", behavior: "instant" });
            synchronize();
          }
          requestVideo(record);
          playVideo(record, true);
        });
        var card = record.video.closest(".project-card");
        var body = card && card.querySelector(".project-card__body");
        if (body) body.insertBefore(record.action, body.firstChild);
        else record.frame.appendChild(record.action);
      }
      record.action.textContent = label;
      record.action.hidden = false;
    }

    function revealFrame(record) {
      record.frame.classList.add("is-ready");
      record.frame.classList.remove("has-error", "is-loading");
      record.placeholder.setAttribute("aria-hidden", "true");
      if (record.action) record.action.hidden = true;
    }

    function revealPresentedFrame(record) {
      if (record.frame.classList.contains("is-ready") || record.frameCallback !== null) return;
      if (record.video.requestVideoFrameCallback) {
        record.frameCallback = record.video.requestVideoFrameCallback(function () {
          record.frameCallback = null;
          revealFrame(record);
        });
      } else {
        window.requestAnimationFrame(function () {
          if (record.video.readyState >= 2) revealFrame(record);
        });
      }
    }

    function pauseVideo(record) {
      record.playVersion += 1;
      record.pendingPlay = false;
      if (!record.video.paused) {
        record.expectedPause = true;
        record.video.pause();
      }
    }

    function releaseVideo(record) {
      if (!record.started || record.visible || record.state === "error") return;
      if (record.release) record.release();
      pauseVideo(record);
      Array.prototype.forEach.call(record.video.querySelectorAll("source[data-src]"), function (source) {
        source.removeAttribute("src");
      });
      record.video.preload = "none";
      record.started = false;
      record.pendingPlay = false;
      record.video.load();
      record.frame.classList.remove("is-ready", "is-loading");
      setState(record, "idle");
    }

    function playVideo(record, explicit) {
      if (!pageActive() || !record.visible || !record.started || record.pendingPlay ||
          (!explicit && (!autoPlay || record.userPaused || record.blocked)) || record.state === "error") return;
      var version = ++record.playVersion;
      record.pendingPlay = true;
      var playback = record.video.play();
      if (!playback || !playback.then) {
        record.pendingPlay = false;
        return;
      }
      playback.then(function () {
        if (version !== record.playVersion) return;
        record.pendingPlay = false;
        if (!pageActive() || !record.visible) pauseVideo(record);
      }).catch(function (error) {
        if (version !== record.playVersion) return;
        record.pendingPlay = false;
        if (error.name === "AbortError" || !pageActive() || !record.visible || record.state === "error") return;
        record.manualPlay = false;
        record.blocked = true;
        record.frame.classList.remove("is-loading");
        record.frame.classList.add("needs-controls");
        record.placeholder.setAttribute("aria-hidden", "true");
        record.video.controls = !record.video.closest("a");
        showAction(record, labels.play);
      });
    }

    function scheduleDrain() {
      if (drainTimer !== null) return;
      drainTimer = window.setTimeout(function () {
        drainTimer = null;
        drainLoadQueue();
      }, 0);
    }

    function failVideo(record) {
      if (record.state === "error") return;
      pauseVideo(record);
      setState(record, "error");
      record.frame.classList.remove("is-loading", "needs-controls", "is-ready");
      record.frame.classList.add("has-error");
      record.placeholder.removeAttribute("aria-hidden");
      record.placeholder.textContent = labels.error;
      record.video.controls = !record.video.closest("a");
      showAction(record, labels.retry);
      if (record.release) record.release();
    }

    function startLoad(record) {
      var video = record.video;
      var released = false;
      var timeoutId;
      activeLoads += 1;
      function releaseSlot() {
        if (released) return;
        released = true;
        window.clearTimeout(timeoutId);
        video.removeEventListener("loadeddata", releaseSlot);
        video.removeEventListener("loadedmetadata", releaseMetadata);
        record.release = null;
        activeLoads -= 1;
        scheduleDrain();
      }
      function releaseMetadata() {
        if (!autoPlay && !record.manualPlay) {
          setState(record, "ready");
          record.frame.classList.remove("is-loading");
          record.placeholder.setAttribute("aria-hidden", "true");
          releaseSlot();
        }
      }
      record.release = releaseSlot;
      record.started = true;
      setState(record, "loading");
      record.frame.classList.add("is-loading");
      record.placeholder.textContent = labels.loading;
      record.placeholder.removeAttribute("aria-hidden");
      video.addEventListener("loadeddata", releaseSlot);
      video.addEventListener("loadedmetadata", releaseMetadata);
      timeoutId = window.setTimeout(function () {
        releaseSlot();
        if (video.readyState < 2 && record.state === "loading") failVideo(record);
      }, 15000);
      video.preload = autoPlay || record.manualPlay ? "auto" : "metadata";
      Array.prototype.forEach.call(video.querySelectorAll("source[data-src]"), function (source) {
        source.src = source.dataset.src;
      });
      video.load();
      playVideo(record, record.manualPlay);
    }

    function drainLoadQueue() {
      if (!pageActive()) return;
      loadQueue = loadQueue.filter(function (record) {
        var bounds = record.video.getBoundingClientRect();
        if (record.video.isConnected && bounds.width > 0 && bounds.height > 0 &&
            record.video.getClientRects().length && (record.near || record.visible) && (autoPlay || record.visible)) return true;
        setState(record, "idle");
        return false;
      });
      loadQueue.forEach(function (record) {
        var bounds = record.video.getBoundingClientRect();
        record.distance = Math.max(0, bounds.top - window.innerHeight, -bounds.bottom);
      });
      loadQueue.sort(function (first, second) {
        return Number(second.visible) - Number(first.visible) || first.distance - second.distance;
      });
      while (activeLoads < 2 && loadQueue.length) {
        if (!loadQueue[0].visible && records.some(function (record) { return record.release; })) break;
        startLoad(loadQueue.shift());
      }
    }

    function requestVideo(record) {
      if (record.state === "error" || (!record.near && !record.visible)) return;
      if (record.started) {
        playVideo(record, record.manualPlay);
        return;
      }
      if (record.state !== "queued") {
        setState(record, "queued");
        loadQueue.push(record);
      }
      scheduleDrain();
    }

    videos.forEach(function (video) {
      var elements = prepareFrame(video);
      var record = {
        video: video, frame: elements.frame, placeholder: elements.placeholder,
        state: "idle", near: false, visible: false, started: false,
        userPaused: false, expectedPause: false, blocked: false,
        pendingPlay: false, playVersion: 0, frameCallback: null,
        manualPlay: false, autoRetries: 0, action: null, release: null
      };
      records.push(record);
      recordByVideo.set(video, record);
      setState(record, "idle");
      video.muted = true;
      video.playsInline = true;
      video.removeAttribute("autoplay");
      if (!autoPlay) {
        record.frame.classList.add("needs-controls");
        video.controls = !video.closest("a");
        if (video.closest("a")) showAction(record, labels.play);
      }

      video.addEventListener("loadedmetadata", function () {
        if (video.videoWidth && video.videoHeight && !video.classList.contains("project-card__media") &&
            !video.closest(".custom-video-grid")) {
          record.frame.style.aspectRatio = video.videoWidth + " / " + video.videoHeight;
        }
      });
      video.addEventListener("loadeddata", function () {
        if (record.state === "error") record.frame.classList.remove("has-error");
        setState(record, video.paused ? "ready" : "playing");
        record.frame.classList.remove("is-loading");
        if (!record.frame.classList.contains("has-poster")) revealFrame(record);
      });
      video.addEventListener("playing", function () {
        if (!pageActive() || !record.visible) {
          pauseVideo(record);
          return;
        }
        record.blocked = false;
        record.userPaused = false;
        record.manualPlay = false;
        record.frame.classList.remove("needs-controls");
        setState(record, "playing");
        revealPresentedFrame(record);
        if (record.action) record.action.hidden = true;
      });
      video.addEventListener("pause", function () {
        if (record.expectedPause) record.expectedPause = false;
        else if (pageActive() && record.visible) record.userPaused = true;
        if (record.state === "playing") setState(record, "paused");
      });
      video.addEventListener("error", function () {
        if (record.started && video.currentSrc) failVideo(record);
      });
      var sources = video.querySelectorAll("source");
      if (sources.length) {
        var lastSource = sources[sources.length - 1];
        lastSource.addEventListener("error", function () {
          if (record.started && lastSource.getAttribute("src") && video.networkState === 3) failVideo(record);
        });
      }
    });

    function updateVisibility(record, ratio) {
      var bounds = record.video.getBoundingClientRect();
      if (!bounds.width || !bounds.height || !record.video.getClientRects().length) ratio = 0;
      if (ratio >= 0.25) record.visible = true;
      else if (ratio <= 0.08) {
        record.visible = false;
        pauseVideo(record);
      }
      if (record.visible) requestVideo(record);
    }

    function synchronize() {
      records.forEach(function (record) {
        var bounds = record.video.getBoundingClientRect();
        var visibleWidth = Math.max(0, Math.min(bounds.right, window.innerWidth) - Math.max(0, bounds.left));
        var visibleHeight = Math.max(0, Math.min(bounds.bottom, window.innerHeight) - Math.max(0, bounds.top));
        var area = bounds.width * bounds.height;
        record.near = area > 0 && record.video.getClientRects().length > 0 &&
          bounds.bottom >= -prepareDistance && bounds.top <= window.innerHeight + prepareDistance;
        updateVisibility(record, area ? visibleWidth * visibleHeight / area : 0);
        var releaseDistance = Math.max(prepareDistance * 2, window.innerHeight);
        var farFromViewport = bounds.bottom < -releaseDistance || bounds.top > window.innerHeight + releaseDistance;
        if (farFromViewport) releaseVideo(record);
        if (record.near && (autoPlay || record.visible)) requestVideo(record);
      });
      scheduleDrain();
    }

    if ("IntersectionObserver" in window) {
      var prepareObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var record = recordByVideo.get(entry.target);
          var bounds = record.video.getBoundingClientRect();
          record.near = entry.isIntersecting && bounds.width > 0 && bounds.height > 0 &&
            record.video.getClientRects().length > 0;
          if (record.near && (autoPlay || record.visible)) requestVideo(record);
        });
        scheduleDrain();
      }, { rootMargin: prepareDistance + "px 0px", threshold: 0 });
      var playObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          updateVisibility(recordByVideo.get(entry.target), entry.intersectionRatio);
        });
        scheduleDrain();
      }, { threshold: [0, 0.08, 0.25] });
      var releaseObserver;
      function observeReleaseDistance() {
        if (releaseObserver) releaseObserver.disconnect();
        releaseObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            var record = recordByVideo.get(entry.target);
            if (!entry.isIntersecting) {
              record.visible = false;
              releaseVideo(record);
            }
          });
        }, { rootMargin: Math.max(prepareDistance * 2, window.innerHeight) + "px 0px", threshold: 0 });
        videos.forEach(function (video) {
          releaseObserver.observe(video);
        });
      }
      videos.forEach(function (video) {
        prepareObserver.observe(video);
        playObserver.observe(video);
      });
      observeReleaseDistance();
      window.addEventListener("resize", observeReleaseDistance);
    } else {
      var geometryTimer = null;
      function scheduleGeometry() {
        if (geometryTimer !== null) return;
        geometryTimer = window.setTimeout(function () {
          geometryTimer = null;
          synchronize();
        }, 100);
      }
      window.addEventListener("scroll", scheduleGeometry, { passive: true });
      window.addEventListener("resize", scheduleGeometry);
      document.addEventListener("toggle", scheduleGeometry, true);
    }

    function pauseAll() {
      records.forEach(pauseVideo);
    }

    document.addEventListener("visibilitychange", function () {
      if (pageActive()) synchronize();
      else pauseAll();
    });
    window.addEventListener("pagehide", function () {
      pageHidden = true;
      pauseAll();
    });
    window.addEventListener("pageshow", function () {
      pageHidden = false;
      synchronize();
    });
    window.addEventListener("online", function () {
      records.forEach(function (record) {
        if (record.state !== "error" || !record.visible || record.autoRetries || !autoPlay) return;
        record.autoRetries += 1;
        record.started = false;
        record.frame.classList.remove("has-error");
        setState(record, "idle");
        requestVideo(record);
      });
    });
    synchronize();
  }

  function initSite() {
    initTheme();
    initNavigation();
    initVideos();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSite);
  } else {
    initSite();
  }
})();
