import React, { ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProviderWrapper: React.FC<ThemeProviderProps> = ({ children }) => (
  <ThemeProvider theme={theme} defaultMode="light">
    {children}
  </ThemeProvider>
);

export default ThemeProviderWrapper;
