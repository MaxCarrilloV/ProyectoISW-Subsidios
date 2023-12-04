import { Button } from "react-bootstrap";

const PostEvaluador = ({ postulacion }) => {
  const fecha = new Date(postulacion.fechaSolicitud);
  let dia = fecha.getDate();
  dia = dia < 10 ? '0' + dia : dia;
  const mes = fecha.getMonth()+1;
  const año = fecha.getFullYear();
  postulacion.fechaSolicitud = dia + '/' + mes + '/' + año;
    return (
      <>    
        <tr>
            <td  >{postulacion.estado}</td>
            <td> {postulacion.subsidio.name} </td>
            <td> {postulacion.fechaSolicitud} </td>
           {postulacion.estado ==='Pendiente'? 
              (<td> <Button className="me-2" href="/Evaluar" >Evaluar</Button> </td>): 
              (<td> <Button href="/Evaluacion" >Ver Evaluación</Button> </td>) 
           } 
        </tr>
      </>
    );
  };
  
export default PostEvaluador;