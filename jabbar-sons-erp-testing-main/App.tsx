import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingCart, Package, Users, BarChart3, 
  Search, Bell, Menu, X, LogOut, Sun, Moon,
  Truck, Wallet, UserCheck, HelpCircle, Lock, User, Plus, TrendingUp, Save
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- Inventory Data ---
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Honey Lotion (100ml)', cat: 'Cosmetics', price: 1200, cost: 850, stock: 45 },
    { id: 2, name: 'Panadol Extra', cat: 'Medical', price: 450, cost: 380, stock: 8 },
    { id: 3, name: 'Face Wash Gold', cat: 'Cosmetics', price: 950, cost: 600, stock: 25 }
  ]);

  // --- Calculations for Stats ---
  const totalStockValue = inventory.reduce((acc, item) => acc + (item.price * item.stock), 0);
  const totalProfitPotential = inventory.reduce((acc, item) => acc + ((item.price - item.cost) * item.stock), 0);
  const lowStockItems = inventory.filter(item => item.stock < 10).length;

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-[#121212]' : 'bg-indigo-50'}`}>
        <div className={`max-w-md w-full p-8 rounded-3xl shadow-2xl ${theme === 'dark' ? 'bg-[#1e1e1e] text-white' : 'bg-white text-slate-900'}`}>
          <div className="text-center mb-8">
            <div className="h-20 w-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-indigo-200">
              <Lock size={40} />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Data Orbit</h1>
            <p className="text-sm mt-2 opacity-60 uppercase tracking-widest font-bold text-indigo-500">Business ERP v1.0</p>
          </div>
          <button onClick={() => setIsLoggedIn(true)} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200 dark:shadow-none transition-all active:scale-95">
            OPEN DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* SIDEBAR (AI Builder Style) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1c23] text-white transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center space-x-3 mb-10">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black italic">DO</div>
            <h1 className="text-xl font-bold tracking-tighter">DATA ORBIT</h1>
          </div>
          
          <nav className="flex-1 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'inventory', label: 'Inventory', icon: Package },
              { id: 'reports', label: 'Reports', icon: BarChart3 },
              { id: 'sales', label: 'Sales', icon: ShoppingCart },
              { id: 'accounts', label: 'Accounts', icon: Wallet },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center space-x-3 p-3.5 rounded-xl transition-all ${
                  activeTab === item.id ? 'bg-indigo-600 shadow-lg shadow-indigo-900/40 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-semibold text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <button onClick={() => setIsLoggedIn(false)} className="flex items-center space-x-3 p-3 text-slate-500 hover:text-red-400 mt-auto border-t border-slate-800 pt-6 transition-colors">
            <LogOut size={20} />
            <span className="font-bold">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        
        {/* TOP NAVBAR */}
        <header className={`h-20 flex items-center justify-between px-8 sticky top-0 z-40 transition-colors ${theme === 'dark' ? 'bg-[#0f0f0f]/80 backdrop-blur-lg border-b border-slate-800' : 'bg-white/80 backdrop-blur-lg border-b border-slate-200'}`}>
          <div className="flex items-center">
            <button className="md:hidden mr-4" onClick={() => setIsMobileMenuOpen(true)}><Menu/></button>
            <h2 className="text-xl font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter">{activeTab}</h2>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`p-2.5 rounded-2xl transition-all ${theme === 'dark' ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}>
              {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
            </button>
            <div className="h-10 w-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg">B</div>
          </div>
        </header>

        <main className="p-8">
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Value', val: `Rs. ${totalStockValue.toLocaleString()}`, color: 'bg-blue-600', icon: Wallet },
                  { label: 'Expected Profit', val: `Rs. ${totalProfitPotential.toLocaleString()}`, color: 'bg-green-600', icon: TrendingUp },
                  { label: 'Low Stock', val: `${lowStockItems} Items`, color: 'bg-orange-600', icon: Package },
                  { label: 'Today Orders', val: '14', color: 'bg-purple-600', icon: ShoppingCart }
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-[#1e1e1e] p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group">
                    <div className={`h-12 w-12 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-slate-200 dark:shadow-none`}>
                      <stat.icon size={24}/>
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                    <h3 className="text-2xl font-black mt-1 tracking-tight">{stat.val}</h3>
                  </div>
                ))}
              </div>

              {/* Recent Activity Mini-Table */}
              <div className="bg-white dark:bg-[#1e1e1e] rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex justify-between items-center">
                  <h3 className="font-black text-slate-800 dark:text-white uppercase text-sm tracking-widest">Recent Activity</h3>
                  <Plus size={20} className="text-indigo-600 cursor-pointer" />
                </div>
                <div className="p-4">
                  <table className="w-full">
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                      {inventory.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 px-2 font-bold">{item.name}</td>
                          <td className="py-4 px-2 text-slate-500 text-sm">{item.cat}</td>
                          <td className={`py-4 px-2 text-right font-black ${item.stock < 10 ? 'text-red-500' : 'text-indigo-600 dark:text-indigo-400'}`}>
                            {item.stock} in stock
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* INVENTORY TAB */}
          {activeTab === 'inventory' && (
            <div className="bg-white dark:bg-[#1e1e1e] rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-6 bg-slate-50/50 dark:bg-slate-800/20 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-black tracking-widest uppercase text-sm">Stock Management</h3>
                <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold flex items-center space-x-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none transition-all active:scale-95">
                  <Plus size={18}/> <span>Add New Item</span>
                </button>
              </div>
              <div className="overflow-x-auto p-4">
                <table className="w-full text-left">
                  <thead className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="p-4 uppercase">Item Name</th>
                      <th className="p-4 uppercase">Category</th>
                      <th className="p-4 uppercase">Price (Sale)</th>
                      <th className="p-4 uppercase">Cost (Buy)</th>
                      <th className="p-4 uppercase">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {inventory.map((item) => (
                      <tr key={item.id} className="hover:bg-indigo-50/20 dark:hover:bg-indigo-500/5 transition-colors group">
                        <td className="p-4 font-bold group-hover:text-indigo-600 transition-colors">{item.name}</td>
                        <td className="p-4 text-slate-500 font-medium">{item.cat}</td>
                        <td className="p-4 font-black">Rs. {item.price}</td>
                        <td className="p-4 text-slate-400 font-medium">Rs. {item.cost}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1.5 rounded-xl font-black text-xs ${item.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {item.stock} PCS
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REPORTS TAB */}
          {activeTab === 'reports' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
               <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-black uppercase tracking-widest text-sm text-indigo-600">Monthly Sales Analysis</h3>
                    <TrendingUp className="text-indigo-500" />
                  </div>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                      <div key={i} className="w-full bg-indigo-100 dark:bg-slate-800 rounded-t-xl relative group">
                        <div style={{ height: `${h}%` }} className="bg-indigo-600 w-full rounded-t-xl transition-all duration-1000 group-hover:bg-indigo-400 cursor-pointer shadow-lg shadow-indigo-100 dark:shadow-none"></div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-400 uppercase">Day {i+1}</span>
                      </div>
                    ))}
                  </div>
               </div>
               
               <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-100 dark:shadow-none flex flex-col justify-between">
                 <div>
                   <h3 className="text-2xl font-black tracking-tight mb-2 italic underline decoration-indigo-400 underline-offset-8">Smart Insights</h3>
                   <p className="text-indigo-100 text-sm mt-4 font-medium leading-relaxed">Bilal bhai, aapka "Honey Lotion" stock kam ho raha hai (sirf 45 baki hain). Pichle 7 dinon mein iski sale 20% barh gayi hai!</p>
                 </div>
                 <div className="mt-8 flex items-center justify-between border-t border-indigo-500 pt-6">
                   <div>
                     <p className="text-indigo-200 text-xs font-black uppercase tracking-widest">Total Valuation</p>
                     <p className="text-3xl font-black italic">Rs. {totalStockValue.toLocaleString()}</p>
                   </div>
                   <BarChart3 size={40} className="text-indigo-400 opacity-50" />
                 </div>
               </div>
            </div>
          )}

          {/* FALLBACK FOR OTHER TABS */}
          {['sales', 'accounts'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-96 text-slate-300 dark:text-slate-800 animate-pulse">
              <Save size={100} className="mb-4" />
              <h2 className="text-4xl font-black uppercase tracking-tighter italic">Developing Module</h2>
              <p className="font-bold text-slate-400">Data Orbit ERP is working on this feature...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
