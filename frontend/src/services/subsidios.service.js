import axios from './root.service';

export const getSubsidios = async () => {
  try {
    const response = await axios.get('/subsidios');
    const { status, data } = response;
    if (status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};