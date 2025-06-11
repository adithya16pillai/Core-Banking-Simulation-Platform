import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { fetchAccounts, deleteAccount } from '../store/accountSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { Account } from '../services/api';
import { RootState } from '../store';

const AccountListPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { accounts, loading, error } = useAppSelector((state: RootState) => state.accounts);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await dispatch(deleteAccount(id)).unwrap();
        dispatch(fetchAccounts());
      } catch (error) {
        console.error('Failed to delete account:', error);
      }
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Accounts</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/accounts/create')}
        >
          Create Account
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Account Number</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Interest Rate</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts.map((account: Account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.account_number}</TableCell>
                    <TableCell>{account.account_type}</TableCell>
                    <TableCell>{account.currency}</TableCell>
                    <TableCell>{account.balance.toFixed(2)}</TableCell>
                    <TableCell>{account.interest_rate}%</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/accounts/${account.id}`)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(account.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AccountListPage; 