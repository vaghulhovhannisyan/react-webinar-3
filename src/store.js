/**
 * Хранилище состояния приложения
 */
let id = 8;
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

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: id, title: 'Новая запись', click: 0}],
    });
    id++
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
      // list: this.state.list.map(i => {    
      //   i.selected = item.selected;
      //   return i
      // }),
      list: this.state.list.map(item => {
        if (item.code === code) {
          this.state.list.map(i=>{
            i.selected = item.selected;
            return i})
          item.selected = !item.selected;
            item.click++
        }
        return item;
      }),
    });
  }
}

export default Store;
