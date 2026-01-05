import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-box">
          <h4>Company</h4>
          <p>About Us</p>
          <p>Contact</p>
          <p>Careers</p>
        </div>

        {/* Column 2 */}
        <div className="footer-box">
          <h4>Support</h4>
          <p>Help Center</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>

        {/* Column 3 */}
        <div className="footer-box">
          <h4>Services</h4>
          <p>Products</p>
          <p>Offers</p>
          <p>New Arrivals</p>
        </div>

        {/* Column 4 */}
        <div className="footer-box">
          <h4>Connect</h4>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Twitter</p>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} YourWebsiteName. All Rights Reserved.</p>
        <p className="footer-owner">
  Designed & Developed by <span>Khushi Kumawat</span>
</p>

      </div>
    </footer>
  );
}

export default Footer;
