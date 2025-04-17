import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import UnderConstruction from './pages/UnderConstruction';
// import About from './pages/About';
// import Projects from './pages/Projects';
// import Contact from './pages/Contact';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/em-construcao', element: <UnderConstruction /> },
  // { path: '/about', element: <About /> },
  // { path: '/projects', element: <Projects /> },
  // { path: '/contact', element: <Contact /> }
]);

export default router;
