import { SideBar } from "../components/sideBar";
import { Week } from "../components/week";
import { Today } from "../components/today";
import classes from "../styles/weather.module.css";

export const Home = () => {
  return (
    <main className={classes.weather}>
      <SideBar />
      <section className={classes.forecast}>
        <Week />
        <Today />
      </section>
    </main>
  );
};
