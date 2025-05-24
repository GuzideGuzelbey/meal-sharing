import { useState, useEffect } from "react";
import Meal from "./Meal";
import styles from "./meals.module.css";

export default function MealsList({ limit }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        const response = await fetch("http://localhost:3001/api/meals");
        const data = await response.json();
        setMeals(data.meals);
      }, 2000);
    };
    fetchData([]);
  }, []);

  const displayedMeals = limit ? meals.slice(0, limit) : meals;

  return (
    <div className={styles.mealsGrid}>
      {displayedMeals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </div>
  );
}
