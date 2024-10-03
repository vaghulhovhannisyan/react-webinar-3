import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    sort2: state.catalog.params.sort2,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    onSort2: useCallback(sort2 => store.actions.catalog.setParams({ sort2 }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: '66fab39363bfe248a856308c', title: '-Электроника' },
        { value: '66fab39363bfe248a856308e', title: '--Ноутбуки' },
        { value: '66fab39363bfe248a856308d', title: '--Телефоны' },
        { value: '66fab39363bfe248a8563094', title: '---Смартфоны' },
        { value: '66fab39363bfe248a8563095', title: '---Аксессуары' },
        { value: '66fab39363bfe248a856308f', title: '--Телевизоры' },
        { value: '66fab39363bfe248a8563090', title: '-Книги' },
        { value: '66fab39363bfe248a8563091', title: '--Учебники' },
        { value: '66fab39363bfe248a8563092', title: '--Художественная' },
        { value: '66fab39363bfe248a8563093', title: '--Комиксы' },
      ],
      [],
    ),
    sort2: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Select options={options.sort2} value={select.sort2} onChange={callbacks.onSort2} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
