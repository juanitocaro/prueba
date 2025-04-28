import React from 'react';

/**
 * Button - Componente reutilizable para botones
 */
export const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} style={{ padding: '5px 10px', marginTop: '10px' }}>
      {text}
    </button>
  );
};
