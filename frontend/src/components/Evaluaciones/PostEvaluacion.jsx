import React,{ useEffect, useState} from "react";
import { Button, Modal, Form ,ListGroup, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { updateEvaluacion , deleteEvaluacion } from "../../services/Evaluacion.service";

const PostEvaluacion = ({evaluacion}) => {
    const [show, setShow] = useState(false);
    const [showeditar, setShoweditar] = useState(false);
    const EditarShow = () => setShoweditar(true);
  
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertD, setShowAlertD] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleDelete = () => {
        let id = evaluacion._id;
        if (deleteEvaluacion(id)){
          document.location.reload();
        }
        handleClose();
    }


    const  onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("formularioEvaluacion.observaciones", data.observaciones);
        formData.append("postulacion", data.postulacion);
        formData.append("evaluador", data.evaluador);
        data.criterios.forEach((criterio, index) => {
          formData.append(`formularioEvaluacion.criterios[${index}].puntuacion`, criterio.puntuacion);
          formData.append(`formularioEvaluacion.criterios[${index}].nombre`, criterio.nombre._id);
        });
        

        const id = evaluacion._id;
        const  enviado = await updateEvaluacion(formData,id);
        if(enviado){
              setShowAlert(true);
              setTimeout(() => {
                  setShowAlert(false);
                  handleCloseEditar();
                  document.location.reload();
              }, 4000);
              reset();
        }else{
          setShowAlertD(true);
          setTimeout(() => {
              setShowAlertD(false);
          }, 4000);
        }
      };

    const handleCloseEditar = () => setShoweditar(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors } }= useForm({
            defaultValues: {
                observaciones: evaluacion.formularioEvaluacion.observaciones,
                criterios:evaluacion.formularioEvaluacion.criterios,
                postulacion: evaluacion.postulacion._id,
                evaluador: evaluacion.evaluador,
                formularioEvaluacion:''
            },
       });

    const fechaEvaluacion = new Date(evaluacion.fechaEvaluacion);
    let diaEvaluacion = fechaEvaluacion.getDate();
    diaEvaluacion = diaEvaluacion < 10 ? '0' + diaEvaluacion : diaEvaluacion;
    let mesEvaluacion = fechaEvaluacion.getMonth()+1;
    mesEvaluacion = mesEvaluacion < 10 ? '0' + mesEvaluacion : mesEvaluacion;
    const añoEvaluacion = fechaEvaluacion.getFullYear();
    diaEvaluacion = diaEvaluacion + '/' + mesEvaluacion + '/' + añoEvaluacion;


    return (
        <>
            <tr>
                <td>{evaluacion.decision}</td>
                <td>{evaluacion.postulacion.postulante.nombre}</td>
                <td>{evaluacion.postulacion.postulante.rut}</td>
                <td>{diaEvaluacion}</td>
                <td>
                    <Button variant="warning" className="my-2" onClick={handleShow}>Eliminar</Button> 
                    <Button variant="primary" className="ms-2 my2"  onClick={EditarShow}>Editar</Button> 
                </td>
            </tr>
            <Modal show={show} onHide={handleClose}>

              <Modal.Header >
                <Modal.Title>Eliminación</Modal.Title>
              </Modal.Header>
              <Modal.Body>Estas seguro que deseas eliminar esta evaluación</Modal.Body>
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
                <Modal.Header >
                    <Modal.Title>Editar Evaluación</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal  show={showAlert} onHide={() => setShowAlert(false)} >
                  <Modal.Header style={{background:'#75b798'}}>
                    <Modal.Title>¡La evaluación se editó correctamente!</Modal.Title>
                  </Modal.Header>
                </Modal>
                <Modal  show={showAlertD} onHide={() => setShowAlertD(false)}>
                    <Modal.Header style={{background:'#ffc107'}}>
                        <Modal.Title>¡Hubo un error al editar la evaluación!</Modal.Title>
                    </Modal.Header>
                </Modal>
                <Modal.Body>
                    
                    <ListGroup className="">
                        <h4>Criterios a evaluar</h4>
                        {evaluacion.formularioEvaluacion.criterios.map((criterio,index) => (<div  key={index}>
                            <FloatingLabel className="mb-3" label={criterio.nombre.nombre}>
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
                            name={`criterios[${index}].nombre.nombre`} 
                            type="text"
                            value={criterio.nombre?._id} 
                            {...register(`criterios[${index}].nombre.nombre`)}
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
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditar}>
                        Cerrar edición
                    </Button>
                    <Button variant="primary" type="submit">
                        Editar evaluacion
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    )

}
export default PostEvaluacion;