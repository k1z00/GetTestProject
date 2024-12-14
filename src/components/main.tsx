import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Корневой элемент с id="root" не найден. Убедитесь, что он существует в вашем HTML.'
  );
}

const root = createRoot(rootElement);
root.render(<App />);
