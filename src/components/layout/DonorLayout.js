import React from 'react';
import { Outlet } from 'react-router-dom';

const DonorLayout = () => {
  return (
    <div>
      <header>Donor Dashboard Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Donor Footer</footer>
    </div>
  );
};

export default DonorLayout;