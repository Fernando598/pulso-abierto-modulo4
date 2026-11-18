
export interface Crypto {
  id: string
  name: string
  price: number
}

export const CRYPTOS = [
  { id: 'bitcoin', name: 'Bitcoin' },
  { id: 'ethereum', name: 'Ethereum' },
  { id: 'solana', name: 'Solana' },
] as const
