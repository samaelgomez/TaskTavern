import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import Home from './view/pages/Home.page';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <MantineProvider>
      <Home />
    </MantineProvider>
  </MantineProvider>
  // </React.StrictMode>,
)
