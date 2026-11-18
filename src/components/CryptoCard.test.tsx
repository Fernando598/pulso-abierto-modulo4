
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CryptoCard from './CryptoCard'

describe('CryptoCard', () => {
  const bitcoin = {
    id: 'bitcoin',
    name: 'Bitcoin',
    price: 50000,
  }

  it('muestra el nombre y el precio', () => {
    render(
      <MemoryRouter>
        <CryptoCard
          crypto={bitcoin}
          isFavorite={false}
          onToggleFavorite={vi.fn()}
        />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { name: 'Bitcoin' })
    ).toBeInTheDocument()

    expect(
      screen.getByText('$50,000.00')
    ).toBeInTheDocument()
  })

  it('permite marcar una criptomoneda como favorita', () => {
    const onToggleFavorite = vi.fn()

    render(
      <MemoryRouter>
        <CryptoCard
          crypto={bitcoin}
          isFavorite={false}
          onToggleFavorite={onToggleFavorite}
        />
      </MemoryRouter>
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: /agregar favorito/i,
      })
    )

    expect(onToggleFavorite).toHaveBeenCalledWith('bitcoin')
    expect(onToggleFavorite).toHaveBeenCalledTimes(1)
  })
})
