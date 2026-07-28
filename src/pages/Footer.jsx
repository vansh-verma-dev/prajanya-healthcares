import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaMapPin,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";



const quickLinks = ["Home", "Product", "Treatments", "Riview", "Contact"];

const treatments = [
  "Piles Care Kit",
  "Himalayan Shilajit",
  " Herbal Powde",
  "Liver Detox",
  "Neem Tulsi Giloy Powder",
];

export default function Footer() {
  return (
    <footer className="relative bg-emerald-950 text-stone-300 overflow-hidden">

      <svg
        className="pointer-events-none absolute -right-16 -top-10 h-72 w-72 text-emerald-900/40 sm:h-96 sm:w-96"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M100 10C60 40 20 80 20 120c0 40 35 70 80 70s80-30 80-70c0-40-40-80-80-110Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M100 25V190" stroke="currentColor" strokeWidth="1.5" />
        <path d="M100 60C80 70 65 85 60 100" stroke="currentColor" strokeWidth="1" />
        <path d="M100 60C120 70 135 85 140 100" stroke="currentColor" strokeWidth="1" />
        <path d="M100 100C78 112 62 128 55 145" stroke="currentColor" strokeWidth="1" />
        <path d="M100 100C122 112 138 128 145 145" stroke="currentColor" strokeWidth="1" />
      </svg>


      <div className="relative flex items-center justify-center border-b border-emerald-800/70 py-3">
        <span className="h-px w-16 bg-amber-500/50 sm:w-24" />
        <svg viewBox="0 0 24 24" className="mx-3 h-4 w-4 text-amber-400" fill="currentColor">
          <path d="M12 2C7 5 3 9 3 13.5S6.6 21 12 21s9-3 9-7.5S17 5 12 2Zm0 3.5c3.6 2.3 6 5 6 8 0 3-2.7 5.5-6 5.5s-6-2.5-6-5.5c0-3 2.4-5.7 6-8Z" />
        </svg>
        <span className="h-px w-16 bg-amber-500/50 sm:w-24" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-serif text-2xl tracking-wide text-amber-400">
              Prajanya
              <span className="block text-sm font-sans font-light tracking-[0.35em] text-stone-400">
                AYURVEDA
              </span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Rooted in tradition, guided by science. Personalised Ayurvedic care
              for lasting wellness, from body to mind.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-800 text-stone-300 transition-colors duration-300 hover:border-amber-500 hover:text-amber-400"
              >
                <FaFacebook size={16} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-800 text-stone-300 transition-colors duration-300 hover:border-amber-500 hover:text-amber-400"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-800 text-stone-300 transition-colors duration-300 hover:border-amber-500 hover:text-amber-400"
              >
                <FaWhatsapp size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-base tracking-wide text-stone-100">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-stone-400 transition-colors duration-300 hover:text-amber-400"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="font-serif text-base tracking-wide text-stone-100">
              Treatments
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {treatments.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-stone-400 transition-colors duration-300 hover:text-amber-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-base tracking-wide text-stone-100">
              Visit Us
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-stone-400">
              <li className="flex gap-3">
                <FaMapPin className="mt-1 shrink-0 text-amber-400" size={14} />
                <span>
                  Address - 581, CHAMRAWAL Road, Baghpat Uttar Pradesh
                  <br />
                  PIN Code:  250615
                </span>
              </li>
              <li className="flex gap-3">
                <FaPhoneAlt className="mt-1 shrink-0 text-amber-400" size={13} />
                <a href="tel:+911234567890" className="hover:text-amber-400">
                  +91  9430000048
                </a>
              </li>
              <li className="flex gap-3">
                <IoMdMailUnread className="mt-1 shrink-0 text-amber-400" size={15} />
                <a href="mailto:care@amritasyaayurveda.com" className="hover:text-amber-400">
                  Info@prajanyahealthcares.com
                </a>
              </li>
              <li className="flex gap-3">
                <FaClock className="mt-1 shrink-0 text-amber-400" size={13} />
                <span>Mon – Sat, 9:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-emerald-800/70 pt-6 text-xs text-stone-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()}  Prajanya
            Healthcares All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}