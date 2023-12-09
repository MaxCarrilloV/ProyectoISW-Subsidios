import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem('user')) {
    return (
      <>
        <h2>Ya estas logeado!</h2>
        <button onClick={() => navigate('/')}>Ir a home</button>
      </>
    );
  }

  return (
    <Stack className="align-items-center justify-content-center" style={{height:'100vh'}} >
      <h2>Iniciar sesión</h2>
      <LoginForm />
    </Stack>
  );
}

export default Login;
