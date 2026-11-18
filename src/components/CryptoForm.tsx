
import { useState } from 'react'
import type { FormEvent } from 'react'
import { z } from 'zod'

const cryptoSchema = z.object({
  name: z.string().trim().min(2, 'Ingresá al menos 2 caracteres'),
  category: z.enum(['principal', 'alternativa'], {
    error: 'Seleccioná una categoría válida',
  }),
})

type CryptoFormData = z.infer<typeof cryptoSchema>

function CryptoForm() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [saved, setSaved] = useState<CryptoFormData | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = cryptoSchema.safeParse({
      name,
      category,
    })

    if (!result.success) {
      setErrors(result.error.issues.map((issue) => issue.message))
      setSaved(null)
      return
    }

    setErrors([])
    setSaved(result.data)
    setName('')
    setCategory('')
  }

  return (
    <section className="crypto-form-section">
      <h2>Registrar criptomoneda para seguimiento</h2>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="crypto-name">Nombre:</label>
        <input
          id="crypto-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ejemplo: Bitcoin"
        />

        <label htmlFor="crypto-category">Categoría:</label>
        <select
          id="crypto-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Seleccionar categoría</option>
          <option value="principal">Principal</option>
          <option value="alternativa">Alternativa</option>
        </select>

        <button type="submit">Registrar</button>
      </form>

      {errors.length > 0 && (
        <div role="alert">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      {saved && (
        <p role="status">
          Registro válido: {saved.name} ({saved.category})
        </p>
      )}
    </section>
  )
}

export default CryptoForm
