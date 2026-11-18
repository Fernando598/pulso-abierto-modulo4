
interface CryptoControlsProps {
  loading: boolean
  search: string
  onSearchChange: (value: string) => void
  onConsult: () => void
}

function CryptoControls({
  loading,
  search,
  onSearchChange,
  onConsult,
}: CryptoControlsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onConsult}
        disabled={loading}
      >
        {loading ? 'Consultando...' : 'Consultar precios'}
      </button>

      <div className="search-container">
        <label htmlFor="crypto-search">
          Buscar criptomoneda:
        </label>

        <input
          id="crypto-search"
          type="text"
          placeholder="Ejemplo: Bitcoin"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
        />
      </div>
    </>
  )
}

export default CryptoControls
