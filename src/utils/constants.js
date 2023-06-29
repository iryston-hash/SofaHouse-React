import React from 'react';
import {GiCompass, GiDiamondHard, GiStabbedNote} from 'react-icons/gi';
export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text: 'We as a company of furniture artisans want to provide people with house comfort followed by professionalism in quality of our art',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text: 'Everyone wants a cozy atmosphere in their houses, so we strife to give such option by providing high quality in-door movables, be it for living room or your personal cabinet',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'history',
    text: 'We are relatively young age in existance of formal business, however SofaHouse consists of masters whos knowledge and experience of decades hard work can compete with top professionals around the world',
  },
];

export const products_url = '/.netlify/functions/products';

export const single_product_url = `/.netlify/functions/single-product?id=`;
