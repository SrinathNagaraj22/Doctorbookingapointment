import React from 'react';
import '../../index.css'

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      © {new Date().getFullYear()} Five Rupees MultiSpeciality Hospital. All Rights Reserved.
      </footer>
  );
}

export default Footer;
