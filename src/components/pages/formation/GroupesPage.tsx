import React, { useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface Group {
  id: string;
  name: string;
  students: number;
  course: string;
  teacher: string;
  status: 'active' | 'inactive';
}

const GroupesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groups] = useState<Group[]>([
    {
      id: '1',
      name: 'Groupe A - Mathématiques',
      students: 25,
      course: 'Mathématiques Avancées',
      teacher: 'Marie Martin',
      status: 'active'
    },
    {
      id: '2',
      name: 'Groupe B - Physique',
      students: 18,
      course: 'Physique Quantique',
      teacher: 'Jean Dupont',
      status: 'active'
    },
    {
      id: '3',
      name: 'Groupe C - Informatique',
      students: 22,
      course: 'Développement Web',
      teacher: 'Sophie Bernard',
      status: 'active'
    },
    {
      id: '4',
      name: 'Groupe D - Anglais',
      students: 15,
      course: 'Anglais Business',
      teacher: 'Pierre Dubois',
      status: 'inactive'
    }
  ]);

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestion des Groupes</h1>
            <p className="text-gray-600">Gérez les groupes d'étudiants et leurs affectations</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Groupe
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un groupe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filtrer</Button>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">{group.name}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  group.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {group.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cours:</span>
                  <span className="font-medium">{group.course}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Professeur:</span>
                  <span className="font-medium">{group.teacher}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Étudiants:</span>
                  <span className="font-medium">{group.students}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun groupe trouvé</h3>
          <p className="text-gray-600">Aucun groupe ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default GroupesPage; 