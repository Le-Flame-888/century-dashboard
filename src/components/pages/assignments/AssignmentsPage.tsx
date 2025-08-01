import React, { useState } from 'react';
import { FileText, Plus, Search, Edit, Trash2, ArrowLeft, Calendar, Clock, Users, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface Assignment {
  id: string;
  title: string;
  type: 'td' | 'tp' | 'projet' | 'expose';
  subject: string;
  dueDate: string;
  duration: string;
  students: number;
  status: 'active' | 'submitted' | 'graded' | 'overdue';
  teacher: string;
  description: string;
  instructions?: string;
  room?: string;
  groupSize?: number;
  weight: number; // Coefficient
}

const AssignmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [assignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'TD Mathématiques - Algèbre Linéaire',
      type: 'td',
      subject: 'Mathématiques',
      dueDate: '2024-01-20',
      duration: '2h00',
      students: 45,
      status: 'active',
      teacher: 'Marie Martin',
      description: 'Exercices sur les espaces vectoriels et les applications linéaires',
      instructions: 'Résoudre les exercices 1 à 5 du chapitre 3. Rendu individuel.',
      weight: 0.3
    },
    {
      id: '2',
      title: 'TP Physique - Mécanique Quantique',
      type: 'tp',
      subject: 'Physique',
      dueDate: '2024-01-25',
      duration: '3h00',
      students: 32,
      status: 'submitted',
      teacher: 'Jean Dupont',
      description: 'Manipulation sur l\'expérience de Young et les interférences',
      instructions: 'Travail en binôme. Préparer le rapport de laboratoire.',
      room: 'Lab Physique A',
      groupSize: 2,
      weight: 0.4
    },
    {
      id: '3',
      title: 'Projet Informatique - Développement Web',
      type: 'projet',
      subject: 'Informatique',
      dueDate: '2024-02-15',
      duration: '20h00',
      students: 28,
      status: 'active',
      teacher: 'Sophie Bernard',
      description: 'Création d\'une application web complète avec base de données',
      instructions: 'Projet en équipe de 3-4 personnes. Présentation finale requise.',
      groupSize: 4,
      weight: 0.5
    },
    {
      id: '4',
      title: 'Exposé Chimie - Chimie Organique',
      type: 'expose',
      subject: 'Chimie',
      dueDate: '2024-01-30',
      duration: '30min',
      students: 38,
      status: 'graded',
      teacher: 'Claire Moreau',
      description: 'Présentation sur les réactions de substitution nucléophile',
      instructions: 'Présentation de 15 minutes + 15 minutes de questions.',
      weight: 0.2
    },
    {
      id: '5',
      title: 'TD Informatique - Algorithmes',
      type: 'td',
      subject: 'Informatique',
      dueDate: '2024-01-18',
      duration: '2h00',
      students: 35,
      status: 'overdue',
      teacher: 'Sophie Bernard',
      description: 'Implémentation d\'algorithmes de tri et de recherche',
      instructions: 'Coder en Python. Tests unitaires requis.',
      weight: 0.3
    },
    {
      id: '6',
      title: 'TP Mathématiques - Statistiques',
      type: 'tp',
      subject: 'Mathématiques',
      dueDate: '2024-02-05',
      duration: '2h30',
      students: 42,
      status: 'active',
      teacher: 'Marie Martin',
      description: 'Analyse statistique avec R et visualisation des données',
      instructions: 'Utiliser R Studio. Préparer les graphiques demandés.',
      room: 'Lab Informatique B',
      groupSize: 2,
      weight: 0.3
    }
  ]);

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || assignment.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'graded':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'En cours';
      case 'submitted':
        return 'Rendu';
      case 'graded':
        return 'Noté';
      case 'overdue':
        return 'En retard';
      default:
        return 'Inconnu';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'td':
        return 'TD';
      case 'tp':
        return 'TP';
      case 'projet':
        return 'Projet';
      case 'expose':
        return 'Exposé';
      default:
        return 'Autre';
    }
  };

  const getTypeFullText = (type: string) => {
    switch (type) {
      case 'td':
        return 'Travaux Dirigés';
      case 'tp':
        return 'Travaux Pratiques';
      case 'projet':
        return 'Projet';
      case 'expose':
        return 'Exposé';
      default:
        return 'Autre';
    }
  };

  const assignmentTypes = [
    { value: 'all', label: 'Tous les types' },
    { value: 'td', label: 'Travaux Dirigés (TD)' },
    { value: 'tp', label: 'Travaux Pratiques (TP)' },
    { value: 'projet', label: 'Projets' },
    { value: 'expose', label: 'Exposés' }
  ];

  const overallStats = {
    totalAssignments: assignments.length,
    activeAssignments: assignments.filter(a => a.status === 'active').length,
    submittedAssignments: assignments.filter(a => a.status === 'submitted').length,
    gradedAssignments: assignments.filter(a => a.status === 'graded').length,
    totalStudents: assignments.reduce((sum, a) => sum + a.students, 0)
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
            <h1 className="text-2xl font-bold text-gray-800">Gestion des Devoirs</h1>
            <p className="text-gray-600">Planifiez et gérez les TD, TP, projets et exposés</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Devoir
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un devoir..."
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
            {assignmentTypes.map(type => (
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
            <FileText className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Devoirs</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.totalAssignments}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">En cours</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.activeAssignments}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Rendus</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.submittedAssignments}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Étudiants</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.totalStudents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {getTypeText(assignment.type)}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                  {getStatusText(assignment.status)}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{assignment.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Matière:</span>
                  <span className="font-medium">{assignment.subject}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date limite:</span>
                  <span className="font-medium">{new Date(assignment.dueDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Durée:</span>
                  <span className="font-medium">{assignment.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Étudiants:</span>
                  <span className="font-medium">{assignment.students}</span>
                </div>
                {assignment.groupSize && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taille groupe:</span>
                    <span className="font-medium">{assignment.groupSize} pers.</span>
                  </div>
                )}
                {assignment.room && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Salle:</span>
                    <span className="font-medium">{assignment.room}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Professeur:</span>
                  <span className="font-medium">{assignment.teacher}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Coefficient:</span>
                  <span className="font-medium">{assignment.weight}</span>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{assignment.description}</p>
              </div>

              {assignment.instructions && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium mb-1">Instructions:</p>
                  <p className="text-sm text-blue-700">{assignment.instructions}</p>
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
      {filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun devoir trouvé</h3>
          <p className="text-gray-600">Aucun devoir ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage; 