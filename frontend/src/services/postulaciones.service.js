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