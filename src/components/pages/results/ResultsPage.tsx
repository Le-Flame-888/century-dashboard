import React, { useState } from 'react';
import { ClipboardList, Plus, Search, Edit, Trash2, ArrowLeft, TrendingUp, Users, Award, BarChart3 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface Result {
  id: string;
  examTitle: string;
  examType: 'controle' | 'examen' | 'bac' | 'concours' | 'test';
  subject: string;
  date: string;
  totalStudents: number;
  passedStudents: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  teacher: string;
  status: 'published' | 'draft' | 'archived';
  notes?: string;
}

const ResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [results] = useState<Result[]>([
    {
      id: '1',
      examTitle: 'Contrôle Mathématiques - Algèbre',
      examType: 'controle',
      subject: 'Mathématiques',
      date: '2024-01-15',
      totalStudents: 45,
      passedStudents: 38,
      averageScore: 14.2,
      highestScore: 20,
      lowestScore: 8,
      teacher: 'Marie Martin',
      status: 'published',
      notes: 'Bon niveau général, quelques difficultés avec les équations du second degré'
    },
    {
      id: '2',
      examTitle: 'Examen Final - Physique Quantique',
      examType: 'examen',
      subject: 'Physique',
      date: '2024-01-20',
      totalStudents: 32,
      passedStudents: 25,
      averageScore: 12.8,
      highestScore: 18,
      lowestScore: 6,
      teacher: 'Jean Dupont',
      status: 'published',
      notes: 'Résultats satisfaisants, amélioration nécessaire en mécanique quantique'
    },
    {
      id: '3',
      examTitle: 'Bac Blanc - Mathématiques',
      examType: 'bac',
      subject: 'Mathématiques',
      date: '2024-02-10',
      totalStudents: 120,
      passedStudents: 95,
      averageScore: 13.5,
      highestScore: 20,
      lowestScore: 5,
      teacher: 'Marie Martin',
      status: 'published',
      notes: 'Excellent taux de réussite pour le Bac Blanc'
    },
    {
      id: '4',
      examTitle: 'Test Informatique - Programmation',
      examType: 'test',
      subject: 'Informatique',
      date: '2024-01-12',
      totalStudents: 28,
      passedStudents: 24,
      averageScore: 15.1,
      highestScore: 20,
      lowestScore: 9,
      teacher: 'Sophie Bernard',
      status: 'published'
    },
    {
      id: '5',
      examTitle: 'Concours CPGE - Mathématiques',
      examType: 'concours',
      subject: 'Mathématiques',
      date: '2024-03-15',
      totalStudents: 85,
      passedStudents: 12,
      averageScore: 8.7,
      highestScore: 16,
      lowestScore: 2,
      teacher: 'Pierre Dubois',
      status: 'published',
      notes: 'Concours très sélectif, niveau élevé requis'
    },
    {
      id: '6',
      examTitle: 'Contrôle Chimie - Organique',
      examType: 'controle',
      subject: 'Chimie',
      date: '2024-01-18',
      totalStudents: 38,
      passedStudents: 35,
      averageScore: 14.8,
      highestScore: 19,
      lowestScore: 10,
      teacher: 'Claire Moreau',
      status: 'draft'
    }
  ]);

  const filteredResults = results.filter(result => {
    const matchesSearch = result.examTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || result.examType === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publié';
      case 'draft':
        return 'Brouillon';
      case 'archived':
        return 'Archivé';
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

  const getPassRate = (passed: number, total: number) => {
    return ((passed / total) * 100).toFixed(1);
  };

  const getScoreColor = (score: number) => {
    if (score >= 16) return 'text-green-600';
    if (score >= 14) return 'text-blue-600';
    if (score >= 12) return 'text-yellow-600';
    if (score >= 10) return 'text-orange-600';
    return 'text-red-600';
  };

  const examTypes = [
    { value: 'all', label: 'Tous les types' },
    { value: 'controle', label: 'Contrôles' },
    { value: 'examen', label: 'Examens' },
    { value: 'bac', label: 'Bac Blanc' },
    { value: 'concours', label: 'Concours' },
    { value: 'test', label: 'Tests' }
  ];

  const overallStats = {
    totalExams: results.length,
    totalStudents: results.reduce((sum, r) => sum + r.totalStudents, 0),
    averagePassRate: results.reduce((sum, r) => sum + (r.passedStudents / r.totalStudents), 0) / results.length * 100,
    averageScore: results.reduce((sum, r) => sum + r.averageScore, 0) / results.length
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
            <h1 className="text-2xl font-bold text-gray-800">Gestion des Résultats</h1>
            <p className="text-gray-600">Consultez et analysez les résultats des examens</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Résultat
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un résultat..."
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

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <ClipboardList className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Examens</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.totalExams}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Étudiants</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.totalStudents}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Taux de Réussite</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.averagePassRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Award className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Moyenne Générale</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.averageScore.toFixed(1)}/20</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.map((result) => (
          <div key={result.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <ClipboardList className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {getTypeText(result.examType)}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                  {getStatusText(result.status)}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{result.examTitle}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Matière:</span>
                  <span className="font-medium">{result.subject}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(result.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Étudiants:</span>
                  <span className="font-medium">{result.totalStudents}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Réussis:</span>
                  <span className="font-medium text-green-600">{result.passedStudents}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taux de réussite:</span>
                  <span className="font-medium text-green-600">{getPassRate(result.passedStudents, result.totalStudents)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Moyenne:</span>
                  <span className={`font-medium ${getScoreColor(result.averageScore)}`}>{result.averageScore}/20</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Meilleur score:</span>
                  <span className="font-medium text-green-600">{result.highestScore}/20</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Professeur:</span>
                  <span className="font-medium">{result.teacher}</span>
                </div>
              </div>

              {result.notes && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">{result.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analyser
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
      {filteredResults.length === 0 && (
        <div className="text-center py-12">
          <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat trouvé</h3>
          <p className="text-gray-600">Aucun résultat ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsPage; 