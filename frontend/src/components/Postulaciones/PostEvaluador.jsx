import { Button } from "react-bootstrap";

const PostEvaluador = ({ postulacion }) => {
    return (
      <>    
        <tr>
            <td  >{postulacion.estado}</td>
            <td> {postulacion.subsidio.name} </td>
           {postulacion.estado ==='Pendiente'? 
              (<td> <Button className="me-2" href="/Evaluar" >Evaluar</Button> </td>): 
              (<td> <Button href="/Evaluacion" >Ver Evaluación</Button> </td>) 
           } 
        </tr>
      </>
    );
  };
  
export default PostEvaluador;