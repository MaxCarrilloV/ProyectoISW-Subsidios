import React from "react";
import {  useAuth } from '../context/AuthContext';

function Postulaciones() {
  
  const { user } = useAuth();
  
   return (
        <div>
          Postulaciones hola
        </div>
        
        
    );
   

}

export default Postulaciones;