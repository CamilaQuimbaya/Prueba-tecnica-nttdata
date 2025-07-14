import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../auth/pages/Login';
import * as authService from '../../auth/services/authService';
import * as alerts from '../../utils/alerts';

// Mock useNavigate y useAppDispatch
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../app/hooks', () => ({
  useAppDispatch: () => vi.fn(),
}));

describe('Login Component', () => {
  it('renderiza los campos correctamente', () => {
    render(<Login />, { wrapper: MemoryRouter });
    expect(screen.getByPlaceholderText('Correo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('muestra error al fallar el login', async () => {
    vi.spyOn(authService, 'login').mockRejectedValueOnce(new Error('Invalid credentials'));

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText('Correo'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
    });
  });

  it('redirige al usuario y muestra alerta al loguearse correctamente', async () => {
    const fakeToken = 'fake-token';
    const loginSpy = vi.spyOn(authService, 'login').mockResolvedValueOnce(fakeToken);
    const alertaSpy = vi.spyOn(alerts, 'mostrarBienvenida').mockImplementation(() => {});

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText('Correo'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'correctpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(loginSpy).toHaveBeenCalled();
      expect(alertaSpy).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
