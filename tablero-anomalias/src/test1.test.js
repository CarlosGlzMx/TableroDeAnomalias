import { render, screen } from "@testing-library/react";
import App from "./App";


test("Verifica footer", () => {
    // Se carga la aplicación y verifica que la etiqueta de copyright aparezca
    render(<App />);
    const contenido_footer = screen.getByTestId("footer-label");
    expect(contenido_footer.textContent).toBe("Copyright © Ternium");
});