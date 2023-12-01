import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ProjetoEdit.module.css';

import { BsPencil, BsXCircleFill, BsDatabaseFillAdd } from 'react-icons/bs';

import Container from '../../Layout/Container/Container';
import Loading from '../../Layout/Loading/Loading';
import ProjetoForm from '../Projeto_itens/ProjetoForm';
import Mensagem from '../../Layout/Mensagem/Mensagem';
import ServicoForm from '../../Servico/ServicoForm';
import ServicoCard from '../../Servico/ServicoCard';


export default function ProjetoEdit() {
  let { id } = useParams();

  const [projeto, setProjeto] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [showProjetoForm, setShowProjetoForm] = useState(false);
  const [showServicoForm, setShowServicoForm] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [type, setType] = useState('success');

  useEffect(() => {
    fetch(`https://json-qrcod.vercel.app/projetos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjeto(data);
        setServicos(data.servicos);
      });
  }, [id]);

  function editPost(projeto) {
    if (projeto.budget < projeto.cost) {
      setMensagem('Orçamento não pode ser menor que o custo do projeto!');
      setType('error');
      return false;
    }
  
    fetch(`https://json-qrcod.vercel.app/projetos/${projeto.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projeto),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Resposta do servidor:', data);
        setProjeto(data);
        setShowProjetoForm(!showProjetoForm);
        setMensagem('Projeto atualizado!');
        setType('success');
      
        setTimeout(() => {
          setMensagem('');
        }, 3000);
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error.message);
        setMensagem('Erro ao atualizar o projeto. Verifique o console para mais detalhes.');
        setType('error');
      });
  }

  function criarServico(projeto) {
    // last service
    const lastService = projeto.servicos[projeto.servicos.length - 1];
    lastService.id = uuidv4();
  
    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(projeto.cost) + parseFloat(lastServiceCost);
  
    // maximum value validation
    if (newCost > parseFloat(projeto.budget)) {
      setMensagem('Orçamento ultrapassado, verifique o valor do serviço!');
      setType('erro');
  
      setTimeout(() => {
        setMensagem('');
      }, 3000);
  
      projeto.servicos.pop();
      return false;
    }
  
    // Atualiza o custo total do projeto
    projeto.cost = newCost;
  
    // Atualiza o projeto no servidor parcialmente (apenas o custo e a lista de serviços)
    fetch(`https://json-qrcod.vercel.app/projetos/${projeto.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projeto),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Resposta do servidor:', data);
        console.log('Antes de setServicos:', projeto.servicos);
        
        setServicos(data.servicos);
  
        console.log('Depois de setServicos:', data.servicos);
        
        setShowServicoForm(!showServicoForm);
        setMensagem('Serviço adicionado');
        setType('sucesso');
  
        // Limpar a mensagem após 3 segundos (3000 milissegundos)
        setTimeout(() => {
          setMensagem('');
        }, 3000);
      })
      .catch((err) => {
        console.error('Erro ao atualizar o projeto:', err);
        // Lide com o erro conforme necessário
      });
  };
  

  function removerServico(id, cost) {
    const servicosUpdate = projeto.servicos.filter(
      (servico) => servico.id !== id,
    );
  
    const projetoUpdate = projeto;
    projetoUpdate.servicos = servicosUpdate;
    projetoUpdate.cost = parseFloat(projetoUpdate.cost) - parseFloat(cost);
  
    fetch(`https://json-qrcod.vercel.app/projetos/${projetoUpdate.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projetoUpdate),
    })
    .then((resp) => {
      console.log(resp); // Adicione esta linha para verificar a resposta servidor
      return resp.json();
    })
    .then((data) => {
      setProjeto(projetoUpdate);
      setServicos(servicosUpdate);
      setMensagem('Serviço removido com sucesso!');
      setType('erro');
  
      setTimeout(() => {
        setMensagem('');
      }, 3000);
    })
    .catch((error) => {
      console.error('Erro na requisição para a API:', error);
      // Adicione lógica para lidar com o erro, como exibir uma mensagem de erro
    });
  }
  function toggleProjetoForms() {
    setShowProjetoForm((prev) => !prev);
  }

  function toggleServicoForm() {
    setShowServicoForm((prev) => !prev);
  }


  return (
    <>
      {projeto.name ? (
        <div className={styles.projeto_detalhes}>
          <Container customClass="column">
            {mensagem && <Mensagem type={type} msg={mensagem} />}
            <div className={styles.detalhes_container}>
              <h1>Projeto: {projeto.name}</h1>
              <button className={styles.btn} onClick={toggleProjetoForms}>
                {!showProjetoForm ? (
                  <>
                    <BsPencil />
                  </>
                ) : (
                  <>
                    <BsXCircleFill />
                  </>
                )}
              </button>
              {!showProjetoForm ? (
                <div className={styles.divCategory}>
                  <p>
                    <span className={styles.categoria}>Categoria:</span>
                    {projeto.categoria.name}
                  </p>
                  <p>
                    <span className={styles.orcamento}>Total de orçamento:</span> R${projeto.budget}
                  </p>
                  <p>
                    <span className={styles.utilizado}>Total utilizado:</span> R${projeto.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.form}>
                  <ProjetoForm
                    handleSubmit={editPost}
                    btntext="Concluir edição"
                    ProjetoData={projeto}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form}>
              <h1>Adicione um serviço:</h1>
              <button className={styles.btn} onClick={toggleServicoForm}>
                {!showServicoForm ? (
                  <>
                    <BsDatabaseFillAdd />
                  </>
                ) : (
                  <>
                    <BsXCircleFill />
                  </>
                )}
              </button>
              <div className={styles.form}>
                {showServicoForm && (
                  <ServicoForm
                    handleSubmit={criarServico}
                    btntext="Adicionar serviço"
                    ProjetoData={projeto}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
          
              {servicos.length > 0  &&
              servicos.map((servico) => (
                <ServicoCard
                  id={servico.id}
                  name={servico.name}
                  cost={servico.cost}
                  descricao={servico.descricao}
                  key={servico.id}
                  handleRemove ={removerServico}
                />
              ))
              }
             
              {servicos.length === 0 && <p>Não há serviços cadastrados.</p>}

          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
