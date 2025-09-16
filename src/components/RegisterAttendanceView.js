import React, { useState, useEffect } from 'react';

const RegisterAttendanceView = ({ meetings, people, onUpdateMeetingAttendance, onBack, groups }) => { // Recibir 'groups'
  const [selectedMeetingId, setSelectedMeetingId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState(''); // Nuevo estado para el filtro de grupo
  const [currentMeetingAttendance, setCurrentMeetingAttendance] = useState([]);

  useEffect(() => {
    if (selectedMeetingId) {
      const meeting = meetings.find(m => m._id === selectedMeetingId || m.id === selectedMeetingId);
      if (meeting) {
        const attendanceWithDetails = people.map(person => {
          const record = meeting.attendance.find(att => att.personId === person._id || att.personId === person.id);
          return {
            ...person,
            status: record ? record.status : 'Inasistió',
            excuse: record ? record.excuse : ''
          };
        });
        setCurrentMeetingAttendance(attendanceWithDetails);
      }
    } else {
      setCurrentMeetingAttendance([]);
    }
  }, [selectedMeetingId, meetings, people]);

  const handleStatusChange = (personId, newStatus, excuse = '') => {
    setCurrentMeetingAttendance(prevAttendance =>
      prevAttendance.map(person =>
        person._id === personId ? { ...person, status: newStatus, excuse: newStatus === 'Excusa' ? excuse : '' } : person
      )
    );
  };

  const handleSaveAttendance = () => {
    if (selectedMeetingId) {
      const attendanceToSave = currentMeetingAttendance.map(person => ({
        personId: person._id || person.id,
        status: person.status,
        excuse: person.excuse
      }));
      onUpdateMeetingAttendance(selectedMeetingId, attendanceToSave);
      alert('Asistencia guardada con éxito!');
      if (typeof onBack === 'function') {
        onBack();
      }
    }
  };

  // Filtrar personas por término de búsqueda Y por grupo
  const filteredPeople = currentMeetingAttendance.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroupFilter === '' || (person.groupIds && person.groupIds.includes(parseInt(selectedGroupFilter)));
    return matchesSearch && matchesGroup;
  });

  const statusColors = {
    Asistió: 'bg-green-500 hover:bg-green-600',
    Excusa: 'bg-yellow-500 hover:bg-yellow-600',
    Inasistió: 'bg-red-500 hover:bg-red-600',
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Registrar Asistencia</h2>

      <div className="mb-4">
        <label htmlFor="select-meeting" className="block text-gray-700 text-lg font-medium mb-2">Selecciona una Reunión:</label>
        <select
          id="select-meeting"
          value={selectedMeetingId}
          onChange={(e) => setSelectedMeetingId(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white"
        >
          <option value="">-- Selecciona --</option>
          {meetings.map(meeting => (
            <option key={meeting._id} value={meeting._id}>
              {meeting.name} ({new Date(meeting.date).toLocaleDateString('es-ES')})
            </option>
          ))}
        </select>
      </div>

      {selectedMeetingId && (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar persona por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div className="mb-4"> {/* Nuevo selector de grupo */}
            <label htmlFor="group-filter-attendance" className="block text-gray-700 text-lg font-medium mb-2">Filtrar por Grupo:</label>
            <select
              id="group-filter-attendance"
              value={selectedGroupFilter}
              onChange={(e) => setSelectedGroupFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
            >
              <option value="">Todos los grupos</option>
              {groups.map(group => (
                <option key={group.id || group._id} value={group.id || group._id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4 mb-6">
            {filteredPeople.length > 0 ? (
              filteredPeople.map(person => (
                <div key={person._id || person.id} className="bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="mb-2 sm:mb-0">
                    <h4 className="text-lg font-medium text-gray-800">{person.name}</h4>
                    <p className="text-sm text-gray-500">{person.groupNames.join(', ')}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleStatusChange(person._id, 'Asistió')}
                        className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold text-white transition-colors ${statusColors.Asistió} ${person.status === 'Asistió' ? 'ring-2 ring-offset-2 ring-green-500' : ''}`}
                      >
                        Asistió
                      </button>
                      <button
                        onClick={() => handleStatusChange(person._id, 'Excusa')}
                        className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold text-white transition-colors ${statusColors.Excusa} ${person.status === 'Excusa' ? 'ring-2 ring-offset-2 ring-yellow-500' : ''}`}
                      >
                        Excusa
                      </button>
                      <button
                        onClick={() => handleStatusChange(person._id, 'Inasistió')}
                        className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold text-white transition-colors ${statusColors.Inasistió} ${person.status === 'Inasistió' ? 'ring-2 ring-offset-2 ring-red-500' : ''}`}
                      >
                        Inasistió
                      </button>
                    </div>
                    {person.status === 'Excusa' && (
                      <textarea
                        placeholder="Motivo de la excusa"
                        value={person.excuse}
                        onChange={(e) => handleStatusChange(person._id, 'Excusa', e.target.value)}
                        rows="1"
                        className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition resize-none text-sm"
                      ></textarea>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No se encontraron personas que coincidan con los filtros.</p>
            )}
          </div>

          <button
            onClick={handleSaveAttendance}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
          >
            Guardar Asistencia
          </button>
        </>
      )}
    </div>
  );
};

export default RegisterAttendanceView;