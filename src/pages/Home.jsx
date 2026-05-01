/**
 * Home.jsx — Landing page.
 * Warm greeting + CTA to navigate to the Tasks page.
 */
import { useNavigate } from 'react-router-dom'
import { NotebookPen, Sparkles } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-amber-50 flex flex-col items-center justify-center px-6 py-12">
      {/* Floating emoji */}
      <span className="text-5xl mb-6 animate-bounce-in select-none" role="img" aria-label="sparkles">
        ✨
      </span>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center gap-6 animate-fade-in-up">
        {/* Icon badge */}
        <div className="bg-amber-100 rounded-2xl p-4">
          <NotebookPen className="w-8 h-8 text-amber-600" strokeWidth={1.8} />
        </div>

        {/* Copy */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-900">Semangat Nugasnya! ✨</h1>
          <p className="mt-3 text-amber-700 text-sm leading-relaxed">
            Aku tau hari ini banyak tugasnya. Tapi kamu pasti bisa kelar
            semua kok — satu per satu aja ya 🌻
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/tasks')}
          className="w-full bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-amber-950 font-semibold py-3 px-6 rounded-2xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          Mulai Atur Tugas
        </button>
      </div>

      <p className="mt-8 text-amber-400 text-xs">Kamu bisa. Aku percaya ☀️</p>
    </div>
  )
}
