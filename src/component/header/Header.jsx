import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaUser, FaAngleDown, FaBars } from 'react-icons/fa';
import { HiShoppingBag } from "react-icons/hi";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = {
    shirt: ['Classic Cotton Shirt'],
    Dress: ['Floral Summer Dress'],
    Pants: ['Slimfit Denim Jeans', 'Casual Chino Pants']
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
    document.body.classList.toggle('nav-active');
  };

  return (
    <header className="bg-white shadow-sm sticky-top py-2">
      <nav className="container d-flex align-items-center justify-content-between">
        <div className="logo">
          <Link to="/">
            <img src='../../asset/images/logo.webp' alt="Logo" className="img-fluid" style={{ height: '50px' }} />
          </Link>
        </div>

        <button className="btn d-lg-none" onClick={toggleMobileMenu}>
          <FaBars size={24} />
        </button>

        <div className={`nav-links d-lg-flex align-items-center ${isMobileMenuOpen ? 'd-block' : 'd-none d-lg-flex'}`}>
          <Link to="/" className="nav-link px-3" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          {Object.entries(categories).map(([category, subcategories]) => (
            <div
              className="dropdown px-3"
              key={category}
              onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown(category)}
              onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
              onClick={() => window.innerWidth <= 768 && setActiveDropdown(activeDropdown === category ? null : category)}
            >
              <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                {category}
              </Link>
              <ul className={`dropdown-menu ${activeDropdown === category ? 'show' : ''}`}>
                {subcategories.map((subcat) => (
                  <li key={subcat}>
                    <Link
                      className="dropdown-item"
                      to={`subtype/${subcat.replace(/\s+/g, '-')}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {subcat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link to="/about" className="nav-link px-3" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="nav-link px-3" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          <Link to="/wishlist" className="text-dark">
            <FaHeart size={20} />
          </Link>
          <Link to="/cart" className="text-dark">
            <FaShoppingCart size={20} />
          </Link>
          <Link to="/order" className="text-dark">
            <HiShoppingBag size={20} />
          </Link>
          <Link to="/profile" className="text-dark">
            <FaUser size={20} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
