import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

document.documentElement.classList.add("js-motion");

createRoot(document.getElementById("root")!).render(<App />);
