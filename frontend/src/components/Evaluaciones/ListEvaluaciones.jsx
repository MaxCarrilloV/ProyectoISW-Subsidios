import React, {useEffect,useState} from "react";
import { getEvaluaciones } from "../../services/Evaluacion.service";
import { Stack} from "react-bootstrap";
import  PostEvaluacion  from "./PostEvaluacion";
import DataTable, { Direction }from 'react-data-table-component';

const ListEvaluaciones = () => {
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        getEvaluaciones().then((data) => {
            setEvaluaciones(data);
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
        { name: 'Decisión', selector: row=>row.decision, sortable: true, width: '200px' },
        { name: 'Postulante nombre', selector: row=>row.postulacion.postulante.nombre, sortable: true, width: '250px' },
        { name: 'Postulante RUT', selector: row=>row.postulacion.postulante.rut, sortable: true, width: '200px' },
        {
          name: 'Fecha de evaluación',
          selector: row=>row.fechaEvaluacion,
          sortable: true,
          format: (row) => formatFecha(row.fechaEvaluacion),
          width: '200px',
        },
        {
          name: 'Puntaje total',
          selector: row=>row.formularioEvaluacion.puntajeMax,
          sortable: true,
          width: '200px',
        },
        {
          name: 'Opciones',
          cell: (row) => <PostEvaluacion evaluacion={row} />,
          ignoreRowClick: true,
          allowoverflow: true,
          width: '200px',
        },
      ];
    const filteredEvaluaciones = evaluaciones?.filter((evaluacion) =>
    evaluacion.decision.toLowerCase().includes(searchText.toLowerCase()) ||
    evaluacion.postulante.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    evaluacion.postulante.rut.toLowerCase().includes(searchText.toLowerCase()) ||
    formatFecha(evaluacion.fechaEvaluacion).includes(searchText) ||
    evaluacion.puntajeMax.toString().includes(searchText) 
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
        <Stack className="container">
            <h1>Evaluaciones</h1>
            <DataTable
                columns={columns}
                noDataComponent={<CustomNoDataComponent />}
                data={filteredEvaluaciones}
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
                noHeader={false}
                subHeader
                subHeaderComponent={<SearchBox setSearchText={setSearchText} />}
                searchable
                
            />
        </Stack>
        
    );
}
const SearchBox = ({ setSearchText }) => (
    <input
      type="text"
      placeholder="Buscar..."
      onChange={(e) => setSearchText(e.target.value)}
      className="form-control w-25"
      
    />
  );

  
export default ListEvaluaciones;