import classes from "./week.module.css";
import figure from "../weatherIndicators/indicators.module.css";
import line from "../../styles/img/cards/text-line.png";
import { useContext, useEffect, useRef, useState } from "react";
import { CardWeekToday, PreLoader } from "../weatherIndicators";
import { DataContext } from "../../context";

export const Week = () => {
  const {
    isLoader,
    rotationCard,
    isAnimationWeek,
    changeElement,
    weekForecastArr,
    hoursForecastArr,
    dayToday,
  } = useContext(DataContext);
  let weeksOrHours = isAnimationWeek ? weekForecastArr : hoursForecastArr;
  let temp_max = dayToday?.temp || 10;
  let temp_min = dayToday?.feels_like || 4;
  let img = dayToday?.icon || line;

  const [cardsIndex, setCardsIndex] = useState(0);
  const [leftBtn, setLeftBtn] = useState(false);
  const [rightBtn, setRightBtn] = useState(false);

  const refblock = useRef(null);
  const refslider = useRef(null);
  const btnleft = useRef(null);
  const btnright = useRef(null);

  const [widthBlock, setWidthBlock] = useState();
  const [widthSlider, setWidthSlider] = useState();

  // закидываем ширину блока и контейнера для карточек в переменные состояния
  const getListSize = () => {
    if (refblock.current && refslider.current) {
      const newBlock = refblock.current.clientWidth;
      const newSlider = refslider.current.clientWidth;
      setWidthBlock(newBlock);
      setWidthSlider(newSlider);
      setCardsIndex(0);
      setLeftBtn(false);
    }
  };

  // слушатель, для изменения ширины блока и контейнера
  useEffect(() => {
    window.addEventListener("resize", getListSize);
  }, []);

  // при переключении "на неделю"/"почасовой"
  useEffect(() => {
    getListSize();
    setCardsIndex(0);
  }, [isAnimationWeek]);

  // обнуляем левую кнопку
  useEffect(() => {
    if (cardsIndex === 0) {
      setLeftBtn(false);
    }
  }, [cardsIndex]);

  // активируем правую кнопку
  useEffect(() => {
    if (widthBlock <= widthSlider) {
      setRightBtn(true);
    } else {
      setRightBtn(false);
    }
  }, [widthBlock, widthSlider]);

  const handleClickRight = () => {
    if (widthBlock >= widthSlider) {
      setCardsIndex(0);
      setRightBtn(false);
    } else {
      setCardsIndex(cardsIndex + 124);
      setWidthSlider(widthSlider - 124);
      setLeftBtn(true);
    }
  };

  const handleClickLeft = () => {
    setCardsIndex(cardsIndex - 124);
    setWidthSlider(widthSlider + 124);
  };

  return (
    <section className={classes.week}>
      <div className={classes.title}>
        <h2>Прогноз</h2>
        <div>
          <span
            data-week
            onClick={changeElement}
            className={`${classes.spanBorder} ${
              isAnimationWeek ? classes.active : ""
            }`}
          >
            на неделю
          </span>
          <span
            data-hour
            onClick={changeElement}
            className={`${classes.spanBorder} ${
              isAnimationWeek ? "" : classes.active
            }`}
          >
            почасовой
          </span>
        </div>
      </div>

      <div className={classes.cards}>
        <button
          ref={btnleft}
          disabled={leftBtn ? false : true}
          onClick={handleClickLeft}
          className={`${classes._iconLeft} ${
            leftBtn ? classes.activArrow : classes.opacityArrow
          }`}
        ></button>
        <div className={classes.cardsBlock} ref={refblock}>
          <div
            className={classes.cardsSlider}
            ref={refslider}
            style={{ left: `-${cardsIndex}px` }}
          >
            {isAnimationWeek && (
              <figure
                className={`${figure.card} ${
                  rotationCard ? figure.cardAnimation : ""
                }`}
              >
                {isLoader ? (
                  <PreLoader />
                ) : (
                  <>
                    <figcaption>Сегодня</figcaption>
                    <img src={img} alt="weather" />
                    <figcaption>
                      <span>{temp_max}°C</span>
                      {temp_min ? <span data-fluid>{temp_min}°C</span> : null}
                    </figcaption>
                  </>
                )}
              </figure>
            )}
            {weeksOrHours.map((el, index) => {
              return <CardWeekToday el={el} key={index} index={index} />;
            })}
          </div>
        </div>
        <button
          ref={btnright}
          onClick={handleClickRight}
          disabled={rightBtn ? false : true}
          className={`${classes._iconRight} ${
            rightBtn ? classes.activArrow : classes.opacityArrow
          }`}
        ></button>
      </div>
    </section>
  );
};
