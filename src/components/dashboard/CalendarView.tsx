import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarView = () => {
  const today = new Date();
  const currentMonth = today.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  // Generate calendar days (simplified)
  const generateCalendarDays = () => {
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{currentMonth}</h3>
        <div className="flex space-x-1">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div key={index} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`text-center py-1.5 sm:py-2 text-xs sm:text-sm cursor-pointer rounded-full ${day === today.getDate()
                ? 'bg-green-600 text-white font-medium'
                : day
                  ? 'hover:bg-gray-100 text-gray-700'
                  : 'text-gray-300'
              }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
