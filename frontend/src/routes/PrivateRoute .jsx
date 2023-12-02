import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const PrivateRoute  = ({ element, roles }) => {
 
  const user = JSON.parse(localStorage.getItem('user')) || '';
  const userHasAccess = roles.includes(user.roles.name) ;
  return userHasAccess ? element : <Navigate to='error' />;
};

export default PrivateRoute ;
