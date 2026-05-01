/**
 * db.js — Dexie (IndexedDB) setup
 *
 * Stores the 5 tasks with their completion status.
 * The DB is seeded on first run; subsequent runs just read the existing data.
 */
import Dexie from 'dexie'

// --- Database schema ---
export const db = new Dexie('FadiyahTodoDB')

db.version(1).stores({
  // id: auto-increment primary key, done: boolean (0/1 for IndexedDB)
  tasks: '++id, title, done',
})

// --- Default 5 tasks ---
const DEFAULT_TASKS = [
  { title: 'Tugas 1 — Kerjain dulu yang paling gampang! 📝' },
  { title: 'Tugas 2 — Pemanasan selesai, lanjut yang ini! 📖' },
  { title: 'Tugas 3 — Setengah jalan kamu kece banget! ✏️' },
  { title: 'Tugas 4 — Dikit lagi, jangan nyerah ya! 💪' },
  { title: 'Tugas 5 — Last one! Habis ini bebas! 🎉' },
]

/**
 * seedTasks — inserts default tasks only when the table is empty.
 * Call this once on app mount.
 */
export async function seedTasks() {
  const count = await db.tasks.count()
  if (count === 0) {
    await db.tasks.bulkAdd(
      DEFAULT_TASKS.map((t) => ({ title: t.title, done: 0 }))
    )
  }
}

/**
 * toggleTask — flips the done status of a task by its id.
 */
export async function toggleTask(id, currentDone) {
  await db.tasks.update(id, { done: currentDone ? 0 : 1 })
}

/**
 * resetTasks — clears all tasks and re-seeds.
 * Useful for the dev reset button (optional).
 */
export async function resetTasks() {
  await db.tasks.clear()
  await seedTasks()
}
