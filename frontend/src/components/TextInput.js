import React from 'react';

/**
 * TextInput - Componente reutilizable para entradas de texto
 */
export const TextInput = ({ label, type, value, onChange, name }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>
        {label}
        <input
          style={{ marginLeft: '10px' }}
          type={type}
          value={value}
          onChange={onChange}
          name={name}
        />
      </label>
    </div>
  );
};
