import MealDetail from "./MealDetail";
import styles from "./page.module.css";

export default function Meal({ meal }) {
  const openCardDetails = () => {
    return <MealDetail />;
  };

  const addReview = () => {
    return <p>Review Given</p>;
  };
  return (
    <div className={styles.mealCard}>
      <img
        className={styles.mealImg}
        src="https://cdn-icons-png.flaticon.com/512/182/182727.png"
      />
      <div className={styles.mealContent}>
        <h3 className={styles.mealTitle}>{meal.title}</h3>
        <p>Location: {meal.location}</p>
        <p>Price: {meal.price}dkk</p>
        <button className={styles.button} onClick={() => openCardDetails()}>
          Book a Meal
        </button>
        <button className={styles.button} onClick={() => addReview()}>
          Add Review
        </button>
      </div>
    </div>
  );
}
