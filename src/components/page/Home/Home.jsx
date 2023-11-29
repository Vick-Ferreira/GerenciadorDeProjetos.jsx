import React from 'react';

import styles from './Home.module.css'
import LinkButton from '../Layout/LinkButton/LinkButton';
import Container from '../Layout/Container/Container';

export default function Home() {
  return (

    <div >

    <Container>
      <section className={styles.home_container}>
      <p className={styles.span}><span >Gerencie seu dia a dia!</span></p>
      <p className={styles.start}>Comece agora a gerenciar seus projetos e gastos e controlar sua demanda, e também aproveite para gerenciar  suas tarefas diárias
      com eficiência!</p>
      <LinkButton to="/newprojeto" text="Criar Projeto"/>
      <LinkButton to="/newtarefa" text="Criar Tarefa"/>
      </section>
     </Container>
          
    </div>
  );
}
