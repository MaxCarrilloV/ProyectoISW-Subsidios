import { Button ,Modal, Form, Alert} from "react-bootstrap";
import { useState,useEffect } from 'react';
import { deletePostulacion } from '../../services/postulaciones.service';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { getSubsidios } from '../../services/subsidios.service';
import { updatePostulacion } from "../../services/postulaciones.service";

const PostPostulante = ({ postulacion }) => {
  const [show, setShow] = useState(false);
  const [showeditar, setShoweditar] = useState(false);

    const { user } = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertD, setShowAlertD] = useState(false);

    const [subsidios, setSubsidios] = useState([]);

    const fechanaci  = new Date(postulacion.postulante.fechaNacimiento);
    let diaNaci = fechanaci.getDate();
    diaNaci = diaNaci < 10 ? '0' + diaNaci : diaNaci;
    let mesNaci = fechanaci.getMonth()+1;
    mesNaci = mesNaci < 10 ? '0' + mesNaci : mesNaci;
    const añoNaci = fechanaci.getFullYear();
    diaNaci = añoNaci + '-' + mesNaci + '-' + diaNaci;
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: {
          nombre: postulacion.postulante.nombre,
          rut: postulacion.postulante.rut,
          fechaNacimiento: diaNaci,
          direccion: postulacion.postulante.direccion,
          user: postulacion.postulante.user,
          postulacion: postulacion._id,
          postulante: postulacion.postulante._id,
          subsidio: postulacion.subsidio._id,
          documentos:postulacion.documentos,
          
        },
      });


    const onSubmit = (data) => {
        if(updatePostulacion(data)){
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                handleCloseEditar();
                document.location.reload();
            }, 2000);
            
        }else{
            setShowAlertD(true);
            setTimeout(() => {
                setShowAlertD(false);
            }, 4000);
        };
    };

    function validarRUT(rut) {
        const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;
        return rutRegex.test(rut);
      }
     
    const handleKeyDown = (e) => {
        const validKeys = /^[0-9\-\.\k]+$/;
        if (!validKeys.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    };

    useEffect(() => {
        getSubsidios().then((data) => {
            if(data){
                setSubsidios(data);
            }
        });
    }, []);

    const EditarShow = () => setShoweditar(true);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    let id = postulacion._id;
    let postulante = postulacion.postulante._id;
    if (deletePostulacion(id,postulante)){
      document.location.reload();
    }
    handleClose();
  }

  const handleCloseEditar = () => setShoweditar(false);

   //setear la fecha para que sea de este formato DD/MM/YYYY
  const fecha = new Date(postulacion.fechaSolicitud);
  let dia = fecha.getDate();
  dia = dia < 10 ? '0' + dia : dia;
  const mes = fecha.getMonth()+1;
  const año = fecha.getFullYear();
  dia = dia + '/' + mes + '/' + año;
  return (
      <> 
        <tr>
            <td  >{postulacion.estado}</td>
            <td> {postulacion.subsidio.name} </td>
            <td> {dia} </td>
            <td> <Button variant="warning" className="my-2" onClick={handleShow}>Eliminar</Button> 
            <Button variant="primary" className="ms-2 my2"  onClick={EditarShow}>Editar</Button> 
            </td>
            <Modal show={show} onHide={handleClose}>

              <Modal.Header closeButton>
                <Modal.Title>Eliminación</Modal.Title>
              </Modal.Header>
              <Modal.Body>Estas seguro que deseas eliminar esta postulación</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                  Aceptar
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={showeditar}>
            <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data"  >
            <Alert variant="success" show={showAlert} onClose={() => setShowAlert(false)} dismissible >
                ¡La postulacion se editó correctamnete!
            </Alert>
            <Alert variant="warning" show={showAlertD} onClose={() => setShowAlertD(false)} dismissible>
                ¡Hubo un error al editar la postulación!
            </Alert>
                <Modal.Header >
                  <Modal.Title>Editar Postulación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" >
                      <Form.Control  name="user" hidden type="text" value={user.id} {...register('user', { required: true })} />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                      <Form.Control  name="postulacion" hidden type="text" value={postulacion._id} {...register('postulacion', { required: true })} />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                      <Form.Control  name="postulante" hidden type="text" value={postulacion.postulante._id} {...register('postulante', { required: true })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control name="nombre" type="text" placeholder='Nombre' {...register('nombre', { required: true })}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                      type="text"
                      name="rut"
                      onChange={(e) => setValue('rut', e.target.value)}
                      placeholder="RUT"
                      onKeyDown={handleKeyDown}
                      isInvalid={errors.rut}
                      {...register('rut', { required: true ,validate: validarRUT})}
                      />
                      <Form.Control.Feedback type="invalid">
                      Ingresa un RUT válido.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control  name="fechaNacimiento" type="date" placeholder='Fecha de Nacimiento' {...register('fechaNacimiento', { required: true })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control  name="direccion" type="text" placeholder='Dirección' {...register('direccion', { required: true })} />
                    </Form.Group>
                    <Form.Select className="mb-3" name='subsidio' {...register('subsidio', { required: true })}>
                      <option key='' value=''>Seleccione un subsidio</option>
                      {subsidios.map((subsidio) => (
                          <option key={subsidio._id} value={subsidio._id}>
                              {subsidio.name}
                          </option>
                      ))}
                    </Form.Select>
                  
                </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditar}>
                  Cancelar edición
                </Button>
                <Button variant="primary" type="submit">
                  Editar postulación
                </Button>
              </Modal.Footer>
              </Form>
            </Modal>

        </tr>
      </>
    );
  };
  
export default PostPostulante;