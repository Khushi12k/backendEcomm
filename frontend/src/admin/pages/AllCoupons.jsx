import React, { useEffect, useState } from "react";


export default function CouponsList() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    // API yaha call hogi (example)
    setCoupons([
      { code: "SAVE10", discount: "10%" },
      { code: "NEW50", discount: "50%" },
    ]);
  }, []);

  return (
    <div className="admin-home">
      <h1>All Coupons</h1>

      <div className="admin-actions">
        {coupons.map((c, i) => (
          <div key={i} className="admin-card">
            <h2>{c.code}</h2>
            <p>Discount: {c.discount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
