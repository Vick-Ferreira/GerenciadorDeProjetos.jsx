import { useEffect, useState } from 'react';

import React from 'react';
import styles from './ProjetoForm.module.css'
import Input from '../form/Input/Input';
import Select from '../form/Select/Select';
import ButtonSubmit from '../form/ButtonSubmit/ButtonSubmit';



export default function ProjectForm({ handleSubmit, btntext, ProjetoData}) { // Vindo do componente pai
  //vendo se os dados estão chenado -  vindo do form edição
  const [projeto, setProjeto] = useState(ProjetoData || {})
  const [categorias, setCategorias] = useState([])//setamos o array vazio aqui para receber a resposta que ira ver da nossa API (.then)

  

  //uma só vez ao CHAMA AO MONTAR
  useEffect(() => {
      //REQUEST PARA A API
    fetch("http://localhost:5000/categorias", {
    method: "GET",
    headers: {
      'Content-Type': 'aplication/json'
    },//retorna json
  })
    .then((resp) => resp.json())//pegndo a resposta e transformando em json
    .then((data) => {  
    setCategorias(data)//pegando os dados em json e tranferindo para meu HOOK setCategorias (onde era um array vazio vai receber os dados da API)
  })
  .catch((err) => console.log(err))
}, [])

const submit = (e) => {
  e.preventDefault()
  handleSubmit(projeto) // executa o metodo que foi passado pela PROPS e passo o projeto que está cadastrado no forms como argumento
}

//IMPORTANTE metodo dinamico para ALTERAR o valor de um objeto
function  Change(e){
  setProjeto({...projeto, [e.target.name]: e.target.value})
  //independende do input que preencher vai alterar algum texto
  console.log(projeto)
}
//IMPORTANTE Criando um objeto que vai mostrar o id da categoria e o nome 
function Category(e) {
  setProjeto({
    ...projeto,
    category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    },
  })
}

  return (
  <form onSubmit={submit} className={styles.form}>
  <Input
    type="text" 
    text="Nome do projeto"
    name="name"
    placeholder="Insira o nome do projeto"
    hand={Change} //vai mandar o petodo para ver executado
    value={projeto.name}
  />
  <Input
    type="number" 
    text="Valor do projeto"
    name="budget"
    placeholder="Insira o orçamento total do  projeto"
    hand={Change}
    value={projeto.budget }
  />
  <Select  
    name="name" 
    text="Selecione uma categoria:" 
    options={categorias} 
    hand={Category} 
    value={projeto.categoria ? projeto.categoria.id : ""} //está recendo os dados da API e recebendo 
  />

  <ButtonSubmit text={btntext}/> {/*puxando propriedade do componente PAI */}
  </form>
  );
}
