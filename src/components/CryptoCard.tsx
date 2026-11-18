
import type { Crypto } from '../types/crypto'
import { Link } from 'react-router-dom'

interface CryptoCardProps {
  crypto: Crypto
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

function CryptoCard({
  crypto,
  isFavorite,
  onToggleFavorite,
}: CryptoCardProps) {
  return (
    <article className="crypto-card">
      <h3>{crypto.name}</h3>

      <p>
        {crypto.price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </p>

        <Link className="detail-link" to={`/crypto/${crypto.id}`}>
          Ver detalle
        </Link>

      <button
        type="button"
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(crypto.id)}
      >
        {isFavorite ? '★ Quitar favorito' : '☆ Agregar favorito'}
      </button>
    </article>
  )
}

export default CryptoCard
