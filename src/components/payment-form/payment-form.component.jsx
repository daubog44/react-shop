import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";
import { useState } from "react";
import DisplayMessage from "../display-message/displayMessage.component";

const PaymentForm = () => {
  const currentUser = useSelector(selectCurrentUser);
  const amount = useSelector(selectCartTotal);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [message, setMessage] = useState("");
  let displayName;
  if (currentUser) {
    displayName = currentUser.displayName;
  }
  const stripe = useStripe();
  const elements = useElements();

  if (typeof message === "object") {
  }

  const checkUser = () => {
    if (!currentUser) {
      setMessage({
        type: "error",
        message: "You must be logged in to make a payment",
      });
    }
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    if (!currentUser || !displayName) {
      return setMessage({
        type: "error",
        message: "Please sign in to continue",
      });
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

    try {
      res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }).then((res) => res.json());
    } catch (error) {
      setMessage({
        type: "error",
        message: error.message,
      });
      setProcessingPayment(false);
    }
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

    if (paymentIntent.error) {
      setMessage({
        type: "error",
        message: paymentIntent.error.message,
      });
      setProcessingPayment(false);
    } else if (paymentIntent.paymentIntent.status === "succeeded") {
      setMessage({
        type: "success",
        message: "Payment successful",
      });
    }
  };

  return (
    <>
      {typeof message === "object"
        ? window.setTimeout(() => setMessage(""), 2000) && (
            <DisplayMessage type={message.type} message={message.message} />
          )
        : null}
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
