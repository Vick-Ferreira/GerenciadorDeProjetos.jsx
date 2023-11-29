
import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css'
import { BsMenuButtonFill,BsFillHouseHeartFill, BsFillTelephoneFill, BsBarChartLine, BsCalendarCheck, BsJournalBookmarkFill  } from 'react-icons/bs';

export default function CustomSidebar() {
  const [showSidebar, setShowSidebar] = useState(false);


  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };


  return (
    <div className={styles.container}>
      <button className={styles.btnSiderbar} onClick={toggleSidebar}><BsMenuButtonFill/></button>
      <Sidebar className={styles.sidebar} collapsed={!showSidebar}>
    
        <Menu className={styles.menu}>
        <MenuItem className={styles.menuItem} component={<Link to="/">Home</Link>}><BsFillHouseHeartFill/>Home</MenuItem> 
        <MenuItem className={styles.menuItem} component={<Link to="/sobre">Sobre</Link>}><BsJournalBookmarkFill/>Sobre</MenuItem>
        <MenuItem className={styles.menuItem} component={<Link to="/contato">Contato</Link>}><BsFillTelephoneFill/>Contato</MenuItem>

        <SubMenu className={styles.menuItem} label={<><BsBarChartLine />Projetos </>}>
        <MenuItem className={styles.menuItem} component={<Link to="/newprojeto">NewProject</Link>}>Novo Projeto</MenuItem>
        <MenuItem className={styles.menuItem} component={<Link  to="/projetos">Projetos</Link>}>Projetos</MenuItem>


        </SubMenu>

        <SubMenu className={styles.menuItem} label={<>< BsCalendarCheck />Tarefas </>}>
        <MenuItem className={styles.menuItem} component={<Link to="/newtarefa"></Link>}>Nova Tarefa</MenuItem>
          <MenuItem className={styles.menuItem} component={<Link to="/tarefas"></Link>}>Tarefas</MenuItem>

        </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}