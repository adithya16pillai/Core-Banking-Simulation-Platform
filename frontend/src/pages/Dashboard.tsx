import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { fetchAccounts } from '../store/accountSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { Account } from '../services/api';
import { RootState } from '../store';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { accounts, loading, error } = useAppSelector((state: RootState) => state.accounts);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const calculateTotalBalance = (accounts: Account[]): number => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  const getAccountTypeCount = (accounts: Account[], type: string): number => {
    return accounts.filter(account => account.account_type === type).length;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const totalBalance = calculateTotalBalance(accounts);
  const savingsCount = getAccountTypeCount(accounts, 'savings');
  const checkingCount = getAccountTypeCount(accounts, 'checking');
  const fixedDepositCount = getAccountTypeCount(accounts, 'fixed_deposit');
  const loanCount = getAccountTypeCount(accounts, 'loan');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/accounts/create')}
        >
          Create Account
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Balance
              </Typography>
              <Typography variant="h4">
                ${totalBalance.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Savings Accounts
              </Typography>
              <Typography variant="h4">
                {savingsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Checking Accounts
              </Typography>
              <Typography variant="h4">
                {checkingCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Fixed Deposits
              </Typography>
              <Typography variant="h4">
                {fixedDepositCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Loans
              </Typography>
              <Typography variant="h4">
                {loanCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage; 