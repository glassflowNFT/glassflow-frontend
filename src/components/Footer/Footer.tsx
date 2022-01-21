import { Facebook, Instagram, Twitter } from "react-feather";
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
            <li><a href="/">About Us</a></li>
            <li><a href="/">Support</a></li>
            <li><a href="/">Careers</a></li>
          </ul>
          <ul>
            <li className="footer-first">Privary &amp; Terms</li>
            <li><a href="/">Terms of use</a></li>
            <li><a href="/">Privacy policy</a></li>
            <li><a href="/">Information we collect</a></li>
          </ul>
        </section>
      </div>
      <div className="footer-bottom">
        <span className="secondary">© 2022 GlassFlow Inc.</span>
        <div className="footer-socials">
          <span>Our Socials:</span>
          <a href="/"><Twitter/></a>
          <a href="/"><Facebook/></a>
          <a href="/"><Instagram/></a>
        </div>
      </div>
    </footer>
  );
}