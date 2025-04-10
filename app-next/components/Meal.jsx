import MealDetail from "./MealDetail";
import styles from "./meals.module.css";
import Image from "next/image";

export default function Meal({ meal }) {
  console.log("Meal object:", meal);
  const imageSrc = meal.image ? `/${meal.image.trim()}` : null;

  const openCardDetails = () => {
    return <MealDetail />;
  };

  const addReview = () => {
    return <p>Will be implemented</p>;
  };

  return (
    <div className={styles.mealCard}>
      {imageSrc ? (
        <Image
          className={styles.mealImg}
          src={`/${meal.image}`}
          alt={meal.title}
          width={300}
          height={200}
        />
      ) : (
        <div className={styles.mealImg}>Image not available!</div>
      )}

      <div className={styles.mealContent}>
        <h3 className={styles.mealTitle}>{meal.title}</h3>
        <p>
          <b>Location: </b>
          {meal.location}
        </p>
        <p>
          <b>{meal.price}dkk</b>
        </p>
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
