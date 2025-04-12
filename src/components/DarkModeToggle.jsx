import React from 'react';
import { Button } from 'react-bootstrap';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="mb-3 text-end">
      <Button variant={isDarkMode ? 'light' : 'dark'} onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>
    </div>
  );
};

export default DarkModeToggle;
