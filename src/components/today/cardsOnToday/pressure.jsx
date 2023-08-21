import classes from "../today.module.css";
import { useContext } from "react";
import { DataContext } from "../../../context";
import { PreLoader } from "../../weatherIndicators";

export const Pressure = () => {
  const { isLoader, dayToday } = useContext(DataContext);
  let pressure = dayToday?.pressure;

  return (
    <div className={classes.itemToday}>
      {isLoader ? (
        <PreLoader />
      ) : (
        <>
          <h3 className={classes.textBottom}>Давление</h3>
          <p>
            {pressure || 742}
            <span className={classes.itemTodaySpanLast}> &nbsp;мм рт. ст.</span>
          </p>
        </>
      )}
    </div>
  );
};
