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
import { useState } from "react";

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

  const checkUser = (e) => {
    if (!currentUser) {
      alert("Please log in to make a payment");
    }
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !displayName) {
      return;
    }
    if (!loading && !currentUser) {
      alert("Please sign in to continue");
    }
    setProcessingPayment(true);

    let res,
      url = "/.netlify/functions/stripe-subscription",
      body = {
        amount: amount * 100,
      },
      headers = {
        "Content-Type": "application/json",
      };
    let t = JSON.stringify(JSON.stringify(body));
    console.log(JSON.parse(t));
    // console.log(body, url);
    try {
      res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }).then((res) => res.json());
    } catch (error) {
      alert(error.message);
      setProcessingPayment(false);
    }
    console.log(res);
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
      setProcessingPayment(false);
    } else if (paymentIntent.paymentIntent.status === "succeeded") {
      alert("Payment successful");
    }
  };

  return (
    <>
      {
        <PaymentFormContainer className="payment-form">
          <FormContainer onSubmit={paymentHandler}>
            <h2>Credit Card Payment: </h2>
            <CardElement onChange={checkUser} />
            <PaymentButton isLoading={processingPayment} buttonType="inverted">
              Pay Now
            </PaymentButton>
          </FormContainer>
        </PaymentFormContainer>
      }
    </>
  );
};

export default PaymentForm;
