import { types, onSnapshot, flow, getSnapshot } from 'mobx-state-tree';

const BASE_API = 'http://localhost:3001';

export function createStorable(collection, attribute) {
  return types.model({}).actions(self => ({
    save: flow(function*() {
      try {
        yield fetch(`${BASE_API}/${collection}/${self[attribute]}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(getSnapshot(self)),
        });
      } catch (error) {
        console.log('Error:', error);
      }
    }),
    afterCreate() {
      onSnapshot(self, self.save);
    },
  }));
}
