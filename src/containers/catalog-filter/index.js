import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import useInit from '../../hooks/use-init';

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.catalog.categories
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // выбор категории
    onCategory: useCallback((category) => store.actions.catalog.setParams({category, page: 1}), [store]),
  };

  const categories = useMemo(() => {
    const res = []

    const normalize = (item) => {
      let hyphen = '';
      const stack = [item];
      while (stack.length) {
        const elem = stack.shift();
        if (elem.parent) {
          stack.push(select.categories.find(item => item._id === elem.parent._id))
          hyphen += '-'
        }
      }
      item = {...item, title: hyphen + item.title}
      if(item.parent) {
        let idx = res.findIndex(el => el._id === item.parent._id)
        if (idx !== -1) {
          res.splice(idx + 1, 0, item);
        } else {
          res.push(item)
        }
      } else {
        res.push(item)
      }
    }
    select.categories.forEach(item => normalize(item));
    return res.map(item => ({value: item._id, title: item.title}))
  }, [select.categories])

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
    categories: useMemo(() => ([
      {value: '', title: 'Все'},
      ...categories
    ]), [categories])
  };

  useInit(() => {
    store.actions.catalog.fetchCategories();
  }, [])

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={options.categories} value={select.category} onChange={callbacks.onCategory}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000} theme={'big'}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
