import React from 'react';
import { Users, DollarSign, Briefcase, Activity } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { DashboardWidgets } from '../components/dashboard/Widgets';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock Sparkline Data
  const sparkData1 = [{v:10}, {v:15}, {v:12}, {v:20}, {v:25}, {v:22}, {v:30}];
  const sparkData2 = [{v:30}, {v:25}, {v:28}, {v:22}, {v:18}, {v:20}, {v:15}]; // Down trend

  return (
    <div className="space-y-6 pb-6 pr-2">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h6 className="text-text-secondary text-sm font-medium">Dashboard</h6>
          <h1 className="text-3xl font-display font-bold text-white">Overview</h1>
        </div>
        <div className="text-sm text-text-secondary">
          Last updated: Today, 10:30 AM
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
           icon={DollarSign} 
           label="Monthly Revenue" 
           value="$32,450" 
           trend="up" 
           trendValue="+12%" 
           sparkData={sparkData1}
           onClick={() => navigate('/analytics')}
        />
        <StatCard 
           icon={Users} 
           label="Active Clients" 
           value="48" 
           trend="up" 
           trendValue="+4" 
           sparkData={sparkData1}
           onClick={() => navigate('/clients')}
        />
        <StatCard 
           icon={Briefcase} 
           label="Projects" 
           value="15" 
           trend="up" 
           trendValue="+2%" 
           sparkData={sparkData1}
        />
        <StatCard 
           icon={Activity} 
           label="Task Completion" 
           value="84%" 
           trend="down" 
           trendValue="-5%" 
           sparkData={sparkData2}
           onClick={() => navigate('/tasks')}
        />
      </div>

      {/* Middle Widgets Row (New) */}
      <DashboardWidgets />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[450px]">
        {/* Main Chart */}
        <div className="lg:col-span-2 h-full">
          <RevenueChart />
        </div>

        {/* Activity Feed */}
        <div className="h-full">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
