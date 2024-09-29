import StoreModule from '../module';
import StoreLink from '../module'

class Modals extends StoreModule {
  initState() {
    return {
      name: null,
    };
  }

  open(name) {
    this.setState({ name }, `Открытие модалки ${name}`);
  }

  close() {
    this.setState({ name: null }, `Закрытие модалки`);
  }
}



class Links extends StoreLink {
  initState() {
    return {
      name: null,
    };
  }

  open(name) {
    this.setState({ name }, `Открытие страницы ${name}`);
  }

  close() {
    this.setState({ name: null }, `Закрытие страницы`);
  }
}

export default Modals; Links;