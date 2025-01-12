import React from 'react';

export const Footer = () => {
  return (
      <footer className="bg-gray-900 py-6 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Autobot. All rights reserved.
        </p>
      </footer>
  );
};
