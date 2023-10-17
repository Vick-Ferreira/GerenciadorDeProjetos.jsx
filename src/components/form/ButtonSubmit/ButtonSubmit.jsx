import React from 'react';
import styles from './ButtonSubmit.module.css'
//input 100% dinamico
export default function ButtonSubmit({text}) {//propriedades
return (
    <div>
        <button className={styles.btn}>{text}</button>
    </div>
    );
}
