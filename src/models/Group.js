import { types, flow } from 'mobx-state-tree';

import { WishList } from './WishList';

export const User = types
  .model({
    id: types.string,
    name: types.string,
    gender: types.enumeration('gender', ['f', 'm']),
    wishList: types.optional(WishList, {}),
  })
  .actions(self => ({
    getSuggestions: flow(function*() {
      const res = yield fetch(
        `http://localhost:3001/suggestions_${self.gender}`,
      );
      const suggestions = yield res.json();
      self.wishList.items.push(...suggestions);
    }),
  }));

export const Group = types.model({
  users: types.map(User),
});
