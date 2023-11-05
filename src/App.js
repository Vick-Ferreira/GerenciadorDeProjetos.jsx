import { BrowserRouter , Routes, Route} from "react-router-dom";
import Home from './components/page/Home/Home'
import Sobre from './components/page/Sobre'
import Contato from './components/page/Contato'
import NewProject from './components/page/Projeto/NewProject/NewProject'
import Projetos from './components/page/Projeto/Projetos/Projetos'
import ProjetoEdit from './components/page/Projeto/ProjetoEdit/ProjetoEdit'
import Tarefas from './components/page/Tarefas/Tarefas/Tarefas'
import NewTarefa from './components/page/Tarefas/NewTarefa/Newtarefa'
import EditTarefas from './components/page/Tarefas/EditTarefa/EditTarefa'

import styles from './components/page/Layout/Container/Container'

//Layout
import Container from "./components/page/Layout/Container/Container";
import Footer from "./components/page/Layout/Footer/Footer";
import SideBar from "./components/page/Layout/Sidebar/Sidebar";


function App(){    /*ROTIAMENTO*/
  return(  
  
  <BrowserRouter>


    <SideBar/>


  
  <Container>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/newproject" element={<NewProject />} />
      <Route path="/projetos" element={<Projetos />} />
      <Route path="/projetoedit/:id" element={<ProjetoEdit />} />
      <Route path="/tarefas" element={<Tarefas/>} />
      <Route path="/newtarefa" element={<NewTarefa/>} />
      <Route path="/edittarefas/:id"   element={<EditTarefas/>}/>
    {/*/:id é para aceita que vai ver um projeto "especifico" ele vai para a pagina aceitando o id que vem junto do projetoCard */}
    </Routes>
    
  </Container>
  <Footer/>
  </BrowserRouter>
  
);


}


export default App;
