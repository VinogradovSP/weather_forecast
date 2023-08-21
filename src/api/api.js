// const key = "b8f025b5d531b3074e553974fa7fe9af";
const key = process.env.REACT_APP_WEATHER_API_KEY;

export const cityData = async (value) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search.php?q=${value}&format=json&addressdetails=3&limit=1`
  );
  const data = await response.json().catch((error) => {
    console.log("cityData_error:", error);
  });

  return data;
};

export const weatheData = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=ru`
  );
  const data = await response.json().catch((error) => {
    console.log("weatheData_error:", error);
  });

  return data;
};

export const weatheforecast = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=ru`
  );
  const data = await response.json().catch((error) => {
    console.log("weatheData_error:", error);
  });

  return data;
};
