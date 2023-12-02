import React from "react";
import {  useAuth } from '../context/AuthContext';
import ListPostEvaluador from "../components/Postulaciones/ListPostEvaluador";
import ListPostPostulante from "../components/Postulaciones/ListPostPostulante";

function Postulaciones() {
  
  const { user } = useAuth();
  const role = user.roles.name;
  return (
        <div>
         {role === 'admin' ?(<ListPostEvaluador></ListPostEvaluador>) : (<ListPostPostulante user={user}></ListPostPostulante>)}
        </div>
            
  );
   

}

export default Postulaciones;