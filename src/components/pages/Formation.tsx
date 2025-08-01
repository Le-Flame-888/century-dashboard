import { Users, Home, PlusCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

const Card = ({ title, icon: Icon, children, onClick, href }: CardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      navigate(href);
    }
  };

  return (
    <div 
      className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2">
          <Icon className="w-6 h-6 text-gray-400" />
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      <div className="text-gray-600">{children}</div>
    </div>
  );
};

const FormationPage = () => {
  const navigate = useNavigate();

  const handleGroupesClick = () => {
    navigate('/formation/groupes');
  };

  const handleSallesClick = () => {
    navigate('/formation/salles');
  };

  const handleProfesseursClick = () => {
    navigate('/formation/professeurs');
  };

  const handleLierFormation = () => {
    alert('Fonctionnalité Lier Formation Individuel - À implémenter');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestion de la Formation</h1>
        <button 
          onClick={handleLierFormation}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Lier Formation Individuel</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Groupes" icon={Users} onClick={handleGroupesClick}>
          <p>Gérer les groupes d'étudiants, consulter les listes et assigner des cours.</p>
        </Card>
        <Card title="Salles" icon={Home} onClick={handleSallesClick}>
          <p>Consulter la disponibilité des salles et les assigner aux différents cours.</p>
        </Card>
        <Card title="Professeurs" icon={Users} onClick={handleProfesseursClick}>
          <p>Gérer les informations des professeurs et leurs plannings.</p>
        </Card>
      </div>
    </div>
  );
};

export default FormationPage;
