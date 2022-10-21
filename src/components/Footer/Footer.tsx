import { Facebook, Instagram, Twitter } from "react-feather";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return(
    <footer className="footer-wrapper">
      <div className="footer-top">
        <h1>GlassFlow</h1>
        <section className="footer-section">
          <ul>
            <li className="footer-first">Solutions</li>
            <li><a href="/">List Your Pieces</a></li>
            <li><a href="/">Create Collections</a></li>
          </ul>
          <ul>
            <li className="footer-first">Company</li>
            <li><a href="https://discover-defi.gitbook.io/welcome-to-gitbook/whats-to-come/messages-from-our-team">About Us</a></li>
            <li><Link to="support">Support</Link></li>
            <li><a href="/">Careers</a></li>
          </ul>
          <ul>
            <li className="footer-first">Privacy &amp; Terms</li>
            <li><a href="/">Terms of use</a></li>
            <li><a href="/">Privacy policy</a></li>
            <li><a href="/">Information we collect</a></li>
          </ul>
        </section>
      </div>
      <div className="footer-bottom">
        <span className="secondary">© 2022 GlassFlow Inc.</span>
        <div className="footer-socials">
          <section className="social-icons">
            <a href="/"><Twitter/></a>
            <a href="/"><Facebook/></a>
            <a href="/"><Instagram/></a>
          </section>
        </div>
      </div>
    </footer>
  );
}