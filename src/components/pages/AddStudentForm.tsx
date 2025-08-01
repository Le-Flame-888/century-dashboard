import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, BookOpen, ArrowLeft, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const AddStudentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    status: 'Actif',
    joinDate: new Date().toISOString().split('T')[0],
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    emergencyContact: '',
  });

  const courses = [
    'Mathématiques',
    'Physique',
    'Chimie',
    'Informatique',
    'Développement Web',
    'Anglais',
    'Français',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pourriez ajouter la logique pour sauvegarder l'étudiant
    console.log('Données du formulaire:', formData);
    // Rediriger vers la liste des étudiants après l'ajout
    navigate('/etudiants');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 h-full">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Ajouter un nouvel étudiant</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prénom */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Prénom <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="pl-10"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Nom */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Nom <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="pl-10"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="pl-10"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Téléphone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                className="pl-10"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Formation */}
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
              Formation <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-gray-400" />
              </div>
              <Select
                value={formData.course}
                onValueChange={(value: string) => setFormData({...formData, course: value})}
              >
                <SelectTrigger className="pl-10 w-full">
                  <SelectValue placeholder="Sélectionner une formation" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Parent Contact Information Section */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Informations des Parents
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Parent Name */}
            <div>
              <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom du Parent <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="parentName"
                  name="parentName"
                  type="text"
                  required
                  className="pl-10"
                  value={formData.parentName}
                  onChange={handleChange}
                  placeholder="Nom complet du parent"
                />
              </div>
            </div>

            {/* Parent Phone */}
            <div>
              <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone du Parent <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="parentPhone"
                  name="parentPhone"
                  type="tel"
                  required
                  className="pl-10"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  placeholder="+212 6 23 45 67 89"
                />
              </div>
            </div>

            {/* Parent Email */}
            <div>
              <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email du Parent
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="parentEmail"
                  name="parentEmail"
                  type="email"
                  className="pl-10"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  placeholder="parent@email.com"
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
                Contact d'Urgence
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  type="tel"
                  className="pl-10"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Contact d'urgence (optionnel)"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Annuler
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Enregistrer l'étudiant
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;
