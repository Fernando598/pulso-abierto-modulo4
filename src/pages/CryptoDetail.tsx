import { useFavoritesStore } from '../store/favoritesStore'

import { Link, useParams } from 'react-router-dom'
import { CRYPTOS } from '../types/crypto'

function CryptoDetail() {


const favorites = useFavoritesStore(
  (state) => state.favorites
)

const toggleFavorite = useFavoritesStore(
  (state) => state.toggleFavorite
)


  const { id } = useParams<{ id: string }>()

  const crypto = CRYPTOS.find((item) => item.id === id)

  if (!crypto) {
    return (
      <main className="detail-page">
        <h2>Criptomoneda no encontrada</h2>
        <p>No existe información para ese identificador.</p>
        <Link to="/">Volver al inicio</Link>
      </main>
    )
  }

  return (
    <main className="detail-page">
      <h1>{crypto.name}</h1>
      <p>Identificador: {crypto.id}</p>

<button
  type="button"
  aria-pressed={favorites.includes(crypto.id)}
  onClick={() => toggleFavorite(crypto.id)}
>
  {favorites.includes(crypto.id)
    ? '★ Quitar favorito'
    : '☆ Agregar favorito'}
</button>

      <p>
        Esta criptomoneda forma parte de las consultas
        disponibles en Pulso Abierto.
      </p>

      <Link to="/">Volver al inicio</Link>
    </main>
  )
}

export default CryptoDetail
