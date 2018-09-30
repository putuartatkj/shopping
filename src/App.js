import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Product from './Product';
import Shoppingcart from './Shoppingcart';


class App extends Component {

  state = {
  cartItems: [],
  products: []
};

handleAddItemToCart = product => {
  let cartItems = this.state.cartItems;

  const alreadyExists = cartItems.some(
      cartItems => cartItems.product.id === product.id
    );

  if (alreadyExists) {
    cartItems = cartItems.map(cartItem => {
      if (cartItem.product.id === product.id) {
        cartItem.quantity = cartItem.quantity + 1;
      }
      return cartItem;
    });
  } else {
    cartItems.push ({
      product: product,
      quantity: 1
    });
  }

  this.setState ({ cartItems:cartItems });
}

handleRemoveItemToCart = product => {
  console.log(product);
  const cartItemsState = this.state.cartItems;

  const selectedItemIndex = cartItemsState.findIndex(cartItems => {
    return cartItems.product.id === product.id
  });

  const selectedItem = cartItemsState[selectedItemIndex];

  if (selectedItem.quantity > 1 ) {
    selectedItem.quantity--;
  } else {
    cartItemsState.splice(selectedItemIndex,1);
  }
    this.setState ({cartItems : cartItemsState});
};

  componentDidMount (){
    fetch("https://product-list.glitch.me/")
    .then(response => response.json())
    .then(products => this.setState({products: products}));
  } 

  render() { 
    return (
      <div className="container">
     <Navbar /> 
  <div className="columns">
    <div className="column is-two-thirds">
      <div>
        <h3 className="title">Our Products</h3>
        <div className="columns">
        {this.state.products.map(product => (
          <Product 
              key={product.id} 
              product={product} 
              onAddItemToCard={this.handleAddItemToCart}
          />
          ))}

        </div>
      </div>
    </div>
      < Shoppingcart 
      cartItems={this.state.cartItems} 
      onRemoveItemFromCart={this.handleRemoveItemToCart}
      />
  </div>
</div>

    );
  }
}

export default App;
