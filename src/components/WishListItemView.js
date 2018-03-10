import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree';

import WishListItemEdit from './WishListItemEdit';

class WishListItemView extends Component {
  state = {
    isEditing: false,
    clone: null,
  };

  _onToggleEdit = () =>
    this.setState({ isEditing: true, clone: clone(this.props.item) });

  _onCancelEdit = () => this.setState({ isEditing: false });

  _onSave = () => {
    applySnapshot(this.props.item, getSnapshot(this.state.clone));
    this.setState({ isEditing: false, clone: null });
  };

  _renderEditable() {
    return (
      <li>
        <WishListItemEdit item={this.state.clone} />
        <button onClick={this._onSave}>Save</button>
        <button onClick={this._onCancelEdit}>Cancel</button>
      </li>
    );
  }

  render() {
    const { item } = this.props;
    return this.state.isEditing ? (
      this._renderEditable()
    ) : (
      <li className="list">
        {item.image && <img src={item.image} />}
        <h3>{item.name}</h3>
        <span>{item.price}</span>
        <span>
          <button onClick={this._onToggleEdit}>Edit</button>
        </span>
      </li>
    );
  }
}

export default observer(WishListItemView);
