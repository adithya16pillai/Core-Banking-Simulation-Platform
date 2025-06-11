import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Account, CreateAccountData, UpdateAccountData } from '../services/api';
import * as api from '../services/api';

interface AccountState {
  accounts: Account[];
  selectedAccount: Account | null;
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [],
  selectedAccount: null,
  loading: false,
  error: null,
};

export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAll',
  async () => {
    const response = await api.getAccounts();
    return response;
  }
);

export const fetchAccountById = createAsyncThunk(
  'accounts/fetchById',
  async (id: number) => {
    const response = await api.getAccountById(id);
    return response;
  }
);

export const createAccount = createAsyncThunk(
  'accounts/create',
  async (data: CreateAccountData) => {
    const response = await api.createAccount(data);
    return response;
  }
);

export const updateAccount = createAsyncThunk(
  'accounts/update',
  async ({ id, data }: { id: number; data: UpdateAccountData }) => {
    const response = await api.updateAccount(id, data);
    return response;
  }
);

export const deleteAccount = createAsyncThunk(
  'accounts/delete',
  async (id: number) => {
    await api.deleteAccount(id);
    return id;
  }
);

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    clearSelectedAccount: (state) => {
      state.selectedAccount = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all accounts
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action: PayloadAction<Account[]>) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch accounts';
      })
      // Fetch single account
      .addCase(fetchAccountById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAccount = action.payload;
      })
      .addCase(fetchAccountById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch account';
      })
      // Create account
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action: PayloadAction<Account>) => {
        state.loading = false;
        state.accounts.push(action.payload);
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create account';
      })
      // Update account
      .addCase(updateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccount.fulfilled, (state, action: PayloadAction<Account>) => {
        state.loading = false;
        const index = state.accounts.findIndex(acc => acc.id === action.payload.id);
        if (index !== -1) {
          state.accounts[index] = action.payload;
        }
        if (state.selectedAccount?.id === action.payload.id) {
          state.selectedAccount = action.payload;
        }
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update account';
      })
      // Delete account
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.accounts = state.accounts.filter(acc => acc.id !== action.payload);
        if (state.selectedAccount?.id === action.payload) {
          state.selectedAccount = null;
        }
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete account';
      });
  },
});

export const { clearSelectedAccount, clearError } = accountSlice.actions;
export default accountSlice.reducer; 