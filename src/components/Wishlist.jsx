import React from 'react';

const Wishlist = ({ wishlistItems }) => {
  return (
    <div className="mb-5">
      <h4>Your Wishlist</h4>
      {wishlistItems.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <ul className="list-group">
          {wishlistItems.map(car => (
            <li key={car.id} className="list-group-item d-flex justify-content-between">
              {car.name}
              <span>${car.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
