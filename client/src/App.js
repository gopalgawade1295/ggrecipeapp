import './App.css';
import { Outlet, createBrowserRouter, useLocation } from 'react-router-dom';
import Home from './screens/Home';
import SavedRecipes from './screens/SavedRecipes';
import MyRecipes from './screens/MyRecipes';
import RegisterUser from './screens/RegisterUser';
import LoginUser from './screens/LoginUser';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Toolbar, outlinedInputClasses, InputAdornment } from '@mui/material';

export const App = () => {
  const defaultmode = sessionStorage.getItem("mode") === "" || sessionStorage.getItem("mode") === null ? 'light' : sessionStorage.getItem("mode")
  const [mode, setMode] = useState(defaultmode);
  const location = useLocation();

  const themes = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          text: {
            primary: '#000000',
            secondary: '#000000',
          },
          backgroundColor: {
            default: '#FFFFFF',
          },
        }
        : {
          text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.7)',
          },
          backgroundColor: {
            default: 'rgba(255, 255, 255, 0.16)',
          },
        }),
    },
    typography: {
      allVariants: {
        fontFamily: 'Inter',
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            border: '1px solid #DCDCDC',
            borderRadius: "12px",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              border: '1px solid #7F38EC',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              border: '1px solid #7F38EC',
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    sessionStorage.setItem("mode", mode)
  }, [mode])

  return (
    <div className="App">
      <ThemeProvider theme={themes}>
        <Box
          sx={{
            backgroundColor: 'background.default',
            color: 'text.primary',
            minHeight: '100vh',
          }}
        >
          <Header mode={mode} setMode={setMode} />
          <Toolbar />
          {location.pathname === '/' ?
            <Home /> :
            null
          }

          <Outlet />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export const MainRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/savedrecipes',
        element: <SavedRecipes />
      },
      {
        path: '/myrecipes',
        element: <MyRecipes />
      },
      {
        path: '/register',
        element: <RegisterUser />
      },
      {
        path: '/login',
        element: <LoginUser />
      }
    ]
  }
])
