import { useState } from "react";
import { FaStar, FaUserCircle, FaCheckCircle } from "react-icons/fa";

function Stars({ rating, size = 13 }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          size={size}
          className={i < rounded ? "text-amber-400" : "text-emerald-800"}
        />
      ))}
    </div>
  );
}

// Dummy reviews data — replace later with real data from backend
const reviewsData = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "Great results within a month",
    review:
      "I have been using this product for over a month now and I can genuinely feel the difference in my energy levels. No side effects at all, and the packaging feels premium. Highly recommend it.",
  },
  {
    id: 2,
    name: "Himanshu Verma",
    rating: 4,
    date: "1 month ago",
    verified: true,
    title: "Good quality, delivery took time",
    review:
      "The product quality is really good and it's 100% natural as claimed. Only issue was the delivery took a couple of extra days. Otherwise very satisfied with the purchase.",
  },
  {
    id: 3,
    name: "Amit Kumar",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    title: "Doctor recommended, works well",
    review:
      "My doctor suggested Ayurvedic supplements alongside my regular medication, and this one has worked really well for me. Easy to consume and no bitter aftertaste.",
  },
  {
    id: 4,
    name: "Sneha Patel",
    rating: 4,
    date: "2 months ago",
    verified: false,
    title: "Satisfied with the results",
    review:
      "Been taking this for my mother, she has noticed improvement in her overall stamina. Price is a bit on the higher side but the quality justifies it.",
  },
];

function ReviewCard({ review }) {
  return (
    <div className="border-b border-emerald-800/70 py-6 last:border-0">
      <div className="flex items-start gap-4">
        <FaUserCircle size={38} className="mt-0.5 shrink-0 text-emerald-800" />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-serif text-base text-stone-100">{review.name}</p>
            {review.verified && (
              <span className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                <FaCheckCircle size={9} />
                Verified Purchase
              </span>
            )}
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <Stars rating={review.rating} size={12} />
            <span className="text-xs text-stone-500">{review.date}</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-stone-200">{review.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-stone-400 sm:text-[15px]">
            {review.review}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewSection({ rating = 4.5, totalReviews = 128 }) {
  const [visibleCount, setVisibleCount] = useState(3);

  const breakdown = [
    { star: 5, percent: 68 },
    { star: 4, percent: 20 },
    { star: 3, percent: 7 },
    { star: 2, percent: 3 },
    { star: 1, percent: 2 },
  ];

  return (
    <section className="relative bg-emerald-950 text-stone-300 overflow-hidden">
      {/* Decorative background icon (same as FAQ) */}
      <svg
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-emerald-900/40 sm:h-96 sm:w-96"
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

      <div className="relative mx-auto max-w-4xl px-6 py-20 sm:px-10 lg:px-0">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center">
            <span className="h-px w-12 bg-amber-500/50" />
            <span className="mx-3 text-xs uppercase tracking-[0.3em] text-amber-400">
              Reviews
            </span>
            <span className="h-px w-12 bg-amber-500/50" />
          </div>
          <h2 className="font-serif text-3xl text-stone-100 sm:text-4xl">
            What Our <span className="text-amber-400">Customers Say</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-stone-400 sm:text-[15px]">
            Real experiences from real people on their Ayurvedic wellness
            journey with us.
          </p>
        </div>

        {/* Rating summary */}
        <div className="flex flex-col gap-8 border-y border-emerald-800/70 py-8 sm:flex-row sm:items-center">
          <div className="flex flex-col items-center sm:items-start">
            <p className="font-serif text-4xl text-stone-100">{rating}</p>
            <Stars rating={rating} size={16} />
            <p className="mt-1 text-xs text-stone-500">
              Based on {totalReviews} reviews
            </p>
          </div>

          <div className="flex-1 space-y-2">
            {breakdown.map((b) => (
              <div key={b.star} className="flex items-center gap-3">
                <span className="w-12 text-xs text-stone-400">{b.star} star</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-emerald-900">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${b.percent}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-stone-500">
                  {b.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Review list */}
        <div className="mt-2">
          {reviewsData.slice(0, visibleCount).map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>

        {visibleCount < reviewsData.length && (
          <button
            onClick={() => setVisibleCount(reviewsData.length)}
            className="mt-4 w-full rounded-xl border border-emerald-800 py-3 text-sm font-semibold text-amber-400 transition-colors duration-300 hover:bg-emerald-900/50"
          >
            Load More Reviews
          </button>
        )}

        {/* Bottom CTA */}
        <p className="mt-10 text-center text-sm text-stone-400">
          Have you used this product?{" "}
          <a
            href="#write-review"
            className="text-amber-400 underline underline-offset-4 hover:text-amber-300"
          >
            Write a review
          </a>
        </p>
      </div>
    </section>
  );
}