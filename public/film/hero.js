// Load only the selected film; keep stills until a frame is playing.
(function () {
  var hero = document.querySelector('.home-hero');
  if (!hero) return;
  var slides = Array.from(hero.querySelectorAll('.home-hero-slide'));
  var links = Array.from(hero.querySelectorAll('.home-titles a'));
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var paused = reducedMotion.matches || !!(navigator.connection && navigator.connection.saveData);
  var visible = true;
  var active = slides[0];

  function sync() {
    slides.forEach(function (slide) {
      var video = slide.querySelector('video');
      if (slide !== active || paused || !visible || document.hidden) {
        video.pause();
        return;
      }
      if (!video.getAttribute('src')) video.src = video.dataset.src;
      video.muted = true;
      video.play().catch(function () {
        // Autoplay can be blocked; retain the still fallback.
      });
    });
  }

  slides.forEach(function (slide) {
    var video = slide.querySelector('video');
    video.addEventListener('playing', function () {
      slide.classList.add('has-video');
    });
    video.addEventListener('error', function () {
      slide.classList.remove('has-video');
    });
  });

  function show(key) {
    slides.forEach(function (slide) {
      var on = slide.dataset.slide === key;
      slide.classList.toggle('is-active', on);
      slide.setAttribute('aria-hidden', String(!on));
      if (on) active = slide;
    });
    links.forEach(function (link) {
      link.parentNode.classList.toggle('is-active', link.dataset.slide === key);
    });
    sync();
  }

  links.forEach(function (link) {
    link.addEventListener('mouseenter', function () { show(link.dataset.slide); });
    link.addEventListener('focus', function () { show(link.dataset.slide); });
  });
  reducedMotion.addEventListener('change', function (event) {
    paused = event.matches || !!(navigator.connection && navigator.connection.saveData);
    sync();
  });
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      sync();
    }).observe(hero);
  }
  show(links[0].dataset.slide);
})();
