import React, { Component } from 'react';
import { observer } from 'mobx-react';

class WishListItemEdit extends Component {
  state = {  }

  _onNameChange = e => {
    this.props.item.changeName(e.target.value)
  }

  _onPriceChange = e => {
    const price = parseInt(e.target.value, 0);
    console.log('====================================');
    console.log('price',  price);
    console.log('====================================');
    if (!isNaN(price)) {
      this.props.item.changePrice(price)
    }
  }

  _onImageChange = e => {
    this.props.item.changeImage(e.target.value)
  }

  render() {
    const { item } = this.props;
    return (
      <div>
        Thing: <input value={item.name} onChange={this._onNameChange} />
        <br/>
        Price: <input value={item.price} onChange={this._onPriceChange} />
        <br/>
        Image: <input value={item.image} onChange={this._onImageChange} />
        <br/>
      </div>
    );
  }
}

export default observer(WishListItemEdit);