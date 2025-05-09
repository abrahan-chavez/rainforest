import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { CheckoutForm } from "../components/CheckoutForm";
import { StratumInstructions } from "../components/StratumInstructions";
import { ArrowLeftIcon, CheckIcon } from "lucide-react";
export const CheckoutPage = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { getProduct, createOrder } = useStore();
  const [order, setOrder] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const product = getProduct(id || "");
  useEffect(() => {
    if (order) {
      // Simulate mining progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [order]);
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/" className="text-emerald-600 hover:underline">
          Back to Store
        </Link>
      </div>
    );
  }
  const handleCheckout = (
    email: string,
    fullName: string,
    streetAddress: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
  ) => {
    const newOrder = createOrder(
      product.productId,
      email,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      country
    );
    setOrder(newOrder);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to={`/product/${id}`}
        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
      >
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to Product
      </Link>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-6">
              <div className="mb-6 flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div>
                  <h2 className="font-medium text-lg">{product.name}</h2>
                  <p className="text-gray-600 text-sm">
                    {product.priceInAcceptedShares.toLocaleString()} shares
                    required
                  </p>
                  <p className="text-gray-500 text-sm">
                    ({product.priceUSD.toFixed(2)} equivalent)
                  </p>
                </div>
              </div>
              {!order ? (
                <>
                  <h3 className="font-medium mb-4">Shipping Information</h3>
                  <CheckoutForm
                    productId={product.productId}
                    onSubmit={handleCheckout}
                  />
                </>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <CheckIcon size={20} className="text-green-600 mr-2 mt-1" />
                    <div>
                      <h3 className="font-medium text-green-800">
                        Order Created!
                      </h3>
                      <p className="text-green-700 text-sm">
                        Your order has been created. Follow the mining
                        instructions to complete your purchase.
                      </p>
                      <p className="text-green-700 text-sm mt-2">
                        Order ID:{" "}
                        <span className="font-medium">{order.orderId}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
              {order ? (
                <>
                  <h3 className="font-medium mb-4">Mining Instructions</h3>
                  <StratumInstructions
                    stratumUrl={order.stratumUrl}
                    workerName={order.workerName}
                    progress={progress}
                  />
                  {progress >= 100 && (
                    <div className="mt-6 text-center">
                      <p className="text-gray-700 mb-4">
                        Mining complete! Your order is being processed.
                      </p>
                      <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-medium mb-3">How Mining Works</h3>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    <li>Enter your shipping information</li>
                    <li>Receive a unique mining URL and worker name</li>
                    <li>
                      Connect your mining software using the provided details
                    </li>
                    <li>Mine until you reach 100% of the required hashes</li>
                    <li>Your order will be processed automatically</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
