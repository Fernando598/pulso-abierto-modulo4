
interface CryptoStatusProps {
  loading: boolean
  error: string
  consulted: boolean
  totalCryptos: number
  filteredCount: number
  onRetry: () => void
}

function CryptoStatus({
  loading,
  error,
  consulted,
  totalCryptos,
  filteredCount,
  onRetry,
}: CryptoStatusProps) {
  if (loading) {
    return <p role="status">Obteniendo precios...</p>
  }

  if (error) {
    return (
      <div role="alert">
        <p>{error}</p>
        <button type="button" onClick={onRetry}>
          Volver a intentar
        </button>
      </div>
    )
  }

  if (consulted && totalCryptos === 0) {
    return <p>No se encontraron resultados.</p>
  }

  if (totalCryptos > 0 && filteredCount === 0) {
    return (
      <p>No hay criptomonedas que coincidan con tu búsqueda.</p>
    )
  }

  return null
}

export default CryptoStatus
