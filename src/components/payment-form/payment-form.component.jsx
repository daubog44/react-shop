import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectLoadingState,
} from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";
import { useEffect, useState } from "react";

const PaymentForm = () => {
  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector(selectLoadingState);
  const amount = useSelector(selectCartTotal);
  const [processingPayment, setProcessingPayment] = useState(false);
  let displayName;
  if (currentUser) {
    displayName = currentUser.displayName;
  }
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    if (!loading && !currentUser) {
      alert("Please sign in to continue");
    }
  }, [loading, currentUser]);
  console.log("displayName", displayName);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !displayName) {
      return;
    }
    setProcessingPayment(true);

    const res = await fetch(
      "http://127.0.0.1:9999/.netlify/functions/stripe-subscription",
      {
        method: "POST",
        body: JSON.stringify({
          amount: amount * 100,
        }),
      }
    ).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = res;

    const paymentIntent = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: displayName,
          email: currentUser.email,
        },
      },
    });

    setProcessingPayment(false);

    console.log("paymentIntent", paymentIntent);
    if (paymentIntent.error) {
      alert(paymentIntent.error.message);
    } else if (paymentIntent.paymentIntent.status === "succeeded") {
      alert("Payment successful");
    }
  };

  return (
    <>
      {displayName && (
        <PaymentFormContainer className="payment-form">
          <FormContainer onSubmit={paymentHandler}>
            <h2>Credit Card Payment: </h2>
            <CardElement />
            <PaymentButton isLoading={processingPayment} buttonType="inverted">
              Pay Now
            </PaymentButton>
          </FormContainer>
        </PaymentFormContainer>
      )}
    </>
  );
};

export default PaymentForm;
