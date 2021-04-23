import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import './index.css';
import App from './app/App';
import { Provider } from 'react-redux';
import store from './app/store';
import GlobalStyle from './theme/gloabalStyles';
import { theme } from './theme/theme';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);
