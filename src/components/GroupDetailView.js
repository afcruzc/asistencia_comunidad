import React, { useState, useEffect } from 'react';
import PersonCard from './PersonCard';
import GroupDashboardView from './GroupDashboardView';

const GroupDetailView = ({ group, people, meetings, groups, onStatusChange, onAddPerson, onSelectPerson, onEditPerson, onDeletePerson }) => {
  const [subPage, setSubPage] = useState('people');
  const [peopleInGroup, setPeopleInGroup] = useState([]);

  useEffect(() => {
    // Filtrar personas que tienen el groupId de este grupo
    const filtered = people.filter(person => person.groupIds && person.groupIds.some(id => String(id) === String(group.id)));
    setPeopleInGroup(filtered);
  }, [people, group]); // Dependencias: people y group

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{group.name}</h2>
      <p className="text-gray-600 text-center mb-8">{group.description}</p>

      <nav className="flex justify-around bg-white p-2 shadow-md rounded-xl mb-4">
        <button
          onClick={() => setSubPage('people')}
          className={`px-4 py-2 rounded-lg text-md font-semibold transition-colors ${
            subPage === 'people' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Personas del Grupo
        </button>
        <button
          onClick={() => setSubPage('dashboard')}
          className={`px-4 py-2 rounded-lg text-md font-semibold transition-colors ${
            subPage === 'dashboard' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Dashboard de Asistencia
        </button>
      </nav>

      {subPage === 'people' && (
        <>
          <div className="space-y-4 mb-6">
            {peopleInGroup.length > 0 ? (
              peopleInGroup.map((person) => (
                <PersonCard
                  key={person._id}
                  person={person}
                  onStatusChange={onStatusChange}
                  onClick={onSelectPerson}
                  onEdit={onEditPerson}
                  onDelete={onDeletePerson} // Pasar onDeletePerson aquí
                  showStatus={false} // No mostrar el estado de asistencia aquí
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No hay personas en este grupo aún.</p>
            )}
          </div>
          <button
            onClick={onAddPerson}
            className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Agregar Nueva Persona al Grupo
          </button>
        </>
      )}

      {subPage === 'dashboard' && (
        <GroupDashboardView
          group={group}
          people={peopleInGroup}
          meetings={meetings}
          groups={groups}
        />
      )}
    </div>
  );
};

export default GroupDetailView;