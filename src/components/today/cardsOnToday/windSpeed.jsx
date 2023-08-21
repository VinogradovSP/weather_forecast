import classes from "../today.module.css";
import { useContext } from "react";
import { DataContext } from "../../../context";
import { PreLoader } from "../../weatherIndicators";
import windDirection from "../../../styles/img/png/wind-direction.png";

export const WindSpeed = () => {
  const { isLoader, dayToday } = useContext(DataContext);

  let deg = dayToday?.deg;
  let direction;
  let speed = dayToday?.speed;

  switch (true) {
    case deg === 0:
    case deg === 360:
      direction = "С";
      break;
    case deg >= 1 && deg <= 89:
      direction = "СВ";
      break;
    case deg === 90:
      direction = "В";
      break;
    case deg >= 91 && deg <= 179:
      direction = "ЮВ";
      break;
    case deg === 180:
      direction = "Ю";
      break;
    case deg >= 181 && deg <= 269:
      direction = "ЮЗ";
      break;
    case deg === 270:
      direction = "З";
      break;
    case deg >= 271 && deg <= 359:
      direction = "СЗ";
      break;
    default:
      break;
  }

  return (
    <div className={classes.itemToday}>
      {isLoader ? (
        <PreLoader />
      ) : (
        <>
          <h3 className={classes.textTop}>Скорость ветра</h3>
          <p>
            {speed || 7}
            <span className={classes.itemTodaySpan}>&nbsp;м/с</span>
          </p>
          <figure className={classes.wind}>
            <img
              style={{ transform: `rotate(${deg || 315}deg)` }}
              src={windDirection}
              alt="wind"
            ></img>
            <figcaption>{direction || "СЗ"}</figcaption>
          </figure>
        </>
      )}
    </div>
  );
};
