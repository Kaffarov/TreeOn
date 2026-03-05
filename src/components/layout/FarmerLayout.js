import React from 'react';
import { Outlet } from 'react-router-dom';

const FarmerLayout = () => {
  return (
    <div>
      <header>Farmer Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Farmer Footer</footer>
    </div>
  );
};

export default FarmerLayout;