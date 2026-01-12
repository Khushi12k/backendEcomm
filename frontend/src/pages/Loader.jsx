// // src/components/Loader.jsx
// import React from "react";


// function Loader() {
//   return (
//     <div className="loader-overlay">
//       <div className="loader"></div>
//     </div>
//   );
// }

// export default Loader;



// src/components/Loader.jsx
import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
      
      {/* Spinner */}
      <div
        className="
          h-14 w-14
          rounded-full
          border-4 border-gray-300
          border-t-pink-500
          animate-spin
        "
      />

    </div>
  );
}

export default Loader;
