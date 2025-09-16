import React from 'react';

const PersonCard = ({ person, onStatusChange, onClick, onEdit, onDelete, showStatus = true }) => {
  const statusColors = {
    Asistió: 'bg-green-100 text-green-800',
    Excusa: 'bg-yellow-100 text-yellow-800',
    Inasistió: 'bg-red-100 text-red-800',
  };

  const nextStatus = {
    Asistió: 'Excusa',
    Excusa: 'Inasistió',
    Inasistió: 'Asistió',
  };

  const handleStatusClick = (e) => {
    e.stopPropagation(); // Evita que el clic en el botón active el onClick de la tarjeta
    onStatusChange(person.id, nextStatus[person.status]);
  };

  return (
    <div
      onClick={() => onClick(person)}
      className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between mb-3 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div>
        <h4 className="text-lg font-medium text-gray-800">{person.name}</h4>
        <p className="text-sm text-gray-500">
          {person.groupNames && person.groupNames.length > 0
            ? person.groupNames.join(', ')
            : 'Sin Grupo'}
        </p>
      </div>
      <div className="flex items-center space-x-3">
        {showStatus && onStatusChange && (
          <button
            onClick={handleStatusClick}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${statusColors[person.status]}`}
          >
            {person.status}
          </button>
        )}
        {onEdit && (
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(person); }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-6.586 4.414A2 2 0 0111.001 10H13V7.999l-4.414-4.414a2 2 0 01-2.828 2.828L7 8.999z" />
              <path fillRule="evenodd" d="M2 13.5V16h2.5L12 8.5V6H9.5L2 13.5zm10.5-1.5L14 10.5V12h-1.5z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        {onDelete && ( // Solo se muestra si onDelete es proporcionado
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(person.id); }}
            className="p-2 rounded-full hover:bg-red-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonCard;