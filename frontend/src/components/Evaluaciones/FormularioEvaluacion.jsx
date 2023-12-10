import React,{useState, useEffect} from "react";
import { Stack , Form, FloatingLabel, Button, ListGroup,Spinner,Modal} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { getCriterios , createEvaluacion} from "../../services/Evaluacion.service";



const FormularioEvaluacion = (postulacion) => {
    const [criterios, setCriterios] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertD, setShowAlertD] = useState(false);

   const {
     register,
     handleSubmit,
     setValue,
     reset,
     formState: { errors } }= useForm({
         defaultValues: {
             observaciones: '',
             criterios:[{}],
             postulacion: postulacion.postulacion._id,
             evaluador: user.id,
             formularioEvaluacion:''
         },
    });
    const  onSubmit = async (data) => {
      const formData = new FormData();
      formData.append("formularioEvaluacion.observaciones", data.observaciones);
      formData.append("postulacion", data.postulacion);
      formData.append("evaluador", data.evaluador);
      data.criterios.forEach((criterio, index) => {
        formData.append(`formularioEvaluacion.criterios[${index}].puntuacion`, criterio.puntuacion);
        formData.append(`formularioEvaluacion.criterios[${index}].nombre`, criterio.nombre);
      });
      const  enviado = await createEvaluacion(formData);
      if(enviado){
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 4000);
            reset();
      }else{
        setShowAlertD(true);
        setTimeout(() => {
            setShowAlertD(false);
        }, 4000);
      }
    };
 
    useEffect(() => {
        getCriterios().then((data) => {
            setCriterios(data);
        })
        .finally(() => {
          setLoading(false);
        });;
    }, []);

    if (loading) {
        return <Spinner animation="border" />;;
    }

  return (
    <Stack className="mt-4">
      <h1 className="mx-auto">Formulario de Evaluación</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        
        <ListGroup className="">
            <h4>Criterios a evaluar</h4>
            {criterios?.map((criterio,index) => (<div  key={index}>
                <FloatingLabel className="mb-3" label={criterio.nombre}>
                    <Form.Control
                    name={`criterios[${index}].puntuacion`} 
                    type="number"
                    min={0}
                    max={10}
                    placeholder="0"
                    {...register(`criterios[${index}].puntuacion`, { required: true })}
                    />
                    <Form.Text>Agregar puntuación que puede ser un valor del 0 al 10</Form.Text>
                </FloatingLabel>
                <Form.Control  
                hidden
                className="mb-3"
                name={`criterios[${index}].nombre`} 
                type="text"
                value={criterio._id} 
                {...register(`criterios[${index}].nombre`)}
                />
                
                </div>
                
            ))}
        </ListGroup>
        <FloatingLabel
            label="Observaciones"
            className="mb-3"
        >
            <Form.Control style={{height:"100px"}} type="text" name="Observaciones" placeholder="Observaciones" as="textarea" 
            {...register('observaciones', { required: true })} />
        </FloatingLabel>
        <Form.Group   className='d-flex justify-content-center mb-5'>
            <Button type="submit" className='px-5'>  Evaluar </Button>
        </Form.Group>
        
      </Form>
      <Modal  show={showAlert} onHide={() => setShowAlert(false)} >
           <Modal.Header style={{background:'#75b798'}} closeButton>
              <Modal.Title>¡La evaluación se creo correctamente!</Modal.Title>
           </Modal.Header>
      </Modal>
      <Modal show={showAlertD} onHide={() => setShowAlertD(false)}>
          <Modal.Header style={{background:'#ffc107'}} closeButton>
              <Modal.Title>¡Hubo un error en enviar la evaluación, Complete y envie nuevamente la evaluación!</Modal.Title>
          </Modal.Header>
      </Modal>
    </Stack>
  );
}
export default FormularioEvaluacion;