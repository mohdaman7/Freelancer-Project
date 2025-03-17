import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});


export const createRazorpayOrder = async (amount, receipt, notes = {}) => {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, 
      currency: "INR",
      receipt: receipt,
      payment_capture: 1, 
      notes: notes 
    });
    return order;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new Error(`Failed to create Razorpay order: ${error.message}`);
  }
};

export const verifyPaymentSignature = (orderId, paymentId, signature) => {
  try {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest('hex');

    console.log("[Verify Signature] Generated Signature:", generatedSignature);
    console.log("[Verify Signature] Received Signature:", signature); 

    return generatedSignature === signature;
  } catch (error) {
    console.error("Error verifying payment signature:", error);
    return false; 
  }
};

export default razorpay;