
import { useState } from 'react'
import { fetchCryptos } from './services/cryptoService'
import type { Crypto } from './types/crypto'
import CryptoList from './components/CryptoList'
import './App.css'
import CryptoForm from './components/CryptoForm'
import CryptoStatus from './components/CryptoStatus'
import CryptoControls from './components/CryptoControls'

import { useFavoritesStore } from './store/favoritesStore'

function App() {
  const [cryptos, setCryptos] = useState<Crypto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [consulted, setConsulted] = useState(false)
  const [search, setSearch] = useState('')
  
const favorites = useFavoritesStore(
  (state) => state.favorites
)

const toggleFavorite = useFavoritesStore(
  (state) => state.toggleFavorite
)


  async function consultarPrecios() {
    if (loading) return

    setLoading(true)
    setError('')
    setConsulted(false)
    setCryptos([])

    try {
      const results = await fetchCryptos()
      setCryptos(results)
      setConsulted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudieron consultar los precios'
      )
    } finally {
      setLoading(false)
    }
  }

  

  const normalizedSearch = search.toLowerCase().trim()

const filteredCryptos = cryptos.filter((crypto) =>
  crypto.name.toLowerCase().includes(normalizedSearch)
)

  return (
    <div className="app">
      <header>
        <h1>Pulso Abierto</h1>
        <p>Consulta de precios de criptomonedas</p>
      </header>

      <main>
        <h2>Mercado de criptomonedas</h2>
        <p>
          Consultá los precios actualizados de Bitcoin,
          Ethereum y Solana.
        </p>

        
<CryptoControls
  loading={loading}
  search={search}
  onSearchChange={setSearch}
  onConsult={consultarPrecios}
/>


        
<section aria-live="polite" className="results">
  <CryptoStatus
    loading={loading}
    error={error}
    consulted={consulted}
    totalCryptos={cryptos.length}
    filteredCount={filteredCryptos.length}
    onRetry={consultarPrecios}
  />

  {!loading && !error && filteredCryptos.length > 0 && (
    <CryptoList
      cryptos={filteredCryptos}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
    />
  )}
</section>

        <CryptoForm />
      </main>

      <footer>
        <p>Proyecto de Programación Web - Módulo 2</p>
      </footer>
    </div>
  )
}

export default App
