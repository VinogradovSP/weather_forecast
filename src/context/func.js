/* eslint-disable array-callback-return */

// преобразование длинной даты в короткую
function dateOutput(props) {
  let formatterDate = new Intl.DateTimeFormat("ru", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(props);

  let day = formatterDate?.split(",").splice(0, 1).join("");
  switch (day) {
    case "понедельник":
      day = "Пн,";
      break;
    case "вторник":
      day = "Вт,";
      break;
    case "среда":
      day = "Ср,";
      break;
    case "четверг":
      day = "Чт,";
      break;
    case "пятница":
      day = "Пт,";
      break;
    case "суббота":
      day = "Сб,";
      break;
    case "воскресенье":
      day = "Вс,";
      break;
    default:
      break;
  }

  let num = formatterDate.split(" ").splice(1, 1).join("");
  let month = formatterDate.split(" ").splice(-1, 1).join("").slice(0, 3);
  return `${day} ${num} ${month}`;
}

// создание {} сегодняшего прогноза
export function today(item) {
  let icon = item.weather[0].icon;

  let today = {
    when: "Сегодня",
    dt: dateOutput(item.dt * 1000),
    decs: item.weather[0].description,
    temp: Math.round(item.main.temp),
    feels_like: item.main.temp.toFixed(1),
    iconPhoto: `https://openweathermap.org/img/wn/${icon}@4x.png`,
    icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,

    deg: item.wind.deg,
    speed: item.wind.speed.toFixed(1),
    humidity: item.main.humidity,
    visibility: (item.visibility / 1000).toFixed(1),
    pressure: Math.floor(item.main.pressure * 0.75),
  };

  return today;
}

// Создание [] прогноза на каждый день недели
export function daysWeek(item) {
  let someWeek = [];

  item?.list.map((el) => {
    if (el.dt_txt.includes("15:00:00")) {
      let icon = el.weather[0].icon;

      someWeek = [
        ...someWeek,
        {
          dt: dateOutput(el.dt * 1000),
          img: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          temp_max: Math.round(el.main.temp_max),
          temp_min: Math.round(el.main.temp_min),
        },
      ];
    }
  });
  return someWeek;
}

// почасовой прогноз. Так как api даёт 3-х часовой прогноз, сделал выборку вплоть до 00:00:00 следующего дня
export function hours(item) {
  let days = item.list.filter((el) => el.dt_txt.includes("00:00:00"));
  let daysDt = days[1].dt;
  let nexyDay = item.list.findIndex((el) => el.dt === daysDt);
  let someArrey = item.list.slice(0, nexyDay);

  let hoursArrey = [];

  someArrey.map((el) => {
    let icon = el.weather[0].icon;

    hoursArrey = [
      ...hoursArrey,
      {
        time: el.dt_txt
          .split(" ")
          .splice(-1, 1)
          .join(":")
          .split(":")
          .splice(0, 2)
          .join(":"),
        imgHour: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        temp: Math.round(el.main.temp),
      },
    ];
  });

  return hoursArrey;
}
