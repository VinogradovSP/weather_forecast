import classes from "./sideBar.module.css";
import button from "../Ui/button/button.module.css";
import snowflake from "../../styles/img/png/snowflake.png";
import { ButtonSide } from "../Ui/button/button.jsx";
import { SidePanel } from "../sidePanel";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context";

export const SideBar = () => {
  const { showHideSearch, defaultInput, dayToday } = useContext(DataContext);

  let when = dayToday?.when || "Сегодня";
  let dt = dayToday?.dt || "Вс, 01 янв";
  let desc = dayToday?.decs || "Снег";
  let temp = dayToday?.temp || 1;
  let feels_like = dayToday?.feels_like || -3;
  let iconPhoto = dayToday?.iconPhoto || snowflake;

  const [dark, setDark] = useState(false);

  function darkTheme() {
    setDark((dark) => !dark);
  }

  useEffect(() => {
    if (dark) {
      document.body.setAttribute("dark", "");
    } else {
      document.body.removeAttribute("dark");
    }
  }, [dark]);

  return (
    <section className={classes.sideBar}>
      <nav>
        <ButtonSide onClick={showHideSearch}>Поиск города</ButtonSide>

        <div className={classes.checkbox}>
          <div
            onClick={darkTheme}
            className={`${classes.checkboxChecked} ${button.buttonClick}`}
          >
            <span
              className={`${classes._iconMoon} 
              ${dark ? classes.activeDark : ""}`}
            ></span>
          </div>
        </div>
      </nav>

      <div className={classes.main}>
        <img src={iconPhoto} className={classes.snowflake} alt="погода" />
        <h1>
          {temp} <span> &#176;C</span>
        </h1>
        <p>{desc}</p>
      </div>
      <div className={classes.footer}>
        <p>Ощущается как &nbsp; {feels_like} &#176;C</p>
        <div className={classes.text}>
          <p>{when}</p>
          <p>{dt}</p>
        </div>
        <div className={classes.location}>
          <span>{defaultInput}</span>
        </div>
        <SidePanel />
      </div>
    </section>
  );
};
