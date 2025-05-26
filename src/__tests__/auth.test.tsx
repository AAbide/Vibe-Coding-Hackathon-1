import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import LoginModal from '../components/auth/LoginModal';
import SignupModal from '../components/auth/SignupModal';

describe('Authentication Flow', () => {
  const mockOnClose = vi.fn();
  const mockOnSignupClick = vi.fn();
  const mockOnLoginClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('login form validation', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginModal onClose={mockOnClose} onSignupClick={mockOnSignupClick} />
        </AuthProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /log in/i });

    // Test empty form submission
    fireEvent.click(submitButton);
    expect(await screen.findByText(/required/i)).toBeInTheDocument();

    // Test invalid email
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);
    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();

    // Test valid submission
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'test@example.com');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    });
  });

  test('signup form validation', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignupModal onClose={mockOnClose} onLoginClick={mockOnLoginClick} />
        </AuthProvider>
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /create account/i });

    // Test password mismatch
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(phoneInput, '1234567890');
    await userEvent.type(passwordInput, 'Password123');
    await userEvent.type(confirmPasswordInput, 'Password124');
    fireEvent.click(submitButton);
    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();

    // Test valid submission
    await userEvent.clear(confirmPasswordInput);
    await userEvent.type(confirmPasswordInput, 'Password123');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.queryByText(/passwords do not match/i)).not.toBeInTheDocument();
    });
  });
});