import React, { useEffect, useState } from "react";

export default function CouponsList() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    // Example API data
    setCoupons([
      { code: "SAVE10", discount: "10%" },
      { code: "NEW50", discount: "50%" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          All Coupons
        </h1>

        {/* COUPON CARDS */}
        {coupons.length === 0 ? (
          <p className="text-center text-gray-500">No coupons available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {coupons.map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 text-center
                           transition transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <h2 className="text-xl font-bold text-blue-600 mb-2">
                  {c.code}
                </h2>

                <p className="text-gray-600 text-sm mb-4">
                  Discount:{" "}
                  <span className="font-semibold text-gray-800">
                    {c.discount}
                  </span>
                </p>

                {/* OPTIONAL ACTION BUTTON */}
                <button
                  className="mt-2 px-4 py-2 text-sm font-semibold rounded-lg
                             bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

