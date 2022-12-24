import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignInPage from '../pages/signin';
import getFormErrorMessages from '../src/utils/getFormErrorMessages';

describe('Sign In Page', () => {
  it('Should throw error if fields are not filled', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <SignInPage />
      </QueryClientProvider>
    );

    const signInBtn = await screen.findByRole('button', {
      name: 'ورود',
    });

    await userEvent.click(signInBtn);

    const requiredError = await screen.findAllByText(
      getFormErrorMessages().required
    );

    expect(requiredError).toBeTruthy();
  });

  it('Should not throw error if fields are correctly filled', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <SignInPage />
      </QueryClientProvider>
    );

    const emailInput = screen.getByPlaceholderText('ایمیل');
    const passwordInput = screen.getByPlaceholderText('رمز عبور');

    const signInBtn = await screen.findByRole('button', {
      name: 'ورود',
    });

    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, 'testtest123456');
    await userEvent.click(signInBtn);

    const formErrors = screen.queryAllByTestId('form-error-message');

    expect(formErrors).toHaveLength(0);
  });

  it('Should throw error if email is not correctly filled', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <SignInPage />
      </QueryClientProvider>
    );

    const emailInput = screen.getByPlaceholderText('ایمیل');

    const signInBtn = await screen.findByRole('button', {
      name: 'ورود',
    });

    await userEvent.type(emailInput, 'test@test');
    await userEvent.click(signInBtn);

    const emailError = await screen.findByText(getFormErrorMessages().email);

    expect(emailError).toBeInTheDocument();
  });

  it('Should rended image illustration', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <SignInPage />
      </QueryClientProvider>
    );

    const signInIllustration = screen.getByRole('img', {
      name: /sign-in-illustration/i,
    });

    expect(signInIllustration).toBeInTheDocument();
  });
});
