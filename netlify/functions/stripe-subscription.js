const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "*",
};

const respond = (paymentIntent) => ({
  statusCode: 200,
  body: JSON.stringify({ paymentIntent }),
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE OPTIONS",
    "Access-Control-Allow-Headers": "*",
    "Referrer-Policy": "no-referrer",
    "Content-Type": "application/json",
  },
});

exports.handler = async (event, context) => {
  try {
    console.log("handler", process.env.STRIPE_SECRET_KEY);
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ message: "Successful preflight call." }),
      };
    }

    const { amount } = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    return respond(paymentIntent);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
