import axios from 'axios';
import {useContext, createContext, useEffect, useReducer} from 'react';
import reducer from '../reducers/products_reducer';
import {products_url as url} from '../utils/constants';
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_LOADING,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

const initialState = {
  isSidebarOpen: false,
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const ProductsContext = createContext();

export const ProductsProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({type: SIDEBAR_OPEN});
  };

  const closeSidebar = () => {
    dispatch({type: SIDEBAR_CLOSE});
  };

  const fetchProducts = async (url) => {
    dispatch({type: GET_PRODUCTS_LOADING});
    try {
      const response = await axios.get(url);
      const productsData = await response.data;
      dispatch({type: GET_PRODUCTS_SUCCESS, payload: productsData});
    } catch (error) {
      dispatch({type: GET_PRODUCTS_ERROR});
    }
  };

  // Single Product
  const fetchSingleProduct = async (url) => {
    dispatch({type: GET_SINGLE_PRODUCT_LOADING});
    try {
      const response = await axios.get(url);
      const productData = await response.data;
      dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: productData});
    } catch (error) {
      dispatch({type: GET_SINGLE_PRODUCT_ERROR});
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{...state, openSidebar, closeSidebar, fetchSingleProduct}}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
