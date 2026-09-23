// Small progressive enhancements. Every page works without this file.

// Hero loop: respect reduced-motion, and give a pause/play control.
document.querySelectorAll("video[data-loop]").forEach(function (v) {
  var btn = v.parentElement.querySelector(".motion-toggle");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function label() { if (btn) btn.textContent = v.paused ? "Play" : "Pause"; }
  var userPaused = false;
  function tryPlay() {
    if (reduce || userPaused) return;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  if (reduce) { v.removeAttribute("autoplay"); v.pause(); }
  tryPlay();
  // Some browsers skip autoplay if the tab was hidden at load; retry when it can play or becomes visible.
  v.addEventListener("canplay", tryPlay);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) tryPlay(); });
  v.addEventListener("play", label);
  v.addEventListener("pause", label);
  if (btn) btn.addEventListener("click", function () {
    if (v.paused) { userPaused = false; v.play(); } else { userPaused = true; v.pause(); }
  });
  label();
});

// Click-to-enlarge for figures wrapped in <a class="zoom">.
(function () {
  var links = document.querySelectorAll("a.zoom");
  if (!links.length) return;
  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Enlarged image");
  box.innerHTML = '<button type="button">Close</button><img alt="">';
  document.body.appendChild(box);
  var img = box.querySelector("img");
  var closeBtn = box.querySelector("button");
  var last = null;
  function close() { box.classList.remove("open"); img.removeAttribute("src"); if (last) last.focus(); }
  links.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      last = a;
      var inner = a.querySelector("img");
      img.src = a.getAttribute("href");
      img.alt = inner ? inner.alt : "";
      box.classList.add("open");
      closeBtn.focus();
    });
  });
  box.addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && box.classList.contains("open")) close(); });
})();

// Email links: many visitors have no mail app set up, so a mailto: click can silently do nothing.
// Also copy the address and say so, while still letting the mail app open if there is one.
(function () {
  var toast;
  function show(msg) {
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(show.t);
    show.t = setTimeout(function () { toast.classList.remove("show"); }, 3500);
  }
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
    a.addEventListener("click", function () {
      var addr = a.getAttribute("href").replace("mailto:", "").split("?")[0];
      var done = function () { show("Copied " + addr + " to your clipboard"); };
      var fail = function () { show("Email me at " + addr); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(addr).then(done, fail);
      else fail();
    });
  });
})();
