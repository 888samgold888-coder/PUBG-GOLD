'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Trophy,
  Users,
  MessageCircle,
  Star,
  Shield,
  ChevronDown,
  ArrowRight,
} from 'lucide-react'

const RANKS = [
  { value: 'BRONZE_1', label: 'Bronze I', color: 'from-amber-900 to-amber-700' },
  { value: 'BRONZE_2', label: 'Bronze II', color: 'from-amber-800 to-amber-600' },
  { value: 'BRONZE_3', label: 'Bronze III', color: 'from-amber-700 to-amber-500' },
  { value: 'SILVER_1', label: 'Silver I', color: 'from-slate-400 to-slate-300' },
  { value: 'SILVER_2', label: 'Silver II', color: 'from-slate-300 to-slate-200' },
  { value: 'SILVER_3', label: 'Silver III', color: 'from-slate-200 to-slate-100' },
  { value: 'GOLD_1', label: 'Gold I', color: 'from-yellow-700 to-yellow-500' },
  { value: 'GOLD_2', label: 'Gold II', color: 'from-yellow-600 to-yellow-400' },
  { value: 'GOLD_3', label: 'Gold III', color: 'from-yellow-500 to-yellow-300' },
  { value: 'PLATINUM_1', label: 'Platinum I', color: 'from-cyan-700 to-cyan-500' },
  { value: 'PLATINUM_2', label: 'Platinum II', color: 'from-cyan-600 to-cyan-400' },
  { value: 'PLATINUM_3', label: 'Platinum III', color: 'from-cyan-500 to-cyan-300' },
  { value: 'DIAMOND_1', label: 'Diamond I', color: 'from-blue-800 to-blue-600' },
  { value: 'DIAMOND_2', label: 'Diamond II', color: 'from-blue-700 to-blue-500' },
  { value: 'DIAMOND_3', label: 'Diamond III', color: 'from-blue-600 to-blue-400' },
  { value: 'MASTER', label: 'Master', color: 'from-purple-900 to-purple-700' },
  { value: 'GRANDMASTER', label: 'Grandmaster', color: 'from-purple-800 to-purple-600' },
  { value: 'CONQUEROR', label: 'Conqueror', color: 'from-red-600 to-orange-500' }
]

const RANK_VALUES: Record<string, number> = {
  BRONZE_1: 1, BRONZE_2: 2, BRONZE_3: 3,
  SILVER_1: 4, SILVER_2: 5, SILVER_3: 6,
  GOLD_1: 7, GOLD_2: 8, GOLD_3: 9,
  PLATINUM_1: 10, PLATINUM_2: 11, PLATINUM_3: 12,
  DIAMOND_1: 13, DIAMOND_2: 14, DIAMOND_3: 15,
  MASTER: 16, GRANDMASTER: 17, CONQUEROR: 18
}

function calculatePrice(currentRank: string, targetRank: string): number {
  const currentValue = RANK_VALUES[currentRank]
  const targetValue = RANK_VALUES[targetRank]
  
  if (targetValue <= currentValue) return 0

  const rankDifference = targetValue - currentValue
  let multiplier = 1
  if (targetValue >= 16) multiplier = 2.5
  else if (targetValue >= 13) multiplier = 2
  else if (targetValue >= 10) multiplier = 1.5
  
  return Math.round(rankDifference * 15 * multiplier * 100) / 100
}

export default function Home() {
  const [currentRank, setCurrentRank] = useState('')
  const [targetRank, setTargetRank] = useState('')
  
  const price = currentRank && targetRank ? calculatePrice(currentRank, targetRank) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                PUBG Rank Boost
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="#orders" className="text-gray-300 hover:text-white transition">My Orders</Link>
              <Link href="#boosters" className="text-gray-300 hover:text-white transition">Boosters</Link>
              <Link href="#login" className="text-gray-300 hover:text-white transition">Login</Link>
              <Link 
                href="#register" 
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Reach Your Dream Rank
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Fast & Secure
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Professional PUBG boosting service. Get ranked up by skilled players 
              with real-time tracking and 24/7 support.
            </p>
          </div>

          {/* Rank Selection Card */}
          <div className="max-w-3xl mx-auto mt-16">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Current Rank */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Rank
                  </label>
                  <div className="relative">
                    <select 
                      value={currentRank}
                      onChange={(e) => setCurrentRank(e.target.value)}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-yellow-500 transition"
                    >
                      <option value="" className="bg-gray-900">Select your rank</option>
                      {RANKS.map(rank => (
                        <option key={rank.value} value={rank.value} className="bg-gray-900">
                          {rank.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Target Rank */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Rank
                  </label>
                  <div className="relative">
                    <select 
                      value={targetRank}
                      onChange={(e) => setTargetRank(e.target.value)}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-yellow-500 transition"
                    >
                      <option value="" className="bg-gray-900">Select target rank</option>
                      {RANKS.map(rank => (
                        <option key={rank.value} value={rank.value} className="bg-gray-900">
                          {rank.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Price Display */}
              {(currentRank && targetRank) && (
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-6 mb-6 border border-yellow-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Estimated Price</p>
                      <p className="text-3xl font-bold text-white mt-1">
                        ${price.toFixed(2)}
                      </p>
                    </div>
                    <ArrowRight className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <button 
                disabled={!currentRank || !targetRank}
                className={`w-full py-4 rounded-lg font-bold text-lg transition flex items-center justify-center space-x-2 ${
                  currentRank && targetRank
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black cursor-pointer'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Start Boosting</span>
                {currentRank && targetRank && <ArrowRight className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-yellow-500/50 transition">
              <Shield className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Secure & Safe</h3>
              <p className="text-gray-400">
                Your account security is our priority. We follow all safety guidelines 
                to protect your account.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-yellow-500/50 transition">
              <Users className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Professional Boosters</h3>
              <p className="text-gray-400">
                Our boosters are highly skilled players with proven track records 
                and excellent ratings.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-yellow-500/50 transition">
              <MessageCircle className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Real-time Tracking</h3>
              <p className="text-gray-400">
                Track your order progress in real-time and chat directly with 
                your assigned booster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rank Tiers Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">All Ranks Available</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {RANKS.map((rank) => (
              <div 
                key={rank.value}
                className={`bg-gradient-to-br ${rank.color} rounded-lg p-4 text-center cursor-pointer hover:scale-105 transition transform`}
              >
                <span className="text-white font-bold text-sm">{rank.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2025 PUBG Rank Boost. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
