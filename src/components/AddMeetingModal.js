import React, { useState } from 'react';

const AddMeetingModal = ({ onClose, onSave }) => {
  const [meetingName, setMeetingName] = useState('');
  const [meetingDate, setMeetingDate] = useState('');

  const handleSave = () => {
    if (meetingName.trim() && meetingDate) {
      // Guardar la fecha directamente como la cadena YYYY-MM-DD
      onSave({ name: meetingName, date: meetingDate });
      onClose();
    } else {
      alert('Por favor, ingresa el nombre de la reunión y selecciona una fecha.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Crear Nueva Reunión</h2>
        <input
          type="text"
          placeholder="Nombre de la Reunión"
          value={meetingName}
          onChange={(e) => setMeetingName(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        <input
          type="date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!meetingName.trim() || !meetingDate}
            className={`px-6 py-3 rounded-xl transition-colors font-semibold ${
              meetingName.trim() && meetingDate
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
          >
            Guardar Reunión
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMeetingModal;