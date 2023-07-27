import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material';

import Redux from './Libs/Redux';
import App from './Components/App';

import { Theme } from './Styles/Theme';

import './Styles/App.css';
import './Styles/util.css';
import './Styles/index.css';

const { store, persistor } = Redux()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={Theme}>
          <Suspense
            fallback={
              <span className="center text-base font-bold text-gray-600">
                Loading language...
              </span>
            }
          >
            <CssBaseline />
            <App />
          </Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
