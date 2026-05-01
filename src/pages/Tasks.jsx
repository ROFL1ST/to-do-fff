/**
 * Tasks.jsx — Main to-do list page.
 *
 * - Reads & writes to Dexie DB via live query (useLiveQuery)
 * - Dynamic progress bar
 * - 5 checkboxes with animated strikethrough
 * - Dynamic encouragement text based on completion count
 * - Shows "Lihat Hadiah" button when all 5 are done
 *
 * NOTE: useLiveQuery is exported directly from 'dexie' since v4.
 * No need for the separate 'dexie-react-hooks' package.
 */
import { useEffect } from 'react'
import { useLiveQuery } from 'dexie'   // ← fix: import from 'dexie', not 'dexie-react-hooks'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle, Gift } from 'lucide-react'
import { db, seedTasks, toggleTask } from '../db'

// --- Encouragement messages per completed count ---
const ENCOURAGEMENTS = [
  '', // 0 done — no message
  'Satu kelar! Keren 🚀',
  'Dua down! Ritme kamu lagi bagus nih 🔥',
  'Tiga beres! Kamu hampir separuh jalan 💛',
  'Sisa satu lagi! 🛋️ Sebentar lagi bebas~',
  'Semua kelar!! Kamu luar biasa hari ini 🥳',
]

export default function Tasks() {
  const navigate = useNavigate()

  // Seed DB on first mount
  useEffect(() => { seedTasks() }, [])

  // Live-reactive query — re-renders whenever DB changes
  const tasks = useLiveQuery(() => db.tasks.orderBy('id').toArray(), [])

  if (!tasks) {
    // Loading state while Dexie initializes
    return (
      <div className="min-h-dvh bg-amber-50 flex items-center justify-center">
        <p className="text-amber-500 animate-pulse">Loading tugas...</p>
      </div>
    )
  }

  const doneCount = tasks.filter((t) => t.done).length
  const total = tasks.length
  const progressPct = total > 0 ? Math.round((doneCount / total) * 100) : 0
  const allDone = doneCount === total && total > 0

  return (
    <div className="min-h-dvh bg-amber-50 flex flex-col items-center px-5 py-10">
      <div className="w-full max-w-sm flex flex-col gap-6 animate-fade-in-up">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-amber-900">Daftar Tugasmu 📋</h1>
          <p className="text-amber-600 text-sm mt-1">
            {doneCount} dari {total} tugas selesai
          </p>
        </div>

        {/* Progress bar */}
        <div className="bg-amber-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-amber-400 h-3 rounded-full animate-progress transition-all duration-500"
            style={{ width: `${progressPct}%` }}
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        {/* Task list */}
        <ul className="flex flex-col gap-3">
          {tasks.map((task, i) => (
            <li
              key={task.id}
              className={`flex items-start gap-3 bg-white rounded-2xl px-4 py-4 shadow-sm cursor-pointer select-none transition-all duration-200 hover:shadow-md active:scale-[0.98] ${
                task.done ? 'task-done opacity-70' : ''
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => toggleTask(task.id, task.done)}
              role="checkbox"
              aria-checked={!!task.done}
              tabIndex={0}
              onKeyDown={(e) => e.key === ' ' && toggleTask(task.id, task.done)}
            >
              {/* Checkbox icon */}
              {task.done ? (
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
              )}

              {/* Task label with animated strikethrough via CSS class */}
              <span
                className={`task-label text-sm font-medium leading-snug ${
                  task.done ? 'text-amber-400' : 'text-amber-900'
                }`}
              >
                {task.title}
              </span>
            </li>
          ))}
        </ul>

        {/* Encouragement text — dynamic based on doneCount */}
        {ENCOURAGEMENTS[doneCount] && (
          <div className="bg-amber-100 border border-amber-200 rounded-2xl px-4 py-3 text-center animate-bounce-in">
            <p className="text-amber-700 font-medium text-sm">
              {ENCOURAGEMENTS[doneCount]}
            </p>
          </div>
        )}

        {/* Lihat Hadiah button — only visible when all 5 are done */}
        {allDone && (
          <button
            onClick={() => navigate('/reward')}
            className="w-full bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-amber-950 font-bold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md text-base animate-bounce-in"
          >
            <Gift className="w-5 h-5" />
            Lihat Hadiah 🎁
          </button>
        )}
      </div>
    </div>
  )
}
