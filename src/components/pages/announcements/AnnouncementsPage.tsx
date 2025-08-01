import React, { useState } from 'react';
import { Bell, Plus, Search, Edit, Trash2, ArrowLeft, Calendar, Users, AlertTriangle, Info, Megaphone } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface Announcement {
  id: string;
  title: string;
  type: 'info' | 'warning' | 'urgent' | 'event' | 'academic';
  content: string;
  author: string;
  date: string;
  targetAudience: 'all' | 'students' | 'teachers' | 'parents' | 'admin';
  status: 'published' | 'draft' | 'archived';
  priority: 'low' | 'medium' | 'high';
  attachments?: string[];
  expiresAt?: string;
}

const AnnouncementsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [announcements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Fermeture exceptionnelle - Vendredi 26 Janvier',
      type: 'urgent',
      content: 'L\'établissement sera fermé exceptionnellement le vendredi 26 janvier 2024 pour maintenance technique. Les cours reprendront normalement le lundi 29 janvier.',
      author: 'Direction',
      date: '2024-01-20',
      targetAudience: 'all',
      status: 'published',
      priority: 'high',
      expiresAt: '2024-01-29'
    },
    {
      id: '2',
      title: 'Inscriptions Bac Blanc - Session Février',
      type: 'academic',
      content: 'Les inscriptions pour le Bac Blanc de février sont ouvertes jusqu\'au 15 janvier. Tous les élèves de terminale sont concernés. Contactez vos professeurs principaux.',
      author: 'Service Académique',
      date: '2024-01-15',
      targetAudience: 'students',
      status: 'published',
      priority: 'medium',
      expiresAt: '2024-02-15'
    },
    {
      id: '3',
      title: 'Réunion Parents-Professeurs - 2ème Trimestre',
      type: 'event',
      content: 'La réunion parents-professeurs du 2ème trimestre aura lieu le samedi 3 février de 9h à 12h. Inscription obligatoire via le portail parents.',
      author: 'Administration',
      date: '2024-01-18',
      targetAudience: 'parents',
      status: 'published',
      priority: 'medium',
      expiresAt: '2024-02-03'
    },
    {
      id: '4',
      title: 'Nouveau Laboratoire Informatique - Ouverture',
      type: 'info',
      content: 'Le nouveau laboratoire informatique est maintenant opérationnel. Il dispose de 25 postes équipés des derniers logiciels de développement. Réservation via l\'intranet.',
      author: 'Service Technique',
      date: '2024-01-22',
      targetAudience: 'teachers',
      status: 'published',
      priority: 'low'
    },
    {
      id: '5',
      title: 'Alerte Météo - Cours Maintenus',
      type: 'warning',
      content: 'En raison des conditions météorologiques, les cours sont maintenus mais les transports peuvent être perturbés. Prévoyez des délais supplémentaires.',
      author: 'Direction',
      date: '2024-01-23',
      targetAudience: 'all',
      status: 'published',
      priority: 'high',
      expiresAt: '2024-01-24'
    },
    {
      id: '6',
      title: 'Formation Pédagogique - Nouvelles Méthodes',
      type: 'academic',
      content: 'Formation sur les nouvelles méthodes pédagogiques le mercredi 31 janvier de 14h à 17h. Inscription obligatoire pour tous les enseignants.',
      author: 'Service Formation',
      date: '2024-01-19',
      targetAudience: 'teachers',
      status: 'draft',
      priority: 'medium',
      expiresAt: '2024-01-31'
    }
  ]);

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || announcement.type === selectedType;
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'event':
        return 'bg-purple-100 text-purple-800';
      case 'academic':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'Urgent';
      case 'warning':
        return 'Avertissement';
      case 'info':
        return 'Information';
      case 'event':
        return 'Événement';
      case 'academic':
        return 'Académique';
      default:
        return 'Autre';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTargetAudienceText = (audience: string) => {
    switch (audience) {
      case 'all':
        return 'Tous';
      case 'students':
        return 'Étudiants';
      case 'teachers':
        return 'Enseignants';
      case 'parents':
        return 'Parents';
      case 'admin':
        return 'Administration';
      default:
        return 'Autre';
    }
  };

  const announcementTypes = [
    { value: 'all', label: 'Tous les types' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'warning', label: 'Avertissement' },
    { value: 'info', label: 'Information' },
    { value: 'event', label: 'Événement' },
    { value: 'academic', label: 'Académique' }
  ];

  const overallStats = {
    totalAnnouncements: announcements.length,
    publishedAnnouncements: announcements.filter(a => a.status === 'published').length,
    urgentAnnouncements: announcements.filter(a => a.type === 'urgent').length,
    activeAnnouncements: announcements.filter(a => a.status === 'published' && (!a.expiresAt || new Date(a.expiresAt) > new Date())).length
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
            <h1 className="text-2xl font-bold text-gray-800">Gestion des Annonces</h1>
            <p className="text-gray-600">Publiez et gérez les annonces de l'établissement</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Annonce
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher une annonce..."
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
            {announcementTypes.map(type => (
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
            <Bell className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Annonces</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.totalAnnouncements}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Megaphone className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Publiées</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.publishedAnnouncements}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Urgentes</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.urgentAnnouncements}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Info className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Actives</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.activeAnnouncements}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getTypeColor(announcement.type)}`}>
                    {getTypeText(announcement.type)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(announcement.status)}`}>
                    {getStatusText(announcement.status)}
                  </span>
                  <span className={`text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{announcement.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Auteur:</span>
                  <span className="font-medium">{announcement.author}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(announcement.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Public cible:</span>
                  <span className="font-medium">{getTargetAudienceText(announcement.targetAudience)}</span>
                </div>
                {announcement.expiresAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expire le:</span>
                    <span className="font-medium">{new Date(announcement.expiresAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                )}
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 line-clamp-3">{announcement.content}</p>
              </div>

              {announcement.attachments && announcement.attachments.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium mb-1">Pièces jointes:</p>
                  <div className="space-y-1">
                    {announcement.attachments.map((attachment, index) => (
                      <p key={index} className="text-sm text-blue-700">{attachment}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Publier
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
      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune annonce trouvée</h3>
          <p className="text-gray-600">Aucune annonce ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage; 