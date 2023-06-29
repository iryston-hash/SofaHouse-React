import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  // data
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {...state.filters, max_price: maxPrice, def_price: maxPrice},
    };
  }

  // views
  if (action.type === SET_GRIDVIEW) {
    return {...state, grid_view: true};
  }
  if (action.type === SET_LISTVIEW) {
    return {...state, grid_view: false};
  }
  if (action.type === UPDATE_SORT) {
    return {...state, sort: action.payload};
  }

  // sort
  if (action.type === SORT_PRODUCTS) {
    const {sort, filtered_products} = state;
    let sortedProducts = [...filtered_products];

    if (sort === 'price-lowest') {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === 'price-highest') {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      sortedProducts = sortedProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === 'name-z') {
      sortedProducts = sortedProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }

    return {...state, filtered_products: sortedProducts};
  }

  // filters
  if (action.type === UPDATE_FILTERS) {
    const {name, value} = action.payload;
    return {...state, filters: {...state.filters, [name]: value}};
  }

  if (action.type === FILTER_PRODUCTS) {
    const {all_products} = state;
    const {company, text, def_price, shipping, color, category} = state.filters;
    let tempProducts = [...all_products];

    if (text) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(text)
      );
    }

    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }

    if (company !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }

    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((productColor) => productColor === color);
      });
    }

    // price
    tempProducts = tempProducts.filter((product) => product.price <= def_price);

    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }
    return {...state, filtered_products: tempProducts};
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        def_price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
