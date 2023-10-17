import React from 'react';
import styles from '../Input/Input.module.css'
//input 100% dinamico
export default function Input({type, text, name, placeholder, hand, value}) {//propriedades
return (
    <div className={styles.form_control}>
        <label htmlFor={name}>{text}</label>
        <input 
        type={type} //acessando propriedades (danimica)
        name={name} 
        id={name} 
        placeholder={placeholder} 
        onChange={hand}//está esperando
        value={value}/>
    </div>
    );
}
