import {Overlay} from "./overlay.js";

export class Text extends Overlay {
  /**
   * Текст-содержимое наложения
   * @type {string}
   */
  text;

  /**
   * override
   *
   * @param {{
   *   type: string;
   *   text: string;
   *   classes?: string[];
   *   styles?: Object<string, string>;
   * }=} [props] - параметры наложения
   *
   * 1. text - текст-содержимое наложения
   */

  constructor(props) {
    super(props);
    this.text = props?.text;

    if (typeof this.text !== 'string') {
      throw new TypeError('Text of the created overlay is not specified');
    }
  }

  /**override**/
  render() {
    const elem = super.render();

    const textElem = document.createElement('span');
    textElem.textContent = this.text;

    elem.appendChild(textElem);

    return elem;
  }
}
