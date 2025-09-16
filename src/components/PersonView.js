import React, { useState } from 'react';
import PersonCard from './PersonCard';

const PersonView = ({ people, onAddPerson, onSelectPerson, onEditPerson, onDeletePerson }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar personas por nombre o ID
  const filteredPeople = people.filter(person => {
    const name = person.name ? person.name.toLowerCase() : '';
    const id = person.personId ? person.personId.toLowerCase() : (person._id ? person._id.toLowerCase() : '');
    return (
      name.includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-4">
      <div className="mb-4"> {/* Ajustado mb-4 */}
        <input
          type="text"
          placeholder="Buscar persona por nombre o DNI..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      <div className="space-y-4 mb-6">
        {filteredPeople.length > 0 ? (
          filteredPeople.map((person) => (
            <PersonCard
              key={person._id}
              person={person}
              onClick={onSelectPerson}
              onEdit={onEditPerson}
              onDelete={onDeletePerson}
              showStatus={false} // No mostrar el estado de asistencia aquí
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No se encontraron personas.</p>
        )}
      </div>
      <button
        onClick={onAddPerson}
        className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
      >
        Agregar Nueva Persona
      </button>
    </div>
  );
};

export default PersonView;