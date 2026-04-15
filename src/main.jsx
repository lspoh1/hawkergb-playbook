import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Playbook from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode><Playbook /></StrictMode>
)