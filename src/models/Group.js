import { types, flow } from 'mobx-state-tree';

import { WishList } from './WishList';

export const User = types
  .model({
    id: types.identifier(),
    name: types.string,
    gender: types.enumeration('gender', ['f', 'm']),
    wishList: types.optional(WishList, {}),
    recipient: types.maybe(types.reference(types.late(() => User))),
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

export const Group = types
  .model({
    users: types.map(User),
  })
  .actions(self => ({
    drawLots() {
      const allUsers = self.users.values();

      if (allUsers.length <= 1) return;

      let remaining = allUsers.slice();

      allUsers.forEach(user => {
        if (remaining.length === 1 && remaining[0] === user) {
          const swapWith =
            allUsers[Math.floor(Math.random() * (allUsers.length - 1))];
          user.recipients = swapWith.recipient;
          swapWith.recipient = self;
        } else {
          while (!user.recipient) {
            let recipientIdx = Math.floor(Math.random() * allUsers.length);

            if (remaining[recipientIdx] !== user) {
              user.recipient = remaining[recipientIdx];
              remaining.splice(recipientIdx, 1);
            }
          }
        }
      });
    },
  }));
