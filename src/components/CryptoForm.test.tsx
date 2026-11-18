
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CryptoForm from './CryptoForm'

describe('CryptoForm', () => {
  it('muestra errores cuando el formulario está vacío', () => {
    render(<CryptoForm />)

    fireEvent.click(
      screen.getByRole('button', { name: /registrar/i })
    )

    expect(
      screen.getByText(/ingresá al menos 2 caracteres/i)
    ).toBeInTheDocument()

    expect(
      screen.getByText(/seleccioná una categoría válida/i)
    ).toBeInTheDocument()
  })

  it('permite registrar datos válidos', () => {
    render(<CryptoForm />)

    fireEvent.change(
      screen.getByLabelText(/nombre/i),
      { target: { value: 'Bitcoin' } }
    )

    fireEvent.change(
      screen.getByLabelText(/categoría/i),
      { target: { value: 'principal' } }
    )

    fireEvent.click(
      screen.getByRole('button', { name: /registrar/i })
    )

    expect(
      screen.getByRole('status')
    ).toHaveTextContent('Registro válido: Bitcoin (principal)')
  })
})
