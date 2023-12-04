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
