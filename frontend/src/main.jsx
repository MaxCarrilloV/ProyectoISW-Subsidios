import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Postulaciones  from './routes/Postulaciones';
import PrivateRoute  from './routes/PrivateRoute ';
import Postular from './routes/Postular';
import Subsidios from './routes/Subsidios';
import Apelaciones from './routes/Apelaciones';
import Category  from './routes/Category';
import Motivo from './routes/Motivo';
import Evaluar from './routes/Evaluar.jsx';
import Evaluaciones from './routes/Evaluaciones.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/postulaciones',
        element: <PrivateRoute element={<Postulaciones />} roles={['admin', 'user']} />,
        
      },
      {
        path: '/postular',
        element: <PrivateRoute element={<Postular />} roles={['user']} />,
        
      },
      {
        path: '/Subsidios',
        element: <PrivateRoute element={<Subsidios />} roles={['admin', 'user']} />,
        
      },
      {
        path: '/Subsidios',
        element: <PrivateRoute element={<Subsidios />} roles={['admin', 'user']} />,
        
      },
      {
        path: '/Apelar',
        element: <PrivateRoute element={<Apelaciones />} roles={[ 'user']} />,
        
      },
      {
        path: '/Categorias',
        element: <PrivateRoute element={<Category />} roles={[ 'admin']} />,
        
      },
      {
        path: '/Motivo',
        element: <PrivateRoute element={<Motivo />} roles={[ 'admin']} />,
      },
      {
        path: 'Postulaciones/Evaluar/:id',
        element: <PrivateRoute element={<Evaluar />} roles={['admin']} />,
      },
      {
        path: '/Evaluaciones',
        element: <PrivateRoute element={<Evaluaciones />} roles={[ 'admin']} />,
      },
      
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
]);;

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
);
