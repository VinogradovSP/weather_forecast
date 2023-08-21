import classes from "../today.module.css";
import { useContext } from "react";
import { DataContext } from "../../../context";
import { PreLoader } from "../../weatherIndicators";

export const Humidity = () => {
  const { isLoader, dayToday } = useContext(DataContext);
  let humidity = dayToday?.humidity;

  return (
    <div className={classes.itemToday}>
      {isLoader ? (
        <PreLoader />
      ) : (
        <>
          <h3 className={classes.textTop}>Влажность</h3>
          <p className={classes.textMain}>
            {humidity || 84}
            <span className={classes.itemTodaySpan}>&nbsp;%</span>
          </p>
          <div className={classes.progressbarBlock}>
            <div className={classes.progressbar}>
              <div style={{ width: humidity + "%" }}></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
