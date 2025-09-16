import React from 'react';

const LayoutHeader = ({ title, onBack, showBack, onMenuToggle, currentLeader, onLeaderLogout }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          {showBack && (
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          <button
            onClick={onMenuToggle}
            className="md:hidden text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>

        {currentLeader && (
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Líder de {currentLeader.group?.name}</p>
              <p className="text-sm font-medium text-gray-800">{currentLeader.name}</p>
            </div>
            <button
              onClick={onLeaderLogout}
              className="text-gray-600 hover:text-red-600 transition-colors"
              title="Cerrar sesión"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default LayoutHeader;