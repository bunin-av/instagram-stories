import {ClassSwitcher} from './class-switcher.js';
import {Overlay} from './overlays/overlay.js';
import * as Overlays from './overlays/index.js';


/**
 * typedef {{url:string, alt?:string, overlays?: Overlay[]}}
 */
const Slide = null;

/**
 * typedef {Array<Slide>}
 */
const Slides = null;

export class Player {
  /**
   * Контейнер для плеера
   * @type {Element}
   */
  target;

  /**
   * Список слайдов плеера
   * @type {Slides}
   */
  slides;

  /**
   * Как долго показывается один слайд в секундах
   * @type {number}
   */
  delay = 1;

  /**
   * Экземпляр ClassSwitcher
   * @protected
   */
  cs;


  /**
   *  Создает объект плеера
   *
   * @param {{
   *   target: string;
   *   slides: Slides;
   *   delay?: number;
   * }=} [props] - параметры инициализации
   *
   * 1. target - место инициализации плеера, CSS селектор
   * 2. slides - список слайдов плеера
   * 3. [delay] - как долго опказывается один слайд в секундах
   */

  constructor(props) {
    this.target = document.querySelector(props?.target);
    if (this.target == null) {
      throw new ReferenceError('Target in player is not specified');
    }

    this.slides = props?.slides;
    if (!Array.isArray(this.slides)) {
      throw new TypeError('Bad slides type')
    }

    this.delay = props?.delay ?? this.delay;
    this.cs = new ClassSwitcher(this.target);
debugger
    this.mount();
  }

  /**
   * Монтирует эелементы плеера в target
   */
  mount() {
    this.target.appendChild(this.generatePlayerLayout());

    this.cs.addEventListeners();
    this.cs.runChunkSwitching(this.delay, 1);
  }

  /**
   * Генерирует элементы временной шкалы
   * @returns {DocumentFragment}
   */
  generateTimelineChunks() {
    const wrapper = document.createDocumentFragment();
    for (const idx of this.slides.keys()) {
      const elem = document.createElement('div');

      elem.innerHTML = `
      <div class="timeline-chunk ${idx === 0 ? 'timeline-chunk-active' : ''}">
        <div class="timeline-chunk-inner"></div>
      </div>`;

      wrapper.appendChild(elem.children[0]);
    }

    return wrapper
  }

  /**
   * Генерирует элементы слайдов
   * @returns {DocumentFragment}
   */
  generatePlayerChunks() {
    const wrapper = document.createDocumentFragment();

    for (const [idx, slide] of this.slides.entries()) {
      const style = [];


      if (slide.filter) {
        style.push(`filter: ${slide.filter.join(' ')}`);
      }

      const elem = document.createElement('div');

      elem.innerHTML = `
      <div class="player-chunk ${idx === 0 ? 'player-chunk-active' : ''}">
        <img src="${slide.url}" alt="${slide.alt || 'image'}" style="${style.join(';')}">
      </div>`;

      const chunk = elem.children[0];

      chunk.appendChild(this.generateOverlays(slide));

      wrapper.appendChild(chunk);
    }

    return wrapper;
  }

  /**
   * Генерирует элементы наложений
   * @param {Slide} slide - объект слайда
   * @returns {DocumentFragment}
   */
  generateOverlays(slide) {
    const wrapper = document.createDocumentFragment();

    if (slide.overlays == null) return wrapper;

    for (const props of slide.overlays) {
      if(!(props.type in Overlays)){
        throw new TypeError(`The specified type of overlay ${props.type} is not defined`);
      }
      const overlay = new Overlays[props.type](props);
      wrapper.appendChild(overlay.render());
    }

    return wrapper;
  }

  /**
   * Генерирует элементы плеера
   * @returns {Element}
   */
  generatePlayerLayout() {
    const timeline = document.createElement('div');
    timeline.setAttribute('class', 'timeline');
    timeline.appendChild(this.generateTimelineChunks());

    const content = document.createElement('div');
    content.setAttribute('class', 'player-content');
    content.appendChild(this.generatePlayerChunks());

    const contentWrapper = document.createElement('div');
    contentWrapper.setAttribute('class', 'player-content-wrapper');
    contentWrapper.innerHTML = `
       <div class="player-chunk-switcher player-chunk-prev"></div>
       <div class="player-chunk-switcher player-chunk-next"></div>
    `;
    contentWrapper.appendChild(content);

    const player = document.createElement('div');
    player.setAttribute('class', 'player');
    player.appendChild(timeline);
    player.appendChild(contentWrapper);

    return player;
  }
}
