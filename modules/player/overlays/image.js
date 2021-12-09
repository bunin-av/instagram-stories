import {Overlay} from "./overlay.js";

export class Image extends Overlay {
  /**
   * Путь к картинке
   * @type {string}
   */
  src;

  /**
   * Альтернативный текст изображения
   * @type {string}
   */
  alt = '';

  /**
   * override
   *
   * @param {{
   *   type: string;
   *   src: string;
   *   alt?: string;
   *   classes?: string[];
   *   styles?: Object<string, string>;
   * }=} [props] - параметры наложения
   *
   * 1. src - путь к изображению
   * 2. [alt] - альтерантивный текст изображения
   */

  constructor(props) {
    super(props);

    this.src = props?.src;

    if (typeof this.src !== 'string') {
      throw new TypeError('Src of the created image overlay is not specified');
    }

    this.alt = props?.alt ?? this.alt;
  }

  /**override**/
  render() {
    const elem = super.render();

    elem.innerHTML = `<img src="${this.src}" alt="${this.alt}">`

    return elem;
  }
}
