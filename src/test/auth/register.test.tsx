import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../../auth/pages/Register';
import * as authService from '../../auth/services/authService';
import * as slice from '../../auth/slice';
import * as alerts from '../../utils/alerts';

// Mock helpers
const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../../app/hooks', () => ({
  useAppDispatch: () => mockDispatch
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../components/NoteLoad', () => ({
  default: () => <div>Mock NoteLoad</div>,
}));

describe('Register', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza los campos y botón', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument();
  });

  it('llama a register y navega si todo va bien', async () => {
    const fakeToken = 'fake-jwt';
    vi.spyOn(authService, 'register').mockResolvedValueOnce(fakeToken);
    vi.spyOn(alerts, 'nuevaBienvenida').mockImplementation(() => {});
    vi.spyOn(slice, 'loginSuccess').mockReturnValue(slice.loginSuccess(fakeToken));


    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/nombre/i), { target: { value: 'Laura' } });
    fireEvent.change(screen.getByPlaceholderText(/correo/i), { target: { value: 'laura@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    await screen.findByText('Mock NoteLoad'); // esperar que algo se actualice

    expect(authService.register).toHaveBeenCalledWith({
      nombre: 'Laura',
      correo: 'laura@example.com',
      contrasena: '123456',
    });

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(alerts.nuevaBienvenida).toHaveBeenCalled();
  });

  it('muestra error si falla el registro', async () => {
    vi.spyOn(authService, 'register').mockRejectedValueOnce(new Error('Error'));

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/correo/i), { target: { value: 'fallo@fail.com' } });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    await screen.findByText(/error al registrar usuario/i);
  });
});
