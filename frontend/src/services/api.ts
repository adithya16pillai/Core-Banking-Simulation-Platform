import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Account {
  id: number;
  account_number: string;
  account_type: string;
  currency: string;
  balance: number;
  interest_rate: number;
  customer_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateAccountData {
  account_type: string;
  currency: string;
  interest_rate: number;
  customer_id: number;
}

export interface UpdateAccountData {
  account_type?: string;
  currency?: string;
  interest_rate?: number;
}

export const getAccounts = async (): Promise<Account[]> => {
  const response = await fetch(`${API_URL}/accounts`);
  if (!response.ok) {
    throw new Error('Failed to fetch accounts');
  }
  return response.json();
};

export const getAccountById = async (id: number): Promise<Account> => {
  const response = await fetch(`${API_URL}/accounts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch account');
  }
  return response.json();
};

export const createAccount = async (data: CreateAccountData): Promise<Account> => {
  const response = await fetch(`${API_URL}/accounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create account');
  }
  return response.json();
};

export const updateAccount = async (id: number, data: UpdateAccountData): Promise<Account> => {
  const response = await fetch(`${API_URL}/accounts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update account');
  }
  return response.json();
};

export const deleteAccount = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/accounts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete account');
  }
  return;
};

export default api; 