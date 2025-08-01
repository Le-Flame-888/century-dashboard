import React, { useState } from 'react';
import { FileText, Plus, Search, Edit, Trash2, ArrowLeft, Calendar, Clock, Users, BookOpen, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface Exam {
  id: string;
  title: string;
  type: 'controle' | 'examen' | 'bac' | 'concours' | 'test';
  subject: string;
  date: string;
  duration: string;
  students: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  room?: string;
  teacher: string;
  description?: string;
}

const ExamsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [exams] = useState<Exam[]>([
    {
      id: '1',
      title: 'Contrôle Mathématiques - Algèbre',
      type: 'controle',
      subject: 'Mathématiques',
      date: '2024-01-15',
      duration: '2h00',
      students: 45,
      status: 'upcoming',
      room: 'Salle 101',
      teacher: 'Marie Martin',
      description: 'Contrôle sur les équations du second degré et les fonctions'
    },
    {
      id: '2',
      title: 'Examen Final - Physique Quantique',
      type: 'examen',
      subject: 'Physique',
      date: '2024-01-20',
      duration: '3h00',
      students: 32,
      status: 'upcoming',
      room: 'Salle 102',
      teacher: 'Jean Dupont',
      description: 'Examen final du semestre en physique quantique'
    },
    {
      id: '3',
      title: 'Bac Blanc - Mathématiques',
      type: 'bac',
      subject: 'Mathématiques',
      date: '2024-02-10',
      duration: '4h00',
      students: 120,
      status: 'upcoming',
      room: 'Auditorium Principal',
      teacher: 'Marie Martin',
      description: 'Simulation du Baccalauréat en mathématiques'
    },
    {
      id: '4',
      title: 'Test Informatique - Programmation',
      type: 'test',
      subject: 'Informatique',
      date: '2024-01-12',
      duration: '1h30',
      students: 28,
      status: 'completed',
      room: 'Lab Informatique A',
      teacher: 'Sophie Bernard'
    },
    {
      id: '5',
      title: 'Concours CPGE - Mathématiques',
      type: 'concours',
      subject: 'Mathématiques',
      date: '2024-03-15',
      duration: '4h00',
      students: 85,
      status: 'upcoming',
      room: 'Salle 103',
      teacher: 'Pierre Dubois',
      description: 'Concours d\'entrée en CPGE'
    },
    {
      id: '6',
      title: 'Contrôle Chimie - Organique',
      type: 'controle',
      subject: 'Chimie',
      date: '2024-01-18',
      duration: '2h00',
      students: 38,
      status: 'ongoing',
      room: 'Salle 104',
      teacher: 'Claire Moreau'
    }
  ]);

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || exam.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'À venir';
      case 'ongoing':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return 'Inconnu';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'controle':
        return 'Contrôle';
      case 'examen':
        return 'Examen';
      case 'bac':
        return 'Bac Blanc';
      case 'concours':
        return 'Concours';
      case 'test':
        return 'Test';
      default:
        return 'Autre';
    }
  };

  const examTypes = [
    { value: 'all', label: 'Tous les types' },
    { value: 'controle', label: 'Contrôles' },
    { value: 'examen', label: 'Examens' },
    { value: 'bac', label: 'Bac Blanc' },
    { value: 'concours', label: 'Concours' },
    { value: 'test', label: 'Tests' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestion des Examens</h1>
            <p className="text-gray-600">Planifiez et gérez les examens et évaluations</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouvel Examen
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un examen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {examTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          <Button variant="outline">Filtrer</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">À venir</p>
              <p className="text-2xl font-bold text-gray-900">
                {exams.filter(e => e.status === 'upcoming').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">En cours</p>
              <p className="text-2xl font-bold text-gray-900">
                {exams.filter(e => e.status === 'ongoing').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Étudiants</p>
              <p className="text-2xl font-bold text-gray-900">
                {exams.reduce((sum, exam) => sum + exam.students, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Matières</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(exams.map(e => e.subject)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {getTypeText(exam.type)}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                  {getStatusText(exam.status)}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{exam.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Matière:</span>
                  <span className="font-medium">{exam.subject}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(exam.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Durée:</span>
                  <span className="font-medium">{exam.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Étudiants:</span>
                  <span className="font-medium">{exam.students}</span>
                </div>
                {exam.room && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Salle:</span>
                    <span className="font-medium">{exam.room}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Professeur:</span>
                  <span className="font-medium">{exam.teacher}</span>
                </div>
              </div>

              {exam.description && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">{exam.description}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Participants
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
      {filteredExams.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun examen trouvé</h3>
          <p className="text-gray-600">Aucun examen ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default ExamsPage; 