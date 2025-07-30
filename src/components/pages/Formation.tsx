import { Users, Home, PlusCircle } from 'lucide-react';

const Card = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <Icon className="w-6 h-6 text-gray-400" />
    </div>
    <div>{children}</div>
  </div>
);

const FormationPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestion de la Formation</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          <PlusCircle className="w-5 h-5" />
          <span>Lier Formation Individuel</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Groupes" icon={Users}>
          <p className="text-gray-600">Gérer les groupes d'étudiants, consulter les listes et assigner des cours.</p>
        </Card>
        <Card title="Salles" icon={Home}>
          <p className="text-gray-600">Consulter la disponibilité des salles et les assigner aux différents cours.</p>
        </Card>
        <Card title="Professeurs" icon={Users}>
          <p className="text-gray-600">Gérer les informations des professeurs et leurs plannings.</p>
        </Card>
      </div>
    </div>
  );
};

export default FormationPage;
