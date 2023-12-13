import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import PostEvaluador from './PostEvaluador';
import { getPostulaciones } from '../../services/postulaciones.service';
import { Button, Stack } from 'react-bootstrap';


const ListPostEvaluador = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [searchText, setSearchText] = useState('');


    useEffect(() => {
        getPostulaciones().then((data) => {
                setPostulaciones(data);   
        });
    }, []);
    
    const formatFecha = (fecha) => {
      const date = new Date(fecha);
      const dia = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      const mes = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const anio = date.getFullYear();
      return `${dia}-${mes}-${anio}`;
    };
    
    const columns = [
      { name: 'Estado', 
      selector: row => row.estado, 
      sortable: true,
       width: '210px' },
      { name: 'Subsidio', selector: row=> row.subsidio.name, sortable: true, width: '210px' },
      { name: 'Postulante', selector: row=>row.postulante.nombre, sortable: true, width: '210px' },
      { name: 'Rut', selector: row => row.postulante.rut, sortable: true, width: '210px' },
      {
        name: 'Fecha de creación',
        selector: row => row.fechaSolicitud,
        sortable: true,
        format: (row) => formatFecha(row.fechaSolicitud),
        width: '210px',
      },
      {
        name: 'Opciones',
        cell: (row) => <PostEvaluador postulacion={row} />,
        ignoreRowClick: true,
        width: '210px',
      },
    ];
  
    const filteredPostulaciones = postulaciones?.filter((postulacion) =>
    postulacion.estado.toLowerCase().includes(searchText.toLowerCase()) ||
    postulacion.subsidio.name.toLowerCase().includes(searchText.toLowerCase()) ||
    formatFecha(postulacion.fechaSolicitud).includes(searchText) ||
    postulacion.postulante.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    postulacion.postulante.rut.toLowerCase().includes(searchText.toLowerCase())
  );

  const CustomNoDataComponent = () => (
    <table>
      <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.selector || column.name} style={{ width: column.width }}>
                {column.name}
              </th>
            ))}
          </tr>
      </thead>
    </table>
  );
  
    return (
      <div className="container">
        <Stack direction="horizontal" className="mt-3" gap={3}>
        <h1 className='mt-2' >Postulaciones </h1>
        </Stack>
  
        <DataTable
           columns={columns}
           data={filteredPostulaciones}
           noDataComponent={<CustomNoDataComponent />}
           pagination
           highlightOnHover
           pointerOnHover
           paginationPerPage={10}
           paginationRowsPerPageOptions={[10, 25, 50, 100]}
           paginationComponentOptions={{
             rowsPerPageText: 'Filas por página:',
             rangeSeparatorText: 'de',
             noRowsPerPage: false,
             selectAllRowsItem: false,
             selectAllRowsItemText: 'Todos',
           }}
           subHeader
           responsive
           subHeaderComponent={<SearchBox setSearchText={setSearchText} />}
           searchable
 
        />
      </div>
    );
  };
  
  const SearchBox = ({ setSearchText }) => (
    <input
      type="text"
      placeholder="Buscar..."
      onChange={(e) => setSearchText(e.target.value)}
      className="form-control w-25"
      
    />
  );
export default ListPostEvaluador;