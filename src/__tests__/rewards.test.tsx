import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BusinessProvider } from '../contexts/BusinessContext';
import { AuthProvider } from '../contexts/AuthContext';
import RewardsPage from '../pages/RewardsPage';
import CreateRewardModal from '../components/business/CreateRewardModal';

describe('Rewards Management', () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('creates new reward', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <BusinessProvider>
            <CreateRewardModal
              onClose={mockOnClose}
              onSave={mockOnSave}
              editingReward={null}
              businessId="test-business"
            />
          </BusinessProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText(/reward name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const pointsInput = screen.getByLabelText(/points required/i);
    const submitButton = screen.getByRole('button', { name: /create reward/i });

    await userEvent.type(nameInput, 'Free Coffee');
    await userEvent.type(descriptionInput, 'Get a free coffee of your choice');
    await userEvent.type(pointsInput, '500');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Free Coffee',
          description: 'Get a free coffee of your choice',
          pointsRequired: 500
        })
      );
    });
  });

  test('displays rewards list', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <BusinessProvider>
            <RewardsPage />
          </BusinessProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    // Check if rewards are displayed
    const rewardElements = await screen.findAllByRole('article');
    expect(rewardElements.length).toBeGreaterThan(0);

    // Check filtering
    const availableButton = screen.getByRole('button', { name: /available/i });
    fireEvent.click(availableButton);
    await waitFor(() => {
      const filteredRewards = screen.getAllByRole('article');
      expect(filteredRewards.length).toBeLessThanOrEqual(rewardElements.length);
    });
  });
});