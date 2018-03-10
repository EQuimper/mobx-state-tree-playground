import React, { Component } from 'react';

import WishListView from './WishListView';

class App extends Component {
  render() {
    return (
      <div>
        <WishListView wishList={this.props.wishList} />
      </div>
    );
  }
}

export default App;
