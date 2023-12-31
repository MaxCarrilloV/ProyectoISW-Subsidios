import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import NavbarEvaluador  from '../components/NavbarEvaluador';
import NavbarPostulante  from '../components/NavbarPostulante';

function Root() {
  return (
    <AuthProvider >
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();

  const { user } = useAuth();
  return (
    <div>
      {user.roles.name === 'admin'?(<NavbarEvaluador navigate={navigate}/>) : (<NavbarPostulante navigate={navigate}/>)} 
      <Outlet />
    </div>
    
    
  );
}

export default Root;
