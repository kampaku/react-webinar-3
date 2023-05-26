import { useCallback } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { Outlet } from 'react-router-dom';

function Layout() {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    title: state.product.name,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }
  return (
    <PageLayout>
      <Head title={'Магазин'}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum}/>
      <Outlet />
    </PageLayout>
  )
}

export default Layout
