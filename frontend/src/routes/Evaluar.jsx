import React from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getPostulacion } from "../services/postulaciones.service";
import { Button, ListGroup, Modal, Stack ,Spinner} from "react-bootstrap";
import  FormularioEvaluacion  from "../components/Evaluaciones/FormularioEvaluacion";


const Evaluar = () => {
    const { id } = useParams();
    const [postulacion, setPostulacion] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedDocumento, setSelectedDocumento] = useState(null);

    useEffect(() => {
        getPostulacion(id).then((data) => {
            setPostulacion(data);
            setLoading(false);
        });
    }, [id]);

    const fecha = new Date(postulacion.fechaSolicitud);
    let dia = fecha.getDate();
    dia = dia < 10 ? '0' + dia : dia;
    let mes = fecha.getMonth()+1;
    mes = mes < 10 ? '0' + mes : mes;
    const año = fecha.getFullYear();
    dia = dia + '/' + mes + '/' + año;

    let precio = "";
    if (postulacion.subsidio && postulacion.subsidio.mont) {
      precio = postulacion.subsidio.mont;
      
    }
    const precioFinal = precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    precio = "$" + precioFinal;

    let fechaNacimiento = "";
    if (postulacion.postulante && postulacion.postulante.fechaNacimiento) {
        fechaNacimiento = postulacion.postulante.fechaNacimiento;
    }

    fechaNacimiento = new Date(fechaNacimiento);
    let diaNacimiento = fechaNacimiento.getDate();
    diaNacimiento = diaNacimiento < 10 ? '0' + diaNacimiento : diaNacimiento;
    let mesNacimiento = fechaNacimiento.getMonth()+1;
    mesNacimiento = mesNacimiento < 10 ? '0' + mesNacimiento : mesNacimiento;
    const añoNacimiento = fechaNacimiento.getFullYear();
    diaNacimiento = diaNacimiento + '/' + mesNacimiento + '/' + añoNacimiento;

    const handleDocument = (documento) => {
        setSelectedDocumento(documento);
        setShowModal(true);
    }


    const handleHideModal = () => {
        setShowModal(false);
        setSelectedDocumento(null);
    };

    if (loading) {
        return <Spinner animation="border" />;;
    }

    return (
        <Stack className="container mt-5">
            <h1>Postulación a evaluar</h1>
            <ListGroup>
                <ListGroup.Item> <b>Estado: </b> {postulacion?.estado}</ListGroup.Item>
                <ListGroup.Item><b>Subsidio postulado: </b> {postulacion?.subsidio.name}</ListGroup.Item>
                <ListGroup.Item><b>Monto del subsidio: </b> {precio}</ListGroup.Item>
                <ListGroup.Item><b>Fecha de creación: </b> {dia}</ListGroup.Item>
                <ListGroup.Item><b>Postulante nombre: </b> {postulacion?.postulante.nombre}</ListGroup.Item>
                <ListGroup.Item><b>Postulante RUT: </b> {postulacion?.postulante.rut}</ListGroup.Item>
                <ListGroup.Item><b>Postulante fecha de nacimiento: </b> {diaNacimiento}</ListGroup.Item>
                <ListGroup.Item><b>Postulante correo electrónico: </b> {postulacion?.postulante.user.email}</ListGroup.Item>
                {postulacion.documentos.map((documento , index) => (
                    <ListGroup.Item key={index} as="li"
                    className="d-flex justify-content-between align-items-start">
                        <p><b>Documento {index+1}: </b> {documento} </p>
                        <Button onClick={e => handleDocument(documento)}>Ver documento</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Modal show={showModal} onHide={handleHideModal} size="xl">
                <Modal.Header closeButton>
                <Modal.Title>Visualizador de Documento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <iframe title="Visualizador de Documento" src={`http://146.83.198.35:1644/documentos/${selectedDocumento}`} width="100%" height="500px"  />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleHideModal}>
                    Cerrar
                </Button>
                </Modal.Footer>
            </Modal>
            <FormularioEvaluacion postulacion={postulacion}/>
        </Stack>
    );
}
export default Evaluar;