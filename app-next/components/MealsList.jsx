import { useState, useEffect } from "react";
import Meal from "./Meal";
import styles from "./page.module.css";

export default function MealsList() {
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

  return (
    <section className="mealsContainer">
      <div className={styles.mealsGrid}>
        {meals.map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
    </section>
  );
}
