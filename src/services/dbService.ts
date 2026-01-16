import { Trader, Trade } from '../types';

const TRADERS_KEY = 'academy:traders';
const TRADES_KEY = 'academy:trades';

const initializeMockData = () => {
  if (!localStorage.getItem(TRADERS_KEY)) {
    const names = ['IVN', 'RODRIGO', 'CHISPITA', 'RICARDO', 'LUCAS', 'JOSU', 'CRISTIAN', 'PABLO', 'GUILLERMO'];
    const initialTraders: Trader[] = names.map((name, index) => ({
      id: (index + 1).toString(),
      nombre: name,
      correoelectronico: `${name.toLowerCase().replace(' ', '')}@tradingacademy.com`,
      rol: index === 0 ? 'analistasenior' : 'alumno',
      activo: true,
      createdat: new Date().toISOString(),
      updatedat: new Date().toISOString()
    }));
    localStorage.setItem(TRADERS_KEY, JSON.stringify(initialTraders));
  }
};

initializeMockData();

export const dbService = {
  async getTraders(): Promise<Trader[]> {
    const data = localStorage.getItem(TRADERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  async saveTrader(trader: Partial<Trader>): Promise<Trader> {
    const traders = await this.getTraders();
    const newTrader: Trader = {
      id: trader.id || crypto.randomUUID(),
      nombre: trader.nombre || 'Sin nombre',
      correoelectronico: trader.correoelectronico || '',
      rol: trader.rol || 'alumno',
      activo: trader.activo !== undefined ? trader.activo : true,
      createdat: trader.createdat || new Date().toISOString(),
      updatedat: new Date().toISOString()
    };
    const index = traders.findIndex(t => t.id === newTrader.id);
    if (index > -1) {
      traders[index] = newTrader;
    } else {
      traders.push(newTrader);
    }
    localStorage.setItem(TRADERS_KEY, JSON.stringify(traders));
    return newTrader;
  },

  async deleteTrader(id: string): Promise<void> {
    const traders = await this.getTraders();
    const filtered = traders.filter(t => t.id !== id);
    localStorage.setItem(TRADERS_KEY, JSON.stringify(filtered));
  },

  async getTrades(): Promise<Trade[]> {
    const traders = await this.getTraders();
    const data = localStorage.getItem(TRADES_KEY);
    const trades: Trade[] = data ? JSON.parse(data) : [];
    return trades.map(trade => ({
      ...trade,
      tradername: traders.find(t => t.id === trade.traderid)?.nombre || 'Desconocido'
    }));
  },

  async saveTrade(trade: Partial<Trade>): Promise<Trade> {
    const trades = await this.getTrades();
    const newTrade: Trade = {
      ...(trade as Trade),
      id: trade.id || crypto.randomUUID(),
      createdat: trade.createdat || new Date().toISOString(),
      updatedat: new Date().toISOString()
    };
    const index = trades.findIndex(t => t.id === newTrade.id);
    if (index > -1) {
      trades[index] = newTrade;
    } else {
      trades.push(newTrade);
    }
    localStorage.setItem(TRADES_KEY, JSON.stringify(trades));
    return newTrade;
  },

  async deleteTrade(id: string): Promise<void> {
    const trades = await this.getTrades();
    const filtered = trades.filter(t => t.id !== id);
    localStorage.setItem(TRADES_KEY, JSON.stringify(filtered));
  }
};

export default dbService;
