import React from 'react';
import { observer } from 'mobx-react';

import WishListItemView from './WishListItemView';
import WishListItemEntry from './WishListItemEntry';

const WishListView = ({ wishList, readOnly }) => (
  <div className="list">
    <ul>
      {wishList.items.map((item, idx) => (
        <WishListItemView key={idx} item={item} readOnly={readOnly} />
      ))}
      Total: {wishList.totalPrice} $
    </ul>
    {!readOnly && (
      <div>
        <WishListItemEntry readOnly={readOnly} wishList={wishList} />
      </div>
    )}
  </div>
);

export default observer(WishListView);
