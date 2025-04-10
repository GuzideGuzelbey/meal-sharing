"use client";

import "./HomePage.css";
import MealsList from "../MealsList";
import styles from "../meals.module.css";

function HomePage() {
  return (
    <>
      <nav className="navbar">Navbar Placeholder</nav>
      <main className="main">
        <section className={styles.mealsContainer}>
          <MealsList />
        </section>
        <footer className="footerish">Footer Placeholder</footer>
      </main>
    </>
  );
}

export default HomePage;
