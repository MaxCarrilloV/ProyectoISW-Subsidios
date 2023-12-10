import { Button } from "react-bootstrap";


const PostEvaluador = ({ postulacion }) => {
  const fecha = new Date(postulacion.fechaSolicitud);
  let dia = fecha.getDate();
  dia = dia < 10 ? '0' + dia : dia;
  let mes = fecha.getMonth()+1;
  mes = mes < 10 ? '0' + mes : mes;
  const año = fecha.getFullYear();
  postulacion.fechaSolicitud = dia + '/' + mes + '/' + año;

  const evaluarLink = "/Postulaciones/Evaluar/" + postulacion._id;
    return (
      <>    
        <tr>
            <td  >{postulacion.estado}</td>
            <td> {postulacion.subsidio.name} </td>
            <td>{postulacion.postulante.nombre}</td>
            <td>{postulacion.postulante.rut}</td>
            <td> {postulacion.fechaSolicitud} </td>
           {postulacion.estado ==='Pendiente'? 
              (<td> <Button className="me-2" href={evaluarLink} >Evaluar</Button> </td>): 
              (<td> <Button disabled>Evaluar</Button> </td>) 
           } 
        </tr>
      </>
    );
  };
  
export default PostEvaluador;