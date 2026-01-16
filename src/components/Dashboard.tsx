import React, { useMemo, useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import dbService from '../services/dbService';
import { Trade, Trader } from '../types';
import { TrendingUp, Percent, Hash, Scale, Filter, Target, ArrowDownCircle, Calendar, User, Zap, BarChart3 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [traders, setTraders] = useState<Trader[]>([]);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', trader: '', strategy: '' });

  useEffect(() => {
    const fetchData = async () => {
      const [tData, trData] = await Promise.all([dbService.getTrades(), dbService.getTraders()]);
      setTrades(tData);
      setTraders(trData);
    };
    fetchData();
  }, []);

  const filteredTrades = useMemo(() => {
    return trades.filter(t => {
      if (filters.startDate && t.fechaentrada < filters.startDate) return false;
      if (filters.endDate && t.fechaentrada > filters.endDate) return false;
      if (filters.trader && t.traderid !== filters.trader) return false;
      if (filters.strategy && t.estrategia !== filters.strategy) return false;
      return true;
    });
  }, [trades, filters]);

  const stats = useMemo(() => {
    const total = filteredTrades.length;
    if (total === 0) return { total: 0, winrate: 0, totalR: 0, avgR: 0, expectancy: 0, maxDD: 0 };
    
    const winners = filteredTrades.filter(t => t.resultadoestado === 'Ganadora');
    const winrate = (winners.length / total) * 100;
    const totalR = filteredTrades.reduce((acc, t) => acc + (t.resultador || 0), 0);
    const avgR = totalR / total;
    
    return { total, winrate, totalR, avgR, expectancy: 0, maxDD: 0 };
  }, [filteredTrades]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-900">Dashboard Profesional</h2>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100">
          <div className="bg-slate-50 w-10 h-10 rounded-2xl flex items-center justify-center mb-4">
            <Hash size={20} className="text-slate-700" />
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase">Trades Totales</p>
          <p className="text-2xl font-black mt-1">{stats.total}</p>
        </div>
        
        <div className="bg-white p-5 rounded-3xl border border-slate-100">
          <div className="bg-emerald-50 w-10 h-10 rounded-2xl flex items-center justify-center mb-4">
            <Percent size={20} className="text-emerald-600" />
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase">Winrate</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{stats.winrate.toFixed(1)}%</p>
        </div>
        
        <div className="bg-white p-5 rounded-3xl border border-slate-100">
          <div className="bg-blue-50 w-10 h-10 rounded-2xl flex items-center justify-center mb-4">
            <TrendingUp size={20} className="text-blue-600" />
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase">R Acumulado</p>
          <p className="text-2xl font-black text-blue-600 mt-1">{stats.totalR.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
