import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { updateAccount } from '../store/accountSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { Account, UpdateAccountData } from '../services/api';
import { RootState } from '../store';

const AccountDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { accounts, loading, error } = useAppSelector((state: RootState) => state.accounts);
  const [account, setAccount] = useState<Account | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<UpdateAccountData>();

  useEffect(() => {
    if (id && accounts.length > 0) {
      const foundAccount = accounts.find((acc: Account) => acc.id === parseInt(id));
      if (foundAccount) {
        setAccount(foundAccount);
      }
    }
  }, [id, accounts]);

  const onSubmit = async (data: UpdateAccountData) => {
    if (!id) return;
    try {
      await dispatch(updateAccount({ id: parseInt(id), data })).unwrap();
      navigate('/accounts');
    } catch (error) {
      console.error('Failed to update account:', error);
    }
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

  if (!account) {
    return <Typography>Account not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Account Details
      </Typography>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Account Number</Typography>
              <Typography variant="body1">{account.account_number}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Customer ID</Typography>
              <Typography variant="body1">{account.customer_id}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Balance</Typography>
              <Typography variant="body1">
                {account.balance.toFixed(2)} {account.currency}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Created At</Typography>
              <Typography variant="body1">
                {new Date(account.created_at).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Update Account
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="account_type"
                  control={control}
                  defaultValue={account.account_type}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Account Type"
                      fullWidth
                      error={!!errors.account_type}
                      helperText={errors.account_type?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="currency"
                  control={control}
                  defaultValue={account.currency}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Currency"
                      fullWidth
                      error={!!errors.currency}
                      helperText={errors.currency?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="interest_rate"
                  control={control}
                  defaultValue={account.interest_rate}
                  rules={{
                    min: { value: 0, message: 'Interest rate must be positive' },
                    max: { value: 100, message: 'Interest rate cannot exceed 100%' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Interest Rate (%)"
                      fullWidth
                      error={!!errors.interest_rate}
                      helperText={errors.interest_rate?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/accounts')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    Update Account
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AccountDetailsPage; 