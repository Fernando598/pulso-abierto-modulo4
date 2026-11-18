
import { CRYPTOS } from '../types/crypto.ts'
import type { Crypto } from '../types/crypto.ts'

const API_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd'

export async function fetchCryptos(): Promise<Crypto[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`)
  }

  const data: unknown = await response.json()

  if (typeof data !== 'object' || data === null) {
    throw new Error('La respuesta de la API no es válida')
  }

  const results: Crypto[] = []

  for (const crypto of CRYPTOS) {
    const record = (data as Record<string, unknown>)[crypto.id]

    if (typeof record !== 'object' || record === null) {
      continue
    }

    const price = (record as Record<string, unknown>).usd

    if (typeof price !== 'number' || !Number.isFinite(price)) {
      continue
    }

    results.push({
      id: crypto.id,
      name: crypto.name,
      price: price,
    })
  }

  return results
}
