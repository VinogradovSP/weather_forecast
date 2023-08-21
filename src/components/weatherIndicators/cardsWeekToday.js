import classes from "./indicators.module.css";
import line from "../../styles/img/cards/text-line.png";
import { PreLoader } from "./preLoader";
import { useContext } from "react";
import { DataContext } from "../../context";

export const CardWeekToday = ({ el, index }) => {
  const { isLoader, rotationCard } = useContext(DataContext);
  let dt = "Вс, 01 янв";

  if (index === 0) {
    dt = "Завтра";
  } else {
    dt = el?.dt;
  }

  let temp_max = el?.temp_max || 10;
  let temp_min = el?.temp_min || 4;
  let img = el?.img || line;

  if (!el.dt) {
    dt = el?.time;
    img = el?.imgHour;
    temp_max = el?.temp;
    temp_min = null;
  }

  return (
    <figure
      className={`${classes.card} ${rotationCard ? classes.cardAnimation : ""}`}
    >
      {isLoader ? (
        <PreLoader />
      ) : (
        <>
          <figcaption>{dt}</figcaption>
          <img src={img} alt="weather" />
          <figcaption>
            <span>{temp_max}°C</span>
            {temp_min ? <span data-fluid>{temp_min}°C</span> : null}
          </figcaption>
        </>
      )}
    </figure>
  );
};
