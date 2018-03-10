import React from 'react';
import ReactDOM from 'react-dom';

import './assets/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { WishList } from './models/WishList';

const wishList = WishList.create({
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
});

ReactDOM.render(<App wishList={wishList} />, document.getElementById('root'));

// setInterval(() => {
//   wishList.items[0].changePrice(wishList.items[0].price + 1);
// }, 1000);

registerServiceWorker();
