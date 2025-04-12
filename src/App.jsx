import React, { useEffect, useState } from 'react';
import CarList from './components/CarList';
import Filters from './components/Filters';
import Wishlist from './components/Wishlist';
import DarkModeToggle from './components/DarkModeToggle';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({ brand: '', fuelType: '', price: '', sort: '' });
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  useEffect(() => {
    fetch('/mock-data.json')
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setFilteredCars(data);
      })
      .catch(err => console.error('API Error:', err));
  }, []);

  useEffect(() => {
    handleFilter();
  }, [filters, cars]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleFilter = () => {
    let result = [...cars];

    if (filters.brand) {
      result = result.filter(car =>
        car.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    if (filters.fuelType) {
      result = result.filter(car => car.fuelType === filters.fuelType);
    }

    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number);
      result = result.filter(car => car.price >= min && car.price <= max);
    }

    if (filters.sort === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(result);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  const wishlistItems = cars.filter(car => wishlist.includes(car.id));

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  return (
    <div className={isDarkMode ? 'dark-mode bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100'}>
      <div className="container py-4">
        <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <h1 className="mb-4">Car Finder</h1>
        <Filters filters={filters} onFilterChange={handleFilterChange} />
        <Wishlist wishlistItems={wishlistItems} />
        <CarList cars={currentCars} onAddToWishlist={toggleWishlist} wishlist={wishlist} />

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn mx-1 ${i + 1 === currentPage ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
