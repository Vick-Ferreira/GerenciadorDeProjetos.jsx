import React from 'react';
import styles from './Select.module.css';

export default function Select({ text, name, options, handleOnChange, value }) {
  // Adicione uma verificação para garantir que 'options' seja um array antes de mapear
  const optionsArray = Array.isArray(options) ? options : [];

  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ''}
      >
        <option>Selecione uma opção</option>
        {optionsArray.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
