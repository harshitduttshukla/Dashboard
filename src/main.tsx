import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import FileUploader from './Services/Updatecommand.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <FileUploader /> */}
  </StrictMode>,
)
