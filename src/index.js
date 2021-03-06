import React from 'react';
import ReactDOM from 'react-dom';
import { onSnapshot, addMiddleware } from 'mobx-state-tree';

import './assets/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { Group } from './models/Group';
import { WishList } from './models/WishList';

let initialState = { users: {} };

// if (localStorage.getItem('wishListApp')) {
//   const json = JSON.parse(localStorage.getItem('wishListApp'));
//   // Make sure state keep the same shape when change lot
//   if (Group.is(json)) {
//     initialState = json;
//   }
// }

const group = Group.create(initialState);

addMiddleware(group, (call, next) => {
  console.log(`[${call.type}] ${call.name}`);
  return next(call);
});

onSnapshot(group, snapshot => {
  localStorage.setItem('wishListApp', JSON.stringify(snapshot));
});

ReactDOM.render(<App group={group} />, document.getElementById('root'));

// setInterval(() => {
//   wishList.items[0].changePrice(wishList.items[0].price + 1);
// }, 1000);

registerServiceWorker();
