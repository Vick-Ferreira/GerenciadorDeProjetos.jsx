import React, { useEffect, useState } from 'react';
import Mensagem from '../Layout/Mensagem/Mensagem';
import { useLocation } from 'react-router-dom';
import Container from '../Layout/Container/Container'
import LinkButton from  '../Layout/LinkButton/LinkButton'
import styles from './Projetos.module.css'
import ProjetoCard from '../../Projeto_itens/ProjetoCard';
import Loading from '../Layout/Loading/Loading'




export default function Projetos() {

   //state para salvar os projetos
  const [projetos, setProjetos] = useState([])
  const [removerLoad, setRemoverLoad] = useState(false)//false sempre vai INICIAR true REMOVER
  const [msgRemover, setMsgRemover] = useState('')  //chamada quando processo é finalizado



  const localiza = useLocation() //consigo resgatar o valor que está saindo do NewProject para esse hoke
  console.log(localiza.state);  //esse está aparecendo no console
  let mensagem = ""
  if(localiza.state) {
    mensagem = localiza.state.mensagem
    console.log(mensagem) //este está como undefined 
  }



//IMPORTANTE LISTA, busca os projetos da API e defini no estado projetos)
  useEffect(() => {
    setTimeout(() => {
      
    fetch("http://localhost:5000/projetos", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(resp => resp.json())
    .then(data => {
      console.log(data)
      setProjetos(data)//setar meus projetos por meio da API
      setRemoverLoad(true)
    })
    .catch((err) => console.log(err))
  }, 300);
}, [])

//IMPORTANTE EXCLUIR
function removerProjeto(id){

  fetch(`http://localhost:5000/projetos/${id}`, {
    method: 'DELETE',
    headers:{ //retorna algo
      'Content-Type': 'application/json'
    },
  }).then(resp => resp.json())
    .then(data => {
      setProjetos(projetos.filter((projeto) => projeto.id !== id))//com isso percorro cada um dos objetos e vejo qual tenho o ID que to excluindo (FRONT E BACK)
      setMsgRemover('Projeto removido com sucesso!')
    })
    .catch(err => console.log(err))
}





  return (
    <div className={styles.projeto_container}>
      <div className={styles.titulo_container}>  

        <h1>Projeto Funcionando </h1>
        <LinkButton to="/newproject" text="Criar Projeto"/>
      </div>
      {mensagem && <Mensagem type="sucesso" msg={mensagem}/>}{/*o typo defique que modo a mensagem vai ser impresa, no caso qual classe ira ser usanda na mensagem */}
      {msgRemover && <Mensagem type="sucesso" msg={msgRemover}/>}



    
       {/*mapeando os projetos e renderizando um ProjetoCard para cada projeto */}
      <Container customClass="start">  {/*Exibe se tiver dados(PROPS) */}
      {projetos.length > 0 &&
        projetos.map((projeto) => (
        <ProjetoCard 
        id={projeto.id}
        name={projeto.name}
        budget={projeto.budget}
        categoria={projeto.categoria}
        key={projeto.id}
        handRemover={removerProjeto} 
        /> ))}



        {!removerLoad && <Loading/>}
        {removerLoad && projetos.length === 0 && (//quando eu não tiver projeto 
          <p>Não há projetos cadastrados</p>
        )}
      </Container>
    </div>
  );
}