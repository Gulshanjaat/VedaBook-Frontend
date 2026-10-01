import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Check, Loader2 } from "lucide-react";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const { user, setUser } = useAuth();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await api.get("/plan/plans");
      setPlans(res.data.plans);
    } catch (error) {
      console.log(error);
    }
  };

  const subscribePlan = async (plan) => {
    try {
      setLoadingPlanId(plan._id);
      const orderRes = await api.post("/subscription/createorder", {
        planId: plan._id,
      });

      const order = orderRes.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "AI Chatbot",
        description: plan.name,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await api.post("/subscription/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user.id,
              planId: plan._id,
            });

            const updatedUser = {
              ...user,
              tokens: verifyRes.data.tokens,
            };

            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            alert("Subscription Activated");
          } catch (err) {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Payment Failed");
    } finally {
      setLoadingPlanId(null);
    }
  };

  return (
    <div className="bg-[#09090B] text-white min-h-screen font-sans antialiased">
      <Sidebar />

      <div
  className="
  lg:ml-72
  min-h-screen
  overflow-y-auto
  "
>
        {/* <Navbar /> */}

        <main
  className="
  px-4
  py-6
  sm:px-6
  lg:px-10
  lg:py-10
  min-h-screen
  "
>
         <div className="mb-8 lg:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Subscription Plans
            </h1>
            <p className="text-zinc-400 mt-2 text-sm lg:text-base">
              Choose the perfect plan to power up your document assistant.
            </p>
          </div>

         <div
  className="
  grid
  grid-cols-1
  md:grid-cols-2
  gap-5
  lg:gap-8
  max-w-5xl
  "
>
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="bg-zinc-900
border
border-zinc-800
rounded-2xl
p-5
sm:p-6
lg:p-8
hover:border-blue-500
transition
duration-300 flex flex-col justify-between hover:border-blue-500/40 hover:bg-zinc-900 transition-all duration-300"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
                    {plan.name}
                  </h2>

                  <div className="flex items-baseline gap-1 mt-4">
                     <span className="text-3xl lg:text-5xl">
                      ₹{plan.price}
                    </span>
                    <span className="text-zinc-500 text-sm">/ total</span>
                  </div>

                  <div className="border-t border-zinc-800/60 my-6" />

                  <ul className="space-y-3.5">
                    <li className="flex items-center gap-3 text-sm sm:text-base text-zinc-300">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center">
                        <Check size={14} />
                      </div>
                      <span>
                        <strong className="text-white">{plan.tokens}</strong> AI Tokens included
                      </span>
                    </li>

                    <li className="flex items-center gap-3 text-sm sm:text-base text-zinc-300">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center">
                        <Check size={14} />
                      </div>
                      <span>
                        Validity for <strong className="text-white">{plan.durationDays}</strong> Days
                      </span>
                    </li>

                    <li className="flex items-center gap-3 text-sm sm:text-base text-zinc-300">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center">
                        <Check size={14} />
                      </div>
                      <span>High-speed AI responses</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => subscribePlan(plan)}
                  disabled={loadingPlanId !== null}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white mt-8 py-3.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10 disabled:opacity-50 cursor-pointer"
                >
                  {loadingPlanId === plan._id ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Subscribe Now"
                  )}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Plans;