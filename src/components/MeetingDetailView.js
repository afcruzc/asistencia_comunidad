import React, { useState } from 'react';
import PersonCard from './PersonCard';

const MeetingDetailView = ({ meeting, people, groups, onStatusChange, onEditPerson }) => {
  const [selectedGroupFilter, setSelectedGroupFilter] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    // Asume que dateString ya está en formato YYYY-MM-DD
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day); // month - 1 porque los meses en JS son de 0-11
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const peopleForMeeting = people.map(person => {
    const attendanceRecord = meeting.attendance.find(att => att.personId === person.id);
    return {
      ...person,
      status: attendanceRecord ? attendanceRecord.status : 'Inasistió',
      excuse: attendanceRecord ? attendanceRecord.excuse : ''
    };
  });

  const getMeetingAttendanceSummary = () => {
    let attended = 0;
    let excused = 0;
    let unexcused = 0;
    const totalPeopleInMeeting = peopleForMeeting.length;

    peopleForMeeting.forEach(person => {
      if (person.status === 'Asistió') {
        attended++;
      } else if (person.status === 'Excusa') {
        excused++;
      } else {
        unexcused++;
      }
    });

    return {
      Asistió: attended,
      Excusa: excused,
      Inasistió: unexcused,
      total: totalPeopleInMeeting
    };
  };

  const summary = getMeetingAttendanceSummary();

  const data = [
    { label: 'Asistió', value: summary.Asistió, color: 'bg-green-500' },
    { label: 'Excusa', value: summary.Excusa, color: 'bg-yellow-500' },
    { label: 'Inasistió', value: summary.Inasistió, color: 'bg-red-500' },
  ];

  const filteredPeopleForDisplay = peopleForMeeting.filter(person => {
    if (!selectedGroupFilter) {
      return true;
    }
    return person.groupIds && person.groupIds.includes(parseInt(selectedGroupFilter));
  });

  const groupedPeople = groups.reduce((acc, group) => {
    acc[group.id] = {
      ...group,
      people: filteredPeopleForDisplay.filter(person => person.groupIds && person.groupIds.includes(group.id))
    };
    return acc;
  }, {});

  const ungroupedPeople = filteredPeopleForDisplay.filter(person => !person.groupIds || person.groupIds.length === 0 || !person.groupIds.some(id => groups.some(g => g.id === id)));


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{meeting.name}</h2>
      <p className="text-gray-600 text-center mb-8">Fecha: {formatDate(meeting.date)}</p>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Resumen de Asistencia de la Reunión</h3>
        <p className="text-gray-600 mb-6">Total de personas en la reunión: {summary.total}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {data.map((item, index) => (
            <div key={index} className={`p-4 rounded-xl text-white ${item.color} shadow-md`}>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-3xl font-bold mt-1">{item.value}</p>
              <p className="text-xs mt-1">
                {summary.total > 0 ? `${((item.value / summary.total) * 100).toFixed(1)}%` : '0%'}
              </p>
            </div>
          ))}
        </div>

        {summary.total > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
            <div
              className="h-full bg-green-500 float-left transition-all duration-500"
              style={{ width: `${(summary.Asistió / summary.total) * 100}%` }}
            ></div>
            <div
              className="h-full bg-yellow-500 float-left transition-all duration-500"
              style={{ width: `${(summary.Excusa / summary.total) * 100}%` }}
            ></div>
            <div
              className="h-full bg-red-500 float-left transition-all duration-500"
              style={{ width: `${(summary.Inasistió / summary.total) * 100}%` }}
            ></div>
          </div>
        )}
        {summary.total === 0 && (
          <p className="text-center text-gray-500 mt-4">No hay personas registradas para esta reunión.</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="group-filter" className="block text-gray-700 text-lg font-medium mb-2">Filtrar por Grupo:</label>
        <select
          id="group-filter"
          value={selectedGroupFilter}
          onChange={(e) => setSelectedGroupFilter(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
        >
          <option value="">Todos los grupos</option>
          {groups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      {Object.values(groupedPeople).map(groupData => (
        <div key={groupData.id} className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{groupData.name}</h3>
          {groupData.people.length > 0 ? (
            <div className="space-y-4">
              {groupData.people.map(person => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onStatusChange={(personId, newStatus) => onStatusChange(meeting.id, personId, newStatus, person.excuse)}
                  onEdit={onEditPerson}
                  onClick={() => {}}
                  showStatus={true}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No hay personas de este grupo en la reunión.</p>
          )}
        </div>
      ))}

      {ungroupedPeople.length > 0 && !selectedGroupFilter && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Personas sin Grupo</h3>
          <div className="space-y-4">
            {ungroupedPeople.map(person => (
              <PersonCard
                key={person.id}
                person={person}
                onStatusChange={(personId, newStatus) => onStatusChange(meeting.id, personId, newStatus, person.excuse)}
                onEdit={onEditPerson}
                onClick={() => {}}
                showStatus={true}
              />
            ))}
          </div>
        </div>
      )}

      {Object.values(groupedPeople).every(g => g.people.length === 0) && ungroupedPeople.length === 0 && (
        <p className="text-center text-gray-500">No hay personas registradas para esta reunión que coincidan con el filtro.</p>
      )}
    </div>
  );
};

export default MeetingDetailView;