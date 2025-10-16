"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart,
  Pie,
  Cell,
  
  
} from 'recharts';


// Dados de exemplo para os gráficos
const monthlyData = [
  { name: 'Jan', novosClientes: 52, clientesPerdidos: 21, retencao: 85 },
  { name: 'Fev', novosClientes: 63, clientesPerdidos: 27, retencao: 82 },
  { name: 'Mar', novosClientes: 68, clientesPerdidos: 25, retencao: 84 },
  { name: 'Abr', novosClientes: 72, clientesPerdidos: 35, retencao: 80 },
  { name: 'Mai', novosClientes: 75, clientesPerdidos: 22, retencao: 87 },
  { name: 'Jun', novosClientes: 78, clientesPerdidos: 29, retencao: 83 },
  { name: 'Jul', novosClientes: 82, clientesPerdidos: 38, retencao: 79 },
  { name: 'Ago', novosClientes: 85, clientesPerdidos: 33, retencao: 81 },
  { name: 'Set', novosClientes: 88, clientesPerdidos: 26, retencao: 85 },
  { name: 'Out', novosClientes: 91, clientesPerdidos: 32, retencao: 82 },
  { name: 'Nov', novosClientes: 94, clientesPerdidos: 30, retencao: 84 },
  { name: 'Dez', novosClientes: 97, clientesPerdidos: 35, retencao: 81 },
];

const clientValueData = [
  { name: 'Jan', valorMedio: 500, frequenciaCompra: 2.1, ltv: 4500 },
  { name: 'Fev', valorMedio: 520, frequenciaCompra: 2.0, ltv: 4600 },
  { name: 'Mar', valorMedio: 540, frequenciaCompra: 2.2, ltv: 4800 },
  { name: 'Abr', valorMedio: 510, frequenciaCompra: 1.9, ltv: 4400 },
  { name: 'Mai', valorMedio: 550, frequenciaCompra: 2.3, ltv: 5100 },
  { name: 'Jun', valorMedio: 570, frequenciaCompra: 2.4, ltv: 5300 },
  { name: 'Jul', valorMedio: 580, frequenciaCompra: 2.2, ltv: 5200 },
  { name: 'Ago', valorMedio: 600, frequenciaCompra: 2.5, ltv: 5500 },
  { name: 'Set', valorMedio: 590, frequenciaCompra: 2.3, ltv: 5400 },
  { name: 'Out', valorMedio: 610, frequenciaCompra: 2.4, ltv: 5600 },
  { name: 'Nov', valorMedio: 630, frequenciaCompra: 2.6, ltv: 5900 },
  { name: 'Dez', valorMedio: 650, frequenciaCompra: 2.7, ltv: 6200 },
];

// Dados de segmentação de clientes
const segmentacaoData = {
  champions: 24,
  leais: 32,
  potenciais: 28,
  risco: 16
};

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Não autenticado");

        const data = await res.json();
        setUserEmail(data.email);
      } catch (err) {
        console.error(err);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} userEmail={userEmail} />

        <main className="flex-1 p-6 overflow-y-auto">
          {loading ? (
            <div className="animate-pulse bg-gray-200 h-40 rounded-xl" />
          ) : (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4">3.6. Cash</h2>
                <p className="text-sm text-gray-500 mb-4">Last month with data: December</p>
                
                {/* Cards de métricas de clientes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                  <div className="bg-blue-500 text-white p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Total de Clientes</h3>
                    <p className="text-3xl font-bold">1.245</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs">vs mês anterior</span>
                      <span className="ml-auto text-sm font-medium">+8.2%</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500 text-white p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Novos Clientes</h3>
                    <p className="text-3xl font-bold">97</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs">vs mês anterior</span>
                      <span className="ml-auto text-sm font-medium">+3.2%</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500 text-white p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Taxa de Retenção</h3>
                    <p className="text-3xl font-bold">81%</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs">vs mês anterior</span>
                      <span className="ml-auto text-sm font-medium">-3.6%</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500 text-white p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Valor Médio</h3>
                    <p className="text-3xl font-bold">R$ 650,00</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs">vs mês anterior</span>
                      <span className="ml-auto text-sm font-medium">+3.2%</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500 text-white p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">LTV Médio</h3>
                    <p className="text-3xl font-bold">R$ 6.200</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs">vs mês anterior</span>
                      <span className="ml-auto text-sm font-medium">+5.1%</span>
                    </div>
                  </div>
                </div>
                
                {/* Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Gráfico de Aquisição e Retenção */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Aquisição e Retenção de Clientes</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="novosClientes" 
                            name="Novos Clientes" 
                            stroke="#10b981" 
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="clientesPerdidos" 
                            name="Clientes Perdidos" 
                            stroke="#ef4444" 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="retencao" 
                            name="Taxa de Retenção (%)" 
                            stroke="#3b82f6" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* Gráfico de Valor Médio */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Valor Médio por Cliente</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={clientValueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar 
                            dataKey="valorMedio" 
                            name="Valor Médio (R$)" 
                            fill="#10b981" 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* Gráfico de Frequência de Compra */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Frequência de Compra</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={clientValueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar 
                            dataKey="frequenciaCompra" 
                            name="Frequência Mensal" 
                            fill="#3b82f6" 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* Gráfico de LTV */}
                   <div className="bg-white p-4 rounded-lg border border-gray-200">
                     <h3 className="text-lg font-medium mb-4">Lifetime Value (LTV)</h3>
                     <div className="h-64">
                       <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={clientValueData}>
                           <CartesianGrid strokeDasharray="3 3" />
                           <XAxis dataKey="name" />
                           <YAxis />
                           <Tooltip />
                           <Legend />
                           <Bar 
                             dataKey="ltv" 
                             name="Lifetime Value (R$)" 
                             fill="#eab308" 
                           />
                         </BarChart>
                       </ResponsiveContainer>
                     </div>
                   </div>
                   
                   {/* Gráfico de Segmentação de Clientes */}
                   <div className="bg-white p-4 rounded-lg border border-gray-200">
                     <h3 className="text-lg font-medium mb-4">Segmentação de Clientes</h3>
                     <div className="h-64">
                       <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                           <Pie
                             data={[
                               { name: 'Champions', value: segmentacaoData.champions, fill: '#10b981' },
                               { name: 'Leais', value: segmentacaoData.leais, fill: '#3b82f6' },
                               { name: 'Potenciais', value: segmentacaoData.potenciais, fill: '#eab308' },
                               { name: 'Em Risco', value: segmentacaoData.risco, fill: '#ef4444' }
                             ]}
                             cx="50%"
                             cy="50%"
                             labelLine={true}
                             outerRadius={80}
                             fill="#8884d8"
                             dataKey="value"
                             label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                           />
                           <Tooltip />
                           <Legend />
                         </PieChart>
                       </ResponsiveContainer>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
