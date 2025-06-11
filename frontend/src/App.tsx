import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './theme';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AccountList from './pages/AccountList';
import AccountDetails from './pages/AccountDetails';
import CreateAccount from './pages/CreateAccount';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/accounts" element={<AccountList />} />
              <Route path="/accounts/new" element={<CreateAccount />} />
              <Route path="/accounts/:id" element={<AccountDetails />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 