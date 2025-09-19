import React from 'react';

const HamburgerMenu = ({ isOpen, onClose, onNavigate, currentPage, isLeaderAuthenticated, showSidebar, onToggleSidebar }) => {
  const menuItems = [
    { id: 'groups', label: 'Grupos', icon: '👥' },
    { id: 'people', label: 'Personas', icon: '👤' },
    { id: 'meetings', label: 'Reuniones', icon: '📅' },
    { id: 'registerAttendance', label: 'Registrar Asistencia', icon: '✅' },
    { id: 'deletedHistory', label: 'Historial de Eliminados', icon: '🗑️' },
    { id: 'admin', label: 'Administración', icon: '⚙️' },
    { id: 'backend-test', label: 'Prueba Backend', icon: '🔗' },
  ];

  // Menú hamburguesa (solo móvil)
  const mobileMenu = (
    <div className="fixed inset-0 z-40 md:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Menú</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  // Menú lateral fijo (solo escritorio)
  const desktopMenu = showSidebar ? (
    <div className="hidden md:flex md:flex-col md:w-64 md:h-screen md:fixed md:left-0 md:top-0 bg-white shadow-lg z-30 transition-all duration-300">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Menú</h2>
        <button
          onClick={onToggleSidebar}
          className="text-gray-500 hover:text-gray-700 ml-2"
          title="Ocultar menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors mb-2 ${
              currentPage === item.id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  ) : null;

  return (
    <>
      {/* Menú hamburguesa móvil */}
      {isOpen && mobileMenu}
      {/* Menú lateral fijo escritorio */}
      {desktopMenu}
    </>
  );
};

export default HamburgerMenu;