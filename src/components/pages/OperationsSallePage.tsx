import React, { useState } from 'react';
import { Plus, Edit, Trash2, Home, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Room {
  id: string;
  name: string;
  capacity: number;
  type: string;
  status: string;
  currentCourse?: string;
  currentTeacher?: string;
  nextBooking?: string;
}

const initialRooms: Room[] = [
  {
    id: '1',
    name: 'Salle 101',
    capacity: 30,
    type: 'Salle de cours',
    status: 'occupée',
    currentCourse: 'Mathématiques',
    currentTeacher: 'Mme Martin',
    nextBooking: '14:00 - Physique',
  },
  {
    id: '2',
    name: 'Salle 102',
    capacity: 25,
    type: 'Salle de cours',
    status: 'disponible',
  },
  {
    id: '3',
    name: 'Lab Informatique',
    capacity: 20,
    type: 'Laboratoire',
    status: 'disponible',
  },
];

const OperationsSallePage = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoom, setNewRoom] = useState({ name: '', capacity: '', type: '' });

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    setRooms([
      ...rooms,
      {
        id: (rooms.length + 1).toString(),
        name: newRoom.name,
        capacity: Number(newRoom.capacity),
        type: newRoom.type,
        status: 'disponible',
      },
    ]);
    setShowAddForm(false);
    setNewRoom({ name: '', capacity: '', type: '' });
  };

  const handleDeleteRoom = (id: string) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Home className="w-6 h-6 text-green-600" /> Opérations de salle
        </h1>
        <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Ajouter une salle
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Rechercher une salle..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {showAddForm && (
        <form onSubmit={handleAddRoom} className="bg-white p-4 rounded-lg shadow mb-6 flex gap-4 items-end">
          <Input
            placeholder="Nom de la salle"
            value={newRoom.name}
            onChange={e => setNewRoom({ ...newRoom, name: e.target.value })}
            required
          />
          <Input
            placeholder="Capacité"
            type="number"
            value={newRoom.capacity}
            onChange={e => setNewRoom({ ...newRoom, capacity: e.target.value })}
            required
          />
          <Input
            placeholder="Type (ex: Salle de cours, Laboratoire)"
            value={newRoom.type}
            onChange={e => setNewRoom({ ...newRoom, type: e.target.value })}
            required
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Ajouter</Button>
          <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
            Annuler
          </Button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map(room => (
          <div key={room.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                <Home className="w-5 h-5 text-green-500" /> {room.name}
              </h2>
              <div className="flex gap-2">
                <Button size="icon" variant="outline"><Edit className="w-4 h-4" /></Button>
                <Button size="icon" variant="outline" onClick={() => handleDeleteRoom(room.id)}><Trash2 className="w-4 h-4 text-red-600" /></Button>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span>Capacité :</span>
              <span className="font-medium">{room.capacity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Type :</span>
              <span className="font-medium">{room.type}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Statut :</span>
              <span className="font-medium">{room.status}</span>
            </div>
            {room.currentCourse && (
              <div className="flex justify-between text-sm">
                <span>Cours actuel :</span>
                <span className="font-medium">{room.currentCourse} ({room.currentTeacher})</span>
              </div>
            )}
            {room.nextBooking && (
              <div className="flex justify-between text-sm">
                <span>Prochaine réservation :</span>
                <span className="font-medium flex items-center gap-1"><Calendar className="w-4 h-4" /> {room.nextBooking}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationsSallePage;
