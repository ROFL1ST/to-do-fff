/**
 * App.jsx — Root component with react-router-dom BrowserRouter setup.
 *
 * Routes:
 *   /         → Home (landing page)
 *   /tasks    → Tasks (to-do list)
 *   /reward   → Reward (grand finale)
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Reward from './pages/Reward'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/reward" element={<Reward />} />
      </Routes>
    </BrowserRouter>
  )
}
