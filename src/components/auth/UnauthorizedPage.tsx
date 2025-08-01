import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Shield, ArrowLeft, Home } from 'lucide-react';

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-md w-full text-center space-y-8 p-8">
        {/* Icon */}
        <div className="mx-auto h-24 w-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
          <Shield className="h-12 w-12 text-white" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Accès refusé
          </h1>
          <p className="text-lg text-gray-600">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          <p className="text-sm text-gray-500">
            Veuillez contacter votre administrateur si vous pensez qu'il s'agit d'une erreur.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link to="/dashboard">
              <Home className="h-4 w-4 mr-2" />
              Retour au tableau de bord
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link to="/login">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Se connecter avec un autre compte
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage; 