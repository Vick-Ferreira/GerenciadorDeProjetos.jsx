import React from 'react';
import Container from './Layout/Container/Container'
import { BsWhatsapp,BsGithub,BsLinkedin} from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";

export default function Contato() {
  return (
   <Container>
    <form>
      <h1>Fale comigo!</h1>

      <p>Fique a vontade para entrar em contato refêrente a oportunidade de emprego na área de desenvolvimento e ou para positivar meus conhecimentos!</p>
      
      <p><BsWhatsapp/>(+55)41 9 9994-4514</p>
      <p><BiLogoGmail/> vitoriaferreirap06@gmail.com</p>
      <p><BsGithub/><a href="https://github.com/Vick-Ferreira">GitHub</a></p>
      <p><BsLinkedin/><a href="https://www.linkedin.com/in/vitoria-ferreira-ti/">Linkedin</a></p>
    </form>
   </Container>
  );
}
