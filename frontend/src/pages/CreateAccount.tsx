import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { createAccount } from '../store/accountSlice';
import { CreateAccountData } from '../services/api';
import { useAppDispatch } from '../hooks/useAppDispatch';

const accountTypes = [
  { value: 'savings', label: 'Savings' },
  { value: 'checking', label: 'Checking' },
  { value: 'fixed_deposit', label: 'Fixed Deposit' },
  { value: 'loan', label: 'Loan' },
];

const currencies = [
  { value: 'USD', label: 'US Dollar' },
  { value: 'EUR', label: 'Euro' },
  { value: 'GBP', label: 'British Pound' },
];

const CreateAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm<CreateAccountData>();

  const onSubmit = async (data: CreateAccountData) => {
    try {
      await dispatch(createAccount(data)).unwrap();
      navigate('/accounts');
    } catch (error) {
      console.error('Failed to create account:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Create New Account
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="account_type"
                  control={control}
                  rules={{ required: 'Account type is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Account Type"
                      fullWidth
                      error={!!errors.account_type}
                      helperText={errors.account_type?.message}
                    >
                      {accountTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="currency"
                  control={control}
                  rules={{ required: 'Currency is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Currency"
                      fullWidth
                      error={!!errors.currency}
                      helperText={errors.currency?.message}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="interest_rate"
                  control={control}
                  rules={{
                    required: 'Interest rate is required',
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

              <Grid item xs={12} md={6}>
                <Controller
                  name="customer_id"
                  control={control}
                  rules={{
                    required: 'Customer ID is required',
                    min: { value: 1, message: 'Customer ID must be positive' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Customer ID"
                      fullWidth
                      error={!!errors.customer_id}
                      helperText={errors.customer_id?.message}
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
                    Create Account
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

export default CreateAccountPage; 