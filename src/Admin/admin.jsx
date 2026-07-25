import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { FaPhoneAlt, FaMapMarkerAlt, FaBoxOpen, FaRupeeSign } from "react-icons/fa";

const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-600 ring-amber-200",
  Confirmed: "bg-blue-50 text-blue-600 ring-blue-200",
  Packed: "bg-purple-50 text-purple-600 ring-purple-200",
  Shipped: "bg-cyan-50 text-cyan-600 ring-cyan-200",
  Delivered: "bg-green-50 text-green-700 ring-green-200",
  Cancelled: "bg-red-50 text-red-600 ring-red-200",
};

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://prajanya-backend-zwcc.onrender.com/api/orders"
      );

      // Backend kabhi { orders: [...] } bhejta hai, kabhi seedha array — dono handle
      const data = Array.isArray(res.data) ? res.data : res.data.orders || [];
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#F8FAF9]">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-slate-400">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F8FAF9]">
      <Navbar />

      {/* ============ PAGE HEADER ============ */}
      <header className="w-full border-b border-slate-100 bg-white">
        <div className="w-full px-5 py-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#166534]">
                Admin Dashboard
              </p>
              <h1 className="mt-1 font-serif text-2xl font-semibold text-[#0F172A] sm:text-3xl">
                Order Management
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Track, manage, and fulfil all customer orders in one place.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#166534] to-[#22C55E] text-sm font-bold text-white shadow-md shadow-[#166534]/20">
                {orders.length}
              </span>
              <span className="text-sm font-medium text-slate-600">Total Orders</span>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-5 py-8 sm:px-8 lg:px-12">
        <section className="space-y-4">
          {orders.map((data) => (
            <div
              key={data.id || data._id}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
            >
              {/* Top row: Order ID, date, status */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    Order <span className="text-[#166534]">#{data.id || data._id}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">{formatDate(data.date || data.createdAt)}</p>
                </div>
                {data.orderStatus && (
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${STATUS_STYLES[data.orderStatus] || "bg-slate-100 text-slate-500 ring-slate-200"
                      }`}
                  >
                    {data.orderStatus}
                  </span>
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Customer */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Customer
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-[#0F172A]">{data.customerName}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <FaPhoneAlt size={10} className="text-[#166534]" /> {data.phone}
                  </p>
                </div>

                {/* Address — flattened from object into readable text */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Delivery Address
                  </p>
                  <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-relaxed text-slate-600">
                    <FaMapMarkerAlt size={11} className="mt-0.5 flex-shrink-0 text-[#166534]" />
                    <span>
                      {[
                        data.address?.village,
                        data.address?.nearByLocation,
                        data.address?.city,
                        data.address?.district,
                        data.address?.state,
                      ]
                        .filter(Boolean)
                        .join(", ")}{" "}
                      {data.address?.pincode && (
                        <span className="font-medium text-[#0F172A]">
                          — {data.address.pincode}
                        </span>
                      )}
                    </span>
                  </p>
                </div>

                {/* Amount */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Amount
                  </p>
                  <p className="mt-1.5 flex items-center gap-1 text-lg font-bold text-[#166534]">
                    <FaRupeeSign size={13} />
                    {data.totalPrice ?? data.price}
                  </p>
                  {data.paymentMethod && (
                    <span
                      className={`mt-1 inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold ${data.paymentMethod === "COD"
                        ? "bg-[#D4AF37]/15 text-[#8a6d1f]"
                        : "bg-[#166534]/10 text-[#166534]"
                        }`}
                    >
                      {data.paymentMethod}
                    </span>
                  )}
                </div>

                {/* Products — names only, right-aligned column */}
                <div className="sm:text-right">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:justify-end">
                    <FaBoxOpen size={11} className="text-[#166534]" /> Products ({data.products.length})
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {data.products.map((p) => (
                      <li
                        key={p.productId || p.name}
                        className="text-xs font-medium text-slate-600"
                      >
                        {p.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="rounded-2xl border border-slate-100 bg-white py-16 text-center text-sm text-slate-400 shadow-sm">
              No orders found.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminPage;