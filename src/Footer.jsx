import React, { useEffect } from 'react';
import './Footer.css';

// ------------------------------------------------------------------
// 1.copyright year update
// ------------------------------------------------------------------
const Footer = () => {
  useEffect(() => {
    const copyrightElement = document.querySelector(".copyright_year");
    if (copyrightElement) {
      const d = new Date();
      copyrightElement.innerHTML = d.getFullYear();
    }
  }, []);

// ====================================================================
// 🎯 JSX Content
// ====================================================================
  return (
    <footer>
      <div className="container">
        <div className="structure">
          <div className="footer_raw">
            <h6>Contact information</h6>
            <ul>
              <li>Address : #135 block,London 10036,UK</li>
              <li>9879069667</li>
              <li>example@mail.com</li>
              <div className="social_media">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Dribbble">
                  <i className="fab fa-dribbble"></i>
                </a>
                <a href="#" aria-label="Google">
                  <i className="fab fa-google"></i>
                </a>
              </div>
            </ul>
          </div>
          <div className="footer_raw_side">
            <h6>Company</h6>
            <ul>
              <li>About us</li>
              <li>Blog posts</li>
              <li>Services</li>
              <li>Packages</li>
            </ul>
          </div>
          <div className="footer_raw_side">
            <h6>Quick links</h6>
            <ul>
              <li>Contact us</li>
              <li>Create account</li>
              <li>Our branches</li>
              <li>Site feedback</li>
            </ul>
          </div>
          <div className="footer_raw_side">
            <h6>Support</h6>
            <ul>
              <li>Destination</li>
              <li>Our guides</li>
              <li>Support</li>
              <li>Help</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright_line">
        <div className="container">
          <p> © <span className="copyright_year">2022</span> Trace. All Rights Reserved. Design by
            <a href="https://w3layouts.com/" target="_blank" rel="noopener noreferrer">W3layouts</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;