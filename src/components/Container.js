import React from 'react';

/**
 * Container - Componente para centrar contenido
 */
export const Container = ({ children }) => {
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid gray', borderRadius: '10px' }}>
      {children}
    </div>
  );
};
