import { useState, useEffect } from 'react';
import { getPostulaciones  } from '../../services/postulaciones.service';
import PostPostulante from './PostPostulante';
import { Table, Pagination, Button, Stack } from "react-bootstrap";

const ListPostPostulante = ({user}) => {
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
            if(data) 
            for(let i=0; i<data.length; i++) {
              let postulante = data[i].postulante;
              let userid = postulante.user;
                if(user.id === userid){
                    const postulacionesOrdenadas = ordenarPostulaciones(data);
                    setPostulaciones(postulacionesOrdenadas);   
                }
            }
        });
    }, []);
    
    const ordenarPostulaciones = (data) => {
        const ordenEstado = {
          Pendiente: 3,
          Rechazada: 2,
          Aprobada: 1,
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
        <Stack direction="horizontal" className='mt-3' gap={3}>
            <h1 >Postulaciones Realizadas</h1>
            <Button className="p-2 ms-auto" href='Postular' >Postular a subsidio</Button>
        </Stack>
        <Table  bordered  striped="columns" className='mb-0 border-primary items-center'>
            <thead>
                <tr>
                    <th scope="col" >Estado</th>
                    <th scope="col" >Subsidio</th>
                    <th>Fecha de envió</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>
            {currentPostulaciones.map((postulacion) => (
                <tbody key={postulacion._id}>
                    <PostPostulante postulacion={postulacion} />
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
export default ListPostPostulante;