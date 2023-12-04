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
          return true;
        }
      
      
      
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deletePostulacion = async (id,idPostulante) => {
  try {
  
    const response = await axios.delete(`/postulacion/${id}`);
    const responsepostulante = await axios.delete(`/postulante/${idPostulante}`);
    const { status } = response;
    const { statuspostulante } = responsepostulante;
    if (status === 200 && statuspostulante === 200) {
      console.log('Postulacion eliminada');
    }
  } catch (error) {
    console.log(error);
  }
}

export const updatePostulacion = async ({user,postulacion,postulante,nombre,rut,fechaNacimiento,direccion,subsidio,documentos}) => {
  try {
    const responsePost = await axios.put(`/postulante/${postulante}`, {
      user,
      nombre,
      rut,
      fechaNacimiento,
      direccion,
    });
    const { status } = responsePost;
    if (status === 200) {
      let formData = new FormData();
      formData.append('postulante', postulante);
      formData.append('subsidio', subsidio);
      const response = await axios.put(`/postulacion/${postulacion}`, formData);
      const { status } = response;
      if (status === 200) {
        return true;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}