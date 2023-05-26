import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      id: null,
      name: null,
      madeIn: null,
      description: null,
      category: null,
      edition: null,
      price: null
    }
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       id: json.result._id,
       name: json.result.title,
       description: json.result.description,
       madeIn: `${json.result.madeIn.title} (${json.result.madeIn.code})`,
       category: json.result.category.title,
       edition: json.result.edition,
       price: json.result.price
    }, 'Загружены товар из АПИ');
  }
}

export default Product;
