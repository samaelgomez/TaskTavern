import {
  MantineProvider,
  ColorSchemeProvider
} from "@mantine/core";
import { ModalsProvider } from '@mantine/modals';
import { useState } from "react";
import Home from './view/pages/Home.page';
import Layout from './view/components/layout';
import "./view/styles/index.css";

export default function App() {
  const [colorScheme, setColorScheme] = useState("dark");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>
          <Layout>
            <Home />
          </Layout>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
