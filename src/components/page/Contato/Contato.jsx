import React from 'react';
import { BsWhatsapp,BsGithub,BsLinkedin} from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";
import Container from '../Layout/Container/Container'
import style from '../Layout/Container/Container.module.css'

export default function Contato() {
  return (
  
      <Container>
  
      <h1>Fale comigo!</h1>

      <p>Sinta-se à vontade para entrar em contato referente a oportunidades de emprego na área de desenvolvimento e/ou para discutir o aprimoramento dos meus conhecimentos!</p>
      <div className={style.hover}>
      <p><BsWhatsapp/>  (+55)  41 9 9994-4514</p>
      <p><BiLogoGmail/> vitoriaferreirap06@gmail.com</p>
      <p><a href="https://github.com/Vick-Ferreira">GitHub</a></p>
      <p><a href="https://www.linkedin.com/in/vitoria-ferreira-ti/">Linkedin</a></p>
      </div>
      </Container>
  );
}
