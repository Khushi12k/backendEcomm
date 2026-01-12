import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 mt-16">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

        {/* Column 1 */}
        <div className="space-y-3">
          <h4 className="text-white text-lg font-semibold relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-orange-500 after:mt-1">
            Company
          </h4>
          <p className="footer-link">About Us</p>
          <p className="footer-link">Contact</p>
          <p className="footer-link">Careers</p>
        </div>

        {/* Column 2 */}
        <div className="space-y-3">
          <h4 className="text-white text-lg font-semibold relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-orange-500 after:mt-1">
            Support
          </h4>
          <p className="footer-link">Help Center</p>
          <p className="footer-link">Terms & Conditions</p>
          <p className="footer-link">Privacy Policy</p>
        </div>

        {/* Column 3 */}
        <div className="space-y-3">
          <h4 className="text-white text-lg font-semibold relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-orange-500 after:mt-1">
            Services
          </h4>
          <p className="footer-link">Products</p>
          <p className="footer-link">Offers</p>
          <p className="footer-link">New Arrivals</p>
        </div>

        {/* Column 4 */}
        <div className="space-y-3">
          <h4 className="text-white text-lg font-semibold relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-orange-500 after:mt-1">
            Connect
          </h4>
          <p className="footer-link">Instagram</p>
          <p className="footer-link">Facebook</p>
          <p className="footer-link">Twitter</p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 text-center py-6 px-4">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} YourWebsiteName. All Rights Reserved.
        </p>
        <p className="text-sm mt-1 text-gray-500">
          Designed & Developed by{" "}
          <span className="text-orange-400 font-medium">
            Khushi Kumawat
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
