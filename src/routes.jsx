import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import UnderConstruction from './pages/UnderConstruction';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

const router = createBrowserRouter(
  [
    { path: "/",            element: <Home /> },
    { path: "/em-construcao", element: <UnderConstruction /> },
    { path: "/sobre-mim",   element: <About /> },
    { path: "/portfolio",   element: <Portfolio /> },
    { path: "/contato",     element: <Contact /> },
    { path: "*",            element: <NotFound /> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default router;