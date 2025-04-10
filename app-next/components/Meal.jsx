import MealDetail from "./MealDetail";
import styles from "./meals.module.css";
import Image from "next/image";

function generateSlug(title) {
  const charMap = {
    ö: "o",
    ç: "c",
    ş: "s",
    ı: "i",
    ğ: "g",
    ü: "u",
    Ö: "o",
    Ç: "c",
    Ş: "s",
    İ: "i",
    Ğ: "g",
    Ü: "u",
  };
  return title
    .trim()
    .toLowerCase()
    .replace(/[öçşığüÖÇŞİĞÜ]/g, (match) => charMap[match] || match)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

export default function Meal({ meal }) {
  const imageFilename = meal.image
    ? meal.image
    : `${generateSlug(meal.title)}.jpg`;
  const imageSrc = imageFilename.includes("/")
    ? `/${imageFilename}`
    : `/meals/${imageFilename}`;

  const openCardDetails = () => {
    return <MealDetail />;
  };

  const addReview = () => {
    return <p>Will be implemented</p>;
  };

  return (
    <div className={styles.mealCard}>
      <Image
        className={styles.mealImg}
        src={imageSrc}
        alt={meal.title}
        width={300}
        height={200}
      />
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
