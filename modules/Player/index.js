/**
 * Инициализирует плеер stories
 * @param {{
 * target: string,
 * slides: Array<{
 * utl:string,
 * alt?:string,
 * overlays: Array<{
 * type: string,
 * value: string,
 * styles: Object
 * }>
 * }>,
 * delay?: number
 * }}
 * @returns {Element|null}
 */

function initPlayer({target, slides, delay}) {
  const
    element = document.querySelector(target);

  if (!element || !slides) return null;

  let
    timelineChunks = '',
    playerChunks = '',
    timer;

  slides.forEach((el, idx) => {
    const {url, alt, overlays} = el
    console.log(el)
    timelineChunks += generateTimelineChunks(idx);
    playerChunks += generatePlayerChunks(el, idx);
  })

  element.innerHTML = generatePlayer()

  function moveActiveClass(className, direction) {
    const
      active = element.querySelector(`.${className}`),
      sibling = active[`${direction}ElementSibling`];

    if (sibling) {
      active.classList.remove(className);
      sibling.classList.add(className);

      const
        timeChunkActive = active.querySelector('.timeline-chunk-inner');
      if (timeChunkActive) timeChunkActive.style.width = '';
      // return active;
    }
    // return null;
  }

  function changeSlide(direction) {
    moveActiveClass('player-chunk-active', direction);
    moveActiveClass('timeline-chunk-active', direction);
    // if (el) el.querySelector('.timeline-chunk-inner').style.width = '';
  }

  function generateTimelineChunks(idx) {
    return `
    <div class="timeline-chunk ${idx === 0 ? 'timeline-chunk-active' : ''}">
      <div class="timeline-chunk-inner"></div>
    </div>`;
  }

  function generatePlayerChunks(el, idx) {
    const {url, alt, overlays} = el;

    return `
    <div class="player-chunk ${idx === 0 ? 'player-chunk-active' : ''}">
      <img src="${url}" alt="${alt || 'image'}">
      ${generateOverlays(overlays)}
    </div>`;
  }

  function generateOverlays(overlays) {
    if (!overlays) return '';

    let
      layout = '';

    for (const el of overlays) {
      const styles = (el.styles ? Object
        .entries(el.styles) : [])
        .map((el) => el.join(':'))
        .join(';');

      layout += `<div class="player-chunk-overlay" style="${styles}">${renderOverlay(el)}</div>`;
    }

    function renderOverlay(el) {
      if (el.type === 'text') {
        return el.value;
      }
      if (el.type === 'img') {
        return `<img src="${el.value}" alt="${el.alt}">`;
      }
      return '';
    }

    return layout;
  }

  function generatePlayer() {
    return `
    <div class="player">
      <div class="timeline">${timelineChunks}</div>
    
      <div class="player-content-wrapper">
        <div class="player-chunk-switcher player-chunk-prev"></div>
        <div class="player-chunk-switcher player-chunk-next"></div>
        <div class="player-content">${playerChunks}</div>
      </div>
    </div>`;
  }

  element
    .querySelector('.player-chunk-next')
    .addEventListener('click', () => changeSlide('next'));

  element
    .querySelector('.player-chunk-prev')
    .addEventListener('click', () => {

      const
        active = element
          .querySelector('.timeline-chunk-active')
          .querySelector('.timeline-chunk-inner')

      if (active.style.width < '50%') changeSlide('previous');
      else active.style.width = '';
    });

  function runInterval(delay = 2, step) {
    clearInterval(timer);

    timer = setInterval(() => {
      const
        active = element
          .querySelector('.timeline-chunk-active')
          .querySelector('.timeline-chunk-inner');

      const
        width = parseFloat(active.style.width) || 0;

      if (width === 100) {
        changeSlide('next');

        return;
      }

      active.style.width = String(width + step) + '%';
    }, delay * 1000 * step / 100);

    return timer;
  }

  runInterval(delay, 1)

  return element.querySelector('.player')
}


