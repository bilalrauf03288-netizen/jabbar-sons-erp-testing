import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart3,
  Search,
  Bell,
  Menu,
  LogOut,
  Sun,
  Moon,
  Wallet,
  Lock,
  Plus,
  TrendingUp,
  CalendarDays,
  Download
} from 'lucide-react';

type TabKey = 'dashboard' | 'inventory' | 'sales' | 'accounts' | 'reports';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [inventory, setInventory] = useState([
    { id: 1, name: 'Honey Lotion (100ml)', cat: 'Cosmetics', price: 1200, cost: 850, stock: 45 },
    { id: 2, name: 'Panadol Extra', cat: 'Medical', price: 450, cost: 380, stock: 8 },
    { id: 3, name: 'Face Wash Gold', cat: 'Cosmetics', price: 950, cost: 600, stock: 25 }
  ]);

  type Sale = { id: number; item: string; amount: number; date: string };
  const [salesHistory, setSalesHistory] = useState<Sale[]>([
    { id: 1, item: 'Honey Lotion (100ml)', amount: 2400, date: '2026-03-20' },
    { id: 2, item: 'Panadol Extra', amount: 900, date: '2026-03-21' }
  ]);
  const addSale = () => {
    const nextId = salesHistory.length ? Math.max(...salesHistory.map(s => s.id)) + 1 : 1;
    setSalesHistory([
      { id: nextId, item: 'Face Wash Gold', amount: 1900, date: new Date().toISOString().slice(0, 10) },
      ...salesHistory
    ]);
  };
  const [saleItem, setSaleItem] = useState('');
  const [saleQty, setSaleQty] = useState<number>(1);
  const submitSale = () => {
    if (!saleItem.trim() || saleQty <= 0) return;
    const found = inventory.find(i => i.name.toLowerCase() === saleItem.toLowerCase());
    const price = found ? found.price : 0;
    const nextId = salesHistory.length ? Math.max(...salesHistory.map(s => s.id)) + 1 : 1;
    setSalesHistory([
      { id: nextId, item: saleItem.trim(), amount: price * saleQty, date: new Date().toISOString().slice(0, 10) },
      ...salesHistory
    ]);
    setSaleItem('');
    setSaleQty(1);
  };
  const totalStockValue = inventory.reduce((acc, item) => acc + item.price * item.stock, 0);
  const totalProfitPotential = inventory.reduce((acc, item) => acc + (item.price - item.cost) * item.stock, 0);
  const lowStockItems = inventory.filter((item) => item.stock < 10).length;
  const totalLoss = 2150;

  const metrics = [
    { title: 'Total Sales', value: 'Rs.54,230', iconBg: 'bg-blue-600', accent: 'text-blue-500' },
    { title: 'Total Profit', value: 'Rs.12,840', iconBg: 'bg-emerald-600', accent: 'text-emerald-500' },
    { title: 'Total Loss', value: 'Rs.2,150', iconBg: 'bg-rose-600', accent: 'text-rose-500' },
    { title: 'Total Expenses', value: 'Rs.32,150', iconBg: 'bg-orange-600', accent: 'text-orange-500' },
    { title: 'Pending Payments', value: 'Rs.4,120', iconBg: 'bg-yellow-600', accent: 'text-yellow-500' },
    { title: 'Out of Stock Items', value: '12', iconBg: 'bg-violet-600', accent: 'text-violet-500' }
  ];

  const GlassCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div
      className={`rounded-2xl p-6 transition-all ${
        theme === 'dark'
          ? 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:bg-white/8'
          : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg'
      }`}
    >
      {children}
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">Business Overview</h2>
                <p className={theme === 'dark' ? 'text-slate-400 text-sm' : 'text-slate-500 text-sm'}>
                  Real-time insights into your enterprise performance.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <GlassCard>
                  <button className="flex items-center gap-2 text-sm">
                    <CalendarDays size={16} />
                    <span>This Month</span>
                  </button>
                </GlassCard>
                <GlassCard>
                  <button className="flex items-center gap-2 text-sm">
                    <Download size={16} />
                    <span>Export Data</span>
                  </button>
                </GlassCard>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metrics.map((m, i) => (
                <GlassCard key={i}>
                  <div className="flex items-start gap-4">
                    <div className={`h-10 w-10 rounded-xl ${m.iconBg} flex items-center justify-center text-white`}>
                      <Wallet size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-widest">{m.title}</p>
                      <h3 className="text-2xl font-black mt-1">{m.value}</h3>
                      <div className="mt-3 flex items-center gap-2">
                        <span className={`text-xs font-bold ${m.accent}`}>+1.2%</span>
                        <span className={theme === 'dark' ? 'text-slate-400 text-xs' : 'text-slate-500 text-xs'}>
                          vs last month
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-sm uppercase tracking-widest">Recent Transactions</h3>
                <Plus size={18} className="opacity-80" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody className={theme === 'dark' ? 'divide-y divide-white/10' : 'divide-y divide-slate-100'}>
                    {inventory.map((item) => (
                      <tr key={item.id} className={theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                        <td className="py-3 px-2 font-semibold">{item.name}</td>
                        <td className="py-3 px-2 text-slate-500 text-sm">{item.cat}</td>
                        <td
                          className={`py-3 px-2 text-right font-black ${
                            item.stock < 10 ? 'text-rose-500' : 'text-indigo-600'
                          }`}
                        >
                          {item.stock} in stock
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        );
      case 'inventory':
        return (
          <GlassCard>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black tracking-widest uppercase text-sm">Inventory</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead
                  className={
                    theme === 'dark'
                      ? 'text-slate-400 text-[10px] font-black uppercase tracking-widest'
                      : 'text-slate-500 text-[10px] font-black uppercase tracking-widest'
                  }
                >
                  <tr>
                    <th className="p-3 uppercase">Name</th>
                    <th className="p-3 uppercase">Category</th>
                    <th className="p-3 uppercase">Price</th>
                    <th className="p-3 uppercase">Stock</th>
                  </tr>
                </thead>
                <tbody className={theme === 'dark' ? 'divide-y divide-white/10' : 'divide-y divide-slate-100'}>
                  {inventory.map((item) => (
                    <tr key={item.id} className={theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-indigo-50/40'}>
                      <td className="p-3 font-semibold">{item.name}</td>
                      <td className="p-3 text-slate-500">{item.cat}</td>
                      <td className="p-3 font-black">Rs. {item.price}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1.5 rounded-xl font-black text-xs ${
                            item.stock < 10 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                          }`}
                        >
                          {item.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        );
      case 'reports':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard>
              <h3 className="font-black uppercase tracking-widest text-sm mb-2">Profit Summary</h3>
              <p className="text-3xl font-black">Rs. {totalProfitPotential.toLocaleString()}</p>
              <p className={theme === 'dark' ? 'text-slate-400 mt-2' : 'text-slate-500 mt-2'}>Expected profit based on inventory.</p>
            </GlassCard>
            <GlassCard>
              <h3 className="font-black uppercase tracking-widest text-sm mb-2">Loss Summary</h3>
              <p className="text-3xl font-black">Rs. {totalLoss.toLocaleString()}</p>
              <p className={theme === 'dark' ? 'text-slate-400 mt-2' : 'text-slate-500 mt-2'}>Operational and other losses.</p>
            </GlassCard>
            <GlassCard>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black uppercase tracking-widest text-sm">Monthly Sales Analysis</h3>
                <TrendingUp className="opacity-80" />
              </div>
              <div className="h-40 flex items-end justify-between space-x-2">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                  <div key={i} className="w-full rounded-t-xl relative group">
                    <div style={{ height: `${h}%` }} className="bg-indigo-600 w-full rounded-t-xl transition-all duration-700 group-hover:bg-indigo-400"></div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        );
      case 'sales':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Sales</h2>
            </div>
            <GlassCard>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                <div>
                  <label className={theme === 'dark' ? 'text-slate-300 text-sm font-semibold' : 'text-slate-700 text-sm font-semibold'}>Item Name</label>
                  <input
                    value={saleItem}
                    onChange={(e) => setSaleItem(e.target.value)}
                    placeholder="e.g. Honey Lotion (100ml)"
                    className={`mt-2 w-full px-3 py-2 rounded-xl outline-none ${
                      theme === 'dark' ? 'bg-white/5 border border-white/10 text-white' : 'bg-slate-100 border border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className={theme === 'dark' ? 'text-slate-300 text-sm font-semibold' : 'text-slate-700 text-sm font-semibold'}>Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={saleQty}
                    onChange={(e) => setSaleQty(Number(e.target.value))}
                    className={`mt-2 w-full px-3 py-2 rounded-xl outline-none ${
                      theme === 'dark' ? 'bg-white/5 border border-white/10 text-white' : 'bg-slate-100 border border-slate-200'
                    }`}
                  />
                </div>
                <div className="flex md:justify-end">
                  <button
                    onClick={submitSale}
                    className="mt-6 bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold flex items-center space-x-2 hover:bg-indigo-700 transition-all active:scale-95"
                  >
                    <Plus size={18} /> <span>Add Sale</span>
                  </button>
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <div className="mb-4 font-black text-sm uppercase tracking-widest">Sales List</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className={theme === 'dark' ? 'text-slate-400 text-[10px] uppercase font-black' : 'text-slate-500 text-[10px] uppercase font-black'}>
                    <tr>
                      <th className="p-3">Item</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className={theme === 'dark' ? 'divide-y divide-white/10' : 'divide-y divide-slate-100'}>
                    {salesHistory.map((s) => (
                      <tr key={s.id} className={theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                        <td className="p-3 font-semibold">{s.item}</td>
                        <td className="p-3 font-black">Rs. {s.amount.toLocaleString()}</td>
                        <td className="p-3 text-slate-500">{s.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        );
      case 'accounts':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard>
              <h3 className="font-black uppercase tracking-widest text-sm mb-2">Receivables</h3>
              <p className="text-3xl font-black">Rs. 45,000</p>
            </GlassCard>
            <GlassCard>
              <h3 className="font-black uppercase tracking-widest text-sm mb-2">Payables</h3>
              <p className="text-3xl font-black">Rs. 28,500</p>
            </GlassCard>
            <GlassCard>
              <h3 className="font-black uppercase tracking-widest text-sm mb-2">Cash</h3>
              <p className="text-3xl font-black">Rs. 12,300</p>
            </GlassCard>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">Business Overview</h2>
                <p className={theme === 'dark' ? 'text-slate-400 text-sm' : 'text-slate-500 text-sm'}>
                  Real-time insights into your enterprise performance.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metrics.map((m, i) => (
                <GlassCard key={i}>
                  <div className="flex items-start gap-4">
                    <div className={`h-10 w-10 rounded-xl ${m.iconBg} flex items-center justify-center text-white`}>
                      <Wallet size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-widest">{m.title}</p>
                      <h3 className="text-2xl font-black mt-1">{m.value}</h3>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        );
    }
  };

  if (!isLoggedIn) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-4 ${
          theme === 'dark' ? 'bg-[#0b0b0b]' : 'bg-slate-50'
        }`}
      >
        <div
          className={`max-w-md w-full p-8 rounded-3xl ${
            theme === 'dark'
              ? 'bg-white/5 backdrop-blur-xl border border-white/10 text-white'
              : 'bg-white border border-slate-200 text-slate-900 shadow-lg'
          }`}
        >
          <div className="text-center mb-8">
            <div className="h-20 w-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <Lock size={40} />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Jabbar Sons</h1>
            <p className="text-sm mt-2 opacity-60 uppercase tracking-widest font-bold text-indigo-500">ERP</p>
          </div>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all active:scale-95"
          >
            Open Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-[#0b0b0b] to-[#121212] text-white'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300 md:translate-x-0 ${
          theme === 'dark' ? 'bg-[#141414]/95 backdrop-blur-md border-r border-white/10' : 'bg-white border-r border-slate-200'
        } ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center space-x-3 mb-8">
            <div className="h-10 w-10 bg-gradient-to-tr from-indigo-600 to-orange-500 rounded-xl flex items-center justify-center font-black text-white">JS</div>
            <h1 className="text-xl font-bold tracking-tight">Jabbar Sons</h1>
          </div>
          <nav className="flex-1 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'inventory', label: 'Inventory', icon: Package },
              { id: 'sales', label: 'Sales', icon: ShoppingCart },
              { id: 'accounts', label: 'Accounts', icon: Wallet },
              { id: 'reports', label: 'Reports', icon: BarChart3 }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 p-3.5 rounded-xl transition-all ${
                  activeTab === item.id
                    ? theme === 'dark'
                      ? 'bg-white/10 text-white'
                      : 'bg-indigo-50 text-indigo-700'
                    : theme === 'dark'
                    ? 'text-slate-300 hover:bg-white/5'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <item.icon size={18} />
                <span className="font-semibold text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="mt-6 space-y-2">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl ${
                theme === 'dark' ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <span className="flex items-center space-x-3">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                <span className="font-semibold text-sm">Dark Mode</span>
              </span>
              <span className="text-xs font-bold">{theme === 'dark' ? 'On' : 'Off'}</span>
            </button>
            <button
              onClick={() => setIsLoggedIn(false)}
              className={`w-full flex items-center space-x-3 p-3.5 rounded-xl ${
                theme === 'dark' ? 'text-slate-300 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <LogOut size={18} />
              <span className="font-semibold text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 md:pl-72 flex flex-col min-h-screen">
        <header
          className={`h-16 flex items-center justify-between px-6 sticky top-0 z-40 ${
            theme === 'dark'
              ? 'bg-[#121212]/80 backdrop-blur-xl border-b border-white/10'
              : 'bg-white/80 backdrop-blur-xl border-b border-slate-200'
          }`}
        >
          <div className="flex items-center">
            <button className="md:hidden mr-3" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu />
            </button>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'
              }`}
            >
              <Search size={16} className="opacity-70" />
              <input
                placeholder="Search..."
                className={`bg-transparent outline-none text-sm ${
                  theme === 'dark' ? 'placeholder:text-slate-400' : 'placeholder:text-slate-500'
                }`}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <GlassCard>
              <button className="flex items-center gap-2 text-sm">
                <CalendarDays size={16} />
                <span>This Month</span>
              </button>
            </GlassCard>
            <GlassCard>
              <button className="flex items-center gap-2 text-sm">
                <Download size={16} />
                <span>Export Data</span>
              </button>
            </GlassCard>
            <GlassCard>
              <div className="flex items-center gap-3">
                <button className="relative">
                  <Bell size={18} className="opacity-80" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] rounded-full bg-rose-500 text-white flex items-center justify-center">3</span>
                </button>
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center">B</div>
              </div>
            </GlassCard>
          </div>
        </header>

        <main className="p-6">{renderActiveTab()}</main>
      </div>
    </div>
  );
}
