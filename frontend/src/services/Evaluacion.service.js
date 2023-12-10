export const createEvaluacion = async() => {
    try {
        const response = await axios.post(`/evaluacion`, {
        
        });
        const { status } = response;
        if (status === 201) {
        return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}