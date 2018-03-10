import React from 'react';
import ReactDOM from 'react-dom';
import { onSnapshot } from 'mobx-state-tree';

import './assets/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { WishList } from './models/WishList';

let initialState = {
  items: [
    {
      name: 'Harry Potter',
      price: 50,
    },
    {
      name: 'Lord of the Rings',
      price: 40,
    },
  ],
};

if (localStorage.getItem('wishListApp')) {
  initialState = JSON.parse(localStorage.getItem('wishListApp'));
}

const wishList = WishList.create(initialState);

onSnapshot(wishList, snapshot => {
  localStorage.setItem('wishListApp', JSON.stringify(snapshot));
});

ReactDOM.render(<App wishList={wishList} />, document.getElementById('root'));

// setInterval(() => {
//   wishList.items[0].changePrice(wishList.items[0].price + 1);
// }, 1000);

registerServiceWorker();
