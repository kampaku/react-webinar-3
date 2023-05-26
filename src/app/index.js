import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { Route, Routes } from 'react-router-dom';
import ProductPage from './product-page';
import Layout from './Layout';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path='/product/:id' element={<ProductPage/>}/>
        </Route>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
