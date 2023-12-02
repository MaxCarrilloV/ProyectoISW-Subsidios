import { Button } from "react-bootstrap";

const PostPostulante = ({ postulacion }) => {
    return (
      <>    
        <tr>
            <td  >{postulacion.estado}</td>
            <td> {postulacion.subsidio.name} </td>
            <td> <Button>Eliminar</Button> </td>
            
        </tr>
      </>
    );
  };
  
export default PostPostulante;