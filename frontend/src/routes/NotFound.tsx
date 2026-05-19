import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="page">
      <h1 className="page-title">Pagina non trovata</h1>
      <p className="muted">Il percorso richiesto non esiste.</p>
      <Link to="/" className="btn btn--primary">
        Torna alla home
      </Link>
    </div>
  )
}
