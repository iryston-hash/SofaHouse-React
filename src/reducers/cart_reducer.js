import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const {id, color, amount, product} = action.payload;
    const tempItem = state.cart.find((item) => item.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newItemAmount = cartItem.amount + amount;
          if (newItemAmount > cartItem.max_amount_in_stock) {
            newItemAmount = cartItem.max_amount_in_stock;
          }
          return {...cartItem, amount: newItemAmount};
        } else {
          return cartItem;
        }
      });
      return {...state, cart: tempCart};
    } else {
      const newItem = {
        id: id + color,
        color,
        amount,
        name: product.name,
        image: product.images[0].url,
        max_amount_in_stock: product.stock,
        price: product.price,
      };
      return {...state, cart: [...state.cart, newItem]};
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return {...state, cart: tempCart};
  }

  if (action.type === CLEAR_CART) {
    return {...state, cart: []};
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const {id, value} = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === 'increase') {
          let newAmount = item.amount + 1;
          if (newAmount > item.max_amount_in_stock) {
            newAmount = item.max_amount_in_stock;
          }
          return {...item, amount: newAmount};
        }
        if (value === 'decrease') {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return {...item, amount: newAmount};
        }
      }
      return item;
    });
    return {...state, cart: tempCart};
  }

  // if (action.type === COUNT_CART_TOTALS) {
  //   const {total_items, total_price} = state.cart.reduce(
  //     (total, cartItem) => {
  //       const {amount, price} = cartItem;
  //       total.total_items += amount;
  //       total.total_price += price * amount;
  //       return total;
  //     },
  //     {
  //       total_items: 0,
  //        total_price: 0
  //     }
  //   );

  //   return {...state, total_items, total_price};
  // }

  if (action.type === COUNT_CART_TOTALS) {
    const {total_items,total_price}= state.cart.reduce((accumulator, cartItem) => {
      const {amount,price} = cartItem
      accumulator.total_items += amount
      accumulator.total_price += amount * price
      return accumulator
    }, {
      total_items: 0,
      total_price: 0,
    });
    return {...state, total_items, total_price}
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
