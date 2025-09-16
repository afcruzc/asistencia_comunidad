import React from 'react';
import PersonCard from './PersonCard';

const DeletedPeopleHistoryView = ({ deletedPeople, groups }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Historial de Personas Eliminadas</h2>
      <div className="space-y-4 mb-6">
        {deletedPeople.length > 0 ? (
          deletedPeople.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              onClick={() => {}} // No hay navegación desde aquí
              onEdit={() => {}} // No se edita desde aquí
              onDelete={() => {}} // No se elimina de nuevo desde aquí
              showStatus={false} // No mostrar estado de asistencia
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No hay personas eliminadas en el historial.</p>
        )}
      </div>
    </div>
  );
};

export default DeletedPeopleHistoryView;