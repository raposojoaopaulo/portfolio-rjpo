import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import UnderConstruction from './pages/UnderConstruction';
import NotFound from './pages/NotFound';
import About from './pages/About';
// import Projects from './pages/Projects';
// import Contact from './pages/Contact';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/em-construcao', element: <UnderConstruction /> },
  { path: '*', element: <NotFound /> },
  { path: '/sobre-mim', element: <About /> },
  // { path: '/projects', element: <Projects /> },
  // { path: '/contact', element: <Contact /> }
]);

export default router;

// import { createBrowserRouter } from 'react-router-dom';
// import { lazy, Suspense } from 'react';

// const Home = lazy(() => import('./pages/Home'));
// const About = lazy(() => import('./pages/About'));
// const UnderConstruction = lazy(() => import('./pages/UnderConstruction'));
// const NotFound = lazy(() => import('./pages/NotFound'));

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: (
//       <Suspense fallback={<div>Carregando...</div>}>
//         <Home />
//       </Suspense>
//     ),
//   },
//   {
//     path: '/sobre-mim',
//     element: (
//       <Suspense fallback={<div>Carregando...</div>}>
//         <About />
//       </Suspense>
//     ),
//   },
//   {
//     path: '/contato',
//     element: (
//       <Suspense fallback={<div>Carregando...</div>}>
//         <UnderConstruction />
//       </Suspense>
//     ),
//   },
//   {
//     path: '*',
//     element: (
//       <Suspense fallback={<div>Carregando...</div>}>
//         <NotFound />
//       </Suspense>
//     ),
//   }
// ]);

// export default router;
