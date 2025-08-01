import { useState } from 'react';
import { 
  format, 
  startOfWeek, 
  endOfWeek, 
  addWeeks, 
  subWeeks, 
  isToday, 
  isSameDay, 
  eachDayOfInterval
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '../../ui/dialog';

// Import React pour les fragments
import React from 'react';

// Types
type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  room?: string;
  instructor?: string;
};

type EventColor = {
  name: string;
  value: string;
};

// Constantes
const HOURS: number[] = Array.from({ length: 24 }, (_, i) => i); // 0-23
const DAYS: string[] = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const EVENT_COLORS: EventColor[] = [
  { name: 'Bleu', value: 'bg-blue-500' },
  { name: 'Rouge', value: 'bg-red-500' },
  { name: 'Vert', value: 'bg-green-500' },
  { name: 'Jaune', value: 'bg-yellow-500' },
  { name: 'Violet', value: 'bg-purple-500' },
  { name: 'Rose', value: 'bg-pink-500' },
  { name: 'Gris', value: 'bg-gray-500' },
];

const CalendarPage = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Cours de Mathématiques',
      start: new Date(new Date().setHours(9, 0, 0, 0)),
      end: new Date(new Date().setHours(11, 0, 0, 0)),
      color: 'bg-blue-500',
      room: 'Salle A1',
      instructor: 'Prof. Dupont'
    },
    {
      id: '2',
      title: 'TD Physique',
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(new Date().setDate(new Date().getDate() + 1)),
      color: 'bg-green-500',
      room: 'Salle B2',
      instructor: 'Prof. Martin'
    },
  ]);

  // Formulaire d'édition/création d'événement
  const [eventForm, setEventForm] = useState<Partial<Event>>({
    title: '',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    color: 'bg-blue-500',
  });

  // Obtenir le début et la fin de la semaine actuelle
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Lundi comme premier jour de la semaine
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Navigation entre les semaines
  const nextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));
  const prevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const goToToday = () => setCurrentWeek(new Date());

  // Vérifier si une date est aujourd'hui
  const isCurrentDay = (day: Date) => isToday(day);

  // Obtenir les événements pour un jour donné
  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.start, day));
  };

  // Obtenir la position verticale d'un événement dans la grille
  const getEventPosition = (event: Event) => {
    const startHour = event.start.getHours() + event.start.getMinutes() / 60;
    const endHour = event.end.getHours() + event.end.getMinutes() / 60;
    return {
      top: `${startHour * 60}px`,
      height: `${(endHour - startHour) * 60}px`,
    };
  };

  // Gérer le clic sur une cellule de temps
  const handleTimeSlotClick = (day: Date, hour: number) => {
    const startDate = new Date(day);
    startDate.setHours(hour, 0, 0, 0);
    
    setEventForm({
      title: '',
      start: startDate,
      end: new Date(startDate.getTime() + 60 * 60 * 1000), // +1 heure
      color: 'bg-blue-500',
    });
    
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  // Gérer la soumission du formulaire d'événement
  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventForm.title || !eventForm.start || !eventForm.end || !eventForm.color) {
      return;
    }
    
    const newEvent: Event = {
      id: selectedEvent?.id || Math.random().toString(36).substr(2, 9),
      title: eventForm.title,
      start: eventForm.start,
      end: eventForm.end,
      color: eventForm.color,
      room: eventForm.room,
      instructor: eventForm.instructor,
    };
    
    if (selectedEvent) {
      // Mettre à jour l'événement existant
      setEvents(events.map(evt => evt.id === selectedEvent.id ? newEvent : evt));
    } else {
      // Ajouter un nouvel événement
      setEvents([...events, newEvent]);
    }
    
    setShowEventModal(false);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* En-tête du calendrier */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={goToToday}
          >
            Aujourd'hui
          </Button>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={prevWeek}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={nextWeek}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-xl font-semibold">
            {format(weekStart, 'MMMM yyyy', { locale: fr })}
          </h2>
        </div>
        <Button 
          onClick={() => {
            setEventForm({
              title: '',
              start: new Date(),
              end: new Date(new Date().setHours(new Date().getHours() + 1)),
              color: 'bg-blue-500',
            });
            setSelectedEvent(null);
            setShowEventModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Créer
        </Button>
      </div>

      {/* Grille du calendrier */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* En-tête des jours */}
        <div className="grid grid-cols-7 border-b">
          <div className="border-r"></div> {/* Colonne des heures */}
          {weekDays.map((day, i) => (
            <div 
              key={i} 
              className={`flex flex-col items-center p-2 border-r ${isCurrentDay(day) ? 'bg-blue-50' : ''}`}
            >
              <div className="text-sm font-medium">{DAYS[day.getDay()]}</div>
              <div 
                className={`flex items-center justify-center h-8 w-8 rounded-full ${isCurrentDay(day) ? 'bg-blue-600 text-white' : ''}`}
              >
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Corps du calendrier */}
        <div className="flex flex-1 overflow-auto">
          {/* Colonne des heures */}
          <div className="w-16 flex-shrink-0 border-r">
            {HOURS.map((hour) => (
              <div 
                key={hour} 
                className="h-16 border-b text-xs text-gray-500 flex items-start justify-end pr-2 pt-1"
              >
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
            ))}
          </div>

          {/* Grille des événements */}
          <div className="flex-1 grid grid-cols-7 relative">
            {/* Lignes de la grille */}
            {HOURS.map((hour) => (
              <React.Fragment key={`grid-${hour}`}>
                {weekDays.map((day, dayIndex) => (
                  <div 
                    key={`${hour}-${dayIndex}`}
                    className="h-16 border-b border-r relative"
                    onClick={() => handleTimeSlotClick(day, hour)}
                  >
                    {/* Cellule de temps cliquable */}
                    <div className="absolute inset-0 hover:bg-gray-50 cursor-pointer"></div>
                    
                    {/* Événements pour cette cellule */}
                    {getEventsForDay(day)
                      .filter(event => {
                        const eventHour = event.start.getHours();
                        return eventHour === hour;
                      })
                      .map((event) => {
                        const position = getEventPosition(event);
                        return (
                          <div
                            key={event.id}
                            className={`absolute left-0 right-1 mx-1 ${event.color} text-white text-xs p-1 rounded overflow-hidden cursor-pointer`}
                            style={{
                              top: position.top,
                              height: position.height,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(event);
                              setEventForm({
                                ...event,
                                start: new Date(event.start),
                                end: new Date(event.end),
                              });
                              setShowEventModal(true);
                            }}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="text-xs opacity-80 truncate">
                              {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                            </div>
                            {event.room && (
                              <div className="text-xs opacity-70 truncate">{event.room}</div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Modal d'édition/création d'événement */}
      <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent ? 'Modifier la réservation' : 'Nouvelle réservation'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleEventSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre <span className="text-red-500">*</span>
              </label>
              <Input
                value={eventForm.title || ''}
                onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                placeholder="Titre de l'événement"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Début
                </label>
                <Input
                  type="datetime-local"
                  value={eventForm.start ? format(eventForm.start, "yyyy-MM-dd'T'HH:mm") : ''}
                  onChange={(e) => setEventForm({
                    ...eventForm, 
                    start: e.target.value ? new Date(e.target.value) : new Date()
                  })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fin
                </label>
                <Input
                  type="datetime-local"
                  value={eventForm.end ? format(eventForm.end, "yyyy-MM-dd'T'HH:mm") : ''}
                  onChange={(e) => setEventForm({
                    ...eventForm, 
                    end: e.target.value ? new Date(e.target.value) : new Date()
                  })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salle
                </label>
                <Input
                  value={eventForm.room || ''}
                  onChange={(e) => setEventForm({...eventForm, room: e.target.value})}
                  placeholder="Salle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enseignant
                </label>
                <Input
                  value={eventForm.instructor || ''}
                  onChange={(e) => setEventForm({...eventForm, instructor: e.target.value})}
                  placeholder="Enseignant"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Couleur
              </label>
              <div className="flex space-x-2">
                {EVENT_COLORS.map((color: EventColor) => (
                  <button
                    key={color.value}
                    type="button"
                    className={`w-8 h-8 rounded-full ${color.value} ${eventForm.color === color.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                    onClick={() => setEventForm({...eventForm, color: color.value})}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setShowEventModal(false)}
              >
                Annuler
              </Button>
              <Button type="submit">
                {selectedEvent ? 'Enregistrer' : 'Créer'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
