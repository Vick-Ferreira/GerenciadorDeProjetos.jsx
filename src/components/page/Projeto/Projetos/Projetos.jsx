import React, { useEffect, useState } from 'react';
import Mensagem from '../../Layout/Mensagem/Mensagem';
import { useLocation } from 'react-router-dom';
import Container from '../../Layout/Container/Container';
import LinkButton from '../../Layout/LinkButton/LinkButton';
import styles from './Projetos.module.css';
import ProjetoTabela from '../Projeto_itens/ProjetoTabela';
import Loading from '../../Layout/Loading/Loading';

export default function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [removerLoad, setRemoverLoad] = useState(false);
  const [msgRemover, setMsgRemover] = useState();
  const localiza = useLocation();

  useEffect(() => {
    // Para ver o loading
    setTimeout(() =>
      fetch('http://localhost:5000/projetos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resp) => resp.json())
      .then((data) => {
        setProjetos(data);
        setRemoverLoad(true);
      })
      .catch(err => console.log(err)),
      200
    );
  }, []);

  // IMPORTANTE EXCLUIR
  function removerProjeto(id) {
    fetch(`http://localhost:5000/projetos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((resp) => resp.json())
    .then((data) => {
      setProjetos(projetos.filter((projeto) => projeto.id !== id));
      setMsgRemover('Projeto removido com sucesso!');
    })
    .catch(err => console.log(err));
  }

  return (
    <div className={styles.projeto_container}>
      <div className={styles.titulo_container}>
        <h1>Projetos Cadastrados</h1>
        <LinkButton to="/newprojeto" text="Criar Projeto" />
      </div>
      {localiza.state && <Mensagem type="sucesso" msg={localiza.state.mensagem} />}
      {msgRemover && <Mensagem type="sucesso" msg={msgRemover} />}

      <Container customClass="table_container">
        <table border="1" >
          <tr>
            <th>Projeto:</th>
            <th>Orçamento do projeto:</th>
            <th>Setor do projeto</th>
            <th>Opções</th>
          </tr>
          {projetos.map((projeto) => (
            <ProjetoTabela
              key={projeto.id}
              id={projeto.id}
              name={projeto.name}
              budget={projeto.budget}
              categorias={projeto.categoria ? projeto.categoria.name : "Categoria não definida"}
              handRemover={removerProjeto}
            />
          ))}
          {!removerLoad && <Loading />}
          {removerLoad && projetos.length === 0 && (
            <p>Não há projetos cadastrados</p>
          )}
        </table>
      </Container>
    </div>
  );
}
