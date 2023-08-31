
import React, { useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const themeMode = useSelector((state) => state.store. theme);

  useEffect(() => {
    const body = document.body;
    body.classList.remove("light", "dark");
    body.classList.add(themeMode);
  }, [themeMode]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode === "light" ? "light" : "dark",
        },
      }),
    [themeMode]
  );

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
