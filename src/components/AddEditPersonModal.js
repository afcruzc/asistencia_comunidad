import React, { useState, useEffect } from 'react';

const AddEditPersonModal = ({ onClose, onSave, groups, personToEdit }) => {
  const [personName, setPersonName] = useState('');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (personToEdit) {
      setPersonName(personToEdit.name);
      setSelectedGroups(personToEdit.groupIds || []);
    } else {
      setPersonName('');
      setSelectedGroups([]);
    }
    setError('');
  }, [personToEdit]);

  const handleGroupChange = (groupId) => {
    setSelectedGroups(prevSelected => {
      if (prevSelected.includes(groupId)) {
        return prevSelected.filter(id => id !== groupId);
      } else {
        return [...prevSelected, groupId];
      }
    });
  };

  const handleSave = async () => {
    if (personName.trim()) {
      setIsSaving(true);
      setError('');
      const dataToSave = {
        name: personName,
        groupIds: selectedGroups,
      };
      if (personToEdit && personToEdit._id) {
        dataToSave._id = personToEdit._id;
      }
      try {
        await onSave(dataToSave);
        onClose();
      } catch (err) {
        if (err.message && err.message.includes('Ya existe')) {
          setError('Ya existe una persona con ese nombre o ID.');
        } else {
          setError('Error al guardar la persona.');
        }
      } finally {
        setIsSaving(false);
      }
    } else {
      setError('Por favor, ingresa el nombre de la persona.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {personToEdit ? 'Editar Persona' : 'Agregar Nueva Persona'}
        </h2>
        <input
          type="text"
          placeholder="Nombre de la Persona"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Selecciona Grupos:</label>
          <div className="grid grid-cols-2 gap-2">
            {groups.map((group) => {
              const groupId = group.id || group._id;
              return (
                <label key={groupId} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedGroups.includes(groupId)}
                    onChange={() => handleGroupChange(groupId)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="text-gray-800">{group.name}</span>
                </label>
              );
            })}
          </div>
        </div>
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            disabled={isSaving}
          >
            {isSaving ? 'Guardando...' : personToEdit ? 'Guardar Cambios' : 'Guardar Persona'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditPersonModal;