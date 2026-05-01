/**
 * App.jsx — Root component with BrowserRouter.
 *
 * Routes:
 *   /        → Home
 *   /tasks   → Tasks (CRUD)
 *   /reward  → Reward (confetti + WhatsApp)
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home   from './pages/Home'
import Tasks  from './pages/Tasks'
import Reward from './pages/Reward'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<Home />}   />
        <Route path="/tasks"  element={<Tasks />}  />
        <Route path="/reward" element={<Reward />} />
      </Routes>
    </BrowserRouter>
  )
}
