import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import Button from "../../components/Button";

const cardBrands = ["VISA", "Mastercard", "G Pay", "PayPal"];

const Payment = () => {
  const [billingCycle, setBillingCycle] = useState("annual");
  const [selectedBrand, setSelectedBrand] = useState("VISA");

  const price = billingCycle === "annual" ? 16 : 20;

  return (
    <div className="w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden">
        {/* Left panel - Class summary */}
        <div className="bg-emerald-50 text-gray-900 p-10">
          <div className="border border-gray-300 rounded-xl p-4 flex gap-4 mb-6">
            <img
              src="https://placehold.co/100x100?text=Judo"
              alt="Judo Class"
              className="w-20 h-20 rounded-lg object-cover shrink-0"
            />
            <div>
              <h3 className="font-['Poppins'] font-bold text-lg mb-2">
                Judo Class
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✓ Duration : 60 min</li>
                <li>✓ Coach : Sensei Lisa</li>
                <li>✓ Beginner to Advanced</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setBillingCycle("monthly")}
            className={`w-full flex items-center justify-between border rounded-xl p-4 mb-4 transition-colors ${
              billingCycle === "monthly" ? "border-teal-500" : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  billingCycle === "monthly"
                    ? "border-teal-500"
                    : "border-gray-400"
                }`}
              >
                {billingCycle === "monthly" && (
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                )}
              </span>
              <div className="text-left">
                <p className="font-semibold">Pay Monthly</p>
                <p className="text-sm text-gray-600">$ 20/Month</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setBillingCycle("annual")}
            className={`w-full flex items-center justify-between border rounded-xl p-4 mb-8 transition-colors ${
              billingCycle === "annual" ? "border-teal-500" : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  billingCycle === "annual"
                    ? "border-teal-500"
                    : "border-gray-400"
                }`}
              >
                {billingCycle === "annual" && (
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                )}
              </span>
              <div className="text-left">
                <p className="font-semibold">Pay Annual</p>
                <p className="text-sm text-gray-600">$ 16/Month</p>
              </div>
            </div>
            <span className="bg-gray-100 text-xs font-semibold px-3 py-1 rounded-full">
              Save 15%
            </span>
          </button>

          <div className="border-t border-gray-300 pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="font-bold text-lg">Total</p>
              <p className="font-bold text-lg">${price}/Month</p>
            </div>
            <p className="flex items-center gap-1 text-xs text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5" />
              Guaranteed to be safe & secure, ensuring that all transactions are
              protected with the highest level of security
            </p>
          </div>
        </div>

        {/* Right panel - Contact & Payment */}
        <div className="bg-amber-100 text-gray-900 p-10">
          <h3 className="font-['Poppins'] font-bold text-xl mb-4">Contact</h3>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-400 rounded-full px-5 py-3 mb-8 bg-transparent placeholder-gray-600 focus:outline-none focus:border-gray-900"
          />

          <h3 className="font-['Poppins'] font-bold text-xl mb-1">Payment</h3>
          <p className="text-sm text-gray-600 mb-4">
            All transactions are secure and encrypted
          </p>

          <div className="flex gap-3 mb-6">
            {cardBrands.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`border rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  selectedBrand === brand
                    ? "border-emerald-500 border-2 bg-white"
                    : "border-gray-400 bg-white/50"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Name on Card"
            className="w-full border border-gray-400 rounded-full px-5 py-3 mb-4 bg-transparent placeholder-gray-600 focus:outline-none focus:border-gray-900"
          />

          <input
            type="text"
            placeholder="Card Number"
            className="w-full border border-gray-400 rounded-full px-5 py-3 mb-4 bg-transparent placeholder-gray-600 focus:outline-none focus:border-gray-900"
          />

          <div className="flex gap-4 mb-8">
            <input
              type="text"
              placeholder="Expiration Date (MM/YY)"
              className="flex-1 border border-gray-400 rounded-full px-5 py-3 bg-transparent placeholder-gray-600 focus:outline-none focus:border-gray-900"
            />
            <input
              type="text"
              placeholder="CVC"
              className="w-24 border border-gray-400 rounded-full px-5 py-3 bg-transparent placeholder-gray-600 focus:outline-none focus:border-gray-900"
            />
          </div>

          <Button variant="accent" size="lg" className="w-full">
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
