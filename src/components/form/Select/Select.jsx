import React from 'react';
import styles from './Select.module.css'
//input 100% dinamico
export default function Select({ text, name, options,  hand, value}) {//propriedades
return (
    <div className={styles.form_control}>
        <label htmlFor={name}>{text}:</label>
        <select> name={name}  id={name} onChange={hand} value={value || ""} {/*serve para edição*/}
        <option>Selecione uma ação</option>
        {options.map((option) => ( //nome item   / usando map para passar pelos itemns que recebermos pela option
        <option value={option.id} key={option.id}>
            {option.name}
            </option>
        //value é o ID para o servidor
        //option name é para o USER
        ))}
        </select>
    </div>
    );
}
