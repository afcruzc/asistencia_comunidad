import React from 'react';

const MeetingCard = ({ meeting, onClick, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    // Asume que dateString ya está en formato YYYY-MM-DD
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day); // month - 1 porque los meses en JS son de 0-11
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      <div onClick={() => onClick(meeting)} className="cursor-pointer flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{meeting.name}</h3>
        <p className="text-gray-600 text-sm">Fecha: {formatDate(meeting.date)}</p>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(meeting.id); }}
          className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
        >
          Eliminar
        </button>
        <span onClick={() => onClick(meeting)} className="text-sm font-medium text-purple-600 cursor-pointer hover:text-purple-800 transition-colors">
          Ver asistencia
        </span>
      </div>
    </div>
  );
};

export default MeetingCard;