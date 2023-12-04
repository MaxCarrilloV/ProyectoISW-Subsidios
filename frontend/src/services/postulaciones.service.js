import axios from './root.service';

export const getPostulaciones = async () => {
  try {
    const response = await axios.get('/postulacion');
    const { status, data } = response;
    if (status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const CreatePostulacion = async ({user,nombre,rut,fechaNacimiento,direccion,subsidio,documentos}) => {
  try {
    const responsePost = await axios.post('/postulante', {
      user,
      nombre,
      rut,
      fechaNacimiento,
      direccion,
    });
    
    const { status,data }  = responsePost;
    const postulante = data.data._id;
    if ( status === 201) {
        let formData = new FormData();
        formData.append('postulante', postulante);
        formData.append('subsidio', subsidio);
        for (const e of documentos) { 
          formData.append('documentos', e, e.name);
       }
        
       
        const response = await axios.post('/postulacion', formData,{
          headers: {
            'Content-Type': 'multipart/form-data;boundary=<calculated when request is sent>',
            
          },
        });
        const { status } = response;
        if (status === 201) {
          console.log('Postulacion creada');
        }
      
      
      
    }
  } catch (error) {
    console.log(error);
  }
};