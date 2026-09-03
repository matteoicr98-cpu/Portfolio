(() => {
  const track = document.querySelector('.dgtl-gallery-track');
  if (!track) return;
  const previous = document.querySelector('[data-gallery-prev]');
  const next = document.querySelector('[data-gallery-next]');
  const count = document.querySelector('[data-gallery-count]');
  const photos = Array.from(track.children);
  const mobile = matchMedia('(max-width:760px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
  const format = number => String(number).padStart(2, '0');
  let frame = 0;

  function update() {
    frame = 0;
    const bounds = track.getBoundingClientRect();
    const visible = photos.map((photo, index) => ({photo, index})).filter(({photo}) => {
      const rect = photo.getBoundingClientRect();
      return Math.min(rect.right, bounds.right) - Math.max(rect.left, bounds.left) > rect.width * .5;
    });
    if (visible.length) {
      const first = visible[0].index + 1;
      const last = visible[visible.length - 1].index + 1;
      const value = `${format(first)}${first === last ? '' : '–' + format(last)} / ${format(photos.length)}`;
      if (count.textContent !== value) count.textContent = value;
    }
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  }

  function move(direction) {
    const gap = parseFloat(getComputedStyle(track).columnGap);
    const step = (photos[0].getBoundingClientRect().width + gap) * (mobile.matches ? 1 : 2);
    track.scrollBy({left:direction * step, behavior:reducedMotion.matches ? 'instant' : 'smooth'});
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(update);
  }, {passive:true});
  track.addEventListener('keydown', event => {
    if (event.target !== track) return;
    if (['ArrowLeft','ArrowRight','PageUp','PageDown'].includes(event.key)) {
      event.preventDefault();
      move(['ArrowLeft','PageUp'].includes(event.key) ? -1 : 1);
    } else if (['Home','End'].includes(event.key)) {
      event.preventDefault();
      track.scrollTo({left:event.key === 'Home' ? 0 : track.scrollWidth, behavior:'instant'});
    }
  });
  new ResizeObserver(update).observe(track);
  update();
})();
