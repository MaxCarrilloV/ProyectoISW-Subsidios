import { useState, useEffect } from 'react';
import { getPostulaciones  } from '../../services/postulaciones.service';
import PostEvaluador from './PostEvaluador';
import { Table, Pagination } from "react-bootstrap";

const ListPostEvaluador = () => {
    const [postulaciones, setPostulaciones] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postulacionesPerPage] = useState(10);
    const indexOfLastPost = currentPage * postulacionesPerPage;
    const indexOfFirstPost = indexOfLastPost - postulacionesPerPage;
    const currentPostulaciones = postulaciones.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(postulaciones.length / postulacionesPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    useEffect(() => {
        getPostulaciones().then((data) => {
                const postulacionesOrdenadas = ordenarPostulaciones(data);
                setPostulaciones(postulacionesOrdenadas);   
        });
    }, []);
    
    const ordenarPostulaciones = (data) => {
        console.log(data);
        const ordenEstado = {
          Pendiente: 1,
          Rechazada: 3,
          Aprobada: 2,
        };
    
        return [...data].sort((a, b) => ordenEstado[a.estado] - ordenEstado[b.estado]);
    };


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
    
    return (
        <div className="container">
        <h1 className='mt-2' >Postulaciones </h1>
        
        <Table  bordered  striped="columns" className='mb-0 border-primary items-center'>
            <thead>
                <tr>
                    <th scope="col" >Estado</th>
                    <th scope="col" >Subsidio</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>
            {currentPostulaciones.map((postulacion) => (
                <tbody key={postulacion._id}>
                    <PostEvaluador postulacion={postulacion} />
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
            
        </div>
    );
}
export default ListPostEvaluador;