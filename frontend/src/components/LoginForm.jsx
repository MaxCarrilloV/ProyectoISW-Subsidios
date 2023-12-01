import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import { Button , Form, FormControl} from 'react-bootstrap';
function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control name="email" type="email" {...register('email', { required: true })} />
      </Form.Group>

      <Form.Group className="mb-10" controlId="formBasicPassword">
        <Form.Control name="password" type="password" {...register('password', { required: true })} />
      </Form.Group>
      {errors.exampleRequired && <span>This field is required</span>}
      <Button type="submit" className='mx-5 my-2' > Iniciar sesion</Button>
    </Form>
  );
}

export default LoginForm;
