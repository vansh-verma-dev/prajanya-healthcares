import wg1 from "../assets/wg-1.png";
import wg2 from "../assets/wg-2.png";
import wg3 from "../assets/wg-3.png";
import hair1 from "../assets/hair-1.png";
import hair2 from "../assets/hair-2.png";
import hair3 from "../assets/hair-3.jpg";
import hp1 from "../assets/hp1.jpeg";
import hp2 from "../assets/hp2.jpeg";
import hp3 from "../assets/hp3.jpeg";
import HerbalPowde1 from "../assets/Herbal-Powde1.png";
import HerbalPowde3 from "../assets/HerbalPowde3.png";
import pc1 from "../assets/pc1.png";
import pc2 from "../assets/pc2.png";

export const productsData = [
  {
    id: 1,
    slug: "Prajanya Healthcares-complete-piles-care-kit",
    name: "Prajanya Healthcares Complete Piles Care Kit",
    subHeading: "A 3-Step Holistic Solution for Lasting Relief",
    brand: "Prajanya Healthcares",
    category: "Ayurvedic Medicine",
    rating: 4.8,
    reviews: 324,
    sold: "5,000+",
    price: 1999,
    originalPrice: 2499,
    discount: "20% OFF",
    stock: 48,
    sku: "AA-PCK-001",
    badge: ["Bestseller", "100% Herbal", "Doctor Recommended"],
    images: [
      pc1,
      pc2
    ],
    shortDescription:
      "Complete Ayurvedic treatment kit designed to provide long-lasting relief from piles, fissures, constipation, and rectal discomfort without surgery.",

    description:
      "Prajanya Healthcares Complete Piles Care Kit is a clinically inspired Ayurvedic formulation that works on the root cause of piles instead of only relieving symptoms. It combines herbal capsules, digestive powder, and healing gel for complete internal and external care.",

    highlights: [
      "100% Herbal Formula",
      "No Side Effects",
      "Suitable For Men & Women",
      "Made In India",
      "GMP Certified",
      "Ayush Ingredients",
      "Cash On Delivery Available",
      "Free Shipping",
    ],

    benefits: [
      "Reduces swelling & inflammation",
      "Stops bleeding naturally",
      "Relieves pain, burning & itching",
      "Repairs damaged veins",
      "Improves bowel movement",
      "Prevents recurrence",
      "Supports healthy digestion",
      "Avoids surgery in early stages",
    ],

    suitableFor: [
      "Bleeding Piles",
      "Non-Bleeding Piles",
      "Internal Hemorrhoids",
      "External Hemorrhoids",
      "Anal Fissures",
      "Chronic Constipation",
    ],

    ingredients: {
      "Healing Gel": [
        "Neem",
        "Aloe Vera",
        "Karanj Oil",
        "Jatyadi Oil",
        "Turmeric",
        "Camphor",
        "Coconut Oil Base",
      ],
      "Shuddhi Churan": [
        "Isabgol Husk",
        "Haritaki",
        "Senna Leaves",
        "Ajwain",
        "Saunf",
        "Mulethi",
        "Triphala",
      ],
      "Advance Capsules": [
        "Nagkesar",
        "Lajjalu",
        "Kutaj",
        "Arshoghni Herbs",
        "Guggulu",
        "Amla Extract",
        "Bael Extract",
      ],
    },

    usage: [
      { time: "Morning", instruction: "Take 1 Advance Capsule with lukewarm water." },
      { time: "Night", instruction: "Mix 1 teaspoon Shuddhi Churan in warm water." },
      { time: "External", instruction: "Apply Healing Gel 2–3 times daily." },
    ],

    duration: {
      mild: "30 Days",
      moderate: "60 Days",
      chronic: "90 Days",
    },

    precautions: [
      "Avoid spicy & fried food",
      "Drink 2–3 litres of water",
      "Do not strain during bowel movement",
      "Eat fibre-rich foods",
      "Avoid prolonged sitting on toilet",
    ],

    storage: "Store in a cool & dry place away from direct sunlight.",

    shipping: {
      delivery: "3-7 Business Days",
      shippingCost: "Free",
      cod: true,
      return: "7 Days Replacement",
    },

    faq: [
      { question: "Is this medicine safe?", answer: "Yes, it is made using herbal Ayurvedic ingredients." },
      { question: "How long should I use it?", answer: "30 to 90 days depending on the severity." },
      { question: "Does it have side effects?", answer: "No known side effects when used as directed." },
    ],

    disclaimer:
      "This is an Prajanya Healthcares. Results may vary depending on individual body constitution.",

    seo: {
      title: "Prajanya Healthcares Complete Piles Care Kit",
      keywords: [
        "Piles Medicine",
        "Ayurvedic Piles Treatment",
        "Hemorrhoids Relief",
        "Fissure Treatment",
        "Constipation Relief",
      ],
    },
  },
  {
    id: 2,
    slug: "Prajanya Healthcares Pure Himalayan Shilajit",
    name: "Prajanya Healthcares Pure Himalayan Shilajit",
    subHeading: "The Ultimate Natural Source of Energy & Vitality",
    brand: "Prajanya Healthcares",
    category: "Ayurvedic Medicine",
    rating: 4.8,
    reviews: 324,
    sold: "5,000+",
    price: 1499,
    originalPrice: 2499,
    discount: "20% OFF",
    stock: 48,
    sku: "AA-PCK-001",
    badge: ["Bestseller", "100% Herbal", "Doctor Recommended"],
    images: [
      "https://i.pinimg.com/736x/bb/e1/d8/bbe1d82d4bf3e71f0d1493bf3b740176.jpg",
      "https://i.pinimg.com/736x/58/58/f2/5858f28f5c687cbb83661f9586ebdbcd.jpg",
      "https://i.pinimg.com/736x/5f/14/50/5f1450a2c788a4603583da1015838793.jpg"
    ],
    shortDescription:
      "The Ultimate Natural Source of Energy, Strength & Vitality",

    description:
      "Prajanya Healthcares Complete Piles Care Kit is a clinically inspired Ayurvedic formulation that works on the root cause of piles instead of only relieving symptoms. It combines herbal capsules, digestive powder, and healing gel for complete internal and external care.",

    highlights: [
      "100% Herbal Formula",
      "No Side Effects",
      "Suitable For Men & Women",
      "Made In India",
      "GMP Certified",
      "Ayush Ingredients",
      "Cash On Delivery Available",
      "Free Shipping",
    ],

    benefits: [
      "Reduces swelling & inflammation",
      "Stops bleeding naturally",
      "Relieves pain, burning & itching",
      "Repairs damaged veins",
      "Improves bowel movement",
      "Prevents recurrence",
      "Supports healthy digestion",
      "Avoids surgery in early stages",
    ],

    suitableFor: [
      "Bleeding Piles",
      "Non-Bleeding Piles",
      "Internal Hemorrhoids",
      "External Hemorrhoids",
      "Anal Fissures",
      "Chronic Constipation",
    ],

    ingredients: {
      "Healing Gel": [
        "Neem",
        "Aloe Vera",
        "Karanj Oil",
        "Jatyadi Oil",
        "Turmeric",
        "Camphor",
        "Coconut Oil Base",
      ],
      "Shuddhi Churan": [
        "Isabgol Husk",
        "Haritaki",
        "Senna Leaves",
        "Ajwain",
        "Saunf",
        "Mulethi",
        "Triphala",
      ],
      "Advance Capsules": [
        "Nagkesar",
        "Lajjalu",
        "Kutaj",
        "Arshoghni Herbs",
        "Guggulu",
        "Amla Extract",
        "Bael Extract",
      ],
    },

    usage: [
      { time: "Morning", instruction: "Take 1 Advance Capsule with lukewarm water." },
      { time: "Night", instruction: "Mix 1 teaspoon Shuddhi Churan in warm water." },
      { time: "External", instruction: "Apply Healing Gel 2–3 times daily." },
    ],

    duration: {
      mild: "30 Days",
      moderate: "60 Days",
      chronic: "90 Days",
    },

    precautions: [
      "Avoid spicy & fried food",
      "Drink 2–3 litres of water",
      "Do not strain during bowel movement",
      "Eat fibre-rich foods",
      "Avoid prolonged sitting on toilet",
    ],

    storage: "Store in a cool & dry place away from direct sunlight.",

    shipping: {
      delivery: "3-7 Business Days",
      shippingCost: "Free",
      cod: true,
      return: "7 Days Replacement",
    },

    faq: [
      { question: "Is this medicine safe?", answer: "Yes, it is made using herbal Ayurvedic ingredients." },
      { question: "How long should I use it?", answer: "30 to 90 days depending on the severity." },
      { question: "Does it have side effects?", answer: "No known side effects when used as directed." },
    ],

    disclaimer:
      "This is an Ayurvedic product. Results may vary depending on individual body constitution.",

    seo: {
      title: "Prajanya Healthcares Complete Piles Care Kit",
      keywords: [
        "Piles Medicine",
        "Ayurvedic Piles Treatment",
        "Hemorrhoids Relief",
        "Fissure Treatment",
        "Constipation Relief",
      ],
    },
  },
  {
    id: 3,
    slug: "Prajanya Healthcares Dia Balance Herbal Powde  ",
    name: "Prajanya Healthcares Herbal Powde  ",
    subHeading: "Dia Balance | Herbal Powder – A natural Ayurvedic blend for digestive wellness and healthy gut function",
    brand: "Prajanya Healthcares",
    category: "Prajanya Healthcares",
    rating: 4.8,
    reviews: 324,
    sold: "5,000+",
    price: 1999,
    originalPrice: 2499,
    discount: "20% OFF",
    stock: 48,
    sku: "AA-PCK-001",
    badge: ["Bestseller", "100% Herbal", "Doctor Recommended"],
    images: [
      HerbalPowde3,
      HerbalPowde1,
      "https://www.amritashya.in/_next/image?url=https%3A%2F%2Fgqfeipyaxweijhrlrxqt.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2F81085e77-3986-4e55-8d27-fded0c5c735b%2Flfonhq8glh9_1771949283895.jpg&w=1920&q=75",


    ],
    shortDescription:
      "The Ultimate Natural Source of Energy, Strength & Vitality",

    description:
      "Prajanya Healthcares Complete Piles Care Kit is a clinically inspired Ayurvedic formulation that works on the root cause of piles instead of only relieving symptoms. It combines herbal capsules, digestive powder, and healing gel for complete internal and external care.",

    highlights: [
      "100% Herbal Formula",
      "No Side Effects",
      "Suitable For Men & Women",
      "Made In India",
      "GMP Certified",
      "Ayush Ingredients",
      "Cash On Delivery Available",
      "Free Shipping",
    ],

    benefits: [
      "Reduces swelling & inflammation",
      "Stops bleeding naturally",
      "Relieves pain, burning & itching",
      "Repairs damaged veins",
      "Improves bowel movement",
      "Prevents recurrence",
      "Supports healthy digestion",
      "Avoids surgery in early stages",
    ],

    suitableFor: [
      "Bleeding Piles",
      "Non-Bleeding Piles",
      "Internal Hemorrhoids",
      "External Hemorrhoids",
      "Anal Fissures",
      "Chronic Constipation",
    ],

    ingredients: {
      "Healing Gel": [
        "Neem",
        "Aloe Vera",
        "Karanj Oil",
        "Jatyadi Oil",
        "Turmeric",
        "Camphor",
        "Coconut Oil Base",
      ],
      "Shuddhi Churan": [
        "Isabgol Husk",
        "Haritaki",
        "Senna Leaves",
        "Ajwain",
        "Saunf",
        "Mulethi",
        "Triphala",
      ],
      "Advance Capsules": [
        "Nagkesar",
        "Lajjalu",
        "Kutaj",
        "Arshoghni Herbs",
        "Guggulu",
        "Amla Extract",
        "Bael Extract",
      ],
    },

    usage: [
      { time: "Morning", instruction: "Take 1 Advance Capsule with lukewarm water." },
      { time: "Night", instruction: "Mix 1 teaspoon Shuddhi Churan in warm water." },
      { time: "External", instruction: "Apply Healing Gel 2–3 times daily." },
    ],

    duration: {
      mild: "30 Days",
      moderate: "60 Days",
      chronic: "90 Days",
    },

    precautions: [
      "Avoid spicy & fried food",
      "Drink 2–3 litres of water",
      "Do not strain during bowel movement",
      "Eat fibre-rich foods",
      "Avoid prolonged sitting on toilet",
    ],

    storage: "Store in a cool & dry place away from direct sunlight.",

    shipping: {
      delivery: "3-7 Business Days",
      shippingCost: "Free",
      cod: true,
      return: "7 Days Replacement",
    },

    faq: [
      { question: "Is this medicine safe?", answer: "Yes, it is made using herbal Ayurvedic ingredients." },
      { question: "How long should I use it?", answer: "30 to 90 days depending on the severity." },
      { question: "Does it have side effects?", answer: "No known side effects when used as directed." },
    ],

    disclaimer:
      "This is an Ayurvedic product. Results may vary depending on individual body constitution.",

    seo: {
      title: "Prajanya Healthcares Complete Piles Care Kit",
      keywords: [
        "Piles Medicine",
        "Ayurvedic Piles Treatment",
        "Hemorrhoids Relief",
        "Fissure Treatment",
        "Constipation Relief",
      ],
    },
  },
  {
    id: 4,
    slug: "prajanya-healthcares-weight-gain ",
    name: "Prajanya Healthcares Weight Gain  ",
    subHeading:
      "Weight Gain |  – Ayurvedic Formula for Healthy Weight, Strength & Energy",

    brand: "Prajanya Healthcares",
    category: "Weight Gain",
    rating: 4.8,
    reviews: 324,
    sold: "5,000+",
    price: 1999,
    originalPrice: 2499,
    discount: "20% OFF",
    stock: 48,
    sku: "PH-WG-001",

    badge: ["Bestseller", "100% Herbal", "Doctor Recommended"],

    images: [
      "https://i.pinimg.com/736x/49/f1/ac/49f1ac2f7cc9d3636811c6a3e6d4b5aa.jpg",
      "https://i.pinimg.com/736x/94/1c/01/941c01540fcc763c5c132cbec1243d2f.jpg",
      "https://i.pinimg.com/736x/fa/d7/bc/fad7bc6da4bbbb1e254b732ec9f4b6ef.jpg"
    ],

    shortDescription:
      "Natural Ayurvedic Weight Gain Powder to Improve Appetite, Muscle Strength & Overall Vitality.",

    description:
      "Prajanya Healthcares Weight Gain Herbal Powder is a premium Ayurvedic formulation designed to support healthy weight gain naturally. It helps improve appetite, digestion, nutrient absorption, muscle development, stamina, and overall energy without harmful chemicals or steroids.",

    highlights: [
      "100% Herbal Formula",
      "Supports Healthy Weight Gain",
      "Improves Appetite",
      "Boosts Energy & Strength",
      "Suitable For Men & Women",
      "Made In India",
      "GMP Certified",
      "Free Shipping",
    ],

    benefits: [
      "Promotes healthy weight gain",
      "Improves appetite naturally",
      "Enhances digestion & nutrient absorption",
      "Supports muscle growth",
      "Boosts energy & stamina",
      "Improves overall body strength",
      "Helps reduce weakness & fatigue",
      "Supports healthy metabolism",
    ],

    suitableFor: [
      "Underweight Adults",
      "Men & Women",
      "People with Low Appetite",
      "Students",
      "Working Professionals",
      "People Recovering from Weakness",
    ],

    ingredients: {
      "Herbal Blend": [
        "Ashwagandha",
        "Shatavari",
        "Safed Musli",
        "Vidarikand",
        "Amla",
        "Gokshura",
        "Mulethi",
        "Triphala",
      ],
    },

    usage: [
      {
        time: "Morning",
        instruction:
          "Take 1 tablespoon with warm milk after breakfast.",
      },
      {
        time: "Evening",
        instruction:
          "Take 1 tablespoon with milk after dinner or as directed by your physician.",
      },
    ],

    duration: {
      mild: "30 Days",
      moderate: "60 Days",
      chronic: "90 Days",
    },

    precautions: [
      "Use regularly for best results.",
      "Maintain a balanced diet.",
      "Drink enough water daily.",
      "Store in a cool & dry place.",
      "Consult your physician if pregnant or breastfeeding.",
    ],

    storage:
      "Store in a cool, dry place away from direct sunlight. Keep out of reach of children.",

    shipping: {
      delivery: "3-7 Business Days",
      shippingCost: "Free",
      cod: true,
      return: "7 Days Replacement",
    },

    faq: [
      {
        question: "Is this product safe?",
        answer:
          "Yes, it is made from Ayurvedic herbal ingredients and is safe when used as directed.",
      },
      {
        question: "How long does it take to see results?",
        answer:
          "Most users notice improvements within 4–8 weeks with proper diet and regular use.",
      },
      {
        question: "Does it contain steroids?",
        answer:
          "No, it is completely herbal and free from steroids or harmful chemicals.",
      },
    ],

    disclaimer:
      "This is an Ayurvedic product. Individual results may vary depending on body type, diet, and lifestyle.",

    seo: {
      title: "Prajanya Healthcares Weight Gain Herbal Powder",
      keywords: [
        "Weight Gain Powder",
        "Ayurvedic Weight Gain",
        "Herbal Weight Gain",
        "Healthy Weight Gain",
        "Natural Weight Gain Supplement",
      ],
    },
  },
  {
    id: 5,
    slug: "prajanya-healthcares-hair-care-oil",
    name: "Prajanya Healthcares Hair Care Oil",

    subHeading:
      "Hair Care | Ayurvedic Hair Oil – Helps Reduce Hair Fall, Promote Hair Growth & Nourish the Scalp",

    brand: "Prajanya Healthcares",
    category: "Hair Care",
    rating: 4.7,
    reviews: 286,
    sold: "3,500+",
    price: 1499,
    originalPrice: 1999,
    discount: "25% OFF",
    stock: 65,
    sku: "PH-HC-001",

    badge: [
      "Bestseller",
      "100% Herbal",
      "Clinically Inspired",
    ],

    images: [
      "https://i.pinimg.com/736x/d6/77/61/d67761d8eea4ff7005ae56daee954d0e.jpg",
      "https://i.pinimg.com/736x/c0/70/b7/c070b7168a8fae4a7f7c66e94d0b03c9.jpg",
      "https://i.pinimg.com/736x/49/4c/46/494c461ebc9c1eb0f9e41dc13ed776b8.jpg"
    ],

    shortDescription:
      "Natural Ayurvedic Hair Oil for Hair Fall Control, Hair Regrowth & Stronger Roots.",

    description:
      "Prajanya Healthcares Hair Care Oil is an Ayurvedic blend of traditional herbs that nourishes the scalp, strengthens hair roots, reduces hair fall, supports healthy hair growth, and helps improve overall hair texture naturally.",

    highlights: [
      "100% Herbal Formula",
      "Reduces Hair Fall",
      "Promotes Hair Growth",
      "Strengthens Hair Roots",
      "Suitable For Men & Women",
      "Made In India",
      "No Harmful Chemicals",
      "Free Shipping",
    ],

    benefits: [
      "Helps reduce hair fall",
      "Promotes healthy hair growth",
      "Strengthens weak hair roots",
      "Nourishes the scalp",
      "Helps reduce dandruff",
      "Improves hair thickness",
      "Adds natural shine",
      "Supports healthy scalp health",
    ],

    suitableFor: [
      "Hair Fall",
      "Thinning Hair",
      "Weak Hair Roots",
      "Dry Hair",
      "Dandruff",
      "Men & Women",
    ],

    ingredients: {
      "Ayurvedic Herbal Blend": [
        "Bhringraj",
        "Amla",
        "Brahmi",
        "Neem",
        "Hibiscus",
        "Onion Seed Oil",
        "Coconut Oil",
        "Almond Oil",
      ],
    },

    usage: [
      {
        time: "Night",
        instruction:
          "Massage the oil gently into the scalp for 5–10 minutes.",
      },
      {
        time: "Morning",
        instruction:
          "Leave overnight or for at least 2 hours, then wash with a mild shampoo.",
      },
    ],

    duration: {
      mild: "30 Days",
      moderate: "60 Days",
      chronic: "90 Days",
    },

    precautions: [
      "For external use only.",
      "Avoid contact with eyes.",
      "Store in a cool & dry place.",
      "Do a patch test before first use.",
      "Keep out of reach of children.",
    ],

    storage:
      "Store in a cool and dry place away from direct sunlight.",

    shipping: {
      delivery: "3-7 Business Days",
      shippingCost: "Free",
      cod: true,
      return: "7 Days Replacement",
    },

    faq: [
      {
        question: "Is this oil suitable for both men and women?",
        answer:
          "Yes, it is suitable for both men and women.",
      },
      {
        question: "How often should I use it?",
        answer:
          "Use 3–4 times a week for the best results.",
      },
      {
        question: "Does it contain harmful chemicals?",
        answer:
          "No, it is made with herbal Ayurvedic ingredients and contains no harmful chemicals.",
      },
    ],

    disclaimer:
      "This is an Ayurvedic product. Results may vary depending on individual hair type and lifestyle.",

    seo: {
      title: "Prajanya Healthcares Hair Care Oil",
      keywords: [
        "Hair Oil",
        "Hair Fall Control",
        "Hair Growth Oil",
        "Ayurvedic Hair Oil",
        "Natural Hair Care",
      ],
    },
  },
  {
    id: 6,
    slug: "prajanya-healthcares-appetite-stimulant-syrup",

    name: "Prajanya Healthcares Appetite Stimulant Syrup",

    subHeading:
      "Appetite Stimulant Syrup | Ayurvedic Formula for Better Appetite, Healthy Digestion & Natural Weight Gain",

    brand: "Prajanya Healthcares",
    category: "Appetite Care",

    rating: 4.9,
    reviews: 198,
    sold: "2,500+",

    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",

    stock: 120,
    sku: "PH-AS-001",

    badge: [
      "Bestseller",
      "100% Herbal",
      "Doctor Recommended",
    ],

    images: [
      "https://i.pinimg.com/736x/1b/79/22/1b7922f5a3ee3404678e673c36fffa87.jpg"
    ],

    shortDescription:
      "Ayurvedic Appetite Stimulant Syrup that helps improve appetite, digestion, energy, and supports healthy weight gain.",

    description:
      "Prajanya Healthcares Appetite Stimulant Syrup is an Ayurvedic herbal formulation designed to naturally improve appetite, support healthy digestion, enhance nutrient absorption, and promote healthy weight gain. Regular use helps increase energy, strength, and overall wellness without harmful chemicals.",

    highlights: [
      "100% Ayurvedic Formula",
      "Improves Appetite Naturally",
      "Supports Healthy Digestion",
      "Promotes Healthy Weight Gain",
      "Boosts Energy & Stamina",
      "Suitable For Men & Women",
      "Made In India",
      "Free Shipping",
    ],

    benefits: [
      "Increases appetite naturally",
      "Improves digestion",
      "Enhances nutrient absorption",
      "Supports healthy weight gain",
      "Boosts immunity",
      "Increases energy levels",
      "Reduces weakness & fatigue",
      "Promotes overall wellness",
    ],

    suitableFor: [
      "Low Appetite",
      "Underweight Adults",
      "Poor Digestion",
      "Weakness & Fatigue",
      "Students",
      "Working Professionals",
      "Men & Women",
    ],

    ingredients: {
      "Herbal Formula": [
        "Ashwagandha",
        "Shatavari",
        "Draksha",
        "Amla",
        "Vidarikand",
        "Pippali",
        "Jeera",
        "Ajwain",
      ],
    },

    usage: [
      {
        time: "Morning",
        instruction:
          "Take 10–15 ml after breakfast or as directed by your physician.",
      },
      {
        time: "Evening",
        instruction:
          "Take 10–15 ml after dinner with lukewarm water.",
      },
    ],

    duration: {
      mild: "30 Days",
      moderate: "60 Days",
      chronic: "90 Days",
    },

    precautions: [
      "Shake well before use.",
      "Do not exceed the recommended dosage.",
      "Store in a cool & dry place.",
      "Keep out of reach of children.",
      "Consult your doctor during pregnancy or breastfeeding.",
    ],

    storage:
      "Store in a cool and dry place away from direct sunlight.",

    shipping: {
      delivery: "3-7 Business Days",
      shippingCost: "Free",
      cod: true,
      return: "7 Days Replacement",
    },

    faq: [
      {
        question: "Who can use this syrup?",
        answer:
          "It is suitable for adults experiencing low appetite, weakness, or poor digestion.",
      },
      {
        question: "How long should I use it?",
        answer:
          "For best results, use regularly for at least 30–60 days or as advised by your physician.",
      },
      {
        question: "Does it contain steroids?",
        answer:
          "No. It is prepared using Ayurvedic herbal ingredients and contains no steroids.",
      },
    ],

    disclaimer:
      "This is an Ayurvedic product. Individual results may vary depending on body type, diet, and lifestyle.",

    seo: {
      title: "Prajanya Healthcares Appetite Stimulant Syrup",
      keywords: [
        "Appetite Stimulant",
        "Ayurvedic Syrup",
        "Weight Gain Syrup",
        "Healthy Digestion",
        "Herbal Appetite Booster",
        "Natural Weight Gain",
      ],
    },
  }
];