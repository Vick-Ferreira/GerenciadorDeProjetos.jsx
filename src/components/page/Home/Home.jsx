import React from 'react';
import tree from './img/tree.jpg'
import styles from './Home.module.css'
import LinkButton from '../Layout/LinkButton/LinkButton';

export default function Home() {
  return (
    <section className={styles.home_container}>
      <h1 className={styles.span}><span >Seja bem vindo !</span></h1>
      <p className={styles.start}>Comece a gerenciar seus projetos!</p>
      <LinkButton to="/newproject" text="Criar Projeto"/>
      <img className={styles.img} src={tree} alt="meuprojeto"/>
    </section>
  );
}
