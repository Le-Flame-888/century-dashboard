import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar, 
  Building, 
  Briefcase, 
  Percent, 
  BarChart, 
  Settings, 
  ChevronDown,
  BarChart2
} from 'lucide-react';
import { cn } from '../../lib/utils';

// --- Type Definitions ---
interface SubMenuItem {
  path: string;
  label: string;
}

interface MenuItem {
  path: string;
  label: string;
  icon: React.ElementType;
  subItems?: SubMenuItem[];
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// --- Menu Items Configuration ---
const menuItems: MenuItem[] = [
  { path: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { path: '/formation', label: 'Formation', icon: BookOpen },
  { 
    path: '/etudiants', 
    label: 'Étudiants', 
    icon: Users,
    subItems: [
      { path: '/etudiants', label: 'Liste des étudiants' },
      { path: '/etudiants/nouveau', label: 'Ajouter un étudiant' },
    ]
  },
  { 
    path: '/reservations', 
    label: 'Réservation', 
    icon: Calendar,
    subItems: [
      { path: '/reservations/calendar', label: 'Calendrier' },
      { path: '/reservations/new', label: 'Nouvelle réservation' },
    ]
  },
  { path: '/operations', label: 'Opérations de salle', icon: Building },
  {
    path: '/staff',
    label: 'Gestion du personnel',
    icon: Briefcase,
    subItems: [
      { path: '/staff/list', label: 'Liste du personnel' },
      { path: '/staff/add', label: 'Ajouter un membre' },
    ],
  },
  { path: '/promotions', label: 'Promotions', icon: Percent },
  { path: '/reports', label: 'Rapport', icon: BarChart },
  { path: '/maintenance', label: 'Maintenance', icon: Settings },
  { path: '/stats', label: 'Statistiques', icon: BarChart2 },
];

// --- Sub-Component for Menu Items ---
interface SidebarItemProps {
  item: MenuItem;
  sidebarOpen: boolean;
  isExpanded: boolean;
  onToggleSubmenu: () => void;
  onLinkClick: () => void;
}

const SidebarItem = ({ item, sidebarOpen, isExpanded, onToggleSubmenu, onLinkClick }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = item.subItems 
    ? location.pathname.startsWith(item.path)
    : (location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/'));

  const commonClasses = 'flex items-center p-2 rounded-lg text-sm font-medium transition-colors w-full';
  const activeClasses = 'bg-green-50 text-green-700';
  const inactiveClasses = 'text-gray-700 hover:bg-gray-50 hover:text-gray-900';

  if (item.subItems) {
    return (
      <li   className="list-none">
        <button onClick={onToggleSubmenu} className={cn(commonClasses, isActive ? activeClasses : inactiveClasses)}>
          <item.icon className="w-5 h-5 shrink-0" />
          <span className={cn('ml-3 flex-1 text-left whitespace-nowrap transition-opacity', sidebarOpen ? 'opacity-100' : 'lg:opacity-0')}>{item.label}</span>
          <ChevronDown className={cn('w-4 h-4 transition-transform shrink-0', isExpanded ? 'rotate-180' : '', sidebarOpen ? 'opacity-100' : 'lg:opacity-0')} />
        </button>
        {(isExpanded && sidebarOpen) && (
          <ul className="mt-1 pl-8 space-y-1">
            {item.subItems.map((subItem) => (
              <li key={subItem.path}>
                <Link
                  to={subItem.path}
                  onClick={onLinkClick}
                  className={cn(
                    'block p-2 rounded-lg text-sm font-medium transition-colors',
                    location.pathname === subItem.path
                      ? 'text-green-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  {subItem.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li className="list-none">
      <Link to={item.path} onClick={onLinkClick} className={cn(commonClasses, isActive ? activeClasses : inactiveClasses)}>
        <item.icon className="w-5 h-5 shrink-0" />
        <span className={cn('ml-3 whitespace-nowrap transition-opacity', sidebarOpen ? 'opacity-100' : 'lg:opacity-0')}>{item.label}</span>
      </Link>
    </li>
  );
};

// --- Main Sidebar Component ---
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to pre-open submenu if on a sub-route
  useEffect(() => {
    const currentPath = location.pathname;
    for (const item of menuItems) {
      if (item.subItems?.some(sub => sub.path === currentPath)) {
        setExpandedItems(prev => ({ ...prev, [item.path]: true }));
        break;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLinkClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSubmenu = (path: string) => {
    // On desktop with collapsed sidebar, opening a submenu should expand the sidebar
    if (!sidebarOpen && !isMobile) {
      setSidebarOpen(true);
    }
    setExpandedItems(prev => ({ ...prev, [path]: !prev[path] }));
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={cn(
          'fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 lg:hidden',
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      ></div>

      {/* --- Desktop Toggle Button --- */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={cn(
          'hidden lg:flex items-center justify-center',
          'fixed top-14 z-50 w-6 h-6 rounded-full bg-white shadow-md',
          'hover:bg-gray-100 transition-colors',
          'border border-gray-200',
          'transition-all duration-300 ease-in-out',
          sidebarOpen ? 'left-[244px]' : 'left-[68px]'
        )}
        aria-label={sidebarOpen ? 'Réduire la barre latérale' : 'Agrandir la barre latérale'}
      >
        <ChevronDown className={cn('w-4 h-4 text-gray-600 transition-transform', sidebarOpen ? 'rotate-90' : '-rotate-90')} />
      </button>

      <aside
        className={cn(
          'fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-in-out',
          // Mobile state
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop state
          'lg:translate-x-0',
          sidebarOpen ? 'w-64' : 'lg:w-20'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex items-center border-b border-gray-200 h-16 shrink-0">
            <Link to="/dashboard" onClick={handleLinkClick} className="flex items-center gap-2 w-full justify-center">
            <img
                src="https://ui.shadcn.com/avatars/01.png"
                alt="User avatar"
                className="w-8 h-8 rounded-full shrink-0"
            />
              <span className={cn('font-bold text-xl text-gray-800 whitespace-nowrap transition-opacity', sidebarOpen ? 'opacity-100' : 'lg:opacity-0')}>EduCenter</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {menuItems.map(item => (
              <SidebarItem 
                key={item.path}
                item={item}
                sidebarOpen={sidebarOpen}
                isExpanded={expandedItems[item.path] || false}
                onToggleSubmenu={() => toggleSubmenu(item.path)}
                onLinkClick={handleLinkClick}
              />
            ))}
          </nav>

          {/* Footer Navigation */}
          <div className="px-2 py-4">
            <SidebarItem 
              item={{ path: '/settings', label: 'Paramètres', icon: Settings }}
              sidebarOpen={sidebarOpen}
              isExpanded={false}
              onToggleSubmenu={() => {}}
              onLinkClick={handleLinkClick}
            />
          </div>

          {/* Footer Profile */}
          <div className="p-2 border-t border-gray-200 shrink-0">
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-50">
              <img
                src="https://ui.shadcn.com/avatars/01.png"
                alt="User avatar"
                className="w-8 h-8 rounded-full shrink-0"
              />
              <div className={cn('ml-3 overflow-hidden transition-opacity', sidebarOpen ? 'opacity-100' : 'lg:opacity-0')}>
                <p className="text-sm font-semibold text-gray-800 truncate">Jean Dupont</p>
                <p className="text-xs text-gray-500 truncate">Administrateur</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};


export default Sidebar;