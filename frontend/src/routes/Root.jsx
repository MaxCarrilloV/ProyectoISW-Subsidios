import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';


function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const { user } = useAuth();
  return (
    <div>
      {user.roles.name === 'admin'?(<div>
        <h1>Aqui deberia ir un header</h1>
        <p>Estas logeado como: Evaluador</p>
        <button onClick={handleLogout}>Cerrar sesion</button>
      </div>) : (<div>
        <h1>Aqui deberia ir un header</h1>
        <p>Estas logeado como: Postulante</p>
        <button onClick={handleLogout}>Cerrar sesion</button>
      </div>)}
      
      <Outlet />
    </div>
    
    
  );
}

export default Root;
