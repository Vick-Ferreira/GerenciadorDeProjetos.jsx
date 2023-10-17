import { BrowserRouter , Routes, Route} from "react-router-dom";
import Home from './components/page/Home/Home'
import Sobre from './components/page/Sobre'
import Contato from './components/page/Contato'
import NewProject from './components/page/NewProject/NewProject'
import Projetos from './components/page/Projetos/Projetos'
import ProjetoEdit from './components/page/ProjetoEdit/ProjetoEdit'



//Layout
import Container from "./components/page/Layout/Container/Container";
import NavBar from  "./components/page/Layout/NavBar/NavBar";
import Footer from "./components/page/Layout/Footer/Footer";


function App(){    /*ROTIAMENTO*/
  return(  
  
  <BrowserRouter>
  <NavBar/>

  
  <Container customClass="min-height">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/newproject" element={<NewProject />} />
      <Route path="/projetos" element={<Projetos />} />
      <Route path="/projetoedit/:id" element={<ProjetoEdit />} />
    {/*/:id é para aceita que vai ver um projeto "especifico" ele vai para a pagina aceitando o id que vem junto do projetoCard */}
    </Routes>
  </Container>
  <Footer/>
  </BrowserRouter>
);


}


export default App;
