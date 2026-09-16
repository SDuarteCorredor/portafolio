// lucide-react no trae el logo de GitHub (quitaron los íconos de marca). El
// resto del set de trazo viene de esa librería, pero para un enlace a GitHub
// el ojo busca la marca reconocible, no un glifo abstracto — así que esta es
// la única excepción: el trazo del octocat, a un color, heredando currentColor
// igual que cualquier ícono del sitio.
export function GithubMark({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.05 3.28 9.33 7.84 10.84.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.19.7-3.86-1.36-3.86-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12.02C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}
