import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaUser, FaAngleDown, FaBars } from 'react-icons/fa';
import { HiShoppingBag } from "react-icons/hi";
  // Ensure Bootstrap JS is imported
import './Header.css';

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const categories = {
    shirt: ['Classic Cotton Shirt'],
    Dress: ['Floral Summer Dress'],
    Pants: ['Slimfit Denim Jeans', 'Casual Chino Pants']
  };

  return (
    <header className="bg-white shadow-sm sticky-top py-2">
      <nav className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src='../../asset/images/logo.webp' alt="Logo" className="img-fluid" style={{ height: '50px' }} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="btn d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars size={24} />
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse d-lg-flex" id="navbarNav">
          <div className="navbar-nav ms-auto">
            <Link to="/" className="nav-link px-3">Home</Link>
            {Object.entries(categories).map(([category, subcategories]) => (
              <div className="nav-item dropdown px-3" key={category}>
                <Link
                  className="nav-link dropdown-toggle"
                  id={`dropdown-${category}`}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {category}
                </Link>
                <ul className="dropdown-menu" aria-labelledby={`dropdown-${category}`}>
                  {subcategories.map((subcat) => (
                    <li key={subcat}>
                      <Link className="dropdown-item" to={`subtype/${subcat.replace(/\s+/g, '-')}`}>
                        {subcat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link to="/about" className="nav-link px-3">About Us</Link>
            <Link to="/contact" className="nav-link px-3">Contact Us</Link>
          </div>
        </div>

        {/* Icons */}
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
