import { createContext, ReactNode } from "react";

export const ThemeContext = createContext("light");

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProviderWrapper: React.FC<ContextProviderProps> = ({
  children,
}) => <ThemeContext.Provider value={"theme"}>{children}</ThemeContext.Provider>;

export default ContextProviderWrapper;
