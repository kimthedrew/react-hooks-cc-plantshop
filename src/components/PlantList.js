import React, { useState, useEffect } from "react";
import PlantCard from "./PlantCard";
import Search from "./Search";
import NewPlantForm from "./NewPlantForm";

function PlantList() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:6001/plants");
        const data = await response.json();
        setPlants(data); // Store fetched plants
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query state
  };

  // Filter plants based on the search query
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  };

  const handleUpdatePrice = (updatedPlant) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  };

  const handleDeletePlant = async (plantId) => {
    try{
      await fetch(`http://localhost:6001/plants/${plantId}`, { method: "DELETE" });
    setPlants((prevPlants) =>
      prevPlants.filter((plant) => plant.id !== plantId)
    );
  }
    catch(error) {
      console.error("Failed to delete plant");
    }
  };

  return (
    <div>
      < NewPlantForm onAddPlant={handleAddPlant} /> 
      <Search query={searchQuery} onSearch={handleSearch} />
      <ul className="cards">
        {filteredPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onUpdatePrice={handleUpdatePrice}
            onDeletePlant={handleDeletePlant}
          />
        ))}
      </ul>
    </div>
  );
}

export default PlantList;