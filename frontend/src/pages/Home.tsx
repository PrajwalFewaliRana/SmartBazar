import { useState, useEffect } from "react";

/* =====================================================
   1. TYPES
   These describe the shape of your data. When your backend
   sends data, it should match these shapes.
   ===================================================== */

type Feature = { id: number; icon: string; title: string; desc: string };
type Category = {
  id: number | string;
  name: string;
  count: number;
  icon: string;
};
type Product = {
  id: number | string;
  title: string;
  vendor: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  image: string;
};
type Testimonial = {
  id: number | string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
};
type Faq = { id: number | string; q: string; a: string };

/* =====================================================
   2. DEFAULT DATA
   Only the products use images. Put the 4 image files in your
   project's "public/images" folder and the paths below will work.
   When your backend sends products, "image" can be any image URL.
   Everything else uses emoji icons.
   ===================================================== */

const defaultSuggestions: string[] = [
  "Laptop for programming",
  "Phone under Rs.50,000",
  "Gaming chair",
  "Gift for my sister",
  "Running shoes",
  "DSLR for beginners",
];

const aiFeatures: Feature[] = [
  {
    id: 1,
    icon: "💬",
    title: "Natural Language Search",
    desc: "Ask in plain English and get results that match what you meant.",
  },
  {
    id: 2,
    icon: "✨",
    title: "Personalized Picks",
    desc: "Recommendations based on your taste and budget.",
  },
  {
    id: 3,
    icon: "⚖️",
    title: "AI Product Comparison",
    desc: "Compare specs and value side by side in seconds.",
  },
  {
    id: 4,
    icon: "📝",
    title: "AI Review Summaries",
    desc: "Thousands of reviews turned into simple pros and cons.",
  },
];

const defaultCategories: Category[] = [
  { id: 1, name: "Electronics", count: 12480, icon: "💻" },
  { id: 2, name: "Fashion", count: 24310, icon: "👕" },
  { id: 3, name: "Home", count: 8721, icon: "🏠" },
  { id: 4, name: "Books", count: 15230, icon: "📚" },
  { id: 5, name: "Sports", count: 5410, icon: "🏋️" },
  { id: 6, name: "Beauty", count: 6892, icon: "💎" },
  { id: 7, name: "Gaming", count: 3240, icon: "🎮" },
  { id: 8, name: "Accessories", count: 9870, icon: "⌚" },
];

const defaultProducts: Product[] = [
  {
    id: 1,
    title: "Studio Wireless Headphones",
    vendor: "Acoustica",
    price: 189,
    oldPrice: 249,
    rating: 4.8,
    image: "/homepage/headphones.jpg",
  },
  {
    id: 2,
    title: "Minimalist Steel Watch",
    vendor: "Northline",
    price: 149,
    oldPrice: null,
    rating: 4.6,
    image: "/homepage/watch.jpg",
  },
  {
    id: 3,
    title: "Ceramic Pour-Over Mug",
    vendor: "Kiln & Co.",
    price: 28,
    oldPrice: null,
    rating: 4.9,
    image: "/homepage/mug.jpg",
  },
  {
    id: 4,
    title: "Runner Pro Sneakers",
    vendor: "Stride Lab",
    price: 119,
    oldPrice: 140,
    rating: 4.7,
    image: "/homepage/sneakers.jpg",
  },
];

const whyShop: Feature[] = [
  {
    id: 1,
    icon: "🛡️",
    title: "Verified Sellers",
    desc: "Every vendor is verified and rated.",
  },
  {
    id: 2,
    icon: "🔒",
    title: "Secure Payments",
    desc: "Encrypted payment on every order.",
  },
  {
    id: 3,
    icon: "🤖",
    title: "AI Assistant",
    desc: "Help from search all the way to checkout.",
  },
  { id: 4, icon: "🚚", title: "Fast Delivery", desc: "Delivered in 2–4 days." },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ayesha K.",
    role: "Product Designer",
    avatar: "AK",
    quote:
      "I described a desk setup in one sentence and Nexa found everything I needed.",
  },
  {
    id: 2,
    name: "Daniel M.",
    role: "Software Engineer",
    avatar: "DM",
    quote: "The AI comparison saved me hours when picking a laptop.",
  },
  {
    id: 3,
    name: "Priya R.",
    role: "Small Business Owner",
    avatar: "PR",
    quote:
      "As a seller, setup took ten minutes. My first sale came the same day.",
  },
];

const defaultFaqs: Faq[] = [
  {
    id: 1,
    q: "How does the AI search work?",
    a: "Type what you need in plain language. The AI understands your budget and needs, then ranks the best products for you.",
  },
  {
    id: 2,
    q: "Which payment methods are supported?",
    a: "All major cards and local wallets. Every payment is encrypted.",
  },
  {
    id: 3,
    q: "What is the returns policy?",
    a: "Free returns within 14 days on most items.",
  },
  {
    id: 4,
    q: "How do I become a seller?",
    a: "Sign up with basic business details. Once verified, you get a full seller dashboard.",
  },
  {
    id: 5,
    q: "Is my data secure?",
    a: "Yes. We never sell personal data and you control what the AI remembers.",
  },
];

/* =====================================================
   3. SMALL REUSABLE COMPONENTS
   Each one takes typed props and shows them. Styling uses
   Tailwind classes in className. You can move any of these
   into their own file later.
   ===================================================== */

type SectionTitleProps = { title: string; desc?: string };

function SectionTitle({ title, desc }: SectionTitleProps) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <h2 className="text-3xl font-bold">{title}</h2>
      {desc && <p className="mt-3 text-gray-500">{desc}</p>}
    </div>
  );
}

type FeatureCardProps = { icon: string; title: string; desc: string };

function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex size-11 items-center justify-center rounded-xl bg-violet-100 text-2xl">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{desc}</p>
    </div>
  );
}

type CategoryCardProps = {
  name: string;
  count: number;
  icon: string;
  onClick: () => void;
};

function CategoryCard({ name, count, icon, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-3 font-semibold">{name}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {count.toLocaleString()} items
      </p>
    </div>
  );
}

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { title, vendor, price, oldPrice, rating, image } = product;
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img src={image} alt={title} className="h-52 w-full object-cover" />
      <div className="p-5">
        <p className="text-xs text-gray-400">{vendor}</p>
        <h3 className="mt-1 font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">⭐ {rating}</p>
        <p className="mt-2 text-lg font-bold">
          ${price}
          {oldPrice && (
            <span className="ml-2 text-sm font-normal text-gray-400 line-through">
              ${oldPrice}
            </span>
          )}
        </p>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-3 w-full rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

type TestimonialCardProps = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

function TestimonialCard({ name, role, avatar, quote }: TestimonialCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-amber-400">★★★★★</p>
      <p className="mt-3 text-sm text-gray-600">"{quote}"</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-600">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
}

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left font-medium"
      >
        {question}
        <span className="text-xl text-violet-600">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <p className="pb-4 text-sm text-gray-500">{answer}</p>}
    </div>
  );
}

/* =====================================================
   4. THE HOMEPAGE
   ===================================================== */

function Home() {
  // --- Data (starts with defaults, replaced when backend data loads) ---
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(defaultTestimonials);
  const [faqs, setFaqs] = useState<Faq[]>(defaultFaqs);

  // --- Loading and error state for the backend call ---
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // --- UI state ---
  const [query, setQuery] = useState<string>("");
  const [openFaqId, setOpenFaqId] = useState<number | string | null>(null);

  // --- Fetch data from your backend when the page loads ---
  // Uncomment and change the URLs to match your API.
  useEffect(() => {
    /*
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const productRes = await fetch("http://localhost:5000/api/products");
        const productData: Product[] = await productRes.json();
        setProducts(productData);

        const categoryRes = await fetch("http://localhost:5000/api/categories");
        const categoryData: Category[] = await categoryRes.json();
        setCategories(categoryData);
      } catch (err) {
        setError("Could not load data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
    */
  }, []);

  // NOTE: MongoDB returns "_id" instead of "id". If that is your case,
  // map the data first so it matches the types above:
  // setProducts(data.map((d: any) => ({ ...d, id: d._id })))

  // --- Event handlers ---
  function handleSearch() {
    // later: send the query to your backend or navigate to a search page
    console.log("Searching for:", query);
  }

  function handleAddToCart(product: Product) {
    // later: POST to your cart API
    console.log("Add to cart:", product.title);
  }

  function handleCategoryClick(category: Category) {
    // later: navigate to the category page
    console.log("Open category:", category.name);
  }

  function toggleFaq(id: number | string) {
    setOpenFaqId(openFaqId === id ? null : id);
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section id="home" className="bg-violet-50 py-16 text-center sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <span className="inline-block rounded-full bg-violet-100 px-4 py-1.5 text-sm text-violet-600">
            ✨ AI shopping, reimagined
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold sm:text-5xl">
            Find Exactly What You Need —{" "}
            <span className="text-violet-600">Powered by AI</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-gray-500">
            Describe what you're looking for and let AI recommend the perfect
            products from thousands of sellers.
          </p>

          <div className="mx-auto mt-8 flex max-w-3xl gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="I need a laptop for programming under Rs.120,000"
              className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none sm:text-base"
            />
            <button
              onClick={handleSearch}
              className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Ask AI
            </button>
          </div>

          <div className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2">
            {defaultSuggestions.map((text) => (
              <button
                key={text}
                onClick={() => setQuery(text)}
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-500 transition hover:border-violet-400 hover:text-violet-600"
              >
                {text}
              </button>
            ))}
          </div>

          <p className="mt-8 text-xs text-gray-500">
            ✓ 50,000+ verified sellers &nbsp; ✓ 2M+ products &nbsp; ✓ AI trained
            on real reviews
          </p>
        </div>
      </section>

      {/* AI FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle
          title="Shopping that understands you"
          desc="Four ways Nexa's AI makes finding the right product easy."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aiFeatures.map((item) => (
            <FeatureCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle
          title="Popular categories"
          desc="Millions of products across every category."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              count={cat.count}
              icon={cat.icon}
              onClick={() => handleCategoryClick(cat)}
            />
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle
          title="Handpicked by AI"
          desc="Trending products picked for you."
        />

        {loading && (
          <p className="mb-5 text-center text-gray-500">Loading...</p>
        )}
        {error && <p className="mb-5 text-center text-red-600">{error}</p>}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      {/* WHY SHOP */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle title="Built for buyers you can trust" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyShop.map((item) => (
              <FeatureCard
                key={item.id}
                icon={item.icon}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BECOME A SELLER */}
      <section id="seller" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-violet-50 px-6 py-12 text-center sm:py-14">
          <h2 className="text-3xl font-bold">
            Sell smarter with AI on your side
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Launch your storefront in minutes and get AI-generated listings and
            fast payouts.
          </p>
          <button className="mt-6 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700">
            Become a Seller
          </button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle title="What our customers say" />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.id}
              name={t.name}
              role={t.role}
              avatar={t.avatar}
              quote={t.quote}
            />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <SectionTitle title="Frequently asked questions" />
        {faqs.map((item) => (
          <FaqItem
            key={item.id}
            question={item.q}
            answer={item.a}
            isOpen={openFaqId === item.id}
            onToggle={() => toggleFaq(item.id)}
          />
        ))}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-gray-50 py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Nexa. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
