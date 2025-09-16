import React, { useState } from 'react';

const AddPersonModal = ({ onClose, onSave, groups }) => {
  const [personName, setPersonName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');

  const handleSave = () => {
    if (personName.trim() && selectedGroup) {
      onSave({ name: personName, groupId: selectedGroup });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Agregar Nueva Persona</h2>
        <input
          type="text"
          placeholder="Nombre de la Persona"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
        >
          <option value="" disabled>Selecciona un Grupo</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
          >
            Guardar Persona
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPersonModal;