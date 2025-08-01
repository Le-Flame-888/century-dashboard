import { CheckSquare, Square, MoreVertical, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AssistantTasksProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssistantTasks = ({ isOpen, onClose }: AssistantTasksProps) => {
  const tasks = [
    {
      id: 1,
      title: 'Préparer le rapport hebdomadaire',
      completed: false,
      dueDate: 'Aujourd\'hui',
    },
    {
      id: 2,
      title: 'Contacter les nouveaux étudiants inscrits',
      completed: false,
      dueDate: 'Demain',
    },
    {
      id: 3,
      title: 'Mettre à jour la base de données des cours',
      completed: true,
      dueDate: 'Hier',
    },
    {
      id: 4,
      title: 'Planifier la réunion avec l\'équipe pédagogique',
      completed: false,
      dueDate: '31 juil.',
    },
    {
      id: 5,
      title: 'Répondre aux e-mails en attente',
      completed: false,
      dueDate: 'Aujourd\'hui',
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={cn(
          'fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden',
          isOpen ? 'block' : 'hidden'
        )}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside className={cn(
        'transition-all duration-300 ease-in-out',
        'fixed top-0 right-0 h-full w-full max-w-sm bg-white border-l border-gray-200 overflow-y-auto z-60',
        'lg:relative lg:max-w-none lg:border-l lg:z-auto',
        {
          'translate-x-0': isOpen,
          'translate-x-full': !isOpen,
          'lg:w-80': isOpen,
          'lg:w-0 lg:invisible lg:opacity-0': !isOpen,
        }
      )}>
        <div className="p-6 h-full flex flex-col min-w-[320px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Tâches de l'assistante</h2>
            <button className="p-2 hover:bg-gray-100 rounded-full" onClick={onClose}>
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <button className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg mb-6 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Ajouter une tâche</span>
          </button>

          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">À faire</h3>
            <div className="space-y-3">
              {tasks.filter(task => !task.completed).map((task) => (
                <div key={task.id} className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <button className="mr-3 mt-1 text-green-600">
                    <Square className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-base font-medium text-gray-900 mb-4">Terminées</h3>
            <div className="space-y-3">
              {tasks.filter(task => task.completed).map((task) => (
                <div key={task.id} className="flex items-start p-3 rounded-lg">
                  <button className="mr-3 mt-1 text-gray-400">
                    <CheckSquare className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 line-through">{task.title}</p>
                    <p className="text-xs text-gray-400">{task.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AssistantTasks;
