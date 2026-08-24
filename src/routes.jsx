import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import UnderConstruction from './pages/UnderConstruction';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import BriefingLogotipo from './pages/BriefingLogotipo';

const router = createBrowserRouter(
  [
    { path: "/",            element: <Home /> },
    { path: "/em-construcao", element: <UnderConstruction /> },
    { path: "/sobre-mim",   element: <About /> },
    { path: "/portfolio",   element: <Portfolio /> },
    { path: "/contato",     element: <Contact /> },
    { path: "/briefing-logotipo", element: <BriefingLogotipo /> },
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