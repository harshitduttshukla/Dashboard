import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Customcommands from './Services/Customcommands.tsx'
import Customcommands1 from './Services/Customcommands1.tsx'
import ActuationFetcher from './Services/ActuationFetcher .tsx'
import CommandFetcher from './Services/CommandFetcher .tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App />
     */}
     {/* <Customcommands/> */}
     {/* <Customcommands1/> */}
     {/* <ActuationFetcher/> */}
     <CommandFetcher/>
  </StrictMode>,
)
