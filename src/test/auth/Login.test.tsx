import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "../../pages/auth/Login";
import { authService } from "../../services/auth/authService";

// ============================================
// MOCKS
// ============================================
jest.mock("../../services/auth/authService", () => ({
  authService: {
    login: jest.fn(),
    saveSession: jest.fn(),
  },
}));

jest.mock("../../assets/images/LoginBg.webp", () => "test-bg");
jest.mock("../../assets/icons/Logo-SportMatch.webp", () => "test-logo");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// ============================================
// HELPERS
// ============================================
const renderLogin = () =>
  render(
    <MemoryRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Login />
    </MemoryRouter>
  );

const usuarioMock = {
  id: 1,
  nombre_completo: "Juan",
  nombre_usuario: "juan",
  correo: "juan@test.com",
  rol: "user",
  estado_cuenta: "activo",
};

// ============================================
// TESTS
// ============================================
describe("Login", () => {
  beforeEach(() => jest.clearAllMocks());

  it("muestra los campos del formulario", () => {
    renderLogin();
    expect(screen.getByPlaceholderText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /INICIAR SESIÓN/i })
    ).toBeInTheDocument();
  });

  it("hace login correctamente y navega a /inicio", async () => {
    const user = userEvent.setup();
    (authService.login as jest.Mock).mockResolvedValueOnce({
      access_token: "tok",
      usuario: usuarioMock,
    });

    renderLogin();

    await user.type(
      screen.getByPlaceholderText("Correo electrónico"),
      "juan@test.com"
    );
    await user.type(screen.getByPlaceholderText("Contraseña"), "12345678");
    await user.click(screen.getByRole("button", { name: /INICIAR SESIÓN/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith("juan@test.com", "12345678");
      expect(mockNavigate).toHaveBeenCalledWith("/inicio");
    });
  });

  it("muestra error cuando las credenciales son inválidas", async () => {
    const user = userEvent.setup();
    (authService.login as jest.Mock).mockRejectedValueOnce(
      new Error("Credenciales inválidas")
    );

    renderLogin();

    await user.type(screen.getByPlaceholderText("Correo electrónico"), "a@b.com");
    await user.type(screen.getByPlaceholderText("Contraseña"), "bad");
    await user.click(screen.getByRole("button", { name: /INICIAR SESIÓN/i }));

    expect(await screen.findByText("Credenciales inválidas")).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});