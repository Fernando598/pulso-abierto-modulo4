
import CryptoCard from './CryptoCard'
import type { Crypto } from '../types/crypto'

interface CryptoListProps {
  cryptos: Crypto[]
  favorites: string[]
  onToggleFavorite: (id: string) => void
}

function CryptoList({
  cryptos,
  favorites,
  onToggleFavorite,
}: CryptoListProps) {
  return (
    <div className="crypto-grid">
      {cryptos.map((crypto) => (
        <CryptoCard
          key={crypto.id}
          crypto={crypto}
          isFavorite={favorites.includes(crypto.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default CryptoList
