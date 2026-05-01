/**
 * db.js — Dexie (IndexedDB) setup
 *
 * Table: tasks
 *   id        — auto-increment primary key
 *   title     — string, the task description
 *   completed — boolean
 */
import Dexie from 'dexie'

export const db = new Dexie('FadiyahTodoDB')

db.version(1).stores({
  tasks: '++id, title, completed',
})

// ── CRUD helpers ──────────────────────────────────────

/** Add a new task */
export const addTask = (title) =>
  db.tasks.add({ title: title.trim(), completed: false })

/** Toggle the completed flag */
export const toggleTask = (id, completed) =>
  db.tasks.update(id, { completed: !completed })

/** Update the title of a task */
export const editTask = (id, title) =>
  db.tasks.update(id, { title: title.trim() })

/** Delete a task permanently */
export const deleteTask = (id) =>
  db.tasks.delete(id)
