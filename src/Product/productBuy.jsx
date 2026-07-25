import axios from "axios";
import { useState, useEffect } from "react";
const API_URL = "https://prajanya-backend-zwcc.onrender.com";
import { useNavigate } from "react-router-dom";
import {
  FaMapPin,
  FaPhoneAlt,
  FaMoneyBillWave,
  FaQrcode,
  FaCreditCard,
  FaCheckCircle,
  FaShieldAlt,
  FaLeaf,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";
import { MdLocalShipping, MdVerified } from "react-icons/md";
import Footer from "../pages/Footer";
import Navbar from "../Components/Navbar";
import { useCart } from "../context/CartContext";

function ProductBuy() {
  const { cartItems, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showScanner, setShowScanner] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedItemCount, setPlacedItemCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  // ---- Address / Customer form state ----
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    village: "",
    nearByLocation: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const images =
    "https://www.amritashya.in/_next/image?url=https%3A%2F%2Fgqfeipyaxweijhrlrxqt.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fpiles-care-kit%2FPiles%2520kit%25203.jpg&w=1920&q=75";

  const shipping = 0;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalMrp = cartItems.reduce(
    (sum, item) => sum + (item.mrp || item.price) * item.quantity,
    0
  );
  const total = subtotal + shipping;
  const discount =
    totalMrp > 0 ? Math.round(((totalMrp - subtotal) / totalMrp) * 100) : 0;

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setShowScanner(false);
  };

  const handlePayNow = () => paymentMethod === "online" && setShowScanner(true);

  // ---- Basic validation before placing order ----
  const isFormValid = () => {
    const required = [
      "customerName",
      "phone",
      "village",
      "city",
      "district",
      "state",
      "pincode",
    ];
    return required.every((field) => formData[field].trim() !== "");
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    if (!isFormValid()) {
      setErrorMsg("Please fill all required address details before placing the order.");
      return;
    }

    setErrorMsg("");

    const orderData = {
      customerName: formData.customerName,
      phone: formData.phone,
      products: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: total,
      address: {
        village: formData.village,
        nearByLocation: formData.nearByLocation,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
      },
      paymentMethod: paymentMethod === "cod" ? "COD" : "Online",
      notes: formData.notes,
    };


   try {
const res = await axios.post(
  `${API_URL}/api/orders`,
  orderData
);

  console.log(res.data);

  setPlacedItemCount(cartItems.length);
  setOrderPlaced(true);
  clearCart();

} catch (error) {
  console.error(error);
  alert("Order Failed");
}
  };
  // ---- Auto redirect to home after order placed ----
  const REDIRECT_SECONDS = 5;
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (!orderPlaced) return;

    setSecondsLeft(REDIRECT_SECONDS);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [orderPlaced, navigate]);

  if (orderPlaced) {
    return (
      <div className="flex min-h-[100vh] flex-col items-center justify-center bg-[#F8FAF9] px-6 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#166534] to-[#22C55E] shadow-xl shadow-[#166534]/30 animate-[pop_0.4s_ease-out]">
          <FaCheckCircle size={34} className="text-white" />
        </span>

        <h1 className="mt-6 font-serif text-2xl font-semibold text-[#0F172A] sm:text-3xl">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 max-w-sm text-sm text-slate-500">
          Thank you for choosing Amritasya Ayurveda. Your order for{" "}
          <span className="font-medium text-[#0F172A]">
            {placedItemCount} {placedItemCount > 1 ? "items" : "item"}
          </span>{" "}
          has been confirmed via{" "}
          {paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}.
        </p>

        <p className="mt-1 text-xs text-slate-400">
          A confirmation email has been sent to your inbox.
        </p>

        {/* Redirect info + progress bar */}
        <div className="mt-6 w-full max-w-xs">
          <p className="text-xs text-slate-400">
            Redirecting to home in {secondsLeft}s...
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#166534] to-[#22C55E] transition-all duration-1000 ease-linear"
              style={{
                width: `${(secondsLeft / REDIRECT_SECONDS) * 100}%`,
              }}
            />
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-8 rounded-xl bg-gradient-to-r from-[#166534] to-[#22C55E] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#166534]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
        >
          Back to Store Now
        </button>

        <style>{`
          @keyframes pop {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F8FAF9] px-4 py-10 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-medium text-[#8a6d1f]">
            <FaLeaf className="text-[#166534]" /> Secure Checkout
          </span>
          <h1 className="mt-4 font-serif text-2xl font-semibold text-[#0F172A] sm:text-3xl">
            Complete Your Purchase
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Authentic Ayurvedic care, packed with trust and delivered safely
            to your doorstep.
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5 text-[#166534]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#166534] text-[10px] text-white">1</span>
            Cart
          </span>
          <span className="h-px w-8 bg-[#166534]/40" />
          <span className="flex items-center gap-1.5 text-[#166534]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#166534] text-[10px] text-white">2</span>
            Details
          </span>
          <span className="h-px w-8 bg-slate-200" />
          <span className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] text-slate-500">3</span>
            Payment
          </span>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ============ LEFT: PRODUCTS + ADDRESS + PAYMENT ============ */}
          <div className="space-y-6 lg:col-span-2">
            {/* ---- Product Cards ---- */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
                >
                  <img
                    src={images}
                    alt={"Prajanya"}
                    className="h-24 w-24 flex-shrink-0 rounded-xl object-cover shadow-md ring-1 ring-slate-100 sm:h-28 sm:w-28"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-base font-semibold text-[#0F172A] sm:text-lg">
                        {item.name}
                      </h2>
                      <span className="flex items-center gap-1 rounded-full bg-[#166534]/10 px-2 py-1 text-[10px] font-semibold text-[#166534]">
                        <MdVerified /> GMP
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                      {item.desc}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-lg font-bold text-[#166534]">
                        ₹{item.price}
                      </span>
                      {item.mrp && (
                        <>
                          <span className="text-xs text-slate-400 line-through">
                            ₹{item.mrp}
                          </span>
                          <span className="rounded-full bg-[#D4AF37]/15 px-2 py-0.5 text-[10px] font-semibold text-[#8a6d1f]">
                            {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* Qty Selector */}
                    <div className="mt-4 inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-colors hover:bg-[#166534] hover:text-white"
                      >
                        <FaMinus size={9} />
                      </button>
                      <span className="w-4 text-center text-sm font-semibold text-[#0F172A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-colors hover:bg-[#166534] hover:text-white"
                      >
                        <FaPlus size={9} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {cartItems.length === 0 && (
                <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
                  <p className="text-sm text-slate-500">Your cart is empty.</p>
                </div>
              )}
            </div>

            {/* Delivery Address */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#0F172A]">
                <FaMapPin className="text-[#166534]" /> Delivery Address
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 outline-none transition-all duration-200 focus:border-[#22C55E] focus:bg-white focus:ring-2 focus:ring-[#22C55E]/20"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Phone Number"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 outline-none transition-all duration-200 focus:border-[#22C55E] focus:bg-white focus:ring-2 focus:ring-[#22C55E]/20"
                />
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleInputChange}
                  required
                  placeholder="Village / Street"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 outline-none transition-all duration-200 focus:border-[#22C55E] focus:bg-white focus:ring-2 focus:ring-[#22C55E]/20 sm:col-span-2"
                />
                <input
                  type="text"
                  name="nearByLocation"
                  value={formData.nearByLocation}
                  onChange={handleInputChange}
                  placeholder="Near By Location (optional)"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 outline-none transition-all duration-200 focus:border-[#22C55E] focus:bg-white focus:ring-2 focus:ring-[#22C55E]/20 sm:col-span-2"
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  placeholder="City"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 outline-none transition-all duration-200 focus:border-[#22C55E] focus:bg-white focus:ring-2 focus:ring-[#22C55E]/20"
                />
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  required
                  placeholder="District"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 outline-none transition-all duration-200 focus:border-[#22C55E] focus:bg-white focus:ring-2 focus:ring-[#22C55E]/20"
                />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  placeholder="State"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 outline-none transition-all duration-200 focus:border-[#22C55E] focus:bg-white focus:ring-2 focus:ring-[#22C55E]/20"
                />
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  placeholder="Pincode"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 outline-none transition-all duration-200 focus:border-[#22C55E] focus:bg-white focus:ring-2 focus:ring-[#22C55E]/20"
                />
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Delivery notes (optional) — e.g. preferred delivery time"
                  rows={2}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 outline-none transition-all duration-200 focus:border-[#22C55E] focus:bg-white focus:ring-2 focus:ring-[#22C55E]/20 sm:col-span-2"
                />
              </div>

              {errorMsg && (
                <p className="mt-3 text-xs font-medium text-red-500">{errorMsg}</p>
              )}
            </div>

            {/* ============ PAYMENT METHODS ============ */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#0F172A]">
                <FaCreditCard className="text-[#166534]" /> Payment Method
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* COD Option */}
                <button
                  onClick={() => handlePaymentSelect("cod")}
                  className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-300 ${paymentMethod === "cod"
                    ? "border-[#22C55E] bg-[#166534]/5 shadow-sm"
                    : "border-slate-100 bg-slate-50 hover:border-slate-200"
                    }`}
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                    <FaMoneyBillWave className="text-[#D4AF37]" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-slate-500">Pay when you receive</p>
                  </div>
                  {paymentMethod === "cod" && (
                    <FaCheckCircle className="ml-auto text-[#22C55E]" />
                  )}
                </button>

                {/* Online Option */}
                <button
                  onClick={() => handlePaymentSelect("online")}
                  className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-300 ${paymentMethod === "online"
                    ? "border-[#22C55E] bg-[#166534]/5 shadow-sm"
                    : "border-slate-100 bg-slate-50 hover:border-slate-200"
                    }`}
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                    <FaQrcode className="text-[#D4AF37]" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">
                      Pay Online
                    </p>
                    <p className="text-xs text-slate-500">UPI / Card / Wallet</p>
                  </div>
                  {paymentMethod === "online" && (
                    <FaCheckCircle className="ml-auto text-[#22C55E]" />
                  )}
                </button>
              </div>

              {/* Online payment logos */}
              {paymentMethod === "online" && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {["Visa", "Mastercard", "RuPay", "UPI", "Razorpay"].map((m) => (
                    <span
                      key={m}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold text-slate-500"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}

              {/* Pay Now -> reveals scanner */}
              {paymentMethod === "online" && !showScanner && (
                <button
                  onClick={handlePayNow}
                  className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#166534] to-[#22C55E] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#166534]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Pay Now
                </button>
              )}

              {/* ============ QR SCANNER ============ */}
              {paymentMethod === "online" && showScanner && (
                <div className="mt-6 flex flex-col items-center rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#166534]/5 to-transparent p-6 text-center">
                  <p className="text-sm font-semibold text-[#0F172A]">
                    Scan & Pay with any UPI App
                  </p>
                  <div className="relative mt-4 flex h-52 w-52 items-center justify-center overflow-hidden rounded-2xl border-4 border-[#22C55E]/50 bg-white p-3 shadow-xl">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amritasya@upi%26pn=AmritasyaAyurveda%26am=${total}%26cu=INR`}
                      alt="UPI Payment QR Code"
                      className="h-full w-full object-contain"
                    />
                    <span className="pointer-events-none absolute left-0 top-0 h-1 w-full animate-[scan_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#22C55E] to-transparent" />
                  </div>
                  <p className="mt-4 text-xs text-slate-500">
                    amritasya@upi &middot; Amount:{" "}
                    <span className="font-semibold text-[#0F172A]">₹{total}</span>
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Google Pay, PhonePe, Paytm supported
                  </p>

                  <button
                    onClick={handlePlaceOrder}
                    className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#166534] to-[#22C55E] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#166534]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    I've Completed Payment
                  </button>
                </div>
              )}

              <style>{`
                @keyframes scan {
                  0% { top: 0%; opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { top: 100%; opacity: 0; }
                }
              `}</style>
            </div>
          </div>

          {/* ============ RIGHT: ORDER SUMMARY ============ */}
          <div className="h-fit space-y-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0F172A]">
              Order Summary
            </h3>

            <div className="space-y-2.5 border-b border-slate-100 pb-4 text-sm">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-slate-500">
                  <span className="max-w-[65%] truncate">
                    {item.name} ({item.quantity} x ₹{item.price})
                  </span>
                  <span className="text-[#0F172A]">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-1 text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MdLocalShipping className="text-[#166534]" /> Shipping
                </span>
                <span className="font-medium text-[#166534]">Free</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-base font-semibold text-[#0F172A]">Total</span>
              <span className="text-xl font-bold text-[#166534]">₹{total}</span>
            </div>
            {discount > 0 && (
              <p className="text-right text-[11px] font-medium text-[#8a6d1f]">
                You're saving {discount}% on this order
              </p>
            )}

            {paymentMethod === "cod" && (
              <button
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
                className="mt-1 w-full rounded-xl bg-gradient-to-r from-[#166534] to-[#22C55E] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#166534]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:hover:translate-y-0"
              >
                Place Order (COD)
              </button>
            )}

            <div className="flex items-center gap-2 rounded-xl bg-[#166534]/5 p-3 text-xs text-slate-600">
              <FaShieldAlt className="flex-shrink-0 text-[#D4AF37]" />
              100% Secure Checkout &middot; GMP Certified Products
            </div>

            <div className="space-y-2 pt-1 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-[#166534]" /> +91 98765 43210
              </div>
              <div className="flex items-center gap-2">
                <IoMdMailUnread className="text-[#166534]" /> care@amritasya.com
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductBuy;