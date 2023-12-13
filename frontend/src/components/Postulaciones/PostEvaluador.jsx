import { Button } from "react-bootstrap";


const PostEvaluador = ({ postulacion }) => {
  

  const evaluarLink = "/Postulaciones/Evaluar/" + postulacion._id;
    return (
      <table>
        <tbody>    
          <tr>
            {postulacion.estado ==='Pendiente'? 
                (<td> <Button  href={evaluarLink} >Evaluar</Button> </td>): 
                (<td> <Button  disabled>Evaluar</Button> </td>) 
            } 
          </tr>
        </tbody>
      </table>
    );
  };
  
export default PostEvaluador;