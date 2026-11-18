
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CryptoStatus from './CryptoStatus'

describe('CryptoStatus', () => {
  it('muestra el estado de carga', () => {
    render(
      <CryptoStatus
        loading={true}
        error=""
        consulted={false}
        totalCryptos={0}
        filteredCount={0}
        onRetry={vi.fn()}
      />
    )

    expect(screen.getByRole('status')).toHaveTextContent(
      'Obteniendo precios...'
    )
  })

  it('muestra un mensaje de error', () => {
    render(
      <CryptoStatus
        loading={false}
        error="Error al consultar los precios"
        consulted={true}
        totalCryptos={0}
        filteredCount={0}
        onRetry={vi.fn()}
      />
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Error al consultar los precios'
    )
  })

  it('permite volver a intentar la consulta', () => {
    const onRetry = vi.fn()

    render(
      <CryptoStatus
        loading={false}
        error="Error de conexión"
        consulted={true}
        totalCryptos={0}
        filteredCount={0}
        onRetry={onRetry}
      />
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: /volver a intentar/i,
      })
    )

    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('muestra un mensaje cuando no hay resultados', () => {
    render(
      <CryptoStatus
        loading={false}
        error=""
        consulted={true}
        totalCryptos={0}
        filteredCount={0}
        onRetry={vi.fn()}
      />
    )

    expect(
      screen.getByText('No se encontraron resultados.')
    ).toBeInTheDocument()
  })

  it('muestra un mensaje cuando la búsqueda no coincide', () => {
    render(
      <CryptoStatus
        loading={false}
        error=""
        consulted={true}
        totalCryptos={3}
        filteredCount={0}
        onRetry={vi.fn()}
      />
    )

    expect(
      screen.getByText(
        'No hay criptomonedas que coincidan con tu búsqueda.'
      )
    ).toBeInTheDocument()
  })
})
