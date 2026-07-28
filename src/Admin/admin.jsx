import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { FaPhoneAlt, FaMapMarkerAlt, FaBoxOpen, FaRupeeSign, FaTrashAlt, FaTimes } from "react-icons/fa";

const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-600 ring-amber-200",
  Confirmed: "bg-blue-50 text-blue-600 ring-blue-200",
  Packed: "bg-purple-50 text-purple-600 ring-purple-200",
  Shipped: "bg-cyan-50 text-cyan-600 ring-cyan-200",
  Delivered: "bg-green-50 text-green-700 ring-green-200",
  Cancelled: "bg-red-50 text-red-600 ring-red-200",
};

const DELETE_PASSWORD = "prajnaya321p";

const DATE_FILTERS = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Last Day" },
  { value: "30days", label: "Last 30 Days" },
  { value: "month", label: "Last Month" },
  { value: "custom", label: "Custom Range" },
];

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Order ki date diye gaye filter range mee aati hai ya nahi, ye check karta hai
function isWithinDateFilter(orderDateStr, dateFilter, customFrom, customTo) {
  if (dateFilter === "all") return true;
  if (!orderDateStr) return false;

  const orderDate = new Date(orderDateStr);
  const now = new Date();

  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const todayStart = startOfDay(now);

  switch (dateFilter) {
    case "today": {
      const orderDayStart = startOfDay(orderDate);
      return orderDayStart.getTime() === todayStart.getTime();
    }
    case "yesterday": {
      const yestStart = new Date(todayStart);
      yestStart.setDate(yestStart.getDate() - 1);
      const orderDayStart = startOfDay(orderDate);
      return orderDayStart.getTime() === yestStart.getTime();
    }
    case "30days": {
      const cutoff = new Date(todayStart);
      cutoff.setDate(cutoff.getDate() - 30);
      return orderDate >= cutoff && orderDate <= now;
    }
    case "month": {
      const cutoff = new Date(todayStart);
      cutoff.setMonth(cutoff.getMonth() - 1);
      return orderDate >= cutoff && orderDate <= now;
    }
    case "custom": {
      if (!customFrom && !customTo) return true;
      const from = customFrom ? new Date(customFrom + "T00:00:00") : null;
      const to = customTo ? new Date(customTo + "T23:59:59") : null;
      if (from && orderDate < from) return false;
      if (to && orderDate > to) return false;
      return true;
    }
    default:
      return true;
  }
}

function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---- Filters ----
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  // ---- Delete modal ----
  const [deleteTarget, setDeleteTarget] = useState(null); // order id jise delete karna hai
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [deleting, setDeleting] = useState(false);

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

  // ---- Delete flow ----
  const openDeleteModal = (id) => {
    setDeleteTarget(id);
    setPasswordInput("");
    setPasswordError("");
  };

  const closeDeleteModal = () => {
    setDeleteTarget(null);
    setPasswordInput("");
    setPasswordError("");
    setDeleting(false);
  };

  const confirmDelete = async () => {
    if (passwordInput !== DELETE_PASSWORD) {
      setPasswordError("Galat password. Dobara try karo.");
      return;
    }

    setDeleting(true);
    try {
      await axios.delete(
        `https://prajanya-backend-zwcc.onrender.com/api/orders/${deleteTarget}`
      );
      setOrders((prev) =>
        prev.filter((o) => (o.id || o._id) !== deleteTarget)
      );
      closeDeleteModal();
    } catch (error) {
      console.log(error);
      setPasswordError("Delete nahi ho paya. Fir se try karo.");
      setDeleting(false);
    }
  };

  // ---- Filtering ----
  const availableStatuses = useMemo(() => {
    const set = new Set(orders.map((o) => o.orderStatus).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const statusMatch =
        statusFilter === "All" || o.orderStatus === statusFilter;
      const dateMatch = isWithinDateFilter(
        o.date || o.createdAt,
        dateFilter,
        customFrom,
        customTo
      );
      return statusMatch && dateMatch;
    });
  }, [orders, statusFilter, dateFilter, customFrom, customTo]);

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
                {filteredOrders.length}
              </span>
              <span className="text-sm font-medium text-slate-600">
                {filteredOrders.length === orders.length
                  ? "Total Orders"
                  : `of ${orders.length} Orders`}
              </span>
            </div>
          </div>

          {/* ============ FILTER BAR ============ */}
          <div className="mt-5 flex flex-wrap items-end gap-3">
            {/* Status filter */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-[#166534] focus:outline-none focus:ring-1 focus:ring-[#166534]"
              >
                {availableStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Date filter */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Date
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-[#166534] focus:outline-none focus:ring-1 focus:ring-[#166534]"
              >
                {DATE_FILTERS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom range pickers — sirf tab dikhte hai jab "custom" selected ho */}
            {dateFilter === "custom" && (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    From
                  </label>
                  <input
                    type="date"
                    value={customFrom}
                    onChange={(e) => setCustomFrom(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-[#166534] focus:outline-none focus:ring-1 focus:ring-[#166534]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    To
                  </label>
                  <input
                    type="date"
                    value={customTo}
                    onChange={(e) => setCustomTo(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-[#166534] focus:outline-none focus:ring-1 focus:ring-[#166534]"
                  />
                </div>
              </>
            )}

            {(statusFilter !== "All" ||
              dateFilter !== "all" ||
              customFrom ||
              customTo) && (
              <button
                onClick={() => {
                  setStatusFilter("All");
                  setDateFilter("all");
                  setCustomFrom("");
                  setCustomTo("");
                }}
                className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 underline-offset-2 hover:text-[#166534] hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="w-full px-5 py-8 sm:px-8 lg:px-12">
        <section className="space-y-4">
          {filteredOrders.map((data) => {
            const orderId = data.id || data._id;
            return (
              <div
                key={orderId}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
              >
                {/* Top row: Order ID, date, status, delete */}
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">
                      Order <span className="text-[#166534]">#{orderId}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">{formatDate(data.date || data.createdAt)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {data.orderStatus && (
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${STATUS_STYLES[data.orderStatus] || "bg-slate-100 text-slate-500 ring-slate-200"
                          }`}
                      >
                        {data.orderStatus}
                      </span>
                    )}

                    <button
                      onClick={() => openDeleteModal(orderId)}
                      title="Delete order"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition-colors duration-200 hover:bg-red-100 hover:text-red-600"
                    >
                      <FaTrashAlt size={12} />
                    </button>
                  </div>
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
            );
          })}

          {filteredOrders.length === 0 && (
            <div className="rounded-2xl border border-slate-100 bg-white py-16 text-center text-sm text-slate-400 shadow-sm">
              {orders.length === 0
                ? "No orders found."
                : "Is filter ke liye koi order nahi mila."}
            </div>
          )}
        </section>
      </div>

      {/* ============ DELETE PASSWORD MODAL ============ */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold text-[#0F172A]">
                Confirm Delete
              </h2>
              <button
                onClick={closeDeleteModal}
                className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <FaTimes size={12} />
              </button>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Order <span className="font-semibold text-[#0F172A]">#{deleteTarget}</span> delete karne ke liye password daalo.
            </p>

            <input
              type="password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && confirmDelete()}
              placeholder="Password"
              autoFocus
              className="mt-4 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
            />

            {passwordError && (
              <p className="mt-2 text-xs font-medium text-red-500">{passwordError}</p>
            )}

            <div className="mt-5 flex gap-3">
              <button
                onClick={closeDeleteModal}
                className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;