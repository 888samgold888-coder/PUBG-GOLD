'use client'

import Link from 'next/link'
import { Trophy, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react'

const RANKS = [
  { value: 'BRONZE_1', label: 'Bronze I' },
  { value: 'BRONZE_2', label: 'Bronze II' },
  { value: 'BRONZE_3', label: 'Bronze III' },
  { value: 'SILVER_1', label: 'Silver I' },
  { value: 'SILVER_2', label: 'Silver II' },
  { value: 'SILVER_3', label: 'Silver III' },
  { value: 'GOLD_1', label: 'Gold I' },
  { value: 'GOLD_2', label: 'Gold II' },
  { value: 'GOLD_3', label: 'Gold III' },
  { value: 'PLATINUM_1', label: 'Platinum I' },
  { value: 'PLATINUM_2', label: 'Platinum II' },
  { value: 'PLATINUM_3', label: 'Platinum III' },
  { value: 'DIAMOND_1', label: 'Diamond I' },
  { value: 'DIAMOND_2', label: 'Diamond II' },
  { value: 'DIAMOND_3', label: 'Diamond III' },
  { value: 'MASTER', label: 'Master' },
  { value: 'GRANDMASTER', label: 'Grandmaster' },
  { value: 'CONQUEROR', label: 'Conqueror' }
]

const RANK_DISPLAY = Object.fromEntries(RANKS.map(r => [r.value, r.label]))

// Mock orders data
const MOCK_ORDERS = [
  {
    id: '1',
    status: 'IN_PROGRESS',
    currentRank: 'GOLD_2',
    targetRank: 'PLATINUM_3',
    price: 67.50,
    progress: 45,
    createdAt: new Date('2025-01-15').toISOString(),
    booster: { name: 'ProGamer_X' }
  },
  {
    id: '2',
    status: 'COMPLETED',
    currentRank: 'SILVER_3',
    targetRank: 'GOLD_1',
    price: 30.00,
    progress: 100,
    createdAt: new Date('2025-01-10').toISOString(),
    booster: { name: 'EliteBooster' }
  },
  {
    id: '3',
    status: 'PENDING',
    currentRank: 'PLATINUM_1',
    targetRank: 'DIAMOND_2',
    price: 90.00,
    progress: 0,
    createdAt: new Date('2025-01-20').toISOString(),
    booster: undefined
  }
]

const STATUS_CONFIG = {
  PENDING: { icon: Clock, color: 'text-yellow-500', label: 'Pending' },
  ASSIGNED: { icon: Trophy, color: 'text-blue-500', label: 'Assigned' },
  IN_PROGRESS: { icon: Loader2, color: 'text-purple-500', label: 'In Progress' },
  COMPLETED: { icon: CheckCircle, color: 'text-green-500', label: 'Completed' },
  CANCELLED: { icon: XCircle, color: 'text-red-500', label: 'Cancelled' }
}

export default function OrdersPage() {
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
              <Link href="#boosters" className="text-gray-300 hover:text-white transition">Boosters</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">My Orders</h1>

        {MOCK_ORDERS.length === 0 ? (
          <div className="bg-white/5 rounded-xl p-12 text-center border border-white/10">
            <Trophy className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
            <p className="text-gray-400 mb-6">Start boosting your rank today!</p>
            <Link 
              href="/" 
              className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => {
              const StatusIcon = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]?.icon || Clock
              const statusColor = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]?.color || 'text-gray-500'
              
              return (
                <Link key={order.id} href={`/orders/${order.id}`}>
                  <div className="bg-white/5 hover:bg-white/10 rounded-xl p-6 border border-white/10 hover:border-yellow-500/50 transition cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <StatusIcon className={`h-8 w-8 ${statusColor}`} />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-semibold">{RANK_DISPLAY[order.currentRank]}</span>
                            <span className="text-gray-400">→</span>
                            <span className="text-yellow-400 font-semibold">{RANK_DISPLAY[order.targetRank]}</span>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">
                            {new Date(order.createdAt).toLocaleDateString()} • ${order.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      {/* Progress */}
                      <div className="flex items-center space-x-4">
                        {order.progress > 0 && (
                          <div className="hidden md:block w-32">
                            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                              <span>Progress</span>
                              <span>{order.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all" 
                                style={{ width: `${order.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        <span className={`text-sm font-medium ${statusColor}`}>
                          {STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]?.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
