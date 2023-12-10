import React, {useEffect,useState} from "react";
import { getEvaluaciones } from "../../services/Evaluacion.service";
import { Table, Pagination , Stack} from "react-bootstrap";
import  PostEvaluacion  from "./PostEvaluacion";

const ListEvaluaciones = () => {
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [evaluacionesPerPage] = useState(10);
    const  indexOfLastEvaluacion = currentPage * evaluacionesPerPage;
    const  indexOfFirstEvaluacion = indexOfLastEvaluacion - evaluacionesPerPage;
    const  currentEvaluaciones = evaluaciones?.slice(indexOfFirstEvaluacion, indexOfLastEvaluacion);
    const totalPages = Math.ceil(evaluaciones?.length / evaluacionesPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
    const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        getEvaluaciones().then((data) => {
            setEvaluaciones(data);
        });
    }, []);
    return (
        <Stack className="container">
            <h1>Evaluaciones</h1>
            <Table bordered  striped="columns" className='mb-0 border-primary items-center'>
            <thead>
                <tr>
                    <th scope="col" >Decisión</th>
                    <th scope="col" >Postulante nombre</th>
                    <th scope="col" >Postulante RUT</th>
                    <th>Fecha de evaluación</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>
                {currentEvaluaciones?.map((evaluacion) => (
                    <tbody key={evaluacion._id}>
                        <PostEvaluacion evaluacion={evaluacion}/>
                    </tbody>
                ))}
            </Table>
            {totalPages > 1 && (
            <div className="pagination-container">
            <Pagination>
                <Pagination.Prev onClick={()=>handlePrevPage()} />
                {Array.from({ length: totalPages }).map((_, index) => (
                <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
                ))}
                <Pagination.Next onClick={() =>handleNextPage()} />
            </Pagination>
            </div>
        )}
        </Stack>
        
    );
}
export default ListEvaluaciones;