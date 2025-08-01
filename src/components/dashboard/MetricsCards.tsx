import { Users, GraduationCap, UserCheck } from 'lucide-react';

const MetricsCards = () => {
  const metrics = [
    {
      title: 'Total des Étudiants',
      value: '12 120',
      subtitle: 'Total des étudiants sur 365 jours',
      change: null,
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Inscrits',
      value: '6 190',
      subtitle: 'Étudiants sur 365 jours',
      change: '+16%',
      changeType: 'positive',
      icon: UserCheck,
      color: 'green',
    },
    {
      title: 'Diplômés',
      value: '4 896',
      subtitle: 'Étudiants sur 365 jours',
      change: '+18%',
      changeType: 'positive',
      icon: GraduationCap,
      color: 'green',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
              <p className="text-sm text-gray-500 mt-1">{metric.subtitle}</p>
              
              {metric.change && (
                <div className="flex items-center mt-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      metric.changeType === 'positive'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-lg ${getColorClasses(metric.color)}`}>
              <metric.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;