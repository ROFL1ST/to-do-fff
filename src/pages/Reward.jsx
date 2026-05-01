/**
 * Reward.jsx — Grand finale page.
 *
 * - react-confetti fires automatically on mount
 * - Success message
 * - "Klaim Hadiah" anchor button linking to WhatsApp
 */
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { PartyPopper } from 'lucide-react'

// WhatsApp deep-link with pre-filled claim message
const WA_LINK =
  'https://wa.me/085888768152?text=Halo!%205%20tugasku%20udah%20beres%20semua%20nih.%20Mana%20janji%20traktir%20es%20kopi%20atau%20ayam%20gepreknya%3F%20%F0%9F%98%A4'

export default function Reward() {
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(true)

  // Stop confetti after 6 seconds to save resources
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-dvh bg-amber-50 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Confetti blast */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={220}
          recycle={false}
          colors={['#fbbf24', '#f59e0b', '#fde68a', '#d97706', '#fff7ed', '#fb923c']}
        />
      )}

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center gap-6 animate-bounce-in z-10">
        {/* Trophy emoji */}
        <div className="text-5xl" role="img" aria-label="trophy">🏆</div>

        {/* Icon */}
        <div className="bg-amber-100 rounded-2xl p-4">
          <PartyPopper className="w-8 h-8 text-amber-500" strokeWidth={1.8} />
        </div>

        {/* Success text */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-900 leading-tight">
            Akhirnya selesai semua!
          </h1>
          <p className="mt-3 text-amber-700 text-sm leading-relaxed">
            You did a great job today 🥳<br />
            Aku bangga banget sama kamu!
          </p>
        </div>

        {/* CTA — WhatsApp claim button */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-400 hover:bg-green-500 active:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md text-base text-center"
        >
          💬 Klaim Hadiah via WhatsApp
        </a>

        {/* Small reminder */}
        <p className="text-amber-400 text-xs text-center">
          Es kopi atau ayam geprek — pilih sendiri ya 😤
        </p>
      </div>
    </div>
  )
}
