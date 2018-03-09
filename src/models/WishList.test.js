import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree';
import { WishListItem, WishList } from './WishList';

it('can create a instance of a model', () => {
  const item = WishListItem.create({
    name: 'Something',
    price: 56.78,
  });

  expect(item.name).toBe('Something');
  expect(item.price).toBe(56.78);
  expect(item.image).toBe('');

  item.changeName('Narnia');
  expect(item.name).toBe('Narnia');
});

it('can create a wishlist', () => {
  const list = WishList.create({
    items: [
      {
        name: 'Something',
        price: 56.78,
      },
    ],
  });

  expect(list.items.length).toBe(1);
  expect(list.items[0].price).toBe(56.78);
});

it('can add new items', () => {
  const list = WishList.create();
  const states = [];

  onSnapshot(list, snapshot => {
    states.push(snapshot);
  });

  list.add({
    name: 'Hello World',
    price: 10,
  });

  expect(list.items.length).toBe(1);
  expect(list.items[0].name).toBe('Hello World');
  list.items[0].changeName('Harry Potter');
  expect(list.items[0].name).toBe('Harry Potter');

  expect(getSnapshot(list)).toMatchSnapshot();

  expect(states).toMatchSnapshot();
});

it('can add new items - 2', () => {
  const list = WishList.create();
  const patches = [];

  onPatch(list, patch => {
    patches.push(patch);
  });

  list.add({
    name: 'Hello World',
    price: 10,
  });

  list.items[0].changeName('Harry Potter');

  expect(patches).toMatchSnapshot();
});
