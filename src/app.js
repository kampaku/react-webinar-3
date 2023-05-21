import React, {useCallback, useRef, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';
import Modal from './components/modal';
import ModalCart from './components/modal-cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const cartModal = useRef()
  const [isOpen, setIsOpen] = useState(false)

  const list = store.getState().list;
  const cart = store.getState().cart

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddToCart: useCallback((code) => {
      store.addToCart(code)
    }, [store]),

    onRemoveFromCart: useCallback((code) => {
      store.removeFromCart(code)
    }, [store]),

    onOpenModal: useCallback(() => {
      cartModal.current.showModal();
    }, [])
  }
  return (
    <>
    <PageLayout>
      <Head title='Магазин'/>
      <Cart cart={cart} openModal={callbacks.onOpenModal}/>
      <List list={list} onBtnClick={callbacks.onAddToCart}/>
    </PageLayout>
    <Modal modalRef={cartModal} title={'Корзина'}
      modalBody={() => (
        <ModalCart cart={cart} onDelete={callbacks.onRemoveFromCart}/>
      )}/>
    </>
  );
}

export default App;
