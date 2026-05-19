'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  Trophy,
  ArrowRight,
  MessageCircle,
  Send,
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

const RANK_DISPLAY = Object.fromEntries(RANKS.map(r => [r.value, r.label]))
const RANK_COLORS = Object.fromEntries(RANKS.map(r => [r.value, r.color]))

// Mock order data
const MOCK_ORDER = {
  id: '1',
  status: 'IN_PROGRESS',
  currentRank: 'GOLD_2',
  targetRank: 'PLATINUM_3',
  price: 67.50,
  progress: 45,
  createdAt: new Date('2025-01-15').toISOString(),
  customer: { name: 'John Doe', email: 'john@example.com' },
  booster: { name: 'ProGamer_X', email: 'pro@booster.com' },
  chatMessages: [
    {
      id: '1',
      content: 'Hey! I\'m ready to start your boost. What\'s your PUBG ID?',
      createdAt: new Date('2025-01-15T10:00:00').toISOString(),
      sender: { id: 'booster', name: 'ProGamer_X' }
    },
    {
      id: '2',
      content: 'My ID is 500123456789. Thanks!',
      createdAt: new Date('2025-01-15T10:05:00').toISOString(),
      sender: { id: 'customer', name: 'John Doe' }
    },
    {
      id: '3',
      content: 'Got it! I\'ll start the boost right away. Expected time: 2-3 hours.',
      createdAt: new Date('2025-01-15T10:10:00').toISOString(),
      sender: { id: 'booster', name: 'ProGamer_X' }
    }
  ]
}

export default function OrderDetailPage() {
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState(MOCK_ORDER.chatMessages)

  function sendMessage() {
    if (!message.trim()) return
    
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      createdAt: new Date().toISOString(),
      sender: { id: 'customer', name: 'John Doe' }
    }
    setChatMessages([...chatMessages, newMessage])
    setMessage('')
  }

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
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Order Header */}
        <div className="bg-white/5 rounded-xl p-8 border border-white/10 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">Order Details</h1>
            <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              MOCK_ORDER.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
              MOCK_ORDER.status === 'IN_PROGRESS' ? 'bg-purple-500/20 text-purple-400' :
              MOCK_ORDER.status === 'ASSIGNED' ? 'bg-blue-500/20 text-blue-400' :
              'bg-yellow-500/20 text-yellow-400'
            }`}>
              {MOCK_ORDER.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          {/* Rank Progression */}
          <div className="flex items-center justify-center mb-8">
            <div className={`bg-gradient-to-br ${RANK_COLORS[MOCK_ORDER.currentRank]} rounded-xl p-6 text-center min-w-[120px]`}>
              <p className="text-gray-300 text-sm">Current</p>
              <p className="text-white font-bold text-lg">{RANK_DISPLAY[MOCK_ORDER.currentRank]}</p>
            </div>
            <ArrowRight className="h-8 w-8 text-gray-500 mx-4" />
            <div className={`bg-gradient-to-br ${RANK_COLORS[MOCK_ORDER.targetRank]} rounded-xl p-6 text-center min-w-[120px]`}>
              <p className="text-gray-300 text-sm">Target</p>
              <p className="text-white font-bold text-lg">{RANK_DISPLAY[MOCK_ORDER.targetRank]}</p>
            </div>
          </div>

          {/* Progress Bar */}
          {MOCK_ORDER.progress > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{MOCK_ORDER.progress}% Complete</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all" 
                  style={{ width: `${MOCK_ORDER.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Order Info */}
          <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
            <div>
              <p className="text-gray-400 text-sm">Price</p>
              <p className="text-2xl font-bold text-white mt-1">${MOCK_ORDER.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Order Date</p>
              <p className="text-white mt-1">{new Date(MOCK_ORDER.createdAt).toLocaleDateString()}</p>
            </div>
            {MOCK_ORDER.booster && (
              <div>
                <p className="text-gray-400 text-sm">Assigned Booster</p>
                <p className="text-yellow-400 font-semibold mt-1">{MOCK_ORDER.booster.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Section */}
        {MOCK_ORDER.booster && (
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Chat with Booster</span>
            </h2>

            {/* Messages */}
            <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
              {chatMessages.length === 0 && (
                <p className="text-gray-500 text-center py-4">No messages yet. Start the conversation!</p>
              )}
              {chatMessages.map((msg) => {
                const isOwnMessage = msg.sender.id === 'customer'
                return (
                  <div key={msg.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-lg p-3 ${
                      isOwnMessage 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-gray-700 text-white'
                    }`}>
                      {!isOwnMessage && (
                        <p className="text-xs text-gray-400 mb-1">{msg.sender.name}</p>
                      )}
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Message Input */}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition"
              />
              <button 
                onClick={sendMessage}
                disabled={!message.trim()}
                className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-700 disabled:cursor-not-allowed text-black p-3 rounded-lg transition"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
