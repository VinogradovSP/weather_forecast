import { DataProvider } from "./context";
import { Home } from "./pages/weather";

export const App = () => (
  <DataProvider>
    <Home />
  </DataProvider>
);
