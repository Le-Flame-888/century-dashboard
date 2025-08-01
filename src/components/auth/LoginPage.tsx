import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';
import { Eye, EyeOff, Lock, Mail, User, BookOpen } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success = false;
      
      if (isRegisterMode) {
        success = await register(email, password, name);
        if (success) {
          toast({
            title: "Inscription réussie!",
            description: "Votre compte a été créé avec succès.",
          });
        } else {
          toast({
            title: "Erreur d'inscription",
            description: "Impossible de créer le compte. Veuillez réessayer.",
            variant: "destructive",
          });
        }
      } else {
        success = await login(email, password);
        if (success) {
          toast({
            title: "Connexion réussie!",
            description: "Bienvenue dans votre tableau de bord.",
          });
          navigate(from, { replace: true });
        } else {
          toast({
            title: "Échec de la connexion",
            description: "Email ou mot de passe incorrect.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { email: 'admin@century.com', password: 'admin123', role: 'Administrateur' },
    { email: 'teacher@century.com', password: 'teacher123', role: 'Enseignant' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-md w-full space-y-8 p-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isRegisterMode ? 'Créer un compte' : 'Connexion'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isRegisterMode 
              ? 'Rejoignez Century Dashboard' 
              : 'Accédez à votre tableau de bord'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {isRegisterMode && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required={isRegisterMode}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom complet"
                  className="pl-10"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isRegisterMode ? 'Création...' : 'Connexion...'}
              </div>
            ) : (
              isRegisterMode ? 'Créer un compte' : 'Se connecter'
            )}
          </Button>
        </form>

        {/* Demo Credentials */}
        {!isRegisterMode && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Comptes de démonstration:</h3>
            <div className="space-y-2">
              {demoCredentials.map((cred, index) => (
                <div key={index} className="text-xs text-blue-700">
                  <strong>{cred.role}:</strong> {cred.email} / {cred.password}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toggle Mode */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {isRegisterMode 
              ? 'Déjà un compte? Se connecter' 
              : 'Pas de compte? Créer un compte'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 