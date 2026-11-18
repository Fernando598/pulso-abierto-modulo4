
import {
  describe,
  it,
  expect,
  vi,
  afterEach,
} from 'vitest'

import { fetchCryptos } from './cryptoService'

describe('Servicio de criptomonedas', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('obtiene correctamente los precios', async () => {
    const mockResponse = {
      bitcoin: { usd: 50000 },
      ethereum: { usd: 3000 },
      solana: { usd: 150 },
    }

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      })
    )

    const result = await fetchCryptos()

    expect(result).toEqual([
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        price: 50000,
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        price: 3000,
      },
      {
        id: 'solana',
        name: 'Solana',
        price: 150,
      },
    ])
  })

  it('detecta un error HTTP', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    )

    await expect(fetchCryptos()).rejects.toThrow(
      'Error HTTP: 500'
    )
  })

  it('detecta una respuesta inválida', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => null,
      })
    )

    await expect(fetchCryptos()).rejects.toThrow(
      'La respuesta de la API no es válida'
    )
  })
})
