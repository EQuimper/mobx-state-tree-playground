import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree';
import { reaction } from 'mobx'

import { Group, User } from './Group';

it('can create a instance of a model', () => {
  const bob = User.create({
    id: '123',
    name: 'Bob',
    gender: 'm'
  });

  expect(bob.name).toBe('Bob');
  expect(bob.id).toBe('123');
  expect(bob.gender).toBe('m')
});

// it('can create a group instance of a model', () => {
//   const bob = User.create({
//     id: '123',
//     name: 'Bob',
//     gender: 'm'
//   });

//   const lucie = User.create({
//     id: '124',
//     name: 'Lucie',
//     gender: 'f'
//   });

//   const group = Group.create({
//     users: {
//       bob,
//       lucie
//     }
//   })

//   console.log('group', group.users['bob'])

// })
