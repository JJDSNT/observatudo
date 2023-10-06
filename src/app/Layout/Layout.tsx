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
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar handleToggleMenu={handleToggleMenu} />
        <Aside />
        <Main />
      </div>
    </div>
  );
}

export default Layout;
