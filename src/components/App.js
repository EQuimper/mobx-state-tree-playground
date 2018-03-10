import React, { Component } from 'react';
import { observer } from 'mobx-react';

import WishListView from './WishListView';

class App extends Component {
  state = {
    selectedUser: null,
  };

  _onSelect = e => {
    this.setState({
      selectedUser: e.target.value,
    });
  };
  render() {
    const { group } = this.props;
    const selectedUser = group.users.get(this.state.selectedUser);
    return (
      <div>
        <br/>
        <button onClick={group.reload}>Reload</button>
        <br/>
        <br/>
        <button onClick={group.drawLots}>Draw lots</button>
        <br />
        <br />
        {selectedUser && <User user={selectedUser} />}
        <br />
        <br />
        <select onChange={this._onSelect}>
          <option>- Select User -</option>
          {group.users.values().map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const User = observer(({ user }) => (
  <div>
    <WishListView wishList={user.wishList} />
    <button onClick={user.getSuggestions}>Suggestions</button>
    <hr />
    <h2>{user.recipient ? user.recipient.name : ''}</h2>
    {user.recipient && <WishListView wishList={user.recipient.wishList} readOnly />}
  </div>
));

export default observer(App);
