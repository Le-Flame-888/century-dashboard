import React, { useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, ArrowLeft, Mail, Phone, Calendar, Clock } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  subjects: string[];
  status: 'active' | 'inactive' | 'on_leave';
  courses: number;
  students: number;
  avatar?: string;
}

const ProfesseursPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers] = useState<Teacher[]>([
    {
      id: '1',
      name: 'Marie Martin',
      email: 'marie.martin@century.com',
      phone: '+33 1 23 45 67 89',
      department: 'Mathématiques',
      subjects: ['Mathématiques Avancées', 'Algèbre', 'Calcul'],
      status: 'active',
      courses: 4,
      students: 120,
      avatar: 'https://ui.shadcn.com/avatars/01.png'
    },
    {
      id: '2',
      name: 'Jean Dupont',
      email: 'jean.dupont@century.com',
      phone: '+33 1 23 45 67 90',
      department: 'Physique',
      subjects: ['Physique Quantique', 'Mécanique', 'Thermodynamique'],
      status: 'active',
      courses: 3,
      students: 85,
      avatar: 'https://ui.shadcn.com/avatars/02.png'
    },
    {
      id: '3',
      name: 'Sophie Bernard',
      email: 'sophie.bernard@century.com',
      phone: '+33 1 23 45 67 91',
      department: 'Informatique',
      subjects: ['Développement Web', 'Programmation', 'Bases de données'],
      status: 'active',
      courses: 5,
      students: 95,
      avatar: 'https://ui.shadcn.com/avatars/03.png'
    },
    {
      id: '4',
      name: 'Pierre Dubois',
      email: 'pierre.dubois@century.com',
      phone: '+33 1 23 45 67 92',
      department: 'Langues',
      subjects: ['Anglais Business', 'Anglais Technique', 'Communication'],
      status: 'on_leave',
      courses: 2,
      students: 45,
      avatar: 'https://ui.shadcn.com/avatars/04.png'
    },
    {
      id: '5',
      name: 'Claire Moreau',
      email: 'claire.moreau@century.com',
      phone: '+33 1 23 45 67 93',
      department: 'Chimie',
      subjects: ['Chimie Organique', 'Chimie Inorganique', 'Biochimie'],
      status: 'active',
      courses: 3,
      students: 75,
      avatar: 'https://ui.shadcn.com/avatars/05.png'
    },
    {
      id: '6',
      name: 'Marc Leroy',
      email: 'marc.leroy@century.com',
      phone: '+33 1 23 45 67 94',
      department: 'Histoire',
      subjects: ['Histoire Moderne', 'Histoire Contemporaine'],
      status: 'inactive',
      courses: 0,
      students: 0,
      avatar: 'https://ui.shadcn.com/avatars/06.png'
    }
  ]);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'inactive':
        return 'Inactif';
      case 'on_leave':
        return 'En congé';
      default:
        return 'Inconnu';
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
            <h1 className="text-2xl font-bold text-gray-800">Gestion des Professeurs</h1>
            <p className="text-gray-600">Gérez les informations et plannings des professeurs</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Professeur
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un professeur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filtrer</Button>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                    <p className="text-sm text-gray-600">{teacher.department}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(teacher.status)}`}>
                  {getStatusText(teacher.status)}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{teacher.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{teacher.phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cours:</span>
                  <span className="font-medium">{teacher.courses}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Étudiants:</span>
                  <span className="font-medium">{teacher.students}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Matières:</span>
                  <div className="mt-1">
                    {teacher.subjects.slice(0, 2).map((subject, index) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {subject}
                      </span>
                    ))}
                    {teacher.subjects.length > 2 && (
                      <span className="text-xs text-gray-500">+{teacher.subjects.length - 2} autres</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Planning
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
      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun professeur trouvé</h3>
          <p className="text-gray-600">Aucun professeur ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default ProfesseursPage; 