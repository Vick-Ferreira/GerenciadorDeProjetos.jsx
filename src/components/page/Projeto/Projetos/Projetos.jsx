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
  const [msgRemover, setMsgRemover] = useState('');
  const localiza = useLocation();

  useEffect(() => {
    const carregarProjetos = async () => {
      try {
        const response = await fetch("http://localhost:5000/projetos", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar projetos.");
        }

        const data = await response.json();
        setProjetos(data);
        setRemoverLoad(true);
      } catch (err) {
        console.error(err);
      }
    };

    carregarProjetos();
  }, []);

  const adicionarProjeto = (novoProjeto) => {
    setProjetos([...projetos, novoProjeto]);
  };

//IMPORTANTE EXCLUIR
function removerProjeto(id){

  fetch(`http://localhost:5000/projetos/${id}`, {
    method: 'DELETE',
    headers:{ //retorna algo
      'Content-Type': 'application/json'
    },
  }).then((resp) => resp.json())
    .then((data) => {
      setProjetos(projetos.filter((projeto) => projeto.id !== id))//com isso percorro cada um dos objetos e vejo qual tenho o ID que to excluindo (FRONT E BACK)
      setMsgRemover('Projeto removido com sucesso!')
    })
    .catch(err => console.log(err))
}


  return (
    <div className={styles.projeto_container}>
      <div className={styles.titulo_container}>
        <h1>Projetos Cadastrados</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {localiza.state && <Mensagem type="sucesso" msg={localiza.state.mensagem} />}
      {msgRemover && <Mensagem type="sucesso" msg={msgRemover} />}
      <Container customClass="table_container">
        <table border="1"  >
          <tr>
            <th>Projeto:</th>
            <th>Orçamento do projeto:</th>
            <th>Setor do projeto</th>
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
        </table>
        {!removerLoad && <Loading />}
        {removerLoad && projetos.length === 0 && (
          <p>Não há projetos cadastrados</p>
        )}
      </Container>
    </div>
  );
}
