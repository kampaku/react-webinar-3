import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    itemsCount: state.catalog.itemsCount,
    page: state.catalog.page,
    limit: state.catalog.limit,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    changePage: useCallback((page) => store.actions.catalog.changePage(page), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.page]);

  return (
    <>
      <List list={select.list} renderItem={renders.item}/>
      {select.list.length > 0 &&
        <Pagination onChangePage={callbacks.changePage} currentPage={select.page} perPage={select.limit} totalCount={select.itemsCount} />
      }
    </>
  );
}

export default memo(Main);
