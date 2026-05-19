'use client'

import { Trophy, Star, CheckCircle, User } from 'lucide-react'
import Link from 'next/link'

const BOOSTERS = [
  {
    id: '1',
    name: 'ProGamer_X',
    rank: 'CONQUEROR',
    rating: 4.9,
    ordersCompleted: 523,
    responseTime: '< 5 min',
    online: true
  },
  {
    id: '2',
    name: 'RankMaster99',
    rank: 'GRANDMASTER',
    rating: 4.8,
    ordersCompleted: 412,
    responseTime: '< 10 min',
    online: true
  },
  {
    id: '3',
    name: 'EliteBooster',
    rank: 'MASTER',
    rating: 4.7,
    ordersCompleted: 289,
    responseTime: '< 15 min',
    online: false
  },
  {
    id: '4',
    name: 'TopTierPlayer',
    rank: 'CONQUEROR',
    rating: 5.0,
    ordersCompleted: 678,
    responseTime: '< 3 min',
    online: true
  }
]

const RANK_DISPLAY: Record<string, string> = {
  CONQUEROR: 'Conqueror',
  GRANDMASTER: 'Grandmaster',
  MASTER: 'Master'
}

export default function BoostersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <nav className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                PUBG Rank Boost
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
              <Link href="/orders" className="text-gray-300 hover:text-white transition">My Orders</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Top Rated Boosters</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our pool of professional boosters. All boosters are verified 
            and have proven track records.
          </p>
        </div>

        {/* Boosters Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BOOSTERS.map((booster) => (
            <div 
              key={booster.id} 
              className="bg-white/5 hover:bg-white/10 rounded-xl p-6 border border-white/10 hover:border-yellow-500/50 transition cursor-pointer"
            >
              {/* Avatar & Status */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-black" />
                  </div>
                  {booster.online && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{booster.name}</h3>
                  <p className="text-yellow-400 text-sm">{RANK_DISPLAY[booster.rank]}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Rating</span>
                  </span>
                  <span className="text-white font-medium">{booster.rating}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>Orders</span>
                  </span>
                  <span className="text-white">{booster.ordersCompleted}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Response Time</span>
                  <span className="text-white">{booster.responseTime}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="pt-4 border-t border-white/10">
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  booster.online 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {booster.online ? 'Online Now' : 'Offline'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/" 
            className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-semibold px-8 py-4 rounded-lg transition text-lg"
          >
            Start Your Boost
          </Link>
        </div>
      </div>
    </div>
  )
}
