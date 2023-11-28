import React from 'react';
import { Link } from 'react-router-dom';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import styles from './ProjetoTabela.module.css';

export default function ProjetoTabela({ id, name, budget, categorias, handRemover }) {
  const remover = (e) => {
    e.preventDefault();
    handRemover(id); //passa para o component projetos para o METODO REMOVERPROJETO
  };

  return (
  
    <tr >
      <td className={styles.cabesalho}>{name}</td>
      <td className={styles.cabesalho}>R${budget}</td>
      <td className={styles.cabesalho}>{categorias}</td>
      <td className={styles.projeto_tabela_btn}>
        <Link to={`/projetoedit/${id}`}>
          <BsPencil />
        </Link>
        <button onClick={remover}>
          <BsFillTrashFill />
        </button>
      </td>
    </tr>
 
  );
}
