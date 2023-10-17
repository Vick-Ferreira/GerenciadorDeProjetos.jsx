import React, { useEffect, useState } from 'react';
import styles from './Mensagem.module.css'


export default function Mensagem({type, msg}) { 
     //ao mensagem vão receber um tipo e a prorpia mensagem e esta informação vira do component dinamicament projetos.jsx
    
    //alterando a visibilidade dependendo a condição

        const [visible, setVisible] = useState(false)
      
        useEffect(() => {
            console.log("msg:", msg);
            console.log("visible:", visible);
          
            if (!msg) {
              setVisible(false);
              return;
            }
          
            setVisible(true);
          
            const timer = setTimeout(() => {
              setVisible(false);
            }, 3000);
          
            return () => clearTimeout(timer);
          }, [msg]);
        return (
            <>
              {visible && (
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
              )}
            </>
          );

              }