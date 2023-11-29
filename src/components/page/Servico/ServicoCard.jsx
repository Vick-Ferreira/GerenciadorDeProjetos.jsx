import React from 'react';
import { Link } from 'react-router-dom';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import styles from '../Servico/ServicoCard.module.css';

export default function ServicoCard({ id, name, cost, descricao, handleRemove }) {

  const remover = (e) => {
    e.preventDefault()
    handleRemove(id, cost)

  }

  return (
  <div  className={styles.card_Pai}>
    
    <div className={styles.card}>
      <p>Serviço:{name}</p>
      <p>R${cost}</p> 
     </div>

      <div>
      <h1>{descricao}</h1>
      </div>
      
        <Link to={`/projetoedit/${id}`}>
          <BsPencil />
        </Link>
        <button onClick={remover}> {/*AO CLICAR,cham const, que chama PROPS , que CHAMA O METODO LA DO PROJETOEDIT */}
          <BsFillTrashFill />
        </button>

    </div>
  );
}