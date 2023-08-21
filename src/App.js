import { DataProvider } from "./context";
import { Home } from "./pages/weather";

console.log(process.env.REACT_APP_WEATHER_API_KEY);

export const App = () => (
  <DataProvider>
    <Home />
  </DataProvider>
);
