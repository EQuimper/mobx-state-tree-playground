import React, { Component } from 'react';

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
        <br />
        <br />
        {selectedUser && <WishListView wishList={selectedUser.wishList} />}
        <br />
        <br />
        {selectedUser && (
          <button onClick={selectedUser.getSuggestions}>Suggestions</button>
        )}
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

export default App;
