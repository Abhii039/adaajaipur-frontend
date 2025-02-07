import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../component/product/ProductCard';
import ProductSkeleton from '../../component/ProductSkeleton/ProductSkeleton'; // Import skeleton loader
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderLoading, setSliderLoading] = useState(true); // Slider loading state
  const [error, setError] = useState(null);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSubtype, setSelectedSubtype] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredGroupedProducts, setFilteredGroupedProducts] = useState({});
  const [filteredSubtypes, setFilteredSubtypes] = useState([]);
  const [maxProductPrice, setMaxProductPrice] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const slides = [
    { image: '../../asset/images/1.jpg', title: 'New Collection' },
    { image: '../../asset/images/2.jpg', title: 'Summer Sale' },
    { image: '../../asset/images/3.jpg', title: 'Festival Special' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://addajaipur.onrender.com/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);

        const grouped = data.reduce((acc, product) => {
          const type = product.type;
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(product);
          return acc;
        }, {});

        setGroupedProducts(grouped);
        setMaxProductPrice(Math.max(...data.map(p => p.price)));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Delay slider loading by 5-6 seconds
    const timer = setTimeout(() => {
      setSliderLoading(false);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Update filtered subtypes when type changes
  useEffect(() => {
    if (products.length > 0) {
      if (selectedType) {
        const subtypesForType = [...new Set(
          products
            .filter(product => product.type === selectedType)
            .map(product => product.subtype)
        )];
        setFilteredSubtypes(subtypesForType);
      } else {
        // If no type is selected, show all subtypes
        setFilteredSubtypes([...new Set(products.map(product => product.subtype))]);
      }
    }
  }, [selectedType, products]);

  // Handle applying filters
  const handleApplyFilters = () => {
    // Collect filter values
    const currentMinPrice = minPrice !== '' ? parseInt(minPrice) : 0;
    const currentMaxPrice = maxPrice !== '' ? parseInt(maxPrice) : maxProductPrice;

    // Validate min and max prices
    if (currentMaxPrice < currentMinPrice) {
      alert("Max price cannot be less than Min price.");
      return; // Exit if validation fails
    }

    // Filter products based on the current filters
    const filtered = products.filter(product => {
      const searchMatch = searchQuery === '' ||
        Object.values(product).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );

      const typeMatch = selectedType === '' || product.type === selectedType;
      const subtypeMatch = selectedSubtype === '' || product.subtype === selectedSubtype;
      const minPriceMatch = currentMinPrice === 0 || product.price >= currentMinPrice;
      const maxPriceMatch = currentMaxPrice === maxProductPrice || product.price <= currentMaxPrice;

      return searchMatch && typeMatch && subtypeMatch && minPriceMatch && maxPriceMatch;
    });

    setFilteredProducts(filtered);
  };

  // Get unique types and subtypes for dropdowns
  const types = [...new Set(products.map(product => product.type))];
  const subtypes = [...new Set(products.map(product => product.subtype))];

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home">
      {/* Slideshow with Skeleton Loader */}
      <div className="slideshow">
        {sliderLoading ? (
          <Skeleton height={300} width="100%" /> // Skeleton loader for slider
        ) : (
          slides.map((slide, index) => (
            <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
              <img src={slide.image} alt={slide.title} />
              <div className="slide-content">
                <h2>{slide.title}</h2>
              </div>
            </div>
          ))
        )}
        {!sliderLoading && (
          <div className="slide-dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Filter Card */}
      <div className="container my-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row g-3">
              {/* Search Bar */}
              <div className="col-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Type dropdown */}
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  {types.map(type => (
                    <option key={type} value={type}>
                      {capitalizeFirstLetter(type)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subtype dropdown - now using filtered subtypes */}
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={selectedSubtype}
                  onChange={(e) => setSelectedSubtype(e.target.value)}
                >
                  <option value="">Select Subtype</option>
                  {filteredSubtypes.map(subtype => (
                    <option key={subtype} value={subtype}>
                      {capitalizeFirstLetter(subtype)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price filters */}
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  min="0"
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min={minPrice || "0"}
                  max={maxProductPrice}
                  disabled={!minPrice}
                />
              </div>

              {/* Apply Filters Button */}
              <div className="col-md-3">
                <button className="btn btn-primary w-100" onClick={handleApplyFilters}>
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Display - Updated to use filtered products */}
      <div className="products-by-type">
        {loading ? (
          <div className="product-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : (
          Object.entries(filteredGroupedProducts).map(([type, typeProducts]) => (
            <div key={type} className="product-type-section">
              <h2 className="type-title">{capitalizeFirstLetter(type)}</h2>
              <div className="product-grid">
                {typeProducts.map((product) => (
                  <ProductCard 
                    key={product._id} 
                    product={product} 
                    type={product.type.toLowerCase()} 
                  />
                ))}
              </div>
              {typeProducts.length >= 4 && (
                <div className="view-all-container">
                  <button 
                    className="view-all-button" 
                    onClick={() => navigate(`/${type}`)} // Use template literals for navigation
                  >
                    View All {capitalizeFirstLetter(type)}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}  