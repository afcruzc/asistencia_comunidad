import React, { useState } from 'react';

const GroupDashboardView = ({ group, people, meetings, groups }) => {
  const [selectedMeetingId, setSelectedMeetingId] = useState('');

  const formatDate = (dateString) => {
    // Asume que dateString ya está en formato YYYY-MM-DD
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day); // month - 1 porque los meses en JS son de 0-11
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const getAttendanceSummary = () => {
    if (!selectedMeetingId) {
      return { Asistió: 0, Excusa: 0, Inasistió: 0, total: 0 };
    }

    const meeting = meetings.find(m => m.id === parseInt(selectedMeetingId));
    if (!meeting) {
      return { Asistió: 0, Excusa: 0, Inasistió: 0, total: 0 };
    }

    let attended = 0;
    let excused = 0;
    let unexcused = 0;

    people.forEach(person => {
      const attendanceRecord = meeting.attendance.find(att => att.personId === person.id);
      const status = attendanceRecord ? attendanceRecord.status : 'Inasistió'; // Default to Inasistió if not recorded

      if (status === 'Asistió') {
        attended++;
      } else if (status === 'Excusa') {
        excused++;
      } else {
        unexcused++;
      }
    });

    return {
      Asistió: attended,
      Excusa: excused,
      Inasistió: unexcused,
      total: people.length
    };
  };

  const summary = getAttendanceSummary();

  const data = [
    { label: 'Asistió', value: summary.Asistió, color: 'bg-green-500' },
    { label: 'Excusa', value: summary.Excusa, color: 'bg-yellow-500' },
    { label: 'Inasistió', value: summary.Inasistió, color: 'bg-red-500' },
  ];

  const totalParticipants = summary.total;

  const handleDownloadCSV = () => {
    if (!selectedMeetingId) {
      alert('Por favor, selecciona una reunión para descargar el CSV.');
      return;
    }

    const meeting = meetings.find(m => m.id === parseInt(selectedMeetingId));
    if (!meeting) {
      alert('Reunión no encontrada.');
      return;
    }

    const csvRows = [];
    // Encabezados del CSV
    csvRows.push('Reunión,Fecha,Grupo,Asistió,Excusa,Inasistió,Total');

    // Datos del resumen
    const summaryRow = [
      `"${meeting.name}"`,
      `"${formatDate(meeting.date)}"`,
      `"${group.name}"`,
      summary.Asistió,
      summary.Excusa,
      summary.Inasistió,
      summary.total
    ];
    csvRows.push(summaryRow.join(','));

    // Separador para el listado de personas
    csvRows.push('\n');
    csvRows.push('Detalle de Asistencia por Persona:');
    csvRows.push('Nombre,DNI/ID,Grupo(s),Estado,Motivo Excusa');

    // Datos de cada persona en el grupo para esa reunión
    people.forEach(person => {
      const attendanceRecord = meeting.attendance.find(att => att.personId === person.id);
      const status = attendanceRecord ? attendanceRecord.status : 'Inasistió';
      const excuse = attendanceRecord ? attendanceRecord.excuse : '';
      const personGroupNames = person.groupIds
        ? person.groupIds.map(id => groups.find(g => g.id === id)?.name || 'Desconocido').join('; ')
        : 'Sin Grupo';

      csvRows.push([
        `"${person.name}"`,
        `"${person.id}"`,
        `"${personGroupNames}"`,
        `"${status}"`,
        `"${excuse}"`
      ].join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `asistencia_${group.name}_${meeting.name.replace(/\s/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Dashboard de Asistencia del Grupo</h3>

      <div className="mb-4">
        <label htmlFor="select-meeting-dashboard" className="block text-gray-700 text-lg font-medium mb-2">Selecciona una Reunión:</label>
        <select
          id="select-meeting-dashboard"
          value={selectedMeetingId}
          onChange={(e) => setSelectedMeetingId(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
        >
          <option value="">-- Selecciona --</option>
          {meetings.map(meeting => (
            <option key={meeting.id} value={meeting.id}>
              {meeting.name} ({formatDate(meeting.date)})
            </option>
          ))}
        </select>
      </div>

      {selectedMeetingId && (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Asistencia para "{meetings.find(m => m.id === parseInt(selectedMeetingId))?.name}"</h4>
          <p className="text-gray-600 mb-6">Total de personas en el grupo: {totalParticipants}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {data.map((item, index) => (
              <div key={index} className={`p-4 rounded-xl text-white ${item.color} shadow-md`}>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-3xl font-bold mt-1">{item.value}</p>
                <p className="text-xs mt-1">
                  {totalParticipants > 0 ? `${((item.value / totalParticipants) * 100).toFixed(1)}%` : '0%'}
                </p>
              </div>
            ))}
          </div>

          {totalParticipants > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
              <div
                className="h-full bg-green-500 float-left transition-all duration-500"
                style={{ width: `${(summary.Asistió / totalParticipants) * 100}%` }}
              ></div>
              <div
                className="h-full bg-yellow-500 float-left transition-all duration-500"
                style={{ width: `${(summary.Excusa / totalParticipants) * 100}%` }}
              ></div>
              <div
                className="h-full bg-red-500 float-left transition-all duration-500"
                style={{ width: `${(summary.Inasistió / totalParticipants) * 100}%` }}
              ></div>
            </div>
          )}
          {totalParticipants === 0 && (
            <p className="text-center text-gray-500 mt-4">No hay personas en este grupo para mostrar estadísticas.</p>
          )}

          <button
            onClick={handleDownloadCSV}
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors text-lg font-semibold shadow-md"
          >
            Descargar CSV
          </button>
        </div>
      )}
      {!selectedMeetingId && (
        <p className="text-center text-gray-500 mt-8">Selecciona una reunión para ver el dashboard de asistencia.</p>
      )}
    </div>
  );
};

export default GroupDashboardView;