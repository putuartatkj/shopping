import React from 'react'

function Shoppingcart(props){

	const totalPrice = props.cartItems.reduce((carrier, cartItems) => {
		return carrier + cartItems.quantity * cartItems.product.price;
	}, 0);

	return (
			    <div className="column">
      <h3 className="title is-4">Shopping Cart</h3>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th />
          </tr>
        </thead>
        <tbody>
        {props.cartItems.map((cartItems, index) => (
        	<tr key={index}>
        		    <td>{cartItems.product.name}</td>
            		<td>{cartItems.product.price}</td>
            		<td>{cartItems.quantity}</td>
            		<td>
            			<button className="button is-danger is-small" onClick = {event => {
            				event.preventDefault();
            				props.onRemoveItemFromCart(cartItems.product);
            			}}
            			>-</button>
            		</td>
        	</tr>	
        	))}
        </tbody>
      </table>
      <h3>Total : Rp {totalPrice}</h3>
    </div>
		)
}
export default Shoppingcart