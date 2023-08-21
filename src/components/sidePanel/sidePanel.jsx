import classes from "./sidePanel.module.css";
import { ButtonPanel } from "../Ui/button";
import { InputCity } from "../Ui/input";
import { SearchCity } from "../searchCity";
import { useContext } from "react";
import { DataContext } from "../../context";

export const SidePanel = () => {
  const {
    activePanel,
    showHideSearch,
    submitForm,
    valueCity,
    setValueCity,
    errorInputCity,
  } = useContext(DataContext);

  return (
    <div
      className={`${classes.sidePanel} ${activePanel ? classes.panelAdd : ""}`}
    >
      <div
        className={`${classes.error} ${
          errorInputCity ? classes.errorOpen : null
        }`}
      >
        <strong>{errorInputCity}</strong>
      </div>
      <div onClick={showHideSearch} className={classes.x} title="close">
        <span className={classes._iconX}></span>
      </div>
      <form action="#" className={classes.panelForm} autoComplete="on">
        <InputCity
          type="search"
          placeholder="введите город"
          onChange={(event) => setValueCity(event.target.value)}
          value={valueCity}
        />
        <ButtonPanel type="submit" onClick={submitForm}>
          Найти
        </ButtonPanel>
      </form>
      <SearchCity />
    </div>
  );
};
