import crypto from 'crypto'
import Razorpay from 'razorpay'
import Payment from '../models/paymentModel.js';
export const createOrder = async(req,res,next)=>{
    const razorpay = new Razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET
    });
    try {
        const { amount } = req.body;
        const options = {
            amount:amount*100,
            currency:"INR",
            receipt:`receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json({success:true,order});
    } catch (error) {
        next(error);    
    }
}

export const verifyPaymentRazorpay = async(req,res,next)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    try{
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

        if (expectedSignature === razorpay_signature) {
            res.json({ success: true, message: "Payment verified successfully!" });
        } else {
            const error = createHttpError(400, "Payment verification failed!");
            return next(error);
        }
    } catch (error) {
        next(error);
    }
}

// Use NGROK to convert localhost to https public URL to use webhook 
// (Create the webhook in razorpay website for verification)
export const webHookVerification = async(req,res,next)=>{
    try {
        const secret = process.env.RAZORPAY_WEB_HOOK_SECRET;
        const signature = req.headers["x-razorpay-signature"];
    
        const body = JSON.stringify(req.body); // Convert payload to string
    
        // 🛑 Verify the signature
        const expectedSignature = crypto
          .createHmac("sha256", secret)
          .update(body)
          .digest("hex");
    
        if (expectedSignature === signature) {
          console.log("✅ Webhook verified:", req.body);
    
          // ✅ Process payment (e.g., update DB, send confirmation email)
          if (req.body.event === "payment.captured") {
            const payment = req.body.payload.payment.entity;
            console.log(`💰 Payment Captured: ${payment.amount / 100} INR`);
            // Update database, send email, etc.
            const newPayment = new Payment({
              paymentId:payment.id,
              orderId:payment.order_id,
              amount:payment.amount/100,
              currency:payment.currency,
              status:payment.status,
              method:payment.method,
              email:payment.email,
              contact:payment.contact,
              createdAt:new Date(payment.created_at*1000)
            });
            await newPayment.save();
          }
          res.json({ success: true });
        } else {
          const error = createHttpError(400, "❌ Invalid Signature!");
          return next(error);
        }
      } catch (error) {
        console.log(error);
        next(error);
      }    
}