import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      page: 1,
      limit: 10,
      skip: 0,
      pagesCount: 0
    }
  }

  changePage(page) {
    const limit = this.getState().limit;
    this.setState({
      ...this.getState(),
      page,
      skip: limit * page - limit
    }, 'Поменялась страница');
  }

  async load() {
    const response = await fetch(`/api/v1/articles?limit=${this.getState().limit}&skip=${this.getState().skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    const pagesCount = Math.ceil(json.result.count / this.getState().limit)
    this.setState({
       ...this.getState(),
       list: json.result.items,
       pagesCount
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
