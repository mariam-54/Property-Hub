import { createContext, useState, useEffect } from "react";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material/styles";

export const ThemeContext = createContext();

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#EFA00F',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#111',
      secondary: '#4f4f4f',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#111',
          },
          '& .MuiInputLabel-root': {
            color: '#4f4f4f',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#111',
            },
            '&:hover fieldset': {
              borderColor: '#EFA00F',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#111',
        },
        root: {
          color: '#111',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#EFA00F',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#EFA00F',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#ffffff',
          },
          '& .MuiInputLabel-root': {
            color: '#b0b0b0',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff',
            },
            '&:hover fieldset': {
              borderColor: '#EFA00F',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#ffffff',
        },
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#EFA00F',
        },
        colorSecondary: {
          '&.Mui-checked': {
            color: '#ffffff',
          },
        },
      },
    },
  },
});

const CustomThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const appliedTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MUIThemeProvider theme={appliedTheme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;