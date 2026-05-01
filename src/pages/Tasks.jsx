/**
 * Tasks.jsx — Full CRUD task manager.
 *
 * Features:
 *  - Add tasks via input + button
 *  - Toggle completion (animated strikethrough)
 *  - Inline edit mode per task
 *  - Delete task
 *  - Dynamic progress bar (% completed)
 *  - Encouragement text based on progress
 *  - "Lihat Hadiah" button when 100% complete
 */
import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Trash2, Pencil, CheckCircle2,
  Circle, Gift, Check, X,
} from 'lucide-react'
import { db, addTask, toggleTask, editTask, deleteTask } from '../db'

// ── Encouragement logic ───────────────────────────────
function getEncouragement(total, completed) {
  if (total === 0)          return 'Yuk masukin tugasmu dan cicil satu-satu...'
  const pct = (completed / total) * 100
  if (pct === 0)            return 'Yuk masukin tugasmu dan cicil satu-satu...'
  if (pct > 0  && pct <= 50) return 'Awal yang bagus! Semangat terus 🚀'
  if (pct > 50 && pct < 100) return 'Udah lewat separuh jalan! Dikit lagi ✨'
  return null // 100% → show button instead
}

export default function Tasks() {
  const navigate  = useNavigate()
  const [input,   setInput]   = useState('')
  const [editId,  setEditId]  = useState(null)  // id of task being edited
  const [editVal, setEditVal] = useState('')     // current edit input value

  // Live query — auto re-renders on any DB change
  const tasks = useLiveQuery(() => db.tasks.orderBy('id').toArray(), [])

  if (!tasks) {
    return (
      <div className="min-h-dvh bg-amber-50 flex items-center justify-center">
        <p className="text-amber-400 animate-pulse text-sm">Loading...</p>
      </div>
    )
  }

  const total     = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0
  const allDone   = total > 0 && completed === total
  const message   = getEncouragement(total, completed)

  // ── Handlers ────────────────────────────────────────
  const handleAdd = async () => {
    if (!input.trim()) return
    await addTask(input)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  const startEdit = (task) => {
    setEditId(task.id)
    setEditVal(task.title)
  }

  const confirmEdit = async (id) => {
    if (editVal.trim()) await editTask(id, editVal)
    setEditId(null)
  }

  const cancelEdit = () => setEditId(null)

  const handleEditKey = (e, id) => {
    if (e.key === 'Enter')  confirmEdit(id)
    if (e.key === 'Escape') cancelEdit()
  }

  return (
    <div className="min-h-dvh bg-amber-50 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-sm flex flex-col gap-5 animate-fade-in-up">

        {/* ── Header ── */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-amber-900">Tugas Hari Ini 📋</h1>
          <p className="text-amber-500 text-xs mt-1">
            {completed} dari {total} tugas selesai
          </p>
        </div>

        {/* ── Progress bar ── */}
        <div className="bg-amber-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-amber-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        {/* ── Add task input ── */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tulis tugasmu di sini..."
            className="flex-1 bg-white border border-amber-200 rounded-2xl px-4 py-2.5 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
          />
          <button
            onClick={handleAdd}
            disabled={!input.trim()}
            aria-label="Tambah tugas"
            className="bg-amber-400 hover:bg-amber-500 active:bg-amber-600 disabled:opacity-40 text-amber-950 font-semibold px-4 py-2.5 rounded-2xl transition-colors duration-150 flex items-center gap-1 text-sm"
          >
            <Plus className="w-4 h-4" />
            Tambah
          </button>
        </div>

        {/* ── Task list ── */}
        {total === 0 ? (
          <div className="text-center py-10 text-amber-300 text-sm">
            Belum ada tugas. Yuk tambah satu dulu! 🌸
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-sm transition-all duration-200 ${
                  task.completed ? 'task-done opacity-75' : ''
                }`}
              >
                {/* Checkbox toggle */}
                <button
                  onClick={() => toggleTask(task.id, task.completed)}
                  aria-label={task.completed ? 'Tandai belum selesai' : 'Tandai selesai'}
                  className="shrink-0 text-amber-400 hover:text-amber-500 transition-colors"
                >
                  {task.completed
                    ? <CheckCircle2 className="w-5 h-5 text-amber-500" />
                    : <Circle      className="w-5 h-5 text-amber-300" />}
                </button>

                {/* Title / Inline edit */}
                {editId === task.id ? (
                  <input
                    autoFocus
                    value={editVal}
                    onChange={(e) => setEditVal(e.target.value)}
                    onKeyDown={(e) => handleEditKey(e, task.id)}
                    className="flex-1 bg-amber-50 border border-amber-300 rounded-xl px-3 py-1 text-sm text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                ) : (
                  <span
                    className={`task-text flex-1 text-sm font-medium ${
                      task.completed ? 'text-amber-400' : 'text-amber-900'
                    }`}
                  >
                    {task.title}
                  </span>
                )}

                {/* Action buttons */}
                <div className="flex items-center gap-1 shrink-0">
                  {editId === task.id ? (
                    <>
                      {/* Confirm edit */}
                      <button
                        onClick={() => confirmEdit(task.id)}
                        aria-label="Simpan"
                        className="p-1.5 rounded-xl text-green-500 hover:bg-green-50 transition"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      {/* Cancel edit */}
                      <button
                        onClick={cancelEdit}
                        aria-label="Batal"
                        className="p-1.5 rounded-xl text-red-400 hover:bg-red-50 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Edit */}
                      <button
                        onClick={() => startEdit(task)}
                        aria-label="Edit tugas"
                        className="p-1.5 rounded-xl text-amber-400 hover:bg-amber-50 transition"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => deleteTask(task.id)}
                        aria-label="Hapus tugas"
                        className="p-1.5 rounded-xl text-red-400 hover:bg-red-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* ── Encouragement / Reward ── */}
        {message && (
          <div className="bg-amber-100 border border-amber-200 rounded-2xl px-4 py-3 text-center">
            <p className="text-amber-700 text-sm font-medium">{message}</p>
          </div>
        )}

        {allDone && (
          <button
            onClick={() => navigate('/reward')}
            className="w-full bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-amber-950 font-bold py-4 rounded-2xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-md text-base animate-bounce-in"
          >
            <Gift className="w-5 h-5" />
            Lihat Hadiah 🎁
          </button>
        )}

      </div>
    </div>
  )
}
