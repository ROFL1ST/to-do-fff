/**
 * Home.jsx — Landing page.
 *
 * Warm greeting to motivate the user to start her tasks.
 * Navigates to /tasks on button click.
 */
import { useNavigate } from 'react-router-dom'
import { Sparkles, BookOpen } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-amber-50 flex flex-col items-center justify-center px-6 py-12">
      {/* Decorative top emoji */}
      <span className="text-5xl mb-6 animate-bounce-in" role="img" aria-label="sparkles">
        ✨
      </span>

      {/* Main card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center gap-6 animate-fade-in-up">
        {/* Icon */}
        <div className="bg-amber-100 rounded-2xl p-4">
          <BookOpen className="w-8 h-8 text-amber-600" strokeWidth={1.8} />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-900 leading-tight">
            Semangat Nugasnya! ✨
          </h1>
          <p className="mt-3 text-amber-700 text-sm leading-relaxed">
            Aku tau hari ini banyak banget tugasnya. Tapi kamu pasti bisa
            kelar semua kok! Satu per satu ya 🌻
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/tasks')}
          className="w-full bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-amber-950 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          Mulai Kerjain Tugas
        </button>
      </div>

      {/* Footer note */}
      <p className="mt-8 text-amber-500 text-xs text-center">
        5 tugas menunggumu ☕
      </p>
    </div>
  )
}
