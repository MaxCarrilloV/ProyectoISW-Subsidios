import axios from './root.service';
export const createEvaluacion = async(formdata) => {
    try {
        const response = await axios.post(`/evaluacion`,formdata);
        console.log(response);
        const { status } = response;
        if (status === 201 && response){
            return true;
        }else{
            return false;
        }
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const getCriterios = async() => {
    try {
        const response = await axios.get(`/criterio`);
        const { status,data } = response;
        if (status === 200) {
             return data.data;
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getEvaluaciones = async() => {
    try {
        const response = await axios.get(`/evaluacion`);
        const { status,data } = response;
        if (status === 200) {
             return data.data;
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const updateEvaluacion = async(formdata,id) => {
    try {
        const response = await axios.put(`/evaluacion/${id}`,formdata);
        const { status } = response;
        if (status === 200) {
             return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const deleteEvaluacion = async(id) => {
    try {
        const response = await axios.delete(`/evaluacion/${id}`);
        const { status } = response;
        if (status === 200) {
             return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}