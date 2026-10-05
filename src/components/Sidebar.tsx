import { Page } from '../App'

interface SidebarProps {
  currentPage: Page
  setCurrentPage: (page: Page) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const menuItems: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
  { id: 'datasets', label: 'Datasets', icon: 'fa-database' },
  { id: 'training', label: 'Entrenamiento', icon: 'fa-brain' },
  { id: 'models', label: 'Modelos', icon: 'fa-cubes' },
  { id: 'settings', label: 'Configuración', icon: 'fa-gear' },
]

export default function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }: SidebarProps) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-800 border-r border-gray-700 transition-all duration-300 z-50 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AutoML
            </span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white transition-colors p-1"
        >
          <i className={`fas ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-all duration-200 ${
              currentPage === item.id
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <i className={`fas ${item.icon} text-lg w-5 text-center`}></i>
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Sistema activo</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">v2.1.0 • GPU: RTX 4090</p>
          </div>
        </div>
      )}
    </aside>
  )
}
