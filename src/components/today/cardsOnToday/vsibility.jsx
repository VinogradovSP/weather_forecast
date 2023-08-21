import classes from "../today.module.css";
import { useContext } from "react";
import { DataContext } from "../../../context";
import { PreLoader } from "../../weatherIndicators";

export const Visibility = () => {
  const { isLoader, dayToday } = useContext(DataContext);
  let visibility = dayToday?.visibility;

  return (
    <div className={classes.itemToday}>
      {isLoader ? (
        <PreLoader />
      ) : (
        <>
          <h3 className={classes.textBottom}>Видимость</h3>
          <p>
            {visibility || 6.2}
            <span className={classes.itemTodaySpan}>&nbsp;км</span>
          </p>
        </>
      )}
    </div>
  );
};
