import React from 'react';

const AdminView = ({ onClearAllData }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Administración</h2>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Borrar Todos los Datos</h3>
        <p className="text-gray-600 mb-6">
          Esta acción eliminará permanentemente todas las personas, reuniones y el historial de eliminados.
          ¡No se puede deshacer!
        </p>
        <button
          onClick={onClearAllData}
          className="px-6 py-3 rounded-xl text-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-md"
        >
          Borrar Todos los Datos
        </button>
      </div>
    </div>
  );
};

export default AdminView;