import { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { cn } from '../../lib/utils';

// --- Mock Data ---
const mockEvents = [
  { id: 1, title: 'Mathématiques', group: 'Groupe A', day: 0, startTime: '10:00', endTime: '12:00', color: 'bg-blue-500' },
  { id: 2, title: 'Physique', group: 'Groupe B', day: 1, startTime: '10:00', endTime: '11:30', color: 'bg-red-500' },
  { id: 3, title: 'Développement', group: 'Groupe A', day: 2, startTime: '14:00', endTime: '16:00', color: 'bg-green-500' },
  { id: 4, title: 'Mathématiques', group: 'Groupe B', day: 3, startTime: '09:00', endTime: '11:00', color: 'bg-blue-500' },
  { id: 5, title: 'Physique', group: 'Groupe A', day: 4, startTime: '13:00', endTime: '14:30', color: 'bg-red-500' },
];

const dayNames = ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'];

// --- Helper Functions ---
const getWeekDays = (date: Date): Date[] => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  startOfWeek.setDate(diff);
  return Array.from({ length: 7 }, (_, i) => new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i));
};

const timeToPosition = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = (hours - 8) * 60 + minutes; // Schedule starts at 8:00
  return totalMinutes / 30; // 30-minute intervals
};

// --- Main Component ---
const WeeklySchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState(mockEvents);

  const weekDays = getWeekDays(currentDate);
  const weekRange = `${weekDays[0].getDate()} ${weekDays[0].toLocaleString('fr-FR', { month: 'long' })} - ${weekDays[6].getDate()} ${weekDays[6].toLocaleString('fr-FR', { month: 'long' })}, ${weekDays[6].getFullYear()}`;

  const goToPreviousWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const goToNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-lg font-semibold text-gray-800">Emploi du Temps</h2>
        <div className="flex items-center gap-2">
          <button onClick={goToPreviousWeek} className="p-1.5 rounded-full hover:bg-gray-100">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-700 text-center w-48">{weekRange}</span>
          <button onClick={goToNextWeek} className="p-1.5 rounded-full hover:bg-gray-100">
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <button className="p-1.5 rounded-full hover:bg-gray-100">
          <MoreVertical className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-[40px_repeat(7,1fr)] grid-rows-[auto] relative">
          {/* Day Headers */}
          <div className="sticky top-0 bg-white z-10 col-start-2 col-span-7 grid grid-cols-7">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center py-2 border-b border-gray-200">
                <p className="text-xs text-gray-500 font-medium">{dayNames[index]}</p>
                <p className={cn('text-lg font-semibold mt-1', new Date().toDateString() === day.toDateString() ? 'text-blue-600' : 'text-gray-700')}>
                  {day.getDate()}
                </p>
              </div>
            ))}
          </div>

          {/* Time Gutter */}
          <div className="row-start-2 col-start-1 text-xs text-right text-gray-400 pr-2">
            {Array.from({ length: 13 }, (_, i) => (
              <div key={i} className="h-24 flex justify-end pt-1 -mt-2">
                <span>{i + 8}:00</span>
              </div>
            ))}
          </div>

          {/* Grid Body */}
          <div className="relative col-start-2 col-span-7 grid grid-cols-7 grid-rows-1">
            {/* Columns & Lines */}
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <div key={dayIndex} className={`col-start-${dayIndex + 1} border-r border-gray-200`}>
                {Array.from({ length: 26 }).map((_, hourIndex) => (
                  <div key={hourIndex} className="h-12 border-b border-gray-200"></div>
                ))}
              </div>
            ))}

            {/* Events Container */}
            <div className="absolute inset-0">
              {events.map(event => {
                const top = timeToPosition(event.startTime) * 3; // 3rem per hour (12 * 0.25rem)
                const height = (timeToPosition(event.endTime) - timeToPosition(event.startTime)) * 3;
                return (
                  <div
                    key={event.id}
                    className={cn('absolute text-white p-2 rounded-lg overflow-hidden flex flex-col text-xs', event.color)}
                    style={{
                      top: `${top}rem`,
                      height: `${height}rem`,       
                      left: `calc(${(100 / 7) * event.day}% + 4px)`,
                      width: `calc(${(100 / 7)}% - 8px)`,
                    }}
                  >
                    <p className="font-bold truncate">{event.title}</p>
                    <p className="opacity-90 truncate">{event.group}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySchedule;

