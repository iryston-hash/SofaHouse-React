import {useFilterContext} from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const {filtered_products, grid_view} = useFilterContext();

  if (filtered_products.length < 1) {
    return <h4 style={{textTransform: 'none'}}>no items found.</h4>;
  }

  if (grid_view === false) {
    return <ListView filtered_products={filtered_products}/>;
  }

  return <GridView filtered_products={filtered_products}/>;
};

export default ProductList;
