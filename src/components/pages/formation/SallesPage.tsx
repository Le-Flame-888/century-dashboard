import React, { useState } from 'react';
import { Home, Plus, Search, Edit, Trash2, ArrowLeft, Calendar, Clock, Users } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface Room {
  id: string;
  name: string;
  capacity: number;
  type: 'classroom' | 'lab' | 'auditorium' | 'meeting';
  status: 'available' | 'occupied' | 'maintenance';
  currentCourse?: string;
  currentTeacher?: string;
  nextBooking?: string;
}

const SallesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rooms] = useState<Room[]>([
    {
      id: '1',
      name: 'Salle 101',
      capacity: 30,
      type: 'classroom',
      status: 'occupied',
      currentCourse: 'Mathématiques Avancées',
      currentTeacher: 'Marie Martin',
      nextBooking: '14:00 - Physique'
    },
    {
      id: '2',
      name: 'Salle 102',
      capacity: 25,
      type: 'classroom',
      status: 'available'
    },
    {
      id: '3',
      name: 'Lab Informatique A',
      capacity: 20,
      type: 'lab',
      status: 'occupied',
      currentCourse: 'Développement Web',
      currentTeacher: 'Sophie Bernard',
      nextBooking: '15:30 - Programmation'
    },
    {
      id: '4',
      name: 'Auditorium Principal',
      capacity: 150,
      type: 'auditorium',
      status: 'maintenance'
    },
    {
      id: '5',
      name: 'Salle 103',
      capacity: 35,
      type: 'classroom',
      status: 'available'
    },
    {
      id: '6',
      name: 'Salle de Réunion',
      capacity: 12,
      type: 'meeting',
      status: 'occupied',
      currentCourse: 'Réunion Équipe',
      currentTeacher: 'Jean Dupont',
      nextBooking: '16:00 - Planning'
    }
  ]);

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'occupied':
        return 'Occupée';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Inconnu';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'classroom':
        return 'Salle de cours';
      case 'lab':
        return 'Laboratoire';
      case 'auditorium':
        return 'Auditorium';
      case 'meeting':
        return 'Salle de réunion';
      default:
        return 'Autre';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestion des Salles</h1>
            <p className="text-gray-600">Consultez la disponibilité et gérez les affectations</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Salle
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher une salle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filtrer</Button>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Home className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">{room.name}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                  {getStatusText(room.status)}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{getTypeText(room.type)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Capacité:</span>
                  <span className="font-medium">{room.capacity} places</span>
                </div>
                {room.currentCourse && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cours actuel:</span>
                    <span className="font-medium">{room.currentCourse}</span>
                  </div>
                )}
                {room.currentTeacher && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Professeur:</span>
                    <span className="font-medium">{room.currentTeacher}</span>
                  </div>
                )}
                {room.nextBooking && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Prochain cours:</span>
                    <span className="font-medium">{room.nextBooking}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Planifier
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune salle trouvée</h3>
          <p className="text-gray-600">Aucune salle ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default SallesPage; 