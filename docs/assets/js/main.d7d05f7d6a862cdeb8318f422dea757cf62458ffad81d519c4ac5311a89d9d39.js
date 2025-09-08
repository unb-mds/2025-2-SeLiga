"use strict";
(() => {
  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\utils\global.js
  window.addEventListener("load", () => {
    document.body.classList.remove("preload");
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\components\audio.js
  document.addEventListener("DOMContentLoaded", function() {
    let lazyAudios = [].slice.call(
      document.querySelectorAll(".js-audio.is-lazy")
    );
    if (lazyAudios.length > 0) {
      if ("IntersectionObserver" in window) {
        let lazyAudioObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(audio) {
            if (audio.isIntersecting) {
              for (let source in audio.target.children) {
                let audioSource = audio.target.children[source];
                if (typeof audioSource.tagName === "string" && audioSource.tagName === "SOURCE") {
                  audioSource.src = audioSource.dataset.src;
                }
              }
              audio.target.load();
              audio.target.classList.remove("is-lazy");
              lazyAudioObserver.unobserve(audio.target);
            }
          });
        });
        lazyAudios.forEach(function(lazyAudio) {
          lazyAudioObserver.observe(lazyAudio);
        });
      }
    }
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\utils\scrollspy.js
  var scrollspy = (element, fn) => {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(({ isIntersecting }) => isIntersecting)) {
        observer.disconnect();
        fn();
      }
    });
    observer.observe(element);
  };
  var scrollspy_default = scrollspy;

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\blocks\chart.js
  var charts = document.querySelectorAll(".block-chart");
  var chartjsLoaded = false;
  var BlockChart = class {
    constructor(block) {
      this.chart = block.querySelector(".js-chart");
      this.canvas = this.chart.getContext("2d");
      if (!chartjsLoaded) {
        this.addFiles();
      } else {
        this.init();
      }
    }
    addFiles() {
      this.chartjsJS = document.createElement("script");
      this.chartjsJS.type = "text/javascript";
      this.chartjsJS.src = "/assets/js/chart.umd.js";
      document.getElementsByTagName("body")[0].appendChild(this.chartjsJS);
      this.chartjsJS.addEventListener("load", () => {
        chartjsLoaded = true;
        this.init();
      });
    }
    init() {
      let type = this.chart.dataset.type, label = this.chart.dataset.label, backgroundColor = this.chart.dataset.backgroundColor, borderColor = this.chart.dataset.borderColor, jsonData = window.json[this.chart.id], data = {};
      if (jsonData) {
        data = jsonData;
      } else {
        let items = JSON.parse(this.chart.dataset.items);
        let backgroundColors = items.map(function(e) {
          return e.color;
        });
        let labels = items.map(function(e) {
          return e.label;
        });
        let datas = items.map(function(e) {
          return e.value;
        });
        if (backgroundColor) {
          backgroundColors = backgroundColor;
        }
        data = {
          labels,
          datasets: [
            {
              label,
              data: datas,
              fill: true,
              backgroundColor: backgroundColors,
              borderColor
            }
          ]
        };
      }
      this.config = {
        type,
        data,
        options: {
          responsive: true,
          layout: {
            padding: 20
          }
        }
      };
      if (type === "line") {
        this.config.options.scales = {};
        this.config.options.scales.y = {};
        this.config.options.scales.y.beginAtZero = true;
      }
      if (type === "radar") {
        this.config.options.scale = {};
        this.config.options.scale.min = 0;
      }
      if (this.chart.dataset.color) {
        Chart.defaults.color = this.chart.dataset.color;
      }
      let chart = new Chart(this.canvas, this.config);
    }
  };
  charts.forEach((chart) => {
    scrollspy_default(chart, () => {
      new BlockChart(chart);
    });
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\components\gauge.js
  var gauges = document.querySelectorAll(".js-gauge");
  document.addEventListener("DOMContentLoaded", function() {
    gauges.forEach((gauge) => {
      scrollspy_default(gauge, () => {
        gauge.classList.add("show");
      });
    });
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\components\form.js
  var forms = document.querySelectorAll(".js-form");
  var Form = class {
    constructor(form) {
      this.form = form;
      this.form_message = form.querySelector(".js-form-message");
      this.init();
    }
    init() {
      this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }
    async handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const actionUrl = event.target.action || "/";
      let serviceForm = "netlify";
      if (this.form.formAction) {
        const urlObj = new URL(this.form.formAction);
        serviceForm = urlObj.hostname;
      }
      let headers = { "Content-Type": "application/json" };
      let body = this.formDataToJson(formData);
      if (serviceForm == "netlify") {
        headers = { "Content-Type": "application/x-www-form-urlencoded" };
        body = new URLSearchParams(formData).toString();
      }
      this.form.classList.add("is-submitting");
      try {
        const response = await fetch(actionUrl, {
          method: this.form.method,
          headers,
          body
        });
        if (response.ok) {
          this.removeErrorMessage();
          this.addSuccessMessage();
        } else {
          this.addErrorMessage(await response.text());
        }
      } catch (error) {
        console.error("Erreur:", error);
        this.addErrorMessage(error.message);
      }
    }
    formDataToJson(formData) {
      let object = {};
      formData.forEach((value, key) => {
        if (object[key] !== void 0) {
          if (!Array.isArray(object[key])) {
            object[key] = [object[key]];
          }
          object[key].push(value);
        } else {
          object[key] = value;
        }
      });
      return JSON.stringify(object);
    }
    addSuccessMessage() {
      this.form.classList.add("is-success");
      this.form_message.textContent = window.i18n.form.success;
    }
    addErrorMessage(errorMessage) {
      this.form.classList.remove("is-submitting");
      this.form.classList.remove("is-success");
      this.form.classList.add("has-error");
      this.form_message.textContent = errorMessage;
    }
    removeErrorMessage() {
      this.form.classList.remove("is-submitting");
      this.form.classList.remove("has-error");
      this.form_message.innerHTML = "";
    }
  };
  forms.forEach((form) => {
    new Form(form);
  });

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\midzer\tobii@v3.0.0+incompatible\src\js\types\image.js
  var ImageType = class {
    constructor() {
      this.figcaptionId = 0;
      this.userSettings = null;
    }
    init(el, container, userSettings) {
      this.userSettings = userSettings;
      const FIGURE = document.createElement("figure");
      const IMAGE = document.createElement("img");
      const THUMBNAIL = el.querySelector("img");
      const LOADING_INDICATOR = document.createElement("div");
      FIGURE.tabIndex = -1;
      FIGURE.setAttribute("role", "group");
      FIGURE.style.opacity = "0";
      if (THUMBNAIL) {
        IMAGE.alt = THUMBNAIL.alt || "";
      }
      IMAGE.setAttribute("data-src", el.href);
      if (el.hasAttribute("data-srcset")) {
        IMAGE.setAttribute("data-srcset", el.getAttribute("data-srcset"));
      }
      if (el.hasAttribute("data-sizes")) {
        IMAGE.setAttribute("data-sizes", el.getAttribute("data-sizes"));
      }
      FIGURE.appendChild(IMAGE);
      let captionContent;
      if (typeof this.userSettings.captionText === "function") {
        captionContent = this.userSettings.captionText(el);
      } else if (this.userSettings.captionsSelector === "self" && el.getAttribute(this.userSettings.captionAttribute)) {
        captionContent = el.getAttribute(this.userSettings.captionAttribute);
      } else if (this.userSettings.captionsSelector === "img" && THUMBNAIL && THUMBNAIL.getAttribute(this.userSettings.captionAttribute)) {
        captionContent = THUMBNAIL.getAttribute(this.userSettings.captionAttribute);
      }
      if (this.userSettings.captions && captionContent) {
        const FIGCAPTION = document.createElement("figcaption");
        FIGCAPTION.id = `tobii-figcaption-${this.figcaptionId}`;
        const SPAN = document.createElement("span");
        if (this.userSettings.captionHTML) {
          SPAN.innerHTML = captionContent;
        } else {
          SPAN.textContent = captionContent;
        }
        FIGCAPTION.appendChild(SPAN);
        if (this.userSettings.captionToggle) {
          const BUTTON = document.createElement("button");
          BUTTON.className = "caption-toggle";
          BUTTON.textContent = BUTTON.title = this.userSettings.captionToggleLabel[0];
          BUTTON.setAttribute("aria-controls", FIGCAPTION.id);
          BUTTON.setAttribute("aria-expanded", true);
          const preventAndStopEvent = (event) => {
            event.preventDefault();
            event.stopPropagation();
          };
          BUTTON.addEventListener("pointerdown", (event) => preventAndStopEvent(event));
          BUTTON.addEventListener("pointerup", (event) => preventAndStopEvent(event));
          BUTTON.addEventListener("click", (event) => {
            preventAndStopEvent(event);
            const isExpanded = BUTTON.getAttribute("aria-expanded") === "true";
            const buttonLabel = isExpanded ? this.userSettings.captionToggleLabel[1] : this.userSettings.captionToggleLabel[0];
            BUTTON.textContent = BUTTON.title = buttonLabel;
            BUTTON.setAttribute("aria-expanded", !isExpanded);
            SPAN.setAttribute("aria-hidden", isExpanded);
          });
          FIGCAPTION.appendChild(BUTTON);
        }
        FIGURE.appendChild(FIGCAPTION);
        IMAGE.setAttribute("aria-labelledby", FIGCAPTION.id);
        FIGURE.setAttribute("aria-label", SPAN.textContent);
        ++this.figcaptionId;
      }
      container.appendChild(FIGURE);
      LOADING_INDICATOR.className = "tobii__loader";
      LOADING_INDICATOR.setAttribute("role", "progressbar");
      LOADING_INDICATOR.setAttribute("aria-label", this.userSettings.loadingIndicatorLabel);
      container.appendChild(LOADING_INDICATOR);
      container.setAttribute("data-type", "image");
      container.classList.add("tobii-image");
    }
    onPreload(container) {
      this.onLoad(container);
    }
    onLoad(container) {
      const IMAGE = container.querySelector("img");
      if (!IMAGE.hasAttribute("data-src")) {
        return;
      }
      const FIGURE = container.querySelector("figure");
      const LOADING_INDICATOR = container.querySelector(".tobii__loader");
      const handleImageEvent = () => {
        container.removeChild(LOADING_INDICATOR);
        FIGURE.style.opacity = "1";
      };
      IMAGE.addEventListener("load", handleImageEvent);
      IMAGE.addEventListener("error", handleImageEvent);
      if (IMAGE.hasAttribute("data-srcset")) {
        IMAGE.setAttribute("srcset", IMAGE.getAttribute("data-srcset"));
        IMAGE.removeAttribute("data-srcset");
      }
      if (IMAGE.hasAttribute("data-sizes")) {
        IMAGE.setAttribute("sizes", IMAGE.getAttribute("data-sizes"));
        IMAGE.removeAttribute("data-sizes");
      }
      IMAGE.setAttribute("src", IMAGE.getAttribute("data-src"));
      IMAGE.removeAttribute("data-src");
    }
    onLeave(container) {
    }
    onCleanup(container) {
    }
    onReset() {
      this.figcaptionId = 0;
    }
  };
  var image_default = ImageType;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\midzer\tobii@v3.0.0+incompatible\src\js\types\iframe.js
  var IframeType = class {
    constructor() {
      this.userSettings = null;
    }
    init(el, container, userSettings) {
      this.userSettings = userSettings;
      const HREF = el.hasAttribute("data-target") ? el.getAttribute("data-target") : el.getAttribute("href");
      container.setAttribute("data-HREF", HREF);
      if (el.getAttribute("data-allow")) {
        container.setAttribute("data-allow", el.getAttribute("data-allow"));
      }
      if (el.hasAttribute("data-width")) {
        container.setAttribute("data-width", `${el.getAttribute("data-width")}`);
      }
      if (el.hasAttribute("data-height")) {
        container.setAttribute("data-height", `${el.getAttribute("data-height")}`);
      }
      container.setAttribute("data-type", "iframe");
      container.classList.add("tobii-iframe");
    }
    onPreload(container) {
    }
    onLoad(container) {
      let IFRAME = container.querySelector("iframe");
      const LOADING_INDICATOR = document.createElement("div");
      LOADING_INDICATOR.className = "tobii__loader";
      LOADING_INDICATOR.setAttribute("role", "progressbar");
      LOADING_INDICATOR.setAttribute("aria-label", this.userSettings.loadingIndicatorLabel);
      container.appendChild(LOADING_INDICATOR);
      if (IFRAME == null) {
        IFRAME = document.createElement("iframe");
        const HREF = container.getAttribute("data-href");
        IFRAME.setAttribute("frameborder", "0");
        IFRAME.setAttribute("src", HREF);
        IFRAME.setAttribute("allowfullscreen", "");
        if (HREF.indexOf("youtube.com") > -1) {
          IFRAME.setAttribute(
            "allow",
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          );
        } else if (HREF.indexOf("vimeo.com") > -1) {
          IFRAME.setAttribute("allow", "autoplay; picture-in-picture");
        } else if (container.hasAttribute("data-allow")) {
          IFRAME.setAttribute("allow", container.getAttribute("data-allow"));
        }
        if (container.getAttribute("data-width")) {
          IFRAME.style.maxWidth = `${container.getAttribute("data-width")}`;
        }
        if (container.getAttribute("data-height")) {
          IFRAME.style.maxHeight = `${container.getAttribute("data-height")}`;
        }
        IFRAME.style.opacity = "0";
        container.appendChild(IFRAME);
        IFRAME.addEventListener("load", () => {
          IFRAME.style.opacity = "1";
          const LOADING_INDICATOR2 = container.querySelector(".tobii__loader");
          if (LOADING_INDICATOR2) {
            container.removeChild(LOADING_INDICATOR2);
          }
        });
        IFRAME.addEventListener("error", () => {
          IFRAME.style.opacity = "1";
          const LOADING_INDICATOR2 = container.querySelector(".tobii__loader");
          if (LOADING_INDICATOR2) {
            container.removeChild(LOADING_INDICATOR2);
          }
        });
      } else {
        IFRAME.setAttribute("src", container.getAttribute("data-href"));
      }
    }
    onLeave(container) {
    }
    onCleanup(container) {
      const IFRAME = container.querySelector("iframe");
      IFRAME.setAttribute("src", "");
      IFRAME.style.opacity = "0";
    }
    onReset() {
    }
  };
  var iframe_default = IframeType;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\midzer\tobii@v3.0.0+incompatible\src\js\types\html.js
  var HtmlType = class {
    constructor() {
      this.userSettings = null;
    }
    init(el, container, userSettings) {
      this.userSettings = userSettings;
      const TARGET_SELECTOR = el.hasAttribute("data-target") ? el.getAttribute("data-target") : el.getAttribute("href");
      const TARGET = document.querySelector(TARGET_SELECTOR).cloneNode(true);
      if (!TARGET) {
        throw new Error(`Ups, I can't find the target ${TARGET_SELECTOR}.`);
      }
      container.appendChild(TARGET);
      container.setAttribute("data-type", "html");
      container.classList.add("tobii-html");
    }
    onPreload(container) {
    }
    onLoad(container, group) {
      const VIDEO = container.querySelector("video");
      if (VIDEO) {
        if (VIDEO.hasAttribute("data-time") && VIDEO.readyState > 0) {
          VIDEO.currentTime = VIDEO.getAttribute("data-time");
        }
        VIDEO.play();
      }
      const audio = container.querySelector("audio");
      if (audio) {
        audio.play();
      }
      container.classList.add("tobii-group-" + group);
    }
    onLeave(container) {
      const VIDEO = container.querySelector("video");
      if (VIDEO) {
        if (!VIDEO.paused) {
          VIDEO.pause();
        }
        if (VIDEO.readyState > 0) {
          VIDEO.setAttribute("data-time", VIDEO.currentTime);
        }
      }
      const audio = container.querySelector("audio");
      if (audio) {
        if (!audio.paused) {
          audio.pause();
        }
      }
    }
    onCleanup(container) {
      const VIDEO = container.querySelector("video");
      if (VIDEO) {
        if (VIDEO.readyState > 0 && VIDEO.readyState < 3 && VIDEO.duration !== VIDEO.currentTime) {
          const VIDEO_CLONE = VIDEO.cloneNode(true);
          this._removeSources(VIDEO);
          VIDEO.load();
          VIDEO.parentNode.removeChild(VIDEO);
          container.appendChild(VIDEO_CLONE);
        }
      }
    }
    onReset() {
    }
    /**
     * Remove all `src` attributes
     *
     * @param {HTMLElement} el - Element to remove all `src` attributes
     */
    _removeSources(el) {
      const SOURCES = el.querySelectorAll("src");
      if (SOURCES) {
        SOURCES.forEach((source) => {
          source.setAttribute("src", "");
        });
      }
    }
  };
  var html_default = HtmlType;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\midzer\tobii@v3.0.0+incompatible\src\js\types\youtube.js
  var YoutubeType = class {
    constructor() {
      this.playerId = 0;
      this.PLAYER = [];
      this.userSettings = null;
    }
    init(el, container, userSettings) {
      this.userSettings = userSettings;
      const IFRAME_PLACEHOLDER = document.createElement("div");
      container.appendChild(IFRAME_PLACEHOLDER);
      this.PLAYER[this.playerId] = new window.YT.Player(IFRAME_PLACEHOLDER, {
        host: "https://www.youtube-nocookie.com",
        height: el.getAttribute("data-height") || "360",
        width: el.getAttribute("data-width") || "640",
        videoId: el.getAttribute("data-id"),
        playerVars: {
          controls: el.getAttribute("data-controls") || 1,
          rel: 0,
          playsinline: 1
        }
      });
      container.setAttribute("data-player", this.playerId);
      container.setAttribute("data-type", "youtube");
      container.classList.add("tobii-youtube");
      this.playerId++;
    }
    onPreload(container) {
    }
    onLoad(container) {
      this.PLAYER[container.getAttribute("data-player")].playVideo();
    }
    onLeave(container) {
      if (this.PLAYER[container.getAttribute("data-player")].getPlayerState() === 1) {
        this.PLAYER[container.getAttribute("data-player")].pauseVideo();
      }
    }
    onCleanup(container) {
      if (this.PLAYER[container.getAttribute("data-player")].getPlayerState() === 1) {
        this.PLAYER[container.getAttribute("data-player")].pauseVideo();
      }
    }
    onReset() {
    }
  };
  var youtube_default = YoutubeType;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\midzer\tobii@v3.0.0+incompatible\src\js\index.js
  function Tobii(userOptions) {
    const SUPPORTED_ELEMENTS = {
      image: new image_default(),
      // default
      html: new html_default(),
      iframe: new iframe_default(),
      youtube: new youtube_default()
    };
    const FOCUSABLE_ELEMENTS = [
      'a[href]:not([tabindex^="-"]):not([inert])',
      'area[href]:not([tabindex^="-"]):not([inert])',
      "input:not([disabled]):not([inert])",
      "select:not([disabled]):not([inert])",
      "textarea:not([disabled]):not([inert])",
      "button:not([disabled]):not([inert])",
      'iframe:not([tabindex^="-"]):not([inert])',
      'audio:not([tabindex^="-"]):not([inert])',
      'video:not([tabindex^="-"]):not([inert])',
      '[contenteditable]:not([tabindex^="-"]):not([inert])',
      '[tabindex]:not([tabindex^="-"]):not([inert])'
    ];
    let userSettings = {};
    const WAITING_ELS = [];
    const GROUP_ATTS = {
      gallery: [],
      slider: null,
      sliderElements: [],
      elementsLength: 0,
      currentIndex: 0,
      x: 0
    };
    let lightbox = null;
    let prevButton = null;
    let nextButton = null;
    let closeButton = null;
    let counter = null;
    let lastFocus = null;
    let offset = null;
    let isYouTubeDependencyLoaded = false;
    let groups = {};
    let activeGroup = null;
    let pointerDownCache = [];
    let lastTapTime = 0;
    const MIN_SCALE = 1;
    const MAX_SCALE = 4;
    const DOUBLE_TAP_TIME = 500;
    const SCALE_SENSITIVITY = 10;
    const TRANSFORM = {
      element: null,
      originX: 0,
      originY: 0,
      translateX: 0,
      translateY: 0,
      scale: MIN_SCALE
    };
    const DRAG = {
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      distance: 0
    };
    const mergeOptions = (userOptions2) => {
      const OPTIONS = {
        selector: ".lightbox",
        captions: true,
        captionsSelector: "img",
        captionAttribute: "alt",
        captionText: null,
        captionHTML: false,
        captionToggle: true,
        captionToggleLabel: [
          "Hide caption",
          "Show caption"
        ],
        nav: "auto",
        navText: [
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="15 6 9 12 15 18" /></svg>',
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="9 6 15 12 9 18" /></svg>'
        ],
        navLabel: [
          "Previous image",
          "Next image"
        ],
        close: true,
        closeText: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke="none" d="M0 0h24v24H0z"/><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>',
        closeLabel: "Close lightbox",
        dialogTitle: "Lightbox",
        loadingIndicatorLabel: "Image loading",
        counter: true,
        keyboard: true,
        zoom: false,
        zoomText: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="16 4 20 4 20 8" /><line x1="14" y1="10" x2="20" y2="4" /><polyline points="8 20 4 20 4 16" /><line x1="4" y1="20" x2="10" y2="14" /><polyline points="16 20 20 20 20 16" /><line x1="14" y1="14" x2="20" y2="20" /><polyline points="8 4 4 4 4 8" /><line x1="4" y1="4" x2="10" y2="10" /></svg>',
        docClose: true,
        swipeClose: true,
        hideScrollbar: true,
        draggable: true,
        threshold: 100,
        theme: "tobii--theme-default"
      };
      return {
        ...OPTIONS,
        ...userOptions2
      };
    };
    const init = (userOptions2) => {
      userSettings = mergeOptions(userOptions2);
      if (!lightbox) {
        createLightbox();
      }
      const LIGHTBOX_TRIGGER_ELS = document.querySelectorAll(userSettings.selector);
      if (!LIGHTBOX_TRIGGER_ELS) {
        throw new Error(`Ups, I can't find the selector ${userSettings.selector} on this website.`);
      }
      const uniqueMap = [];
      LIGHTBOX_TRIGGER_ELS.forEach((lightboxTriggerEl) => {
        const group = lightboxTriggerEl.hasAttribute("data-group") ? lightboxTriggerEl.getAttribute("data-group") : "default";
        let uid = lightboxTriggerEl.href;
        if (lightboxTriggerEl.hasAttribute("data-target")) {
          uid = lightboxTriggerEl.getAttribute("data-target");
        }
        uid += "__" + group;
        if (typeof uniqueMap[uid] !== "undefined") {
          lightboxTriggerEl.addEventListener("click", (event) => {
            selectGroup(group);
            open();
            event.preventDefault();
          });
        } else {
          uniqueMap[uid] = 1;
          checkDependencies(lightboxTriggerEl);
        }
      });
    };
    const checkDependencies = (el) => {
      if (document.querySelector('[data-type="youtube"]') !== null && !isYouTubeDependencyLoaded) {
        if (document.getElementById("iframe_api") === null) {
          const TAG = document.createElement("script");
          const FIRST_SCRIPT_TAG = document.getElementsByTagName("script")[0];
          TAG.id = "iframe_api";
          TAG.src = "https://www.youtube.com/iframe_api";
          FIRST_SCRIPT_TAG.parentNode.insertBefore(TAG, FIRST_SCRIPT_TAG);
        }
        if (WAITING_ELS.indexOf(el) === -1) {
          WAITING_ELS.push(el);
        }
        window.onYouTubePlayerAPIReady = () => {
          WAITING_ELS.forEach((waitingEl) => {
            add(waitingEl);
          });
          isYouTubeDependencyLoaded = true;
        };
      } else {
        add(el);
      }
    };
    const getGroupName = (el) => {
      return el.hasAttribute("data-group") ? el.getAttribute("data-group") : "default";
    };
    const copyObject = (object) => {
      return JSON.parse(JSON.stringify(object));
    };
    const add = (el) => {
      const newGroup = getGroupName(el);
      if (!Object.prototype.hasOwnProperty.call(groups, newGroup)) {
        groups[newGroup] = copyObject(GROUP_ATTS);
        groups[newGroup].slider = document.createElement("div");
        groups[newGroup].slider.className = "tobii__slider";
        groups[newGroup].slider.setAttribute("aria-hidden", "true");
        lightbox.appendChild(groups[newGroup].slider);
      }
      if (groups[newGroup].gallery.indexOf(el) === -1) {
        groups[newGroup].gallery.push(el);
        groups[newGroup].elementsLength++;
        if (userSettings.zoom && el.querySelector("img") && el.getAttribute("data-zoom") !== "false" || el.getAttribute("data-zoom") === "true") {
          const TOBII_ZOOM = document.createElement("div");
          TOBII_ZOOM.className = "tobii-zoom__icon";
          TOBII_ZOOM.innerHTML = userSettings.zoomText;
          el.classList.add("tobii-zoom");
          el.appendChild(TOBII_ZOOM);
        }
        el.addEventListener("click", triggerTobii);
        const SLIDER_ELEMENT = document.createElement("div");
        const SLIDER_ELEMENT_CONTENT = document.createElement("div");
        SLIDER_ELEMENT.className = "tobii__slide";
        SLIDER_ELEMENT.style.position = "absolute";
        SLIDER_ELEMENT.style.left = `${groups[newGroup].x * 100}%`;
        SLIDER_ELEMENT.setAttribute("aria-hidden", "true");
        const model = getModel(el);
        model.init(el, SLIDER_ELEMENT_CONTENT, userSettings);
        SLIDER_ELEMENT.appendChild(SLIDER_ELEMENT_CONTENT);
        groups[newGroup].slider.appendChild(SLIDER_ELEMENT);
        groups[newGroup].sliderElements.push(SLIDER_ELEMENT);
        ++groups[newGroup].x;
        if (isOpen() && newGroup === activeGroup) {
          updateConfig();
          updateLightbox();
        }
      } else {
        throw new Error("Ups, element already added.");
      }
    };
    const remove = (el) => {
      const GROUP_NAME = getGroupName(el);
      if (groups[GROUP_NAME].gallery.indexOf(el) === -1) {
        throw new Error(`Ups, I can't find a slide for the element ${el}.`);
      } else {
        const SLIDE_INDEX = groups[GROUP_NAME].gallery.indexOf(el);
        const SLIDE_EL = groups[GROUP_NAME].sliderElements[SLIDE_INDEX];
        if (isOpen() && GROUP_NAME === activeGroup && SLIDE_INDEX === groups[GROUP_NAME].currentIndex) {
          if (groups[GROUP_NAME].elementsLength === 1) {
            close();
            throw new Error("Ups, I've closed. There are no slides more to show.");
          } else {
            if (groups[GROUP_NAME].currentIndex === 0) {
              next();
            } else {
              previous();
            }
            updateConfig();
            updateLightbox();
          }
        }
        groups[GROUP_NAME].gallery.splice(groups[GROUP_NAME].gallery.indexOf(el));
        groups[GROUP_NAME].sliderElements.splice(groups[GROUP_NAME].gallery.indexOf(el));
        groups[GROUP_NAME].elementsLength--;
        --groups[GROUP_NAME].x;
        if (userSettings.zoom && el.querySelector(".tobii-zoom__icon")) {
          const ZOOM_ICON = el.querySelector(".tobii-zoom__icon");
          ZOOM_ICON.parentNode.classList.remove("tobii-zoom");
          ZOOM_ICON.parentNode.removeChild(ZOOM_ICON);
        }
        el.removeEventListener("click", triggerTobii);
        SLIDE_EL.parentNode.removeChild(SLIDE_EL);
      }
    };
    const createLightbox = () => {
      lightbox = document.createElement("div");
      lightbox.setAttribute("role", "dialog");
      lightbox.setAttribute("aria-hidden", "true");
      lightbox.setAttribute("aria-modal", "true");
      lightbox.setAttribute("aria-label", userSettings.dialogTitle);
      lightbox.classList.add("tobii");
      lightbox.classList.add(userSettings.theme);
      prevButton = document.createElement("button");
      prevButton.className = "tobii__btn tobii__btn--previous";
      prevButton.setAttribute("type", "button");
      prevButton.setAttribute("aria-label", userSettings.navLabel[0]);
      prevButton.innerHTML = userSettings.navText[0];
      lightbox.appendChild(prevButton);
      nextButton = document.createElement("button");
      nextButton.className = "tobii__btn tobii__btn--next";
      nextButton.setAttribute("type", "button");
      nextButton.setAttribute("aria-label", userSettings.navLabel[1]);
      nextButton.innerHTML = userSettings.navText[1];
      lightbox.appendChild(nextButton);
      closeButton = document.createElement("button");
      closeButton.className = "tobii__btn tobii__btn--close";
      closeButton.setAttribute("type", "button");
      closeButton.setAttribute("aria-label", userSettings.closeLabel);
      closeButton.innerHTML = userSettings.closeText;
      lightbox.appendChild(closeButton);
      counter = document.createElement("div");
      counter.className = "tobii__counter";
      lightbox.appendChild(counter);
      document.body.appendChild(lightbox);
    };
    const getModel = (el) => {
      const type = el.getAttribute("data-type");
      if (SUPPORTED_ELEMENTS[type] !== void 0) {
        return SUPPORTED_ELEMENTS[type];
      } else {
        if (el.hasAttribute("data-type")) {
          console.log("Unknown lightbox element type: " + type);
        }
        return SUPPORTED_ELEMENTS.image;
      }
    };
    const open = (index = 0) => {
      if (isOpen()) {
        throw new Error("Ups, I'm aleady open.");
      }
      if (index === -1 || index >= groups[activeGroup].elementsLength) {
        throw new Error(`Ups, I can't find slide ${index}.`);
      }
      document.documentElement.classList.add("tobii-is-open");
      document.body.classList.add("tobii-is-open");
      document.body.classList.add("tobii-is-open-" + activeGroup);
      updateConfig();
      if (!userSettings.close) {
        closeButton.disabled = false;
        closeButton.setAttribute("aria-hidden", "true");
      }
      lastFocus = document.activeElement;
      const stateObj = {
        tobii: "close"
      };
      const url = window.location.href;
      window.history.pushState(stateObj, "Image", url);
      groups[activeGroup].currentIndex = index;
      bindEvents();
      load(groups[activeGroup].currentIndex);
      groups[activeGroup].slider.setAttribute("aria-hidden", "false");
      lightbox.setAttribute("aria-hidden", "false");
      updateLightbox();
      preload(groups[activeGroup].currentIndex + 1);
      preload(groups[activeGroup].currentIndex - 1);
      groups[activeGroup].slider.classList.add("tobii__slider--animate");
      const openEvent = new window.CustomEvent("open", {
        detail: {
          group: activeGroup
        }
      });
      lightbox.dispatchEvent(openEvent);
    };
    const close = () => {
      if (!isOpen()) {
        throw new Error("Ups, I'm already closed.");
      }
      document.documentElement.classList.remove("tobii-is-open");
      document.body.classList.remove("tobii-is-open");
      document.body.classList.remove("tobii-is-open-" + activeGroup);
      unbindEvents();
      if (window.history.state !== null) {
        if (window.history.state.tobii === "close") {
          window.history.back();
        }
      }
      lastFocus.focus();
      leave(groups[activeGroup].currentIndex);
      cleanup(groups[activeGroup].currentIndex);
      lightbox.setAttribute("aria-hidden", "true");
      groups[activeGroup].slider.setAttribute("aria-hidden", "true");
      groups[activeGroup].currentIndex = 0;
      groups[activeGroup].slider.classList.remove("tobii__slider--animate");
      const closeEvent = new window.CustomEvent("close", {
        detail: {
          group: activeGroup
        }
      });
      lightbox.dispatchEvent(closeEvent);
    };
    const preload = (index) => {
      if (groups[activeGroup].sliderElements[index] === void 0) {
        return;
      }
      const CONTAINER = groups[activeGroup].sliderElements[index].querySelector("[data-type]");
      const model = getModel(CONTAINER);
      model.onPreload(CONTAINER);
    };
    const load = (index) => {
      if (groups[activeGroup].sliderElements[index] === void 0) {
        return;
      }
      const CONTAINER = groups[activeGroup].sliderElements[index].querySelector("[data-type]");
      const model = getModel(CONTAINER);
      groups[activeGroup].sliderElements[index].classList.add("tobii__slide--is-active");
      groups[activeGroup].sliderElements[index].setAttribute("aria-hidden", "false");
      model.onLoad(CONTAINER, activeGroup);
    };
    const select = (index) => {
      const currIndex = groups[activeGroup].currentIndex;
      if (!isOpen()) {
        throw new Error("Ups, I'm closed.");
      }
      if (isOpen()) {
        if (!index && index !== 0) {
          throw new Error("Ups, no slide specified.");
        }
        if (index === groups[activeGroup].currentIndex) {
          throw new Error(`Ups, slide ${index} is already selected.`);
        }
        if (index === -1 || index >= groups[activeGroup].elementsLength) {
          throw new Error(`Ups, I can't find slide ${index}.`);
        }
      }
      groups[activeGroup].currentIndex = index;
      leave(currIndex);
      load(index);
      if (index < currIndex) {
        updateLightbox("left");
        cleanup(currIndex);
        preload(index - 1);
      }
      if (index > currIndex) {
        updateLightbox("right");
        cleanup(currIndex);
        preload(index + 1);
      }
    };
    const previous = () => {
      if (!isOpen()) {
        throw new Error("Ups, I'm closed.");
      }
      if (groups[activeGroup].currentIndex > 0) {
        leave(groups[activeGroup].currentIndex);
        load(--groups[activeGroup].currentIndex);
        updateLightbox("left");
        cleanup(groups[activeGroup].currentIndex + 1);
        preload(groups[activeGroup].currentIndex - 1);
      }
      const previousEvent = new window.CustomEvent("previous", {
        detail: {
          group: activeGroup
        }
      });
      lightbox.dispatchEvent(previousEvent);
    };
    const next = () => {
      if (!isOpen()) {
        throw new Error("Ups, I'm closed.");
      }
      if (groups[activeGroup].currentIndex < groups[activeGroup].elementsLength - 1) {
        leave(groups[activeGroup].currentIndex);
        load(++groups[activeGroup].currentIndex);
        updateLightbox("right");
        cleanup(groups[activeGroup].currentIndex - 1);
        preload(groups[activeGroup].currentIndex + 1);
      }
      const nextEvent = new window.CustomEvent("next", {
        detail: {
          group: activeGroup
        }
      });
      lightbox.dispatchEvent(nextEvent);
    };
    const selectGroup = (name) => {
      if (isOpen()) {
        throw new Error("Ups, I'm open.");
      }
      if (!name) {
        throw new Error("Ups, no group specified.");
      }
      if (name && !Object.prototype.hasOwnProperty.call(groups, name)) {
        throw new Error(`Ups, I don't have a group called "${name}".`);
      }
      activeGroup = name;
    };
    const leave = (index) => {
      if (groups[activeGroup].sliderElements[index] === void 0) {
        return;
      }
      const CONTAINER = groups[activeGroup].sliderElements[index].querySelector("[data-type]");
      const model = getModel(CONTAINER);
      groups[activeGroup].sliderElements[index].classList.remove("tobii__slide--is-active");
      groups[activeGroup].sliderElements[index].setAttribute("aria-hidden", "true");
      model.onLeave(CONTAINER);
    };
    const cleanup = (index) => {
      if (groups[activeGroup].sliderElements[index] === void 0) {
        return;
      }
      const CONTAINER = groups[activeGroup].sliderElements[index].querySelector("[data-type]");
      const model = getModel(CONTAINER);
      model.onCleanup(CONTAINER);
      DRAG.startX = 0;
      DRAG.startY = 0;
      DRAG.x = 0;
      DRAG.y = 0;
      DRAG.distance = 0;
      lastTapTime = 0;
      if (isZoomed()) resetZoom();
      TRANSFORM.element = null;
    };
    const updateOffset = () => {
      offset = -groups[activeGroup].currentIndex * lightbox.offsetWidth;
      groups[activeGroup].slider.style.transform = `translate(${offset}px, 0)`;
    };
    const updateCounter = () => {
      counter.innerHTML = `<p>${groups[activeGroup].currentIndex + 1}/${groups[activeGroup].elementsLength}</p>`;
    };
    const updateFocus = (dir) => {
      const group = groups[activeGroup];
      const isNavEnabled = userSettings.nav === true || userSettings.nav === "auto";
      const hasMultipleSlides = group.elementsLength > 1;
      if (isNavEnabled && !isTouchDevice() && hasMultipleSlides) {
        setButtonState(prevButton, true, true);
        setButtonState(nextButton, true, true);
        if (group.currentIndex === 0) {
          setButtonState(nextButton, false, false);
          nextButton.focus();
        } else if (group.currentIndex === group.elementsLength - 1) {
          setButtonState(prevButton, false, false);
          prevButton.focus();
        } else {
          setButtonState(prevButton, false, false);
          setButtonState(nextButton, false, false);
          if (dir === "left") {
            prevButton.focus();
          } else {
            nextButton.focus();
          }
        }
      } else if (userSettings.close) {
        closeButton.focus();
      }
      if (hasMultipleSlides && group.currentIndex !== 0) {
        const focusableFigure = getFocusableFigure();
        if (focusableFigure) {
          setTimeout(() => {
            focusableFigure.focus();
          }, 250);
        }
      }
    };
    const resizeHandler = () => {
      updateOffset();
    };
    const triggerTobii = (event) => {
      event.preventDefault();
      activeGroup = getGroupName(event.currentTarget);
      open(groups[activeGroup].gallery.indexOf(event.currentTarget));
    };
    const clickHandler = (event) => {
      if (event.target === prevButton) {
        previous();
      } else if (event.target === nextButton) {
        next();
      } else if (event.target === closeButton || (event.target.classList.contains("tobii__slide") || event.target.classList.contains("tobii") && userSettings.docClose)) {
        close();
      }
      event.stopPropagation();
    };
    const getFocusableChildren = () => {
      return Array.prototype.slice.call(
        lightbox.querySelectorAll(
          `.tobii__btn:not([disabled]), .tobii__slide--is-active ${FOCUSABLE_ELEMENTS.join(", .tobii__slide--is-active ")}`
        )
      ).filter((child) => {
        return !!(child.offsetWidth || child.offsetHeight || child.getClientRects().length);
      });
    };
    const getFocusableFigure = () => {
      return lightbox.querySelector('.tobii__slide--is-active figure[tabindex="-1"]');
    };
    const setButtonState = (button, hidden, disabled) => {
      button.setAttribute("aria-hidden", hidden ? "true" : "false");
      button.disabled = disabled;
    };
    const keydownHandler = (event) => {
      const FOCUSABLE_CHILDREN = getFocusableChildren();
      const FOCUSED_ITEM_INDEX = FOCUSABLE_CHILDREN.indexOf(document.activeElement);
      if (event.code === "Tab") {
        if (event.shiftKey && FOCUSED_ITEM_INDEX === 0) {
          FOCUSABLE_CHILDREN[FOCUSABLE_CHILDREN.length - 1].focus();
          event.preventDefault();
        } else if (!event.shiftKey && (FOCUSED_ITEM_INDEX === FOCUSABLE_CHILDREN.length - 1 || FOCUSED_ITEM_INDEX === -1)) {
          FOCUSABLE_CHILDREN[0].focus();
          event.preventDefault();
        }
      } else if (event.code === "Escape") {
        event.preventDefault();
        close();
      } else if (event.code === "ArrowLeft") {
        event.preventDefault();
        previous();
      } else if (event.code === "ArrowRight") {
        event.preventDefault();
        next();
      }
    };
    const contextmenuHandler = () => {
      pointerDownCache = [];
      updateOffset();
      groups[activeGroup].slider.classList.remove("tobii__slider--is-" + (isZoomed() ? "moving" : "dragging"));
    };
    const pointerdownHandler = (event) => {
      if (isIgnoreElement(event.target)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      DRAG.startX = DRAG.x = event.clientX;
      DRAG.startY = DRAG.y = event.clientY;
      DRAG.distance = 0;
      pointerDownCache.push(event);
      if (pointerDownCache.length === 2) {
        const { x, y } = midPoint(
          pointerDownCache[0].clientX,
          pointerDownCache[0].clientY,
          pointerDownCache[1].clientX,
          pointerDownCache[1].clientY
        );
        DRAG.startX = DRAG.x = x;
        DRAG.startY = DRAG.y = y;
        DRAG.distance = distance(
          pointerDownCache[0].clientX - pointerDownCache[1].clientX,
          pointerDownCache[0].clientY - pointerDownCache[1].clientY
        ) / TRANSFORM.scale;
      }
    };
    const pointermoveHandler = (event) => {
      if (!pointerDownCache.length) return;
      groups[activeGroup].slider.classList.add("tobii__slider--is-" + (isZoomed() ? "moving" : "dragging"));
      const index = pointerDownCache.findIndex(
        (cachedEv) => cachedEv.pointerId === event.pointerId
      );
      pointerDownCache[index] = event;
      if (pointerDownCache.length === 2) {
        const { x, y } = midPoint(
          pointerDownCache[0].clientX,
          pointerDownCache[0].clientY,
          pointerDownCache[1].clientX,
          pointerDownCache[1].clientY
        );
        const scale = distance(
          pointerDownCache[0].clientX - pointerDownCache[1].clientX,
          pointerDownCache[0].clientY - pointerDownCache[1].clientY
        ) / DRAG.distance;
        zoomPan(
          event.target,
          clamp(scale, MIN_SCALE, MAX_SCALE),
          x,
          y,
          x - DRAG.x,
          y - DRAG.y
        );
        DRAG.x = x;
        DRAG.y = y;
        return;
      }
      if (isZoomed()) {
        const deltaX = event.clientX - DRAG.x;
        const deltaY = event.clientY - DRAG.y;
        pan(deltaX, deltaY);
      }
      DRAG.x = event.clientX;
      DRAG.y = event.clientY;
      if (!isZoomed()) {
        const deltaX = DRAG.startX - DRAG.x;
        const deltaY = DRAG.startY - DRAG.y;
        if (distance(deltaX, deltaY) < 10) return;
        if (Math.abs(deltaX) > Math.abs(deltaY) && groups[activeGroup].elementsLength > 1) {
          groups[activeGroup].slider.style.transform = `translate(${offset - Math.round(deltaX)}px, 0)`;
        } else if (userSettings.swipeClose) {
          groups[activeGroup].slider.style.transform = `translate(${offset}px, -${Math.round(deltaY)}px)`;
        }
      }
    };
    const pointerupHandler = (event) => {
      if (!pointerDownCache.length) return;
      groups[activeGroup].slider.classList.remove("tobii__slider--is-" + (isZoomed() ? "moving" : "dragging"));
      const index = pointerDownCache.findIndex(
        (cachedEv) => cachedEv.pointerId === event.pointerId
      );
      pointerDownCache.splice(index, 1);
      const x = event.clientX;
      const y = event.clientY;
      const deltaX = DRAG.startX - x;
      const deltaY = DRAG.startY - y;
      const distanceX = Math.abs(deltaX);
      const distanceY = Math.abs(deltaY);
      if (distanceX > 8 || distanceY > 8) {
        if (!isZoomed()) {
          if (deltaX < 0 && distanceX > userSettings.threshold && groups[activeGroup].currentIndex > 0) {
            previous();
          } else if (deltaX > 0 && distanceX > userSettings.threshold && groups[activeGroup].currentIndex !== groups[activeGroup].elementsLength - 1) {
            next();
          } else if (deltaY > 0 && distanceY > userSettings.threshold && userSettings.swipeClose) {
            close();
          } else {
            updateOffset();
          }
        }
      } else {
        const now = Date.now();
        const tapLength = now - lastTapTime;
        if (tapLength < DOUBLE_TAP_TIME && tapLength > 100) {
          event.preventDefault();
          lastTapTime = 0;
          if (isZoomed()) {
            resetZoom();
          } else {
            zoomPan(event.target, MAX_SCALE / 2, x, y, 0, 0);
          }
        } else {
          lastTapTime = now;
          if (isTouchDevice()) {
            window.setTimeout(() => {
              const { left, top, bottom, right, width } = event.target.getBoundingClientRect();
              if (y < top || y > bottom || !lastTapTime) return;
              if (x > left && x < left + width / 2) {
                previous();
              } else if (x < right && x > right - width / 2) {
                next();
              }
            }, DOUBLE_TAP_TIME);
          }
        }
      }
    };
    const wheelHandler = (event) => {
      const deltaScale = Math.sign(event.deltaY) > 0 ? -1 : 1;
      if (!isZoomed() && !deltaScale) return;
      event.preventDefault();
      const newScale = TRANSFORM.scale + deltaScale / (SCALE_SENSITIVITY / TRANSFORM.scale);
      zoomPan(
        event.target,
        clamp(newScale, MIN_SCALE, MAX_SCALE),
        event.clientX,
        event.clientY,
        0,
        0
      );
    };
    const clampedTranslate = (axis, translate) => {
      const { element, scale, originX, originY } = TRANSFORM;
      const axisIsX = axis === "x";
      const origin = axisIsX ? originX : originY;
      const axisKey = axisIsX ? "offsetWidth" : "offsetHeight";
      const containerSize = element.parentNode[axisKey];
      const imageSize = element[axisKey];
      const bounds = element.getBoundingClientRect();
      const imageScaledSize = axisIsX ? bounds.width : bounds.height;
      const defaultOrigin = imageSize / 2;
      const originOffset = (origin - defaultOrigin) * (scale - 1);
      const range = Math.max(0, Math.round(imageScaledSize) - containerSize);
      const max = Math.round(range / 2);
      const min = 0 - max;
      return clamp(translate, min + originOffset, max + originOffset);
    };
    const clamp = (value, min, max) => Math.max(Math.min(value, max), min);
    const isZoomed = () => TRANSFORM.scale !== MIN_SCALE;
    const pan = (deltaX, deltaY) => {
      if (deltaX !== 0) {
        TRANSFORM.translateX = clampedTranslate("x", TRANSFORM.translateX + deltaX);
      }
      if (deltaY !== 0) {
        TRANSFORM.translateY = clampedTranslate("y", TRANSFORM.translateY + deltaY);
      }
      const { element, originX, originY, translateX, translateY, scale } = TRANSFORM;
      element.style.transformOrigin = `${originX}px ${originY}px`;
      element.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    };
    const zoomPan = (el, newScale, x, y, deltaX, deltaY) => {
      if (el.tagName !== "IMG") return;
      const { left, top } = el.getBoundingClientRect();
      const originX = x - left;
      const originY = y - top;
      const newOriginX = originX / TRANSFORM.scale;
      const newOriginY = originY / TRANSFORM.scale;
      TRANSFORM.element = el;
      TRANSFORM.originX = newOriginX;
      TRANSFORM.originY = newOriginY;
      TRANSFORM.scale = newScale;
      pan(deltaX, deltaY);
    };
    const distance = (dx, dy) => Math.hypot(dx, dy);
    const midPoint = (x1, y1, x2, y2) => ({
      x: (x1 + x2) / 2,
      y: (y1 + y2) / 2
    });
    const resetZoom = () => {
      TRANSFORM.scale = MIN_SCALE;
      TRANSFORM.originX = 0;
      TRANSFORM.originY = 0;
      TRANSFORM.translateX = 0;
      TRANSFORM.translateY = 0;
      pan(0, 0);
    };
    const bindEvents = () => {
      if (userSettings.keyboard) {
        window.addEventListener("keydown", keydownHandler);
      }
      window.addEventListener("resize", resizeHandler);
      window.addEventListener("popstate", close);
      on("click", clickHandler);
      if (userSettings.draggable) {
        on("pointerdown", pointerdownHandler);
        on("pointermove", pointermoveHandler);
        on("pointerup", pointerupHandler);
        on("pointercancel", contextmenuHandler);
        on("pointerout", contextmenuHandler);
        on("pointerleave", contextmenuHandler);
        on("contextmenu", contextmenuHandler);
      }
      on("wheel", wheelHandler);
    };
    const unbindEvents = () => {
      if (userSettings.keyboard) {
        window.removeEventListener("keydown", keydownHandler);
      }
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("popstate", close);
      off("click", clickHandler);
      if (userSettings.draggable) {
        off("pointerdown", pointerdownHandler);
        off("pointermove", pointermoveHandler);
        off("pointerup", pointerupHandler);
        off("pointercancel", contextmenuHandler);
        off("pointerout", contextmenuHandler);
        off("pointerleave", contextmenuHandler);
        off("contextmenu", contextmenuHandler);
      }
      off("wheel", wheelHandler);
    };
    const updateConfig = () => {
      const group = groups[activeGroup];
      const slider = group.slider;
      if (userSettings.draggable && !slider.classList.contains("tobii__slider--is-draggable")) {
        slider.classList.add("tobii__slider--is-draggable");
      }
      const hideButtons = !userSettings.nav || group.elementsLength === 1 || userSettings.nav === "auto" && isTouchDevice();
      setButtonState(prevButton, hideButtons, hideButtons);
      setButtonState(nextButton, hideButtons, hideButtons);
      const hideCounter = !userSettings.counter || group.elementsLength === 1;
      counter.setAttribute("aria-hidden", hideCounter ? "true" : "false");
    };
    const updateLightbox = (dir = null) => {
      updateOffset();
      updateCounter();
      updateFocus(dir);
    };
    const reset = () => {
      if (isOpen()) {
        close();
      }
      const GROUPS_ENTRIES = Object.entries(groups);
      GROUPS_ENTRIES.forEach((groupsEntrie) => {
        const SLIDE_ELS = groupsEntrie[1].gallery;
        SLIDE_ELS.forEach((slideEl) => {
          remove(slideEl);
        });
      });
      groups = {};
      activeGroup = null;
      for (const i in SUPPORTED_ELEMENTS) {
        SUPPORTED_ELEMENTS[i].onReset();
      }
    };
    const destroy = () => {
      reset();
      lightbox.parentNode.removeChild(lightbox);
    };
    const isOpen = () => {
      return lightbox.getAttribute("aria-hidden") === "false";
    };
    const isTouchDevice = () => {
      return "ontouchstart" in window;
    };
    const isIgnoreElement = (el) => {
      return ["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(el.tagName) !== -1 || el === prevButton || el === nextButton || el === closeButton;
    };
    const slidesIndex = () => {
      return groups[activeGroup].currentIndex;
    };
    const slidesCount = () => {
      return groups[activeGroup].elementsLength;
    };
    const currentGroup = () => {
      return activeGroup;
    };
    const on = (eventName, callback) => {
      lightbox.addEventListener(eventName, callback);
    };
    const off = (eventName, callback) => {
      lightbox.removeEventListener(eventName, callback);
    };
    init(userOptions);
    Tobii.open = open;
    Tobii.previous = previous;
    Tobii.next = next;
    Tobii.close = close;
    Tobii.add = checkDependencies;
    Tobii.remove = remove;
    Tobii.reset = reset;
    Tobii.destroy = destroy;
    Tobii.isOpen = isOpen;
    Tobii.slidesIndex = slidesIndex;
    Tobii.select = select;
    Tobii.slidesCount = slidesCount;
    Tobii.selectGroup = selectGroup;
    Tobii.currentGroup = currentGroup;
    Tobii.on = on;
    Tobii.off = off;
    return Tobii;
  }

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\components\gallery.js
  var galleries = document.querySelectorAll(".js-gallery");
  var lightboxLoaded = false;
  var Gallery = class {
    constructor(div) {
      this.gallery = div;
      if (this.gallery) {
        if (!lightboxLoaded) {
          this.init();
        }
      }
    }
    init() {
      lightboxLoaded = true;
      const closeLabel = window.i18n.close;
      const nextLabel = window.i18n.next;
      const previousLabel = window.i18n.previous;
      const tobii = new Tobii({
        captionsSelector: "self",
        captionAttribute: "data-caption",
        zoom: false,
        navLabel: [previousLabel, nextLabel],
        closeLabel
      });
    }
  };
  galleries.forEach((gallery) => {
    scrollspy_default(gallery, () => {
      new Gallery(gallery);
    });
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\blocks\instagram.js
  var instagrams = document.querySelectorAll(".block-instagram");
  var instafeedLoaded = false;
  var BlockInstagram = class {
    constructor(block) {
      this.instagram = block.querySelector(".js-instagram");
      if (this.instagram) {
        if (!instafeedLoaded) {
          this.addFiles();
        } else {
          this.init();
        }
      }
    }
    addFiles() {
      this.instafeedJS = document.createElement("script");
      this.instafeedJS.type = "text/javascript";
      this.instafeedJS.src = "/assets/js/instafeed.min.js";
      document.getElementsByTagName("body")[0].appendChild(this.instafeedJS);
      this.instafeedJS.addEventListener("load", () => {
        instafeedLoaded = true;
        this.init();
      });
    }
    init() {
      let instagramTemplate = '<div><a href="{{link}}" target="_blank"><img title="{{caption}}" src="{{image}}" alt="" width="720" height="720"></a></div>', datas = this.instagram.dataset, instagramToken = datas.token, instagramLimit = parseInt(datas.limit, 10);
      const feed = new Instafeed({
        target: this.instagram,
        limit: instagramLimit,
        accessToken: instagramToken,
        template: instagramTemplate
      });
      feed.run();
    }
  };
  instagrams.forEach((instagram) => {
    scrollspy_default(instagram, () => {
      new BlockInstagram(instagram);
    });
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\components\menu.js
  var header = document.querySelector('header[role="banner"]');
  var Menu = class {
    constructor(elm) {
      this.elm = elm;
      this.init();
    }
    init() {
      this.events = ["scroll", "touchmove"];
      this.previousY = 0;
      this.y = 0;
      this.classSticky = "is-sticky";
      this.classScrollingDown = "is-scrolling-down";
      this.classMenuOpen = "is-menu-open";
      this.classDropdownMenuOpen = "is-dropdown-menu-open";
      this.offcanvas = document.getElementById("navigation");
      this.dropdowns = this.elm.querySelectorAll('[data-bs-toggle="dropdown"]');
      this.offset = this.elm.offsetHeight;
      this.initDropdowns();
      this.initOffcanvas();
      this.initSticky();
    }
    initDropdowns() {
      this.dropdowns.forEach((dropdown) => {
        this.toggleMenu(dropdown, "dropdown", this.classDropdownMenuOpen);
      });
    }
    initOffcanvas() {
      if (this.offcanvas) {
        this.toggleMenu(this.offcanvas, "offcanvas", this.classMenuOpen);
      }
    }
    initSticky() {
      this.events.forEach((event) => {
        window.addEventListener(event, () => {
          this.y = window.scrollY;
          if (this.y > this.offset) {
            this.elm.classList.add(this.classSticky);
          } else {
            this.elm.classList.remove(this.classSticky);
          }
          if (this.y > this.previousY && this.y > this.offset) {
            document.documentElement.classList.add(this.classScrollingDown);
          } else {
            document.documentElement.classList.remove(this.classScrollingDown);
          }
          this.previousY = this.y;
        });
      });
    }
    toggleMenu(elm, component, toggleClass) {
      elm.addEventListener("hidden.bs." + component, () => {
        if (!this.elm.querySelector('[aria-expanded="true"]')) {
          document.documentElement.classList.remove(toggleClass);
        }
      });
      elm.addEventListener("show.bs." + component, () => {
        document.documentElement.classList.add(toggleClass);
      });
    }
  };
  if (header) {
    new Menu(header);
  }

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\dom\data.js
  var elementMap = /* @__PURE__ */ new Map();
  var data_default = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, /* @__PURE__ */ new Map());
      }
      const instanceMap = elementMap.get(element);
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }
      instanceMap.set(key, instance);
    },
    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }
      return null;
    },
    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }
      const instanceMap = elementMap.get(element);
      instanceMap.delete(key);
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\util\index.js
  var MILLISECONDS_MULTIPLIER = 1e3;
  var TRANSITION_END = "transitionend";
  var parseSelector = (selector) => {
    if (selector && window.CSS && window.CSS.escape) {
      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
    }
    return selector;
  };
  var toType = (object) => {
    if (object === null || object === void 0) {
      return `${object}`;
    }
    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  var getTransitionDurationFromElement = (element) => {
    if (!element) {
      return 0;
    }
    let { transitionDuration, transitionDelay } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }
    transitionDuration = transitionDuration.split(",")[0];
    transitionDelay = transitionDelay.split(",")[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };
  var triggerTransitionEnd = (element) => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };
  var isElement = (object) => {
    if (!object || typeof object !== "object") {
      return false;
    }
    if (typeof object.jquery !== "undefined") {
      object = object[0];
    }
    return typeof object.nodeType !== "undefined";
  };
  var getElement = (object) => {
    if (isElement(object)) {
      return object.jquery ? object[0] : object;
    }
    if (typeof object === "string" && object.length > 0) {
      return document.querySelector(parseSelector(object));
    }
    return null;
  };
  var isVisible = (element) => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }
    const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible";
    const closedDetails = element.closest("details:not([open])");
    if (!closedDetails) {
      return elementIsVisible;
    }
    if (closedDetails !== element) {
      const summary = element.closest("summary");
      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }
      if (summary === null) {
        return false;
      }
    }
    return elementIsVisible;
  };
  var isDisabled = (element) => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }
    if (element.classList.contains("disabled")) {
      return true;
    }
    if (typeof element.disabled !== "undefined") {
      return element.disabled;
    }
    return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
  };
  var reflow = (element) => {
    element.offsetHeight;
  };
  var getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
      return window.jQuery;
    }
    return null;
  };
  var DOMContentLoadedCallbacks = [];
  var onDOMContentLoaded = (callback) => {
    if (document.readyState === "loading") {
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener("DOMContentLoaded", () => {
          for (const callback2 of DOMContentLoadedCallbacks) {
            callback2();
          }
        });
      }
      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };
  var defineJQueryPlugin = (plugin) => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;
        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };
  var execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
    return typeof possibleCallback === "function" ? possibleCallback(...args) : defaultValue;
  };
  var executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }
    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;
    const handler = ({ target }) => {
      if (target !== transitionElement) {
        return;
      }
      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };
    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\dom\event-handler.js
  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {};
  var uidEvent = 1;
  var customEvents = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  };
  var nativeEvents = /* @__PURE__ */ new Set([
    "click",
    "dblclick",
    "mouseup",
    "mousedown",
    "contextmenu",
    "mousewheel",
    "DOMMouseScroll",
    "mouseover",
    "mouseout",
    "mousemove",
    "selectstart",
    "selectend",
    "keydown",
    "keypress",
    "keyup",
    "orientationchange",
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointerleave",
    "pointercancel",
    "gesturestart",
    "gesturechange",
    "gestureend",
    "focus",
    "blur",
    "change",
    "reset",
    "select",
    "submit",
    "focusin",
    "focusout",
    "load",
    "unload",
    "beforeunload",
    "resize",
    "move",
    "DOMContentLoaded",
    "readystatechange",
    "error",
    "abort",
    "scroll"
  ]);
  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }
  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }
  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, { delegateTarget: element });
      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }
      return fn.apply(element, [event]);
    };
  }
  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);
      for (let { target } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }
          hydrateObj(event, { delegateTarget: target });
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }
          return fn.apply(target, [event]);
        }
      }
    };
  }
  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
  }
  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === "string";
    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);
    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }
    return [isDelegated, callable, typeEvent];
  }
  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== "string" || !element) {
      return;
    }
    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    if (originalTypeEvent in customEvents) {
      const wrapFunction = (fn2) => {
        return function(event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn2.call(this, event);
          }
        };
      };
      callable = wrapFunction(callable);
    }
    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }
    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);
    if (!fn) {
      return;
    }
    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }
  function getTypeEvent(event) {
    event = event.replace(stripNameRegex, "");
    return customEvents[event] || event;
  }
  var EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },
    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },
    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== "string" || !element) {
        return;
      }
      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith(".");
      if (typeof callable !== "undefined") {
        if (!Object.keys(storeElementEvent).length) {
          return;
        }
        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }
      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }
      for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, "");
        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },
    trigger(element, event, args) {
      if (typeof event !== "string" || !element) {
        return null;
      }
      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }
      const evt = hydrateObj(new Event(event, { bubbles, cancelable: true }), args);
      if (defaultPrevented) {
        evt.preventDefault();
      }
      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }
      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }
      return evt;
    }
  };
  function hydrateObj(obj, meta = {}) {
    for (const [key, value] of Object.entries(meta)) {
      try {
        obj[key] = value;
      } catch {
        Object.defineProperty(obj, key, {
          configurable: true,
          get() {
            return value;
          }
        });
      }
    }
    return obj;
  }
  var event_handler_default = EventHandler;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\dom\manipulator.js
  function normalizeData(value) {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    if (value === Number(value).toString()) {
      return Number(value);
    }
    if (value === "" || value === "null") {
      return null;
    }
    if (typeof value !== "string") {
      return value;
    }
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch {
      return value;
    }
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
  }
  var Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },
    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },
    getDataAttributes(element) {
      if (!element) {
        return {};
      }
      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter((key) => key.startsWith("bs") && !key.startsWith("bsConfig"));
      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, "");
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }
      return attributes;
    },
    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }
  };
  var manipulator_default = Manipulator;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\util\config.js
  var Config = class {
    // Getters
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      return config;
    }
    _mergeConfigObj(config, element) {
      const jsonConfig = isElement(element) ? manipulator_default.getDataAttribute(element, "config") : {};
      return {
        ...this.constructor.Default,
        ...typeof jsonConfig === "object" ? jsonConfig : {},
        ...isElement(element) ? manipulator_default.getDataAttributes(element) : {},
        ...typeof config === "object" ? config : {}
      };
    }
    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const [property, expectedTypes] of Object.entries(configTypes)) {
        const value = config[property];
        const valueType = isElement(value) ? "element" : toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(
            `${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`
          );
        }
      }
    }
  };
  var config_default = Config;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\base-component.js
  var VERSION = "5.3.3";
  var BaseComponent = class extends config_default {
    constructor(element, config) {
      super();
      element = getElement(element);
      if (!element) {
        return;
      }
      this._element = element;
      this._config = this._getConfig(config);
      data_default.set(this._element, this.constructor.DATA_KEY, this);
    }
    // Public
    dispose() {
      data_default.remove(this._element, this.constructor.DATA_KEY);
      event_handler_default.off(this._element, this.constructor.EVENT_KEY);
      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }
    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    // Static
    static getInstance(element) {
      return data_default.get(getElement(element), this.DATA_KEY);
    }
    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
    }
    static get VERSION() {
      return VERSION;
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }
  };
  var base_component_default = BaseComponent;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\dom\selector-engine.js
  var getSelector = (element) => {
    let selector = element.getAttribute("data-bs-target");
    if (!selector || selector === "#") {
      let hrefAttribute = element.getAttribute("href");
      if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) {
        return null;
      }
      if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
        hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
      }
      selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
    }
    return selector ? selector.split(",").map((sel) => parseSelector(sel)).join(",") : null;
  };
  var SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },
    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },
    children(element, selector) {
      return [].concat(...element.children).filter((child) => child.matches(selector));
    },
    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);
      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }
      return parents;
    },
    prev(element, selector) {
      let previous = element.previousElementSibling;
      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }
        previous = previous.previousElementSibling;
      }
      return [];
    },
    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;
      while (next) {
        if (next.matches(selector)) {
          return [next];
        }
        next = next.nextElementSibling;
      }
      return [];
    },
    focusableChildren(element) {
      const focusables = [
        "a",
        "button",
        "input",
        "textarea",
        "select",
        "details",
        "[tabindex]",
        '[contenteditable="true"]'
      ].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
      return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
    },
    getSelectorFromElement(element) {
      const selector = getSelector(element);
      if (selector) {
        return SelectorEngine.findOne(selector) ? selector : null;
      }
      return null;
    },
    getElementFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.findOne(selector) : null;
    },
    getMultipleElementsFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.find(selector) : [];
    }
  };
  var selector_engine_default = SelectorEngine;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\util\backdrop.js
  var NAME = "backdrop";
  var CLASS_NAME_FADE = "fade";
  var CLASS_NAME_SHOW = "show";
  var EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`;
  var Default = {
    className: "modal-backdrop",
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: "body"
    // give the choice to place backdrop under different elements
  };
  var DefaultType = {
    className: "string",
    clickCallback: "(function|null)",
    isAnimated: "boolean",
    isVisible: "boolean",
    rootElement: "(element|string)"
  };
  var Backdrop = class extends config_default {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }
    // Getters
    static get Default() {
      return Default;
    }
    static get DefaultType() {
      return DefaultType;
    }
    static get NAME() {
      return NAME;
    }
    // Public
    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._append();
      const element = this._getElement();
      if (this._config.isAnimated) {
        reflow(element);
      }
      element.classList.add(CLASS_NAME_SHOW);
      this._emulateAnimation(() => {
        execute(callback);
      });
    }
    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._getElement().classList.remove(CLASS_NAME_SHOW);
      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    }
    dispose() {
      if (!this._isAppended) {
        return;
      }
      event_handler_default.off(this._element, EVENT_MOUSEDOWN);
      this._element.remove();
      this._isAppended = false;
    }
    // Private
    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement("div");
        backdrop.className = this._config.className;
        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE);
        }
        this._element = backdrop;
      }
      return this._element;
    }
    _configAfterMerge(config) {
      config.rootElement = getElement(config.rootElement);
      return config;
    }
    _append() {
      if (this._isAppended) {
        return;
      }
      const element = this._getElement();
      this._config.rootElement.append(element);
      event_handler_default.on(element, EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }
    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }
  };
  var backdrop_default = Backdrop;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\util\component-functions.js
  var enableDismissTrigger = (component, method = "hide") => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    event_handler_default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
      if (["A", "AREA"].includes(this.tagName)) {
        event.preventDefault();
      }
      if (isDisabled(this)) {
        return;
      }
      const target = selector_engine_default.getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target);
      instance[method]();
    });
  };

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\util\focustrap.js
  var NAME2 = "focustrap";
  var DATA_KEY = "bs.focustrap";
  var EVENT_KEY = `.${DATA_KEY}`;
  var EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  var EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`;
  var TAB_KEY = "Tab";
  var TAB_NAV_FORWARD = "forward";
  var TAB_NAV_BACKWARD = "backward";
  var Default2 = {
    autofocus: true,
    trapElement: null
    // The element to trap focus inside of
  };
  var DefaultType2 = {
    autofocus: "boolean",
    trapElement: "element"
  };
  var FocusTrap = class extends config_default {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    }
    // Getters
    static get Default() {
      return Default2;
    }
    static get DefaultType() {
      return DefaultType2;
    }
    static get NAME() {
      return NAME2;
    }
    // Public
    activate() {
      if (this._isActive) {
        return;
      }
      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }
      event_handler_default.off(document, EVENT_KEY);
      event_handler_default.on(document, EVENT_FOCUSIN, (event) => this._handleFocusin(event));
      event_handler_default.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
      this._isActive = true;
    }
    deactivate() {
      if (!this._isActive) {
        return;
      }
      this._isActive = false;
      event_handler_default.off(document, EVENT_KEY);
    }
    // Private
    _handleFocusin(event) {
      const { trapElement } = this._config;
      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }
      const elements = selector_engine_default.focusableChildren(trapElement);
      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }
    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }
      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }
  };
  var focustrap_default = FocusTrap;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\util\scrollbar.js
  var SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
  var SELECTOR_STICKY_CONTENT = ".sticky-top";
  var PROPERTY_PADDING = "padding-right";
  var PROPERTY_MARGIN = "margin-right";
  var ScrollBarHelper = class {
    constructor() {
      this._element = document.body;
    }
    // Public
    getWidth() {
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
    hide() {
      const width = this.getWidth();
      this._disableOverFlow();
      this._setElementAttributes(this._element, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, (calculatedValue) => calculatedValue - width);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow");
      this._resetElementAttributes(this._element, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    // Private
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow");
      this._element.style.overflow = "hidden";
    }
    _setElementAttributes(selector, styleProperty, callback) {
      const scrollbarWidth = this.getWidth();
      const manipulationCallBack = (element) => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }
        this._saveInitialAttribute(element, styleProperty);
        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _saveInitialAttribute(element, styleProperty) {
      const actualValue = element.style.getPropertyValue(styleProperty);
      if (actualValue) {
        manipulator_default.setDataAttribute(element, styleProperty, actualValue);
      }
    }
    _resetElementAttributes(selector, styleProperty) {
      const manipulationCallBack = (element) => {
        const value = manipulator_default.getDataAttribute(element, styleProperty);
        if (value === null) {
          element.style.removeProperty(styleProperty);
          return;
        }
        manipulator_default.removeDataAttribute(element, styleProperty);
        element.style.setProperty(styleProperty, value);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _applyManipulationCallback(selector, callBack) {
      if (isElement(selector)) {
        callBack(selector);
        return;
      }
      for (const sel of selector_engine_default.find(selector, this._element)) {
        callBack(sel);
      }
    }
  };
  var scrollbar_default = ScrollBarHelper;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\offcanvas.js
  var NAME3 = "offcanvas";
  var DATA_KEY2 = "bs.offcanvas";
  var EVENT_KEY2 = `.${DATA_KEY2}`;
  var DATA_API_KEY = ".data-api";
  var EVENT_LOAD_DATA_API = `load${EVENT_KEY2}${DATA_API_KEY}`;
  var ESCAPE_KEY = "Escape";
  var CLASS_NAME_SHOW2 = "show";
  var CLASS_NAME_SHOWING = "showing";
  var CLASS_NAME_HIDING = "hiding";
  var CLASS_NAME_BACKDROP = "offcanvas-backdrop";
  var OPEN_SELECTOR = ".offcanvas.show";
  var EVENT_SHOW = `show${EVENT_KEY2}`;
  var EVENT_SHOWN = `shown${EVENT_KEY2}`;
  var EVENT_HIDE = `hide${EVENT_KEY2}`;
  var EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY2}`;
  var EVENT_HIDDEN = `hidden${EVENT_KEY2}`;
  var EVENT_RESIZE = `resize${EVENT_KEY2}`;
  var EVENT_CLICK_DATA_API = `click${EVENT_KEY2}${DATA_API_KEY}`;
  var EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY2}`;
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
  var Default3 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  var DefaultType3 = {
    backdrop: "(boolean|string)",
    keyboard: "boolean",
    scroll: "boolean"
  };
  var Offcanvas = class _Offcanvas extends base_component_default {
    constructor(element, config) {
      super(element, config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._addEventListeners();
    }
    // Getters
    static get Default() {
      return Default3;
    }
    static get DefaultType() {
      return DefaultType3;
    }
    static get NAME() {
      return NAME3;
    }
    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown) {
        return;
      }
      const showEvent = event_handler_default.trigger(this._element, EVENT_SHOW, { relatedTarget });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._backdrop.show();
      if (!this._config.scroll) {
        new scrollbar_default().hide();
      }
      this._element.setAttribute("aria-modal", true);
      this._element.setAttribute("role", "dialog");
      this._element.classList.add(CLASS_NAME_SHOWING);
      const completeCallBack = () => {
        if (!this._config.scroll || this._config.backdrop) {
          this._focustrap.activate();
        }
        this._element.classList.add(CLASS_NAME_SHOW2);
        this._element.classList.remove(CLASS_NAME_SHOWING);
        event_handler_default.trigger(this._element, EVENT_SHOWN, { relatedTarget });
      };
      this._queueCallback(completeCallBack, this._element, true);
    }
    hide() {
      if (!this._isShown) {
        return;
      }
      const hideEvent = event_handler_default.trigger(this._element, EVENT_HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._focustrap.deactivate();
      this._element.blur();
      this._isShown = false;
      this._element.classList.add(CLASS_NAME_HIDING);
      this._backdrop.hide();
      const completeCallback = () => {
        this._element.classList.remove(CLASS_NAME_SHOW2, CLASS_NAME_HIDING);
        this._element.removeAttribute("aria-modal");
        this._element.removeAttribute("role");
        if (!this._config.scroll) {
          new scrollbar_default().reset();
        }
        event_handler_default.trigger(this._element, EVENT_HIDDEN);
      };
      this._queueCallback(completeCallback, this._element, true);
    }
    dispose() {
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }
    // Private
    _initializeBackDrop() {
      const clickCallback = () => {
        if (this._config.backdrop === "static") {
          event_handler_default.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }
        this.hide();
      };
      const isVisible2 = Boolean(this._config.backdrop);
      return new backdrop_default({
        className: CLASS_NAME_BACKDROP,
        isVisible: isVisible2,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible2 ? clickCallback : null
      });
    }
    _initializeFocusTrap() {
      return new focustrap_default({
        trapElement: this._element
      });
    }
    _addEventListeners() {
      event_handler_default.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
        if (event.key !== ESCAPE_KEY) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        event_handler_default.trigger(this._element, EVENT_HIDE_PREVENTED);
      });
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Offcanvas.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  };
  event_handler_default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
    const target = selector_engine_default.getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    event_handler_default.one(target, EVENT_HIDDEN, () => {
      if (isVisible(this)) {
        this.focus();
      }
    });
    const alreadyOpen = selector_engine_default.findOne(OPEN_SELECTOR);
    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }
    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  event_handler_default.on(window, EVENT_LOAD_DATA_API, () => {
    for (const selector of selector_engine_default.find(OPEN_SELECTOR)) {
      Offcanvas.getOrCreateInstance(selector).show();
    }
  });
  event_handler_default.on(window, EVENT_RESIZE, () => {
    for (const element of selector_engine_default.find("[aria-modal][class*=show][class*=offcanvas-]")) {
      if (getComputedStyle(element).position !== "fixed") {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  });
  enableDismissTrigger(Offcanvas);
  defineJQueryPlugin(Offcanvas);
  var offcanvas_default = Offcanvas;

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\components\toc.js
  document.addEventListener("DOMContentLoaded", function() {
    if (window.matchMedia("(max-width: 991.98px)").matches) {
      const myOffcanvas = document.getElementById("toc");
      if (myOffcanvas) {
        const bsOffcanvas = new offcanvas_default(myOffcanvas);
        const menuLinks = myOffcanvas.querySelectorAll("a");
        for (var i = 0; i < menuLinks.length; i++) {
          menuLinks[i].addEventListener("click", function(event) {
            event.preventDefault();
            bsOffcanvas.hide();
            setTimeout(() => {
              location = event.target;
            }, "500");
          });
        }
      }
    }
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\components\video.js
  document.addEventListener("DOMContentLoaded", function() {
    let lazyVideos = [].slice.call(
      document.querySelectorAll(".js-video.is-lazy")
    );
    if (lazyVideos.length > 0) {
      if ("IntersectionObserver" in window) {
        let lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(video) {
            if (video.isIntersecting) {
              let hasMobileVideo = false;
              for (let source in video.target.children) {
                let videoSource = video.target.children[source];
                if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                  if (videoSource.hasAttribute("data-src_mobile")) {
                    hasMobileVideo = true;
                  }
                  if (window.matchMedia("(max-width: 767px)").matches && hasMobileVideo) {
                    if (videoSource.hasAttribute("data-src_mobile")) {
                      videoSource.src = videoSource.dataset.src_mobile;
                    }
                  } else {
                    if (videoSource.hasAttribute("data-src")) {
                      videoSource.src = videoSource.dataset.src;
                    }
                  }
                }
              }
              video.target.load();
              video.target.classList.remove("is-lazy");
              lazyVideoObserver.unobserve(video.target);
            }
          });
        });
        lazyVideos.forEach(function(lazyVideo) {
          lazyVideoObserver.observe(lazyVideo);
        });
      }
    }
  });
})();
