import { useState, useEffect } from "react";
import Meal from "./Meal";
import styles from "./meals.module.css";

export default function MealsList({
  meals: propMeals = [],
  highlight = "",
  limit = null,
}) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (limit && propMeals.length > 0) {
      setMeals(propMeals.slice(0, limit));
    } else {
      setMeals(propMeals);
    }
  }, [propMeals, limit]);

  const highlightText = (text, term) => {
    if (!term) return text;

    const lowerText = text.toLowerCase();
    const lowerTerm = term.toLowerCase();
    const index = lowerText.indexOf(lowerTerm);

    if (index === -1) return text;

    return (
      <>
        {text.slice(0, index)}
        <mark>{text.slice(index, index + term.length)}</mark>
        {text.slice(index + term.length)}
      </>
    );
  };

  return (
    <div className={styles.mealsGrid}>
      {meals.map((meal) => (
        <Meal
          key={meal.id}
          meal={{
            ...meal,
            highlightedTitle: highlightText(meal.title, highlight),
          }}
        />
      ))}
    </div>
  );
}
