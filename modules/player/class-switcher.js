export class ClassSwitcher {
  /**
   * Корневой элемент
   * @type {Element}
   */
  root;
  /**
   * Идентификатор таймера
   * @type {number|undefined}
   */
  timer;

  /**
   *
   * @param {Element} root - корневой элемент
   */
  constructor(root) {
    this.root = root;

    if (!(this.root instanceof Element)) {
      throw new TypeError('The root element is not defined');
    }
  }

  moveActiveClass(className, direction) {
    const
      active = this.root.querySelector(`.${className}`),
      sibling = active[`${direction}ElementSibling`];

    if (sibling) {
      active.classList.remove(className);
      sibling.classList.add(className);

      const
        timeChunkActive = active.querySelector('.timeline-chunk-inner');
      if (timeChunkActive) timeChunkActive.style.width = '';
    }
  }

  changeSlide(direction) {
    this.moveActiveClass('player-chunk-active', direction);
    this.moveActiveClass('timeline-chunk-active', direction);
  }

  addEventListeners() {
    this.root
      .querySelector('.player-chunk-next')
      .addEventListener('click', this.changeSlide.bind(this, 'next'));

    this.root
      .querySelector('.player-chunk-prev')
      .addEventListener('click', () => {

        const
          active = this.root
            .querySelector('.timeline-chunk-active')
            .querySelector('.timeline-chunk-inner')

        if (active.style.width < '50%') this.changeSlide.call(this, 'previous');
        else active.style.width = '';
      });
  }


  runChunkSwitching(delay = 2, step) {
    clearInterval(this.timer);

    this.timer = setInterval(() => {
      const
        active = this.root
          .querySelector('.timeline-chunk-active')
          .querySelector('.timeline-chunk-inner');

      const
        width = parseFloat(active.style.width) || 0;

      if (width === 100) {
        this.changeSlide.call(this, 'next');
        return;
      }

      active.style.width = String(width + step) + '%';
    }, delay * 1000 * step / 100);

    return this.timer;
  }
}
