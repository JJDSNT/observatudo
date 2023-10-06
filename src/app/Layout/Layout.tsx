import React, { useState } from 'react';
import Navbar from './Navbar';
import Aside from './Aside';
import Main from './Main';

function Layout() {
  const [menuToggled, setMenuToggled] = useState<boolean>(false);

  const handleToggleMenu = (): void => {
    setMenuToggled(!menuToggled);
  };

  return (
    <div id="outer-container">
      {/* Navbar fixo */}
      <Navbar handleToggleMenu={handleToggleMenu} />

      {/* Conteúdo Principal (Main) */}
      <div id="page-wrap">
        <Aside pageWrapId="page-wrap" outerContainerId="outer-container" />
        <Main />
      </div>
    </div>
  );
}

export default Layout;
