import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Navbar from '../components/Navbar';
import '../styles/admin-dashboard.css';

interface AdminStats {
  totalUsers: number;
  totalAgents: number;
  completedRuns: number;
  runsLastWeek: number;
  activeAgents: number;
  failedRuns: number;
}

interface ChartData {
  name: string;
  value: number;
  count?: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuthStore();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [agentTypeData, setAgentTypeData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }

    const fetchStats = async () => {
      try {
        // Fetch total users
        const { count: usersCount } = await supabase
          .from('client_profiles')
          .select('*', { count: 'exact', head: true });

        // Fetch total agents
        const { count: agentsCount } = await supabase
          .from('agents')
          .select('*', { count: 'exact', head: true });

        // Fetch active agents
        const { count: activeCount } = await supabase
          .from('agents')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');

        // Fetch completed runs
        const { count: completedCount } = await supabase
          .from('agent_runs')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'completed');

        // Fetch failed runs
        const { count: failedCount } = await supabase
          .from('agent_runs')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'failed');

        // Fetch runs from last week
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        const { count: weekCount } = await supabase
          .from('agent_runs')
          .select('*', { count: 'exact', head: true })
          .gte('start_time', weekAgo);

        // Fetch agent type distribution
        const { data: agents } = await supabase
          .from('agents')
          .select('agent_type');

        const agentTypes: { [key: string]: number } = {};
        agents?.forEach((agent: any) => {
          agentTypes[agent.agent_type] = (agentTypes[agent.agent_type] || 0) + 1;
        });

        const agentTypeChartData = Object.entries(agentTypes).map(([type, count]) => ({
          name: type.replace('_', ' '),
          value: count,
        }));

        // Mock chart data for weekly runs
        const mockChartData = [
          { name: 'Mon', count: 12 },
          { name: 'Tue', count: 19 },
          { name: 'Wed', count: 15 },
          { name: 'Thu', count: 25 },
          { name: 'Fri', count: 22 },
          { name: 'Sat', count: 18 },
          { name: 'Sun', count: 10 },
        ];

        setStats({
          totalUsers: usersCount || 0,
          totalAgents: agentsCount || 0,
          completedRuns: completedCount || 0,
          runsLastWeek: weekCount || 0,
          activeAgents: activeCount || 0,
          failedRuns: failedCount || 0,
        });

        setChartData(mockChartData);
        setAgentTypeData(agentTypeChartData);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAdmin, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="admin-dashboard-container">
      <Navbar onLogout={handleLogout} isAdmin={true} />

      <div className="admin-content">
        <motion.div
          className="admin-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>📊 Admin Dashboard</h1>
          <p>System Overview & Analytics</p>
        </motion.div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading analytics...</p>
          </div>
        ) : stats ? (
          <>
            {/* Key Metrics */}
            <motion.div
              className="stats-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="stat-card" variants={itemVariants}>
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>Total Users</h3>
                  <p className="stat-value">{stats.totalUsers}</p>
                </div>
              </motion.div>

              <motion.div className="stat-card" variants={itemVariants}>
                <div className="stat-icon">🤖</div>
                <div className="stat-content">
                  <h3>Total Agents</h3>
                  <p className="stat-value">{stats.totalAgents}</p>
                </div>
              </motion.div>

              <motion.div className="stat-card" variants={itemVariants}>
                <div className="stat-icon">⚡</div>
                <div className="stat-content">
                  <h3>Active Agents</h3>
                  <p className="stat-value">{stats.activeAgents}</p>
                </div>
              </motion.div>

              <motion.div className="stat-card" variants={itemVariants}>
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h3>Completed Runs</h3>
                  <p className="stat-value">{stats.completedRuns}</p>
                </div>
              </motion.div>

              <motion.div className="stat-card" variants={itemVariants}>
                <div className="stat-icon">❌</div>
                <div className="stat-content">
                  <h3>Failed Runs</h3>
                  <p className="stat-value">{stats.failedRuns}</p>
                </div>
              </motion.div>

              <motion.div className="stat-card" variants={itemVariants}>
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <h3>Runs (Last Week)</h3>
                  <p className="stat-value">{stats.runsLastWeek}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Charts */}
            <motion.div
              className="charts-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {/* Weekly Runs Chart */}
              <motion.div className="chart-card" variants={itemVariants}>
                <h2>Weekly Agent Runs</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 200, 255, 0.1)" />
                    <XAxis stroke="rgba(255, 255, 255, 0.5)" />
                    <YAxis stroke="rgba(255, 255, 255, 0.5)" />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(100, 200, 255, 0.3)',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#64c8ff' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#64c8ff"
                      strokeWidth={2}
                      dot={{ fill: '#64c8ff', r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Runs"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Agent Type Distribution */}
              {agentTypeData.length > 0 && (
                <motion.div className="chart-card" variants={itemVariants}>
                  <h2>Agent Type Distribution</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={agentTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {agentTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(100, 200, 255, 0.3)',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: '#64c8ff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>
              )}

              {/* Run Status Chart */}
              <motion.div className="chart-card" variants={itemVariants}>
                <h2>Run Status Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      {
                        name: 'Status',
                        Completed: stats.completedRuns,
                        Failed: stats.failedRuns,
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 200, 255, 0.1)" />
                    <XAxis stroke="rgba(255, 255, 255, 0.5)" />
                    <YAxis stroke="rgba(255, 255, 255, 0.5)" />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(100, 200, 255, 0.3)',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#64c8ff' }}
                    />
                    <Legend />
                    <Bar dataKey="Completed" fill="#4ade80" />
                    <Bar dataKey="Failed" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </div>
    </div>
  );
}
