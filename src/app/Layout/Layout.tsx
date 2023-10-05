import React, { useState } from 'react';
import Navbar from './Navbar';
import Aside from './Aside';
import Main from './Main';


function Layout() {

  // eslint-disable-next-line
  const [estado, setEstado] = useState({id:35,uf:'SP'});
  // eslint-disable-next-line
  const [cidade, setcidade] = useState({id:12,uf:'SP',cidade:'Andradina'});
  // eslint-disable-next-line
  const [eixo, setEixo] = useState({id:1,icon:'icon',nome:'Segurança'});

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [toggled, setToggled] = useState<boolean>(false);

  const handleCollapsedChange = ():void => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = ():void => {
    setToggled(!toggled);
  };

  return (
  
    <div className={`app ${toggled ? 'toggled' : ''}`}>
      <Navbar handleToggleSidebar={handleToggleSidebar} />

      <Aside        
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      />
      <Main />
    </div>
  );
}

export default Layout;