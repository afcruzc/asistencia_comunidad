import React, { useState } from 'react';

const AdminView = ({ onClearAllData, onRegisterLeader, groups }) => {
  const [leaderForm, setLeaderForm] = useState({
    name: '',
    email: '',
    password: '',
    groupId: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaderForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!leaderForm.name || !leaderForm.email || !leaderForm.password || !leaderForm.groupId) {
      alert('Todos los campos son requeridos');
      return;
    }
    onRegisterLeader(leaderForm);
    setLeaderForm({ name: '', email: '', password: '', groupId: '' });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Administración</h2>

      {/* Register Leader Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Registrar Nuevo Líder</h3>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={leaderForm.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={leaderForm.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={leaderForm.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grupo</label>
            <select
              name="groupId"
              value={leaderForm.groupId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seleccionar grupo</option>
              {groups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Registrar Líder
          </button>
        </form>
      </div>

      {/* Clear Data Section */}
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