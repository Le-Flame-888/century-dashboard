import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { Button } from '../ui/button';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleRightSidebar: () => void;
}

const Header = ({ sidebarOpen, setSidebarOpen, toggleRightSidebar }: HeaderProps) => {
  return (
    <header className="relative bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between h-16 z-20">
      {/* Left side - Hamburger Menu and Search */}
      <div className="flex items-center">
                <Button 
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mr-4 text-gray-500 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      <div className="relative max-w-md w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Rechercher..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-4">
        <Button onClick={toggleRightSidebar} variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100">
          <ChevronDown className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
            JD
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">Jean Dupont</span>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
            </div>
            <p className="text-xs text-gray-500">Administrateur</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;