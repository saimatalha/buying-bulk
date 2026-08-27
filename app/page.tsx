"use client";

import Image from "next/image";
import { useState } from "react";

const categories = [
  {
    name: "Atta & Flour",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Rice",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Daal & Pulses",
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Oil & Ghee",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Tea & Drinks",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Household",
    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80",
  },
];

const products = [
  {
    name: "Premium Basmati Rice",
    category: "Rice",
    size: "5 kg",
    price: 2199,
    oldPrice: 2599,
    saving: 400,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Fine Wheat Atta",
    category: "Atta & Flour",
    size: "10 kg",
    price: 1699,
    oldPrice: 1899,
    saving: 200,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Cooking Oil",
    category: "Oil & Ghee",
    size: "5 L",
    price: 2999,
    oldPrice: 3299,
    saving: 300,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Family Tea Pack",
    category: "Tea & Drinks",
    size: "950 g",
    price: 2199,
    oldPrice: 2499,
    saving: 300,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80",
  },
];

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export default function Home() {
  const [cart, setCart] = useState(0);
const [search, setSearch] = useState("");
const [showAI, setShowAI] = useState(false);
const [generated, setGenerated] = useState(false);

const [showChatbot, setShowChatbot] = useState(false);
const [chatMessage, setChatMessage] = useState("");
const [chatResponse, setChatResponse] = useState("");
const [chatLoading, setChatLoading] = useState(false);
const sendChatMessage = async () => {
  if (!chatMessage.trim() || chatLoading) return;

  const message = chatMessage;

  setChatMessage("");
  setChatLoading(true);

  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `
You are MyBulkAI, the intelligent shopping assistant for MyBulkDeals,
a Pakistani bulk grocery marketplace.

Help customers with:
- grocery recommendations
- monthly ration planning
- bulk shopping
- saving money
- grocery budgets
- Pakistani grocery shopping

Always use Pakistani Rupees (Rs.) when discussing prices.

Customer message:
${message}

Give a helpful, concise and friendly response.
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI request failed");
    }

    setChatResponse(data.response);
  } catch (error) {
    console.error(error);

    setChatResponse(
      "I'm having trouble connecting right now. Please make sure Ollama is running."
    );
  } finally {
    setChatLoading(false);
  }
};
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#f7f7f3] text-[#171717]">

      {/* NAVIGATION */}

      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f7f3]/95 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">

          <a href="#" className="flex items-center gap-3">
            <Image
              src="/logobulkdeal.png"
              alt="MyBulkdeal"
              width={190}
              height={100}
              className="h-auto w-[150px] object-contain sm:w-[190px]"
              priority
            />
          </a>

          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#shop" className="hover:text-[#78a83b]">
              Shop
            </a>

            <a href="#categories" className="hover:text-[#78a83b]">
              Categories
            </a>

            <a href="#ai" className="hover:text-[#78a83b]">
              AI Ration Planner
            </a>

            <a href="#deals" className="hover:text-[#78a83b]">
              Deals
            </a>
          </nav>

          <div className="flex items-center gap-3">

            <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white">
              🛒

              {cart > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#78a83b] text-[10px] font-bold text-white">
                  {cart}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowChatbot(true)}
              className="rounded-full bg-[#171717] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#78a83b]"
            >
              ✦ My Bulk AI
            </button>

          </div>

        </div>

      </header>


      {/* HERO */}

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-10 lg:pt-24">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          <div>

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider">

              <span className="h-2 w-2 rounded-full bg-[#78a83b]" />

              Smart grocery shopping for Pakistan

            </div>

            <h1 className="text-6xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-8xl">

              Buy more.

              <br />

              <span className="text-[#78a83b]">
                Spend less.
              </span>

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-black/55">

              Your smarter way to shop monthly ration. Buy everyday essentials
              in bulk, compare prices, and discover how much you can save.

            </p>


            {/* SEARCH */}

            <div className="mt-8 flex max-w-xl rounded-full border border-black/10 bg-white p-2">

              <span className="flex items-center pl-4 text-xl">
                ⌕
              </span>

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search rice, atta, oil, tea..."
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
              />

              <button className="rounded-full bg-[#171717] px-6 py-3 text-xs font-bold text-white">
                Search
              </button>

            </div>


            <div className="mt-6 flex flex-wrap gap-3">

              <a
                href="#shop"
                className="rounded-full bg-[#171717] px-7 py-4 text-sm font-bold text-white"
              >
                Shop bulk deals →
              </a>

              <button
                onClick={() => setShowAI(true)}
                className="rounded-full border border-black/15 bg-white px-7 py-4 text-sm font-bold"
              >
                ✦ Plan my monthly ration
              </button>

            </div>


            <div className="mt-10 flex gap-10">

              <div>
                <strong className="text-2xl">
                  10K+
                </strong>

                <p className="text-xs text-black/40">
                  products
                </p>
              </div>

              <div>
                <strong className="text-2xl">
                  25%
                </strong>

                <p className="text-xs text-black/40">
                  average savings
                </p>
              </div>

              <div>
                <strong className="text-2xl">
                  AI
                </strong>

                <p className="text-xs text-black/40">
                  ration planning
                </p>
              </div>

            </div>

          </div>


          {/* HERO IMAGE */}

          <div className="relative">

            <div className="overflow-hidden rounded-[36px] bg-[#dce7c8] p-4 shadow-2xl">

              <div className="relative h-[570px] overflow-hidden rounded-[28px]">

                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=90"
                  alt="Fresh groceries"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                <div className="absolute bottom-0 p-8 text-white">

                  <span className="rounded-full bg-white/20 px-4 py-2 text-[10px] font-bold backdrop-blur">
                    MONTHLY RATION PICK
                  </span>

                  <h2 className="mt-5 text-4xl font-semibold leading-tight">
                    Stock your kitchen.
                    <br />
                    Save on every trip.
                  </h2>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
                    Buy the essentials your family uses every month at better
                    bulk prices.
                  </p>

                </div>

              </div>

            </div>


            <div className="absolute -bottom-6 -left-4 hidden w-64 rounded-3xl bg-white p-5 shadow-2xl sm:block">

              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                Estimated monthly savings
              </p>

              <p className="mt-1 text-3xl font-bold">
                Rs. 3,450
              </p>

              <div className="mt-4 h-2 rounded-full bg-black/5">

                <div className="h-2 w-[72%] rounded-full bg-[#78a83b]" />

              </div>

              <p className="mt-2 text-xs text-black/40">
                by buying selected essentials in bulk
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* BENEFITS */}

      <section className="bg-[#171717] text-white">

        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 sm:grid-cols-3 lg:px-10">

          <div>
            <p className="font-bold">
              📦 Bulk-first pricing
            </p>

            <p className="mt-1 text-xs text-white/40">
              Bigger quantities, better value.
            </p>
          </div>

          <div>
            <p className="font-bold">
              💰 Transparent savings
            </p>

            <p className="mt-1 text-xs text-white/40">
              See exactly how much you save.
            </p>
          </div>

          <div>
            <p className="font-bold">
              ✦ AI ration planning
            </p>

            <p className="mt-1 text-xs text-white/40">
              Build a smarter monthly basket.
            </p>
          </div>

        </div>

      </section>


      {/* CATEGORIES */}

      <section
        id="categories"
        className="bg-white py-20"
      >

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#78a83b]">
            Shop essentials
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            Shop by category
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
            Everything you need for your kitchen, pantry, and home.
          </p>


          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

            {categories.map((category) => (

              <button
                key={category.name}
                className="group overflow-hidden rounded-[24px] border border-black/10 bg-[#f7f7f3] text-left transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="h-36 overflow-hidden">

                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>

                <div className="p-4">

                  <p className="text-sm font-bold">
                    {category.name}
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    Shop →
                  </p>

                </div>

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* PRODUCTS */}

      <section
        id="shop"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-10"
      >

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#78a83b]">
          Best value
        </p>

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <h2 className="mt-2 text-4xl font-bold tracking-tight">
              Monthly ration essentials
            </h2>

            <p className="mt-2 text-black/45">
              Buy bigger. Save more.
            </p>

          </div>

          <button className="w-fit rounded-full border border-black/15 px-5 py-3 text-sm font-bold">
            View all products →
          </button>

        </div>


        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {filteredProducts.map((product) => (

            <article
              key={product.name}
              className="group overflow-hidden rounded-[26px] border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="relative h-64 overflow-hidden">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-[#171717] px-3 py-1.5 text-xs font-bold text-white">
                  SAVE {formatPrice(product.saving)}
                </span>

              </div>


              <div className="p-5">

                <p className="text-[10px] font-bold uppercase tracking-widest text-black/35">
                  {product.category}
                </p>

                <h3 className="mt-2 text-lg font-bold">
                  {product.name}
                </h3>

                <p className="mt-1 text-sm text-black/40">
                  {product.size}
                </p>


                <div className="mt-5">

                  <span className="text-2xl font-bold">
                    {formatPrice(product.price)}
                  </span>

                  <span className="ml-2 text-sm text-black/30 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>

                </div>


                <p className="mt-2 text-xs font-semibold text-[#78a83b]">
                  Better value with bulk
                </p>


                <button
                  onClick={() => setCart(cart + 1)}
                  className="mt-5 w-full rounded-full bg-[#171717] py-3.5 text-sm font-bold text-white transition hover:bg-[#78a83b]"
                >
                  Add to cart +
                </button>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* AI RATION PLANNER */}

      <section
        id="ai"
        className="bg-[#171717] py-24 text-white"
      >

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">

          <div>

            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold">
              ✦ AI RATION PLANNER
            </span>

            <h2 className="mt-7 text-5xl font-semibold leading-none tracking-tight">

              Tell us your budget.

              <br />

              <span className="text-[#a6cc72]">
                We'll build your ration.
              </span>

            </h2>

            <p className="mt-6 max-w-lg leading-7 text-white/50">
              Enter your family size and monthly grocery budget. My Bulk Deals
              can recommend the essentials you need and prioritize products
              with better bulk value.
            </p>

          </div>


          <div className="rounded-[32px] bg-white p-7 text-[#171717] sm:p-9">

            <p className="text-xs font-bold uppercase tracking-widest text-black/40">
              Smart ration planner
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              Build my monthly ration
            </h3>


            <div className="mt-7 space-y-4">

              <input
                placeholder="Family size e.g. 4 people"
                className="w-full rounded-2xl border border-black/10 bg-[#f7f7f3] px-5 py-4 outline-none"
              />

              <input
                placeholder="Monthly budget e.g. Rs. 30,000"
                className="w-full rounded-2xl border border-black/10 bg-[#f7f7f3] px-5 py-4 outline-none"
              />

              <button
                onClick={() => setGenerated(true)}
                className="w-full rounded-full bg-[#171717] py-4 text-sm font-bold text-white"
              >
                Generate my ration ✦
              </button>

            </div>


            {generated && (

              <div className="mt-6 rounded-3xl bg-[#eef4e5] p-5">

                <p className="text-xs font-bold uppercase tracking-widest text-[#78a83b]">
                  AI recommendation
                </p>

                <h4 className="mt-1 text-xl font-bold">
                  Your smart monthly basket
                </h4>


                <div className="mt-5 space-y-2">

                  <div className="flex justify-between rounded-xl bg-white p-3 text-sm">
                    <span>Basmati Rice · 5 kg</span>
                    <b>Rs. 2,199</b>
                  </div>

                  <div className="flex justify-between rounded-xl bg-white p-3 text-sm">
                    <span>Fine Atta · 10 kg</span>
                    <b>Rs. 1,699</b>
                  </div>

                  <div className="flex justify-between rounded-xl bg-white p-3 text-sm">
                    <span>Cooking Oil · 5 L</span>
                    <b>Rs. 2,999</b>
                  </div>

                  <div className="flex justify-between rounded-xl bg-white p-3 text-sm">
                    <span>Family Tea Pack</span>
                    <b>Rs. 2,199</b>
                  </div>

                </div>


                <div className="mt-5 flex justify-between border-t border-black/10 pt-4">

                  <b>
                    Estimated total
                  </b>

                  <b>
                    Rs. 9,096
                  </b>

                </div>


                <p className="mt-2 text-xs text-[#5f812e]">
                  Estimated saving: Rs. 1,200
                </p>


                <button
                  onClick={() => setCart(cart + 4)}
                  className="mt-4 w-full rounded-full bg-[#171717] py-3 text-sm font-bold text-white"
                >
                  Add ration to cart →
                </button>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* DEALS */}

      <section
        id="deals"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-10"
      >

        <div className="grid overflow-hidden rounded-[36px] bg-[#dce7c8] lg:grid-cols-2">

          <div className="p-8 sm:p-12 lg:p-16">

            <p className="text-xs font-bold uppercase tracking-widest text-[#5f812e]">
              This week's bulk deals
            </p>

            <h2 className="mt-5 text-5xl font-semibold leading-none tracking-tight">

              Stock up.

              <br />

              <span className="text-[#5f812e]">
                Spend smarter.
              </span>

            </h2>

            <p className="mt-6 max-w-md leading-7 text-black/50">
              Discover selected pantry and household essentials at better
              prices when you buy in larger quantities.
            </p>

            <button className="mt-8 rounded-full bg-[#171717] px-7 py-4 text-sm font-bold text-white">
              Explore weekly deals →
            </button>

          </div>


          <div className="h-[400px] lg:h-[500px]">

            <img
              src="https://images.unsplash.com/photo-1601598851547-4302969d7c3d?auto=format&fit=crop&w=1200&q=90"
              alt="Grocery shopping"
              className="h-full w-full object-cover"
            />

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="border-t border-black/10 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">

          <div className="grid gap-10 md:grid-cols-4">

            <div className="md:col-span-2">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#171717] font-bold text-white">
                  M
                </div>

                <span className="text-xl font-bold">
                  My Bulk Deals
                </span>

              </div>

              <p className="mt-5 max-w-md text-sm leading-6 text-black/45">
                Pakistan's smarter way to shop monthly ration, compare bulk
                prices, and save on everyday essentials.
              </p>

            </div>


            <div>

              <p className="text-xs font-bold uppercase tracking-widest">
                Shop
              </p>

              <div className="mt-4 space-y-3 text-sm text-black/45">
                <p>All products</p>
                <p>Bulk deals</p>
                <p>Monthly ration</p>
                <p>Household</p>
              </div>

            </div>


            <div>

              <p className="text-xs font-bold uppercase tracking-widest">
                My Bulk Deals
              </p>

              <div className="mt-4 space-y-3 text-sm text-black/45">
                <p>About</p>
                <p>How it works</p>
                <p>AI planner</p>
                <p>Contact</p>
              </div>

            </div>

          </div>


          <div className="mt-12 border-t border-black/10 pt-6 text-xs text-black/35">
            © 2026 My Bulk Deals · Smart grocery shopping for Pakistan
          </div>

        </div>

      </footer>


      {/* AI MODAL */}

      {showAI && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-[32px] bg-white p-7 text-[#171717] shadow-2xl">

            <div className="flex items-start justify-between">

              <div>

                <span className="rounded-full bg-[#eef4e5] px-3 py-1.5 text-xs font-bold text-[#5f812e]">
                  ✦ AI RATION PLANNER
                </span>

                <h3 className="mt-5 text-3xl font-bold">
                  Plan your monthly ration
                </h3>

                <p className="mt-2 text-sm leading-6 text-black/45">
                  Tell us your family size and budget and we'll help you build
                  a smarter grocery basket.
                </p>

              </div>


              <button
                onClick={() => setShowAI(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-xl"
              >
                ×
              </button>

            </div>


            <div className="mt-7 rounded-2xl bg-[#f7f7f3] p-5">

              <p className="text-sm font-bold">
                Try asking:
              </p>

              <p className="mt-3 text-sm leading-6 text-black/50">
                "Create a monthly ration list for a family of four under
                Rs. 30,000 and prioritize bulk savings."
              </p>

            </div>


            <button
              onClick={() => {
                setShowAI(false);

                document
                  .getElementById("ai")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className="mt-5 w-full rounded-full bg-[#171717] py-4 text-sm font-bold text-white"
            >
              Build my ration →
            </button>

          </div>

        </div>

      )}
{/* MYBULKAI GLASSMORPHISM CHATBOT */}

{showChatbot && (
  <div className="fixed inset-0 z-[200] flex items-end justify-end bg-black/20 p-4 backdrop-blur-[2px] sm:p-6">

    <div className="relative flex h-[620px] w-full max-w-[430px] flex-col overflow-hidden rounded-[32px] border border-white/40 bg-white/75 shadow-2xl backdrop-blur-2xl">

      {/* CHAT HEADER */}

      <div className="border-b border-black/10 bg-white/40 px-6 py-5 backdrop-blur-xl">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#171717] text-lg text-white shadow-lg">

              ✦

              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#78a83b]" />

            </div>

            <div>

              <p className="text-lg font-bold">
                MyBulkAI
              </p>

              <p className="text-[11px] text-black/45">
                Your smart grocery assistant
              </p>

            </div>

          </div>

          <button
            onClick={() => setShowChatbot(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-xl transition hover:bg-black/10"
          >
            ×
          </button>

        </div>

      </div>


      {/* CHAT CONTENT */}

      <div className="flex-1 overflow-y-auto px-5 py-6">

        <div className="max-w-[88%] rounded-3xl rounded-tl-md bg-white/80 p-4 shadow-sm backdrop-blur-xl">

          <p className="text-sm font-semibold">
            Hi! 👋 I'm MyBulkAI.
          </p>

          <p className="mt-2 text-sm leading-6 text-black/55">
            I can help you plan your monthly ration, find smarter bulk
            options, manage your grocery budget, and save money.
          </p>

        </div>


        {/* QUICK ACTIONS */}

        {!chatResponse && !chatLoading && (
          <div className="mt-5 flex flex-wrap gap-2">

            <button
              onClick={() =>
                setChatMessage(
                  "Plan groceries for a family of 4 under Rs. 30,000."
                )
              }
              className="rounded-full border border-black/10 bg-white/55 px-4 py-2 text-xs font-medium backdrop-blur-xl transition hover:bg-white"
            >
              Plan my ration
            </button>

            <button
              onClick={() =>
                setChatMessage(
                  "How can I save money by buying groceries in bulk?"
                )
              }
              className="rounded-full border border-black/10 bg-white/55 px-4 py-2 text-xs font-medium backdrop-blur-xl transition hover:bg-white"
            >
              Help me save
            </button>

            <button
              onClick={() =>
                setChatMessage(
                  "What groceries should I buy in bulk?"
                )
              }
              className="rounded-full border border-black/10 bg-white/55 px-4 py-2 text-xs font-medium backdrop-blur-xl transition hover:bg-white"
            >
              Bulk shopping
            </button>

          </div>
        )}


        {/* AI RESPONSE */}

        {chatResponse && (
          <div className="mt-6 max-w-[90%] rounded-3xl rounded-tl-md bg-[#eef4e5]/90 p-4 shadow-sm backdrop-blur-xl">

            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#5f812e]">
              MyBulkAI
            </p>

            <p className="whitespace-pre-wrap text-sm leading-6 text-black/70">
              {chatResponse}
            </p>

          </div>
        )}


        {/* LOADING */}

        {chatLoading && (
          <div className="mt-6 max-w-[80%] rounded-3xl rounded-tl-md bg-white/80 p-4 text-sm text-black/45 shadow-sm backdrop-blur-xl">

            MyBulkAI is thinking...

          </div>
        )}

      </div>


      {/* CHAT INPUT */}

      <div className="border-t border-black/10 bg-white/40 p-4 backdrop-blur-xl">

        <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white/75 p-2 shadow-sm backdrop-blur-xl">

          <input
            value={chatMessage}
            onChange={(event) => setChatMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendChatMessage();
              }
            }}
            placeholder="Ask MyBulkAI anything..."
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-black/35"
          />

          <button
            onClick={sendChatMessage}
            disabled={!chatMessage.trim() || chatLoading}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#171717] text-white transition hover:bg-[#78a83b] disabled:cursor-not-allowed disabled:opacity-30"
          >
            ↑
          </button>

        </div>

        <p className="mt-2 text-center text-[9px] text-black/30">
          Powered by local AI · MyBulkDeals
        </p>

      </div>

    </div>

  </div>
)}
    </main>
  );
}
