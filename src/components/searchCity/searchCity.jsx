import { useContext } from "react";
import classes from "./searchCity.module.css";
import button from "../Ui/button/button.module.css";
import { DataContext } from "../../context";

export const SearchCity = () => {
  const { drawingFiveCities, addCityInInput } = useContext(DataContext);

  return (
    <section className={classes.cityBlocks}>
      {drawingFiveCities &&
        drawingFiveCities.map((el) => (
          <div
            key={el.id}
            className={`${classes.cityLable} ${button.buttonClick}`}
            onClick={addCityInInput}
          >
            <span>{el.city}</span>
          </div>
        ))}
    </section>
  );
};
