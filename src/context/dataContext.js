import React, { createContext, useEffect, useState } from "react";
import { cityData, weatheData, weatheforecast } from "../api";
import { cityDefault } from "../mocksArreys";
import { daysWeek, hours, today } from "./func";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [isLoader, setIsLoader] = useState(false);
  const [isAnimationWeek, setIsAnimationWeek] = useState(true);
  const [rotationCard, setRotationCard] = useState(true);
  const [activePanel, setActivePanel] = useState(false);

  const [defaultInput, setDefaultInput] = useState("Москва");
  const [errorInputCity, setErrorInputCity] = useState("");
  const [drawingFiveCities, setDrawingFiveCities] = useState(cityDefault);
  const [valueCity, setValueCity] = useState("");
  const [dayToday, setDayToday] = useState();

  const [weekForecastArr, setWeekForecastArr] = useState([]);
  const [hoursForecastArr, setHoursForecastArr] = useState([]);

  const regExp = /^[а-яА-ЯёЁ -]+$/i;

  // вывод/скрытие сообщения об ошибке
  function errorOutput(text) {
    setErrorInputCity((open) => !open);
    setTimeout(() => {
      setErrorInputCity(false);
    }, 2000);
    setErrorInputCity(text);
  }

  // подгрузка данных погоды "Москвы" при инициализации
  useEffect(() => {
    try {
      weatheData("55.625578", "37.6063916").then((res) => {
        setDayToday(today(res));
      });
      weatheforecast("55.625578", "37.6063916").then((res) => {
        setWeekForecastArr(daysWeek(res));
        setHoursForecastArr(hours(res));
      });
    } catch (error) {
      console.log("Первый запрос на сервер:", error);
      errorOutput("Упс! что-то не так. Разбераемся");
    }
  }, []);

  //* активация выезжающей панели (sideBar.jsx) (sidePanel.jsx)
  function showHideSearch() {
    setActivePanel((active) => !active);
  }

  //* анимация "на неделю"/ "почасовой" (week.jsx)
  function changeElement(e) {
    if (e.target.getAttribute("data-week")) {
      setIsAnimationWeek(true);
      return;
    }
    if (e.target.getAttribute("data-hour")) {
      setIsAnimationWeek(false);
      return;
    }
  }

  //* анимация поворота карточек (cardsWeekToday.js)
  useEffect(() => {
    setRotationCard(true);

    return () => {
      setTimeout(() => {
        setRotationCard(false);
      }, 700);
    };
  }, [isAnimationWeek]);

  //* Отправка формы (sidePanel.jsx)
  const submitForm = (e) => {
    e.preventDefault();

    if (valueCity.trim().length < 1) {
      errorOutput("Ошибка: введите город");
      setValueCity("");
      return;
    }

    if (!regExp.test(valueCity)) {
      errorOutput("Только русские буквы");
      setValueCity("");
      return;
    }

    setIsLoader(true);
    try {
      cityData(valueCity).then((data) => {
        let addresstype = data[0]?.addresstype;
        // console.log("Погода :", data);

        if (
          addresstype === "city" ||
          addresstype === "state" ||
          addresstype === "town" ||
          addresstype === "county"
        ) {
          addCity(data);
        } else {
          errorOutput("Упс! Город не найден,\n попробуйте другой");
          setValueCity("");
          setIsLoader(false);
          return;
        }

        let lat = data[0]?.lat;
        let lon = data[0]?.lon;
        weatheData(lat, lon).then((res) => {
          // console.log("Погода в заданном городе:", res);
          setDayToday(today(res));
        });

        weatheforecast(lat, lon).then((res) => {
          // console.log("Погода на несколько дней:", res);
          setWeekForecastArr(daysWeek(res));
          setHoursForecastArr(hours(res));
        });
      });
    } catch (error) {
      console.log("Запрос на сервер:", error);
      errorOutput("Упс! Запрос не отправлен,\n попробуйте ещё раз.");
    }
  };

  //* добавление города в список 5 городов
  const addCity = (data) => {
    let nameCity = data[0]?.name;
    let sameСity = drawingFiveCities.findIndex((el) => el.city === nameCity);

    try {
      if (sameСity >= 0) {
        let [removed] = drawingFiveCities.splice(sameСity, 1);
        drawingFiveCities.splice(0, 0, removed);
      } else if (regExp.test(nameCity)) {
        let copy = [...drawingFiveCities];
        copy.pop();
        copy.unshift({
          id: Date.now(),
          city: nameCity,
        });
        setDrawingFiveCities(copy);
      }
      setValueCity("");
      setDefaultInput(nameCity);
      showHideSearch();
      setIsLoader(false);
    } catch (error) {
      errorOutput("Упс! что-то не так. Разбераемся");
      console.log("Блок 5 городов:", error);
    }
  };

  //* Название города: из спика, в input (searchCity.jsx)
  const addCityInInput = (e) => {
    setValueCity(e.target.outerText);
  };

  return (
    <DataContext.Provider
      value={{
        isLoader,
        isAnimationWeek,
        changeElement,
        rotationCard,
        activePanel,
        showHideSearch,
        defaultInput,
        submitForm,
        valueCity,
        setValueCity,
        errorInputCity,
        drawingFiveCities,
        addCityInInput,
        dayToday,
        weekForecastArr,
        hoursForecastArr,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
