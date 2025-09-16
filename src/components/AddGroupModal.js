import React, { useState } from 'react';

const AddGroupModal = ({ onClose, onSave }) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handleSave = () => {
    if (groupName.trim()) {
      onSave({ name: groupName, description: groupDescription });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Agregar Nuevo Grupo</h2>
        <input
          type="text"
          placeholder="Nombre del Grupo"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <textarea
          placeholder="Descripción del Grupo (opcional)"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          rows="3"
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        ></textarea>
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
            Guardar Grupo
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupModal;