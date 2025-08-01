import MetricsCards from './MetricsCards';
import WeeklySchedule from './WeeklySchedule';
import TuitionPayments from './TuitionPayments';

const Dashboard = () => {
  return (
    <>
      {/* Top Row - Metrics */}
      <div className="mb-6">
        <MetricsCards />
      </div>

      {/* Middle Row - Weekly Schedule */}
      <div className="mb-6">
        <WeeklySchedule />
      </div>

      {/* Bottom Row - Two columns */}
      <div className="grid grid-cols-1 gap-6">
        <TuitionPayments />
      </div>
    </>
  );
};

export default Dashboard;
