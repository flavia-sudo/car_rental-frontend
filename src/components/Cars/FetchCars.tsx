import { useEffect, useState } from 'react';
import './cars.css';
import type { TCar } from '../../types/TCar';

const FetchCars = () => {
    const [cars, setCars] = useState<TCar[]>([]);

    const fetchCarsData = async () => {
        try {
            const response = await fetch('http://localhost:3000/car', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            setCars(data);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log(String(error));
            }
        }
    };

    useEffect(() => {
        fetchCarsData();
    }, []);

    const handleActionChange = (action: string, car: TCar) => {
        switch (action) {
            case "update":
                // Handle update logic
                if (confirm(`Do you want to update ${car.carModel}?`)) {
                    console.log("Updating car with ID:", car.carId);
                    alert(`Update car: ${car.carModel}`);
                }
                break;
            case "delete":
                // Handle delete logic
                if (confirm(`rAre you sure you want to delete car with id ${car.carId}?`)) {
                    const deleteCar = async () => {
                        try {
                            const response = await fetch(`http://localhost:3000/car/${car.carId}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            });

                            if (!response.ok) {
                                throw new Error(`${response.statusText}`);
                            }

                            setCars((prevCars) => prevCars.filter((c) => c.carId !== car.carId));
                        } catch (err) {
                            if (err instanceof Error) {
                                console.error("Error deleting car:", err);
                                alert(`Failed to delete car: ${err.message}`);
                            } else {
                                console.error("Unexpected error:", err);
                                alert("An unexpected error occurred while deleting the car.");
                            }
                        }
                        alert(`Car ${car.carModel} has been deleted.`);
                    };
                    deleteCar();
                }
                break;
            case "toggleAvailability":
                // Toggle car availability
                console.log("Toggling availability for:", car.carId);
                alert(
                    `Car ${car.carModel} is now ${car.availability ? "not available" : "available"}.`
                );
                break;
            default:
                break;
        }
    };

    return (
        <div className="cars-container">
            {cars.length === 0 ?(
                <div>No cars available</div>
            ) : (
                <table className='cars-table'>
                    <thead>
                        <tr>
                            <th>Car ID</th>
                            <th>Car Model</th>
                            <th>Year</th>
                            <th>Color</th>
                            <th>Rental Rate</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr key={car.carId}>
                                <td>{car.carId}</td>
                                <td>{car.carModel}</td>
                                <td>{car.year}</td>
                                <td>{car.color}</td>
                                <td>{car.rentalRate}</td>
                                <td>{car.availability ? 'Available' : 'Not Available'}</td>
                         <td>
                                    <select onChange={(e) => handleActionChange(e.target.value, car)} defaultValue="">
                                        <option value="" disabled>
                                            Actions
                                        </option>
                                        <option value="update">Update</option>
                                        <option value="delete">Delete</option>
                                        <option value="toggleAvailability">
                                            {car.availability ? "Mark Unavailable" : "Mark Available"}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default FetchCars;
