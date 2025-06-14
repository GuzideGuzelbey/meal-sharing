import styles from "./meals.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Meal({ meal }) {
  const imageSrc = meal.image ? `/${meal.image.trim()}` : null;
  const router = useRouter();

  const handleClick = () => {
    router.push(`/meals/${meal.id}`);
  };

  return (
    <div
      className={styles.mealCard}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
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
      </div>
    </div>
  );
}
