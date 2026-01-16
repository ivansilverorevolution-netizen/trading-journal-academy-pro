import React from 'react';
import { Trade } from '../types';
import { Edit2, Trash2 } from 'lucide-react';

interface TradeListProps {
  trades: Trade[];
  onEdit: (trade: Trade) => void;
  onDelete: (id: string) => void;
}

export default function TradeList({ trades, onEdit, onDelete }: TradeListProps) {
  if (!trades || trades.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        No hay operaciones registradas aún
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {trades.map((trade) => (
        <div
          key={trade.id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-lg">{trade.trader_id}</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    trade.resultado === 'Ganadora'
                      ? 'bg-green-100 text-green-800'
                      : trade.resultado === 'Perdedora'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {trade.resultado}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
                <div>
                  <span className="font-medium">Entrada:</span> {trade.fecha_entrada}
                </div>
                <div>
                  <span className="font-medium">Cierre:</span> {trade.fecha_cierre}
                </div>
                <div>
                  <span className="font-medium">Sesión:</span> {trade.sesion}
                </div>
                <div>
                  <span className="font-medium">Operación:</span> {trade.operacion}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(trade)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(trade.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}