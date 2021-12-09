import {Overlay} from './overlay.js';

export class Question extends Overlay {
  /**
   * Текст вопроса
   * @type {string}
   */
  question;

  /**
   * Варианты ответа
   * @type {string[]}
   */
  variants = ['Yes', 'No'];

  /**
   * override
   *
   * @param {{
   *   type: string;
   *   question: string;
   *   variants?: string[];
   *   classes?: string[];
   *   styles?: Object<string, string>;
   * }=} [props] - параметры наложения
   *
   * 1. question - текст вопроса
   * 2. [variants] - варианты ответа
   */

  constructor(props) {
    super(props);

    this.question = props?.question;

    if (typeof this.question !== 'string') {
      throw new TypeError('Question text of the created question overlay is not specified');
    }

    this.variants = props?.variants ?? this.variants;

    if (this.variants.length === 0) {
      throw new Error('Amount of question variants should be at least one');
    }
  }

  /**override**/
  render() {
    const elem = super.render();

    elem.innerHTML = `
      <div class="question">
        ${this.question}
        <div class="question-answers">
          ${this.variants.map((label, i) => `<button value="${i}">${label}</button>`).join(' ')}
        </div>
      </div>`;

    return elem;
  }
}
