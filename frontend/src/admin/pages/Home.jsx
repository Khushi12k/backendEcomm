// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaPlus,
//   FaTicketAlt,
//   FaUsers,
//   FaBoxOpen,
//   FaSignOutAlt,
//   FaList,
// } from "react-icons/fa";

// export default function AdminHome() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* ===== HEADER ===== */}
//       <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           {/* LOGO */}
//           <h2
//             className="text-xl font-semibold cursor-pointer"
//             onClick={() => navigate("/admin/home")}
//           >
//             Admin Panel
//           </h2>

//           {/* NAVIGATION (DESKTOP) */}
//           <nav className="hidden lg:flex items-center gap-6 text-sm">
//             <button
//               onClick={() => navigate("/admin/product-list")}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
//             >
//               <FaBoxOpen /> Products
//             </button>

//             <button
//               onClick={() => navigate("/admin/categories")}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
//             >
//               <FaList /> Categories
//             </button>

//             <button
//               onClick={() => navigate("/admin/coupons")}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
//             >
//               <FaTicketAlt /> Coupons
//             </button>

//             <button
//               onClick={() => navigate("/admin/add-product")}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
//             >
//               <FaPlus /> Add Product
//             </button>

//             <button
//               onClick={() => navigate("/admin/users")}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
//             >
//               <FaUsers /> Users
//             </button>
//           </nav>

//           {/* LOGOUT */}
//           <button
//             onClick={() => navigate("/admin/login")}
//             className="p-2 rounded-full hover:bg-red-600 transition"
//             title="Logout"
//           >
//             <FaSignOutAlt className="text-lg" />
//           </button>
//         </div>
//       </header>

//       {/* ===== PAGE CONTENT ===== */}
//       <main className="max-w-7xl mx-auto px-6 py-10">
//         {/* TITLE */}
//         <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
//           Welcome to Admin Dashboard
//         </h1>

//         {/* ACTION CARDS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* PRODUCT LIST */}
//           <div
//             onClick={() => navigate("/admin/product-list")}
//             className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer
//                        hover:-translate-y-2 hover:shadow-2xl transition"
//           >
//             <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-3 mb-2">
//               <FaBoxOpen className="text-blue-600" /> Product List
//             </h2>
//             <p className="text-sm text-gray-600">
//               View, edit & delete products
//             </p>
//           </div>

//           {/* ADD PRODUCT */}
//           <div
//             onClick={() => navigate("/admin/add-product")}
//             className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer
//                        hover:-translate-y-2 hover:shadow-2xl transition"
//           >
//             <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-3 mb-2">
//               <FaPlus className="text-green-600" /> Add Product
//             </h2>
//             <p className="text-sm text-gray-600">
//               Add new products to store
//             </p>
//           </div>

//           {/* CATEGORIES */}
//           <div
//             onClick={() => navigate("/admin/categories")}
//             className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer
//                        hover:-translate-y-2 hover:shadow-2xl transition"
//           >
//             <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-3 mb-2">
//               <FaList className="text-purple-600" /> Categories
//             </h2>
//             <p className="text-sm text-gray-600">
//               Add & manage product categories
//             </p>
//           </div>

//           {/* COUPONS */}
//           <div
//             onClick={() => navigate("/admin/coupons")}
//             className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer
//                        hover:-translate-y-2 hover:shadow-2xl transition"
//           >
//             <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-3 mb-2">
//               <FaTicketAlt className="text-orange-500" /> Coupons
//             </h2>
//             <p className="text-sm text-gray-600">
//               View all discount coupons
//             </p>
//           </div>

//           {/* USERS */}
//           <div
//             onClick={() => navigate("/admin/users")}
//             className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer
//                        hover:-translate-y-2 hover:shadow-2xl transition"
//           >
//             <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-3 mb-2">
//               <FaUsers className="text-red-500" /> Users
//             </h2>
//             <p className="text-sm text-gray-600">
//               View & manage registered users
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }







import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaUsers,
  FaTicketAlt,
  FaList,
  FaPlus,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-teal-600 text-white flex flex-col">
        {/* LOGO */}
        <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-teal-500">
          Simple Admin
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          <button
            onClick={() => navigate("/admin/home")}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-teal-700"
          >
            <FaChartBar /> Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/product-list")}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            <FaBoxOpen /> Products
          </button>

          <button
            onClick={() => navigate("/admin/categories")}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            <FaList /> Categories
          </button>

          <button
            onClick={() => navigate("/admin/add-product")}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            <FaPlus /> Add Product
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            <FaUsers /> Users
          </button>

          <button
            onClick={() => navigate("/admin/coupons")}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            <FaTicketAlt /> Coupons
          </button>
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-teal-500">
          <button
            onClick={() => navigate("/admin/login")}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-8">
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-800 mb-10">
          Dashboard
        </h1>

        {/* ================= ACTION CARDS (2nd IMAGE STYLE) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* PRODUCT LIST */}
          <ActionCard
            icon={<FaBoxOpen className="text-blue-600 text-xl" />}
            title="Product List"
            desc="View, edit & delete products"
            onClick={() => navigate("/admin/product-list")}
          />

          {/* ADD PRODUCT */}
          <ActionCard
            icon={<FaPlus className="text-green-600 text-xl" />}
            title="Add Product"
            desc="Add new products to store"
            onClick={() => navigate("/admin/add-product")}
          />

          {/* CATEGORIES */}
          <ActionCard
            icon={<FaList className="text-purple-600 text-xl" />}
            title="Categories"
            desc="Add & manage product categories"
            onClick={() => navigate("/admin/categories")}
          />

          {/* COUPONS */}
          <ActionCard
            icon={<FaTicketAlt className="text-orange-500 text-xl" />}
            title="Coupons"
            desc="View all discount coupons"
            onClick={() => navigate("/admin/coupons")}
          />

          {/* USERS */}
          <ActionCard
            icon={<FaUsers className="text-red-500 text-xl" />}
            title="Users"
            desc="View & manage registered users"
            onClick={() => navigate("/admin/users")}
          />
        </div>
      </main>
    </div>
  );
}

/* ================= CARD COMPONENT ================= */
function ActionCard({ icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md p-6 cursor-pointer
                 hover:shadow-xl hover:-translate-y-1 transition"
    >
      <div className="flex items-center gap-4 mb-2">
        {icon}
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>
      </div>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
