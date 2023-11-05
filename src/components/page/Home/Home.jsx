import React from 'react';

import styles from './Home.module.css'
import LinkButton from '../Layout/LinkButton/LinkButton';
import Container from '../Layout/Container/Container';

export default function Home() {
  return (

    <div >

    <Container>
      <section className={styles.home_container}>
      <h1 className={styles.span}><span >Gerencie seu dia a dia!</span></h1>
      <p className={styles.start}>Comece agora a gerenciar seus projetos, suas tarefas, e seus gastos e controlar suas demandas,
      com eficiência!</p>
      <LinkButton to="/newproject" text="Criar Projeto"/>
      </section>
     </Container>
          
    </div>
  );
}
