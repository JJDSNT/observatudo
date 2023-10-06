import React, { useState } from 'react';
import Navbar from './Navbar';
import Aside from './Aside';
import Main from './Main';

function Layout() {

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [toggled, setToggled] = useState<boolean>(false);

  const handleCollapsedChange = ():void => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = ():void => {
    setToggled(!toggled);
  };

  const handleBackdropClick = () => {
    if (toggled) {
      setToggled(false);
    }
  };

  return (
  
    <div className={`app ${toggled ? 'toggled' : ''}`} onClick={handleBackdropClick}>
      <Navbar handleToggleSidebar={handleToggleSidebar} />

      <Aside        
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        onBackdropClick={handleBackdropClick}
      />
      <Main />
    </div>
  );
}

export default Layout;
