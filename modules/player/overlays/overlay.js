export class Overlay {
  /**
   * Тип наложения
   * @type {string}
   */
  type;
  /**
   * Список дополнительных классов для наложения
   * @type {string[]}
   */
  classes = [];

  /**
   * Словарь дополнительных стилей для наложения
   * @type {Object<string, string>}
   */
  styles = {};

  /**
   *
   * @param {{
   *   type: string;
   *   classes?: string[];
   *   styles?: Object<string, string>;
   * }=} [props] - параметры наложения
   *
   * 1. type - тип создаваемго наложения
   * 2. [classes] - список дополнительных классов
   * 3. [styles] - список дополнительных стилей
   */
  constructor(props) {
    this.type = props.type;

    if(typeof this.type !== 'string'){
      throw new TypeError('Type of the created overlay is not specified');
    }

    this.classes = props?.classes ?? this.classes;

    if (!Array.isArray(this.classes)) {
      throw new TypeError('Additional classes can be only as array');
    }

    this.styles = props?.styles ?? this.classes;

    if(typeof this.styles !== 'object'){
      throw new TypeError('Additional classes can be only as object');
    }
  }

  /**
   * Рендерит исходное наложение
   * @returns {Element}
   */
  render() {
    const classes = this.classes.join(' ');

    const styles = Object
      .entries(this.styles)
      .map(el => el.join(':'))
      .join(';');

    const tpl = `<div class="player-chunk-overlay ${classes}" style="${styles}"></div>`;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = tpl;

    return wrapper.children[0];
  }
}
