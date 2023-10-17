import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Container from   '../Layout/Container/Container'
import styles from './ProjetoEdit.module.css'



import Loading from '../Layout/Loading/Loading'
import ProjetoForm  from '../.././Projeto_itens/ProjetoForm';
import Mensagem from '../Layout/Mensagem/Mensagem'


export default function ProjetoEdit() {//Resgatando os dados do banco para fazer a impressão dinâmica vem o id pela URL, vamos pegar esse ID usando uma HOOK 
  
  const {id} = useParams() //impressão do ID da URL no console 
 // console.log(id)//esse id é referente a qual projeto estamos trazendo para essa pagina 

  const [projeto, setProjeto] = useState ([])  //useState = controlar stado
  const[showProjetoForm, setShowProjetoForm] = useState (false)
  const [mensagem, setMensagem] = useState ()
  const[ type, setType] = useState()


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

  function toggleProjetoForms(){
  //trocar stado
  setShowProjetoForm(!showProjetoForm)//NEGATIVO se tiver FALSE vira TRUE  e ao contrario também
  }

  return (
    <>
    {projeto.name ? (
    <div className={styles.projetoDetalhe}>
      <Container customClass="column">
        {mensagem && <Mensagem type={type} msg={mensagem}/>}
        <div className={styles.deletarContainer}>
          <div>
            <h1>Projeto{projeto.name}</h1>
            <button className={styles.btn} onClick={toggleProjetoForms}>{!showProjetoForm ? "editar projeto" : "Fechar "}</button>{/*SE (verifica statis )showProjetoFroms  ENTÃO ? "" E SE NÃO : "" */}
            {!showProjetoForm ? (
            <div>
              <p>{/*VEM NO STATUS EDITAR PROJETO */}
              <span>Categoria:</span>{projeto.categoria}
              </p>
              <p>
                <span>Total de orçamento:</span>R${projeto.budget}
              </p>
              <p>
                <span>Total utilizado:</span>R${projeto.cost}
              </p>
            </div>
          ) : (
            <div  className={styles.projetoInfo} >
              <ProjetoForm 
              handleSubmit={editPost} 
              btntext="Concluir edição" 
              ProjetoData={projeto}
              />
            </div>
          )}
          </div>
        </div>
      </Container>
    </div>
    ) : (
      <Loading/>
    )}
    </>
  );
}
