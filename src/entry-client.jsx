import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')

const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// El build genera HTML por ruta, así que en producción hidratamos sobre lo que
// ya vino del servidor. En `vite dev` no hay nada prerenderizado y se monta normal.
//
// Se comprueba childElementCount y no hasChildNodes(): el marcador
// <!--app-html--> de la plantilla es un nodo comentario, así que hasChildNodes()
// daría true en desarrollo e intentaría hidratar un contenedor vacío.
if (root.childElementCount > 0) hydrateRoot(root, tree)
else createRoot(root).render(tree)
