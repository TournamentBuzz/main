import React from "react";
import StripeCheckout from "react-stripe-checkout";

const STRIPE_PUBLISHABLE_KEY = "pk_test_X20OBRj4crG53yFIaOaoKOMw";

const CURRENCY = "USD";

const dollarToCent = amount => amount * 100;

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.onToken = this.onToken.bind(this);
  }

  onToken(token) {
    const stripeToken = token.id;
    console.log(stripeToken);
  }

  render() {
    const { name, description, amount } = this.props;
    return (
      <StripeCheckout
        name={name}
        description={description}
        label="Pay Now"
        amount={dollarToCent(amount)}
        token={this.onToken}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE_KEY}
      />
    );
  }
}

export default Checkout;
