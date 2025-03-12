import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// Create a Razorpay order
export const createRazorpayOrder = async (amount, receipt) => {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: receipt,
      payment_capture: 1
    });
    return order;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new Error("Failed to create Razorpay order");
  }
};

// Verify Razorpay payment signature
export const verifyPaymentSignature = (orderId, paymentId, signature) => {
  try {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest('hex');

    return generatedSignature === signature;
  } catch (error) {
    console.error("Error verifying payment signature:", error);
    throw new Error("Failed to verify payment signature");
  }
};

export default razorpay;