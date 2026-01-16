import React, { useState, useEffect } from 'react';
import dbService from '../services/dbService';
import { Trade, Trader, SessionType, OperationType, InstrumentType, DirectionType, ResultStatusType } from '../types';
import { SESSIONS, OPTYPES, INSTRUMENTS, DIRECTIONS, TIMEFRAMES, STATUSES, GESTIONTYPES, ERRORTYPES } from '../constants';
import { Save, ChevronLeft, Trash2, Info } from 'lucide-react';

interface TradeFormProps {
  editTrade?: Trade;
  onSuccess: () => void;
  onCancel: () => void;
}

const TradeForm: React.FC<TradeFormProps> = ({ editTrade, onSuccess, onCancel }) => {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [formData, setFormData] = useState<Partial<Trade>>({
    fechaentrada: new Date().toISOString().split('T')[0],
    horaentrada: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    sesion: 'Londres',
    tipooperativa: 'operativapropia',
    tipoinstrumento: 'FX',
    direccion: 'Largo',
    timeframesetup: 'M15',
    ...editTrade
  });

  useEffect(() => {
    dbService.getTraders().then(setTraders);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.traderid || !formData.activo || !formData.precioentrada) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }
    await dbService.saveTrade(formData);
    onSuccess();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden max-w-2xl mx-auto">
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="text-white p-1 hover:bg-slate-800 rounded">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-white">{editTrade ? 'Editar Operación' : 'Nueva Operación'}</h2>
        </div>
        {editTrade && (
          <button
            onClick={() => {
              if (confirm('¿Eliminar trade?')) {
                dbService.deleteTrade(editTrade.id).then(onSuccess);
              }
            }}
            className="text-red-400 hover:text-red-300 p-1"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Info size={14} />Datos Base
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 ml-1">Trader</label>
              <select name="traderid" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" value={formData.traderid} onChange={handleChange} required>
                <option value="">Selecciona Trader</option>
                {traders.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 ml-1">Activo (Ej: EURUSD)</label>
              <input name="activo" placeholder="Activo" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={formData.activo} onChange={handleChange} required />
            </div>
          </div>
        </section>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
          <Save size={20} />{editTrade ? 'Actualizar Registro' : 'Registrar Operación'}
        </button>
      </form>
    </div>
  );
};

export default TradeForm;
