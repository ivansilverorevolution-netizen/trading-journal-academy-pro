import { useState } from 'react'
import Dashboard from './components/Dashboard'
import TradeForm from './components/TradeForm'
import TradeList from './components/TradeList'
import TradersRankingList from './components/TradersRankingList'
import { Trade } from './types'
import { PlusCircle, BarChart3, List, Users } from 'lucide-react'

type View = 'dashboard' | 'trades' | 'traders' | 'newTrade'

function App() {
  const [view, setView] = useState<View>('dashboard')
  const [editingTrade, setEditingTrade] = useState<Trade | undefined>()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-black text-slate-900">Trading Journal Academy Pro</h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setView('dashboard')} className={`px-4 py-2 rounded-xl font-semibold transition-colors ${view === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                <BarChart3 size={18} className="inline mr-2" />
                Dashboard
              </button>
              <button onClick={() => setView('trades')} className={`px-4 py-2 rounded-xl font-semibold transition-colors ${view === 'trades' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                <List size={18} className="inline mr-2" />
                Operaciones
              </button>
              <button onClick={() => setView('traders')} className={`px-4 py-2 rounded-xl font-semibold transition-colors ${view === 'traders' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                <Users size={18} className="inline mr-2" />
                Equipo
              </button>
              <button onClick={() => {setView('newTrade'); setEditingTrade(undefined)}} className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
                <PlusCircle size={18} className="inline mr-2" />
                Nueva Operación
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'dashboard' && <Dashboard />}
        {view === 'trades' && <TradeList onEdit={(trade) => {setEditingTrade(trade); setView('newTrade')}} />}
        {view === 'traders' && <TraderList />}
        {view === 'newTrade' && (
          <TradeForm 
            editTrade={editingTrade}
            onSuccess={() => setView('trades')}
            onCancel={() => setView('trades')}
          />
        )}
      </main>
    </div>
  )
}

export default App
