import {
  types,
  flow,
  applySnapshot,
  getSnapshot,
  onSnapshot,
} from 'mobx-state-tree';

import { WishList } from './WishList';
import { createStorable } from './Storable';

const BASE_API = 'http://localhost:3001';

export const User = types.compose(
  types
    .model({
      id: types.identifier(),
      name: types.string,
      gender: types.enumeration('gender', ['f', 'm']),
      wishList: types.optional(WishList, {}),
      recipient: types.maybe(types.reference(types.late(() => User))),
    })
    .actions(self => ({
      getSuggestions: flow(function*() {
        const res = yield fetch(`${BASE_API}/suggestions_${self.gender}`);
        self.wishList.items.push(...(yield res.json()));
      }),
    })),
  createStorable('users', 'id'),
);

export const Group = types
  .model({
    users: types.map(User),
  })
  .actions(self => {
    return {
      afterCreate() {
        self.load();
      },
      load: flow(function* load() {
        try {
          const res = yield fetch(`${BASE_API}/users`);
          applySnapshot(self.users, yield res.json());
          console.log('success');
        } catch (error) {
          console.log('aborted', error.name);
        }
      }),
      reload() {
        self.load();
      },

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
    };
  });
