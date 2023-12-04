import React, { useState } from 'react';

const Alerta = ({ mensaje, tipo, onClose }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    show && (
      <div className={`alert alert-${tipo} alert-dismissible fade show`} role="alert">
        {mensaje}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={handleClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  );
};

export default Alerta;