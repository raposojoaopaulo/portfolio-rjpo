import { RouterProvider } from "react-router-dom";
import router from "./routes";
import useScrollAnimation from './hooks/useScrollAnimation';
import './styles/main.scss';

export default function App() {
  useScrollAnimation();

  return (
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true }}
    />
  );
}
