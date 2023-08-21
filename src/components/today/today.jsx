import classes from "./today.module.css";
import { Humidity, WindSpeed, Visibility, Pressure } from "./cardsOnToday";

export const Today = () => {
  return (
    <section className={classes.today}>
      <h2>Подробно на сегодня</h2>
      <div className={classes.todayBlock}>
        <WindSpeed />
        <Humidity />
        <Visibility />
        <Pressure />
      </div>
    </section>
  );
};
