import {useEffect, useContext, useReducer, createContext} from 'react';
import reducer from '../reducers/filter_reducer';
import {useProductsContext} from './products_context';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    def_price: 0,
    shipping: false,
  },
};

const FilterContext = createContext();

export const FilterProvider = ({children}) => {
  const {products} = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({type: LOAD_PRODUCTS, payload: products});
  }, [products]);

  useEffect(() => {
    dispatch({type: FILTER_PRODUCTS});
    dispatch({type: SORT_PRODUCTS});
  }, [state.sort, state.filters]);

  // toggle-views
  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW});
  };
  const setListView = () => {
    dispatch({type: SET_LISTVIEW});
  };

  // sort
  const handleSort = (e) => {
    const value = e.target.value;
    dispatch({type: UPDATE_SORT, payload: value});
  };

  // filters
  const handleFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'category') {
      value = e.target.textContent;
    }

    if (name === 'color') {
      value = e.target.dataset.color;
    }

    if (name === 'def_price') {
      value = +value;
    }

    if (name === 'shipping') {
      value = e.target.checked;
    }

    dispatch({type: UPDATE_FILTERS, payload: {name, value}});
  };

  const resetFilters = () => {
    dispatch({type: CLEAR_FILTERS});
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        handleSort,
        handleFilters,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
export const useFilterContext = () => {
  return useContext(FilterContext);
};
