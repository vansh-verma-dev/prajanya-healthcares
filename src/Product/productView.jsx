import { useState } from "react";
import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaWhatsapp,
  FaMinus,
  FaPlus,
  FaChevronDown,
  FaCheck,
} from "react-icons/fa";
import { HiOutlineTruck, HiOutlineRefresh, HiOutlineShieldCheck } from "react-icons/hi";
import { productsData } from "../Data/data";
import { useParams } from "react-router-dom";
import Footer from "../pages/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useCart } from "../context/CartContext";


function Stars({ rating, size = 13 }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} size={size} className={i < rounded ? "text-amber-400" : "text-slate-200"} />
      ))}
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold text-slate-900 sm:text-base">{title}</span>
        <FaChevronDown
          size={12}
          className={`text-slate-400 transition-transform duration-300 ${open ? "rotate-180 text-teal-600" : ""}`}
        />
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden text-sm leading-relaxed text-slate-500">{children}</div>
      </div>
    </div>
  );
}

export default function ProductView() {
  const { addToCart } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [imgFailed, setImgFailed] = useState({});
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const { id } = useParams();
  const product = productsData.find(
    (item) => item.id === Number(id)
  );
  const images = product.images?.length ? product.images : [null];

  return (
    <div className="bg-white">
      <Navbar />
      <div className="mx-auto max-w-6xl px-5 pt-6 text-xs text-slate-400 sm:px-10">
        Home <span className="mx-1.5">/</span> Products{" "}
        <span className="mx-1.5">/</span>
        <span className="text-slate-600">{product.name}</span>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-10 sm:py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ---------- Gallery ---------- */}
          <div>
            <div className="aspect-square rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-lg overflow-hidden">
              {images[activeImg] && !imgFailed[activeImg] ? (
                <img
                  src={images[activeImg]}
                  alt={product.name}
                  onError={() =>
                    setImgFailed((f) => ({ ...f, [activeImg]: true }))
                  }
                  className="h-full w-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-400">
                  <span>Image Coming Soon</span>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 p-2 flex gap-3 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`h-22 w-22 shrink-0 overflow-hidden rounded-xl bg-slate-50 ring-1 transition-all ${activeImg === i ? "ring-2 ring-gray-400" : "ring-slate-100 opacity-70 hover:opacity-100"
                      }`}
                  >
                    {img && !imgFailed[i] ? (
                      <img src={img} alt="" className="h-full w-full object-contain p-2" />
                    ) : (
                      <div className="h-full w-full bg-slate-100" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---------- Buy box ---------- */}
          <div>
            {product.badge?.[0] && (
              <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-teal-600 ring-1 ring-teal-100">
                {product.badge[0]}
              </span>
            )}

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {product.name}
            </h1>
            {product.subHeading && (
              <p className="mt-1.5 text-sm text-slate-500">{product.subHeading}</p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Stars rating={product.rating} />
              <span className="text-sm text-slate-500">
                {product.rating} · {product.reviews} reviews
                {product.sold ? ` · ${product.sold} sold` : ""}
              </span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-slate-400 line-through">₹{product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-600">
                  {product.discount}
                </span>
              )}
            </div>
            {product.shipping?.cod && (
              <p className="mt-1 text-xs text-slate-400">Inclusive of all taxes · COD available</p>
            )}

            {product.shortDescription && (
              <p className="mt-5 text-sm leading-relaxed text-slate-500">{product.shortDescription}</p>
            )}

            {/* Highlights */}
            {product.highlights?.length > 0 && (
              <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.highlights.slice(0, 6).map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-slate-600">
                    <FaCheck className="shrink-0 text-teal-500" size={11} />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* Quantity + actions */}
            <div className="mt-7 flex items-center gap-3">
              <div className="flex items-center rounded-xl border border-slate-200">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center text-slate-500 hover:text-teal-600"
                >
                  <FaMinus size={11} />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-slate-900">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-11 w-11 items-center justify-center text-slate-500 hover:text-teal-600"
                >
                  <FaPlus size={11} />
                </button>
              </div>
              {product.stock !== undefined && (
                <span className="text-xs text-slate-400">{product.stock} in stock</span>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => addToCart(product, qty)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-teal-600 py-3.5 text-sm font-semibold text-teal-600 transition-colors hover:bg-teal-50 active:scale-[0.98]"
              >
                <FaShoppingCart size={14} />
                Add to Cart
              </button>
            </div>

            <a
              href="https://wa.me/911234567890"
              className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-emerald-600 hover:underline"
            >
              <FaWhatsapp size={14} />
              Order via WhatsApp instead
            </a>

            {/* Trust strip */}
            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6">
              <div className="flex flex-col items-center text-center">
                <HiOutlineTruck className="text-teal-500" size={20} />
                <p className="mt-1.5 text-[11px] leading-tight text-slate-500">
                  {product.shipping?.delivery || "Free shipping"}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <HiOutlineRefresh className="text-teal-500" size={20} />
                <p className="mt-1.5 text-[11px] leading-tight text-slate-500">
                  {product.shipping?.return || "Easy returns"}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <HiOutlineShieldCheck className="text-teal-500" size={20} />
                <p className="mt-1.5 text-[11px] leading-tight text-slate-500">100% Authentic</p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Details accordion ---------- */}
        <div className="mx-auto mt-14 max-w-3xl sm:mt-20">
          <h2 className="mb-2 text-lg font-bold text-slate-900 sm:text-xl">Product Details</h2>
          <div className="border-t border-slate-100">
            {product.description && (
              <Accordion title="Description" defaultOpen>
                <p>{product.description}</p>
              </Accordion>
            )}

            {product.benefits?.length > 0 && (
              <Accordion title="Benefits">
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <FaCheck className="shrink-0 text-teal-500" size={10} />
                      {b}
                    </li>
                  ))}
                </ul>
              </Accordion>
            )}

            {product.ingredients && (
              <Accordion title="Ingredients">
                <div className="space-y-4">
                  {Object.entries(product.ingredients).map(([group, list]) => (
                    <div key={group}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">{group}</p>
                      <p className="mt-1">{list.join(", ")}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
            )}

            {product.usage?.length > 0 && (
              <Accordion title="How to Use">
                <ul className="space-y-2">
                  {product.usage.map((u) => (
                    <li key={u.time}>
                      <span className="font-semibold text-slate-700">{u.time}: </span>
                      {u.instruction}
                    </li>
                  ))}
                </ul>
              </Accordion>
            )}

            {product.precautions?.length > 0 && (
              <Accordion title="Precautions">
                <ul className="list-disc space-y-1 pl-4">
                  {product.precautions.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </Accordion>
            )}

            {product.faq?.length > 0 && (
              <Accordion title="Frequently Asked Questions">
                <div className="space-y-4">
                  {product.faq.map((f) => (
                    <div key={f.question}>
                      <p className="font-semibold text-slate-700">{f.question}</p>
                      <p className="mt-1">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
            )}
          </div>

          {product.disclaimer && (
            <p className="mt-6 text-xs italic text-slate-400">{product.disclaimer}</p>
          )}
        </div>
      </div>

      {/* ---------- Sticky mobile buy bar ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-slate-100 bg-white/95 px-5 py-3 backdrop-blur lg:hidden">
        <div>
          <p className="text-base font-bold text-slate-900">₹{product.price}</p>
          {product.originalPrice && (
            <p className="text-xs text-slate-400 line-through">₹{product.originalPrice}</p>
          )}
        </div>
        <button
          onClick={() => { addToCart(product, qty); }}
          className="flex flex-1 max-w-[220px] items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white active:scale-[0.98]"
        >
          <FaShoppingCart size={13} />
          Add to Cart
        </button>
      </div>


      <div className="h-16 lg:hidden" />
      <Footer />
    </div>

  );
}