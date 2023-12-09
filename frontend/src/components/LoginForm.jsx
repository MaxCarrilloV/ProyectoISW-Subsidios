import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import { Button , Form} from 'react-bootstrap';
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
    <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3"  controlId="formBasicEmail">
        <Form.Control  name="email" type="email" placeholder='Email address' {...register('email', { required: true })} />
      </Form.Group>

      <Form.Group className="mb-10" controlId="formBasicPassword">
        <Form.Control name="password" type="password" placeholder='Password' {...register('password', { required: true })} />
      </Form.Group>
      {errors.exampleRequired && <span>This field is required</span>}
      <Form.Group  className="mb-10" >
        <Button type="submit" className='my-2 mx-5'  > Iniciar sesión</Button>
      </Form.Group>
     
    </Form>
  );
}

export default LoginForm;
