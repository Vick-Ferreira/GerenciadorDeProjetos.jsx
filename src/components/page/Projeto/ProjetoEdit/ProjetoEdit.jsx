import { parse, v4 as uuidv4 } from 'uuid'  //cria ID unico

import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom'




import styles from './ProjetoEdit.module.css'


import { BsPencil, BsXCircleFill, BsDatabaseFillAdd} from 'react-icons/bs'


import Container from   '../../Layout/Container/Container'
import Loading from '../../Layout/Loading/Loading'
import ProjetoForm  from '../Projeto_itens/ProjetoForm';
import Mensagem from '../../Layout/Mensagem/Mensagem'
import ServicoForm from '../../../servico/ServicoForm';


export default function ProjetoEdit() {//Resgatando os dados do banco para fazer a impressão dinâmica vem o id pela URL, vamos pegar esse ID usando uma HOOK 
  
  let {id} = useParams() //impressão do ID da URL no console 
 // console.log(id)//esse id é referente a qual projeto estamos trazendo para essa pagina 

 const [projeto, setProjeto] = useState({});  //useState = controlar stado
  const [servicos, setServicos] = useState([])

  const[showProjetoForm, setShowProjetoForm] = useState (false)//ESTADO DE EXIBIR E ESCONDER
  const[showServicoForm, setShowServicoForm] = useState (false)

  const [mensagem, setMensagem] = useState ('')
  const[ type, setType] = useState('success')


  //IMPORTANTE  CAPTURANDO DADOS E ID E LISTANDO forma dinâmica 
  useEffect(() => { //evita atualizar antes de renderizar
    setTimeout(() => {
    fetch(`http://localhost:5000/projetos/${id}`, {
      method: 'GET', //LISTAR-PUXAR-CAPTURAR-TRAZER
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => resp.json())//transforma em json os dados capturados na URL 
      .then((data) => {//FAZ ALGO COM OS DADOS
        setProjeto(data)//dado resgatado no banco no parametro da URL
      })
      .catch(err => console.log)
   }, 500 )
  }, [id])//paramentro ID

  //IMPORTANTE EDITAR
  function editPost (projeto) {
    setMensagem('')
    if(projeto.budget < projeto.cost) { //orçamento menor que o cursto do projeto
      setMensagem("Orçamento não pode ser menor que o custo do projeto!")
      setType("error")
      return false //não atualiza nada
    }
    fetch(`http://localhost:5000/projetos/${projeto.id}`, {
      method:'PATCH',//SÓ ALTERA O QUE REALMENTE MUDAR
      headers: {//se comunica por json com a API
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(projeto),//mandando como text
    })
    .then((resp) => resp.json())
    .then((data) => {
      setProjeto(data)
      setShowProjetoForm(false) //esconder formulario apos temrinar a edição
      setMensagem("Projeto atualizado!")
      setType("sucesso")
    })
    .catch(err => console.log(err))
  }

  //UPDATE DE PROJETO add serviços
  function criarServico(projeto) {
    const lastService = projeto.servicos[projeto.servicos.length - 1];
  
    // Verifique se o custo do último serviço está definido e é um número antes de usá-lo.
    if (lastService.cost && !isNaN(lastService.cost)) {
      const lastServiceCost = parseFloat(lastService.cost);
      const newCost = parseFloat(projeto.cost) + lastServiceCost;
  
      if (newCost > parseFloat(projeto.budget)) {
        setMensagem('Orçamento ultrapassado, verifique o valor do serviço!');
        setType('error');
        projeto.servicos.pop();
      } else {
        projeto.cost = newCost;
  
        // Continue com a atualização do projeto, incluindo o custo atualizado.
        // ...
      }
    } else {
      // Lida com o caso em que o custo do serviço não está definido.
      setMensagem('Custo do serviço não definido!');
      setType('error');
      projeto.servicos.pop();
    }
  
    // Resto do código...
  }
  function toggleProjetoForms(){
  //TROCA ESTADO
  setShowProjetoForm(!showProjetoForm)//NEGATIVO se tiver FALSE vira TRUE  e ao contrario também
  }
  function toggleServicoForm(){
    //trocar stado
    setShowServicoForm(!showServicoForm)//NEGATIVO se tiver FALSE vira TRUE  e ao contrario também
    }

  return (
    <>
    {projeto.name ? (
    <div className={styles.projeto_detalhes}>
      <Container customClass="column">
          {/*PROJETO */}
        {mensagem && <Mensagem type={type} msg={mensagem}/>}
        <div className={styles.detalhes_container}>
            <h1>Projeto:{projeto.name}</h1>
            <button className={styles.btn} onClick={toggleProjetoForms}>
            {!showProjetoForm ? (
              <>
              <BsPencil/>
              </>
              ) : (
              <>
              <BsXCircleFill/>
              </>
              )}
              </button>
            {!showProjetoForm ? (
            <div>
              <p>{/*VEM NO STATUS EDITAR PROJETO */}
              <span>Categoria:</span>{projeto.categoria.name}
              </p>
              <p>
                <span>Total de orçamento:</span>R${projeto.budget}
              </p>
              <p>
                <span>Total utilizado:</span>R${projeto.cost}
              </p>
            
            </div>
          ) : (
            <div  className={styles.form} >
              <ProjetoForm 
              handleSubmit={editPost} 
              btntext="Concluir edição" 
              ProjetoData={projeto}
              />
            </div>
          )}
        </div>


       {/*SERVIÇO */}
        <div className={styles.service_form}> 
        <h1>Adicione um serviço:</h1>
        <button className={styles.btn} onClick={ toggleServicoForm}>
            {! showServicoForm ? (
              <>
              <BsDatabaseFillAdd/>
              </>
              ) : (
              <>
              <BsXCircleFill/>
              </>
              )}
        </button>
        <div  className={styles.form} >
          {showServicoForm && (  //se o show estiver habilitado a gente exibe o formservico
            <ServicoForm
            handleSubmit={criarServico}
            btntext="Add servico"
            ProjetoData={projeto}
            />
          )}
        </div>
        </div>
          <h2>Serviços</h2>
         
          </Container>
        
      
      
    </div>
    ) : (
      <Loading/>
    )}
    </>
  );
}
