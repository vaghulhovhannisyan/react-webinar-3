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
   * Выделение записи по коду
   * @param code
   */
  addItem(code) {
    let item = this.state.list.find(item => item.code == code)
    let id = 0
    this.state.list2.forEach(element => {
      if (element.code == code) {
        id++
      }
    });
    if (id>0) {
      this.state.list2.forEach(element => {
        if (element.code == code) {
          this.setState({
            ...this.state,
            list2: this.state.list2.filter(item => item.code !== code),
          });
          this.setState({
            ...this.state,
            list2: [...this.state.list2, { code: element.code, title: element.title, price: element.price, sum: element.sum + 1}],
          });
        }
      });
    } else {
      this.setState({
        ...this.state,
        list2: [...this.state.list2, { code: item.code, title: item.title, price: item.price, sum: 1}],
      });
    }
  }

  deleteItem(code){
    this.setState({
      ...this.state,
      list2: this.state.list2.filter(item => item.code !== code),
    });
  }
}

export default Store;
