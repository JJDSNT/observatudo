import React from 'react';
import Navbar from './Navbar';
import Aside from './Aside';
import Main from './Main';

import { useSidebarStore } from '@/app/stores/useSidebarStore';

function Layout() {

  const { toggled, setToggled, handleBackdropClick } = useSidebarStore();

  return (

    <div>
      <Navbar />
      {toggled.toString()}
      <div style={{ display: 'flex' }}>
        <Aside />
        <Main />
      </div>
    </div>
  );
}

export default Layout;
