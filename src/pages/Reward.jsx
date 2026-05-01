/**
 * Reward.jsx — Grand finale page.
 *
 * - react-confetti auto-fires on mount
 * - Success message
 * - WhatsApp "Klaim Hadiah" anchor button
 */
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { PartyPopper } from 'lucide-react'

// Pre-encoded WhatsApp deep-link
const WA_LINK =
  'https://wa.me/085888768152?text=Halo!%20Tugasku%20udah%20beres%20semua%20nih.%20Mana%20janji%20traktir%20es%20kopi%20atau%20ayam%20gepreknya%3F%20%F0%9F%98%A4'

export default function Reward() {
  const [size, setSize]           = useState({ w: window.innerWidth, h: window.innerHeight })
  const [showConfetti, setShow]   = useState(true)

  // Track window resize for correct confetti canvas size
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Auto-stop confetti after 6 s to save resources
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 6000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-dvh bg-amber-50 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={size.w}
          height={size.h}
          numberOfPieces={220}
          recycle={false}
          colors={['#fbbf24','#f59e0b','#fde68a','#d97706','#fff7ed','#fb923c']}
        />
      )}

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center gap-6 animate-bounce-in z-10">
        <div className="text-5xl select-none" role="img" aria-label="trophy">🏆</div>

        <div className="bg-amber-100 rounded-2xl p-4">
          <PartyPopper className="w-8 h-8 text-amber-500" strokeWidth={1.8} />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-900 leading-tight">
            Akhirnya selesai semua!
          </h1>
          <p className="mt-3 text-amber-700 text-sm leading-relaxed">
            You did a great job today 🥳<br />
            Bangga banget sama kamu!
          </p>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-400 hover:bg-green-500 active:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-md text-base text-center"
        >
          💬 Klaim Hadiah via WhatsApp
        </a>

        <p className="text-amber-400 text-xs text-center">
          Es kopi atau ayam geprek — pilih sendiri ya 😤
        </p>
      </div>
    </div>
  )
}
