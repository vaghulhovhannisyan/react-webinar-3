/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    let id = 0;
    this.state.list.forEach(element => {
      if (element.code > id) {
        id = element.code;
      }
    });
    this.setState({
      ...this.state,
<<<<<<< Updated upstream
      list: [...this.state.list, { code: id + 1, title: 'Новая запись', click: 0, selected: 0}],
=======
      list: [...this.state.list, { code: id + 1, title: 'Новая запись', click: 0}],
>>>>>>> Stashed changes
    });
  }
  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */

  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (item.selected == 0) {
            this.state.list.forEach(element => {
              element.selected = 0;
            });
            item.selected = 1;
            item.click++
          }else{
            this.state.list.forEach(element => {
              element.selected = 0;
            });
            item.selected = 0;
          }
        }
        return item;
      }),
    });
  }
}

export default Store;
