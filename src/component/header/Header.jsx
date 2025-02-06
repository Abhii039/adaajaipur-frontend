import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaUser, FaAngleDown, FaBars } from 'react-icons/fa';
import { HiShoppingBag } from "react-icons/hi";
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
    <header className="header">
      <nav className="nav-container">
        <div className="logo">
          <Link to="/">
            <img src='../../asset/images/logo.webp' alt="Logo" />
          </Link>
        </div>

        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <FaBars />
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          {Object.entries(categories).map(([category, subcategories]) => (
            <div
              className={`dropdown ${activeDropdown === category ? 'active' : ''}`}
              key={category}
              onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown(category)}
              onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
              onClick={() => window.innerWidth <= 768 && setActiveDropdown(activeDropdown === category ? null : category)}
            >
              <Link  className="dropdown-trigger">
                {category}
                <FaAngleDown />
              </Link>
              <div className="dropdown-content">
                {subcategories.map((subcat) => (
                  <Link
                    key={subcat}
                    to={`subtype/${subcat.replace(/\s+/g, '-')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {subcat}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
        </div>

        <div className="nav-icons">
          <Link to="/wishlist" className="icon">
            <FaHeart />
          </Link>
          <Link to="/cart" className="icon">
            <FaShoppingCart />
          </Link>
          <Link to="/order" className="icon">
            <HiShoppingBag />
          </Link>
          <Link to="/profile" className="icon">
            <FaUser />
          </Link>
        </div>
      </nav>
    </header>
  );
}
