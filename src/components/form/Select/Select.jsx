import React from 'react';
import styles from './Select.module.css'
//input 100% dinamico
export default function Select({ text, name, options,  hand, value}) {//propriedades
return (
    <div className={styles.form_control}>
    <label htmlFor={name}>{text}:</label>
    <select
      name={name}
      id={name}
      onChange={hand}
      value={value || ''}
    >
      <option>Selecione uma opção</option>
      {options.map((options) => (
        <option value={options.id} key={options.id}>
          {options.name}
        </option>
      ))}
    </select>
  </div>
)
}
