import React, { useState } from "react";
import PropTypes from 'prop-types';

PlantCard.propTypes = {
  plant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    isInStock: PropTypes.bool.isRequired,
  }).isRequired,
  onStockChange: PropTypes.func,
};


function PlantCard({ plant, onStockChange }) {
  
  const [isInStock, setIsInStock] = useState(plant.isInStock);

  
  const handleToggleStock = async () => {
    const newStockStatus = !isInStock;
    setIsInStock(newStockStatus);

   
    if (onStockChange) {
      try {
      await onStockChange(plant.id, newStockStatus); 
    } catch(error) {
      setIsInStock(!newStockStatus); //revert the ui if the update fails
      console.error("Failed to update status:", error);
    }
  }
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>
      <button
        className={isInStock ? "primary" : "secondary"}
        onClick={handleToggleStock}
        aria-label={`Toggle stock status for ${plant.name}`}
      >
        {isInStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;