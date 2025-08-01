import { useState, useEffect } from 'react';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: any) => void;
  day: string;
  time: string;
}

const EventForm = ({ isOpen, onClose, onSubmit, day, time }: EventFormProps) => {
  const [course, setCourse] = useState('');
  const [group, setGroup] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  useEffect(() => {
    if (time) {
      setStartTime(time);
      const [hour, minute] = time.split(':').map(Number);
      const endHour = String(hour + 1).padStart(2, '0');
      setEndTime(`${endHour}:${minute.toString().padStart(2, '0')}`);
    }
  }, [time]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ course, group, startTime, endTime, day });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Ajouter un événement</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">Cours</label>
            <input type="text" id="course" value={course} onChange={e => setCourse(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="group" className="block text-sm font-medium text-gray-700">Groupe</label>
            <input type="text" id="group" value={group} onChange={e => setGroup(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Début</label>
              <input type="time" id="startTime" value={startTime} onChange={e => setStartTime(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">Fin</label>
              <input type="time" id="endTime" value={endTime} onChange={e => setEndTime(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Annuler</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
