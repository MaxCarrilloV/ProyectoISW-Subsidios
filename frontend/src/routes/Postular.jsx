import React, { useEffect, useState } from 'react';
import { Button, Form, Stack, Modal } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import {CreatePostulacion} from '../services/postulaciones.service';
import { useAuth } from '../context/AuthContext';
import { getSubsidios } from '../services/subsidios.service';




function Postular() {
    const { user } = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertD, setShowAlertD] = useState(false);

    const [subsidios, setSubsidios] = useState([]);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: {
          nombre: '',
          rut: '',
          fechaNacimiento: '',
          direccion: '',
          subsidio: '',
          documentos: [{}],
        },
      });


    const onSubmit = async (data) => {
        data.documentos = [
            ...(data.documentos1 || []),
            ...(data.documentos2 || []),
            ...(data.documentos3 || []),
        ];
        delete data.documentos1;
        delete data.documentos2;
        delete data.documentos3;
        const  enviado = await CreatePostulacion(data)
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
    
    return (
        <Stack  style={{margin:'2rem 10vw'}}>
            <h1 className="mb-3" >Postulación a subsidio</h1>

            <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" >
                <Form.Group className="mb-3"  controlId="formBasicEmail">
                    <Form.Control  name="user" hidden type="text" value={user.id} {...register('user', { required: true })} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control  name="nombre" type="text" placeholder='Nombre' {...register('nombre', { required: true })} />
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
                <Form.Group className="mb-3">
                    <Form.Label>Registro social de hogares</Form.Label>
                    <Form.Control
                        type="file"
                        name="documentos1"
                        accept='.pdf'
                        isInvalid={errors.documentos}
                        {...register('documentos1',{ required: true,validate: value => {
                            if(value && value[0].type === 'application/pdf')
                            return value;
                          }})}
                    />
                    <Form.Control.Feedback type="invalid">
                    Ingresa un archivo con extension .PDF
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Certificado de cotizaciones</Form.Label>
                    <Form.Control
                        type="file"
                        name="documentos2"
                        accept='.pdf'
                        isInvalid={errors.documentos}
                        {...register('documentos2',{required: true,validate: value => {
                            if(value && value[0].type === 'application/pdf')
                            return value;
                          }})}
                    />
                    <Form.Control.Feedback type="invalid">
                    Ingresa un archivo con extension .PDF
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Certificado de Enfermedad</Form.Label>
                    <Form.Control
                        type="file"
                        name="documentos3"
                        accept='.pdf'
                        isInvalid={errors.documentos}
                        
                        {...register('documentos3',{validate: value => {
                             if(value ==='') return value[0].type === 'application/pdf' || 'Por favor, selecciona un archivo PDF.';
                          }})}
                    />
                    <Form.Text>No es necesario ingresar un archivo </Form.Text>
                    <Form.Control.Feedback type="invalid">
                    Ingresa un archivo con extension .PDF
                    </Form.Control.Feedback>
                </Form.Group>
                <Modal  show={showAlert} onHide={() => setShowAlert(false)} >
                    <Modal.Header style={{background:'#75b798'}} closeButton>
                        <Modal.Title>¡La postulacion se envió correctamente!</Modal.Title>
                    </Modal.Header>
                </Modal>
                <Modal show={showAlertD} onHide={() => setShowAlertD(false)}>
                    <Modal.Header style={{background:'#ffc107'}} closeButton>
                        <Modal.Title>¡Hubo un error en enviar la postulación, Complete y envie nuevamente la postulación!</Modal.Title>
                    </Modal.Header>
                </Modal>
                <Form.Group   className='d-flex justify-content-center '>
                    <Button type="submit" className='px-5'>  Enviar postulación </Button>
                </Form.Group>

            </Form>
           
        </Stack>
    );
}
export default Postular;