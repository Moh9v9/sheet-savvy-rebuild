
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Inline script to prevent theme flickering
const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  })()
`;

// Insert the script into the document head
const script = document.createElement('script');
script.innerText = themeScript;
document.head.appendChild(script);

createRoot(document.getElementById("root")!).render(<App />);
