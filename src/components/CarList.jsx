import React from 'react';
import { Button } from 'react-bootstrap';

const CarList = ({ cars, onAddToWishlist, wishlist }) => {
  return (
    <div className="row">
      {cars.map(car => (
        <div className="col-md-6 col-lg-4 mb-4" key={car.id}>
          <div className="card h-100 shadow-sm">
            <img src={car.image} className="card-img-top" alt={car.name} />
            <div className="card-body">
              <h5 className="card-title">{car.name}</h5>
              <p className="card-text">
                Brand: {car.brand} <br />
                Price: ${car.price} <br />
                Fuel: {car.fuelType} <br />
                Seats: {car.seatingCapacity}
              </p>
              <Button
                variant={wishlist.includes(car.id) ? "danger" : "primary"}
                onClick={() => onAddToWishlist(car.id)}
              >
                {wishlist.includes(car.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;
