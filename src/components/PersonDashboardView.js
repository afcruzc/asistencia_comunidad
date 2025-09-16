import React from 'react';

const PersonDashboardView = ({ person, meetings, groups }) => {
  const formatDate = (dateString) => {
    // Asume que dateString ya está en formato YYYY-MM-DD
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day); // month - 1 porque los meses en JS son de 0-11
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const statusColors = {
    Asistió: 'bg-green-100 text-green-800',
    Excusa: 'bg-yellow-100 text-yellow-800',
    Inasistió: 'bg-red-100 text-red-800',
    'No Registrado': 'bg-gray-100 text-gray-800',
  };

  const personGroups = groups.filter(g => person.groupIds && person.groupIds.includes(g.id));
  const groupNames = personGroups.map(g => g.name).join(', ');

  const getConsolidatedAttendanceSummary = () => {
    let attended = 0;
    let excused = 0;
    let unexcused = 0;
    let totalMeetings = 0;

    meetings.forEach(meeting => {
      const attendanceRecord = meeting.attendance.find(att => att.personId === person.id);
      if (attendanceRecord) {
        totalMeetings++;
        const status = attendanceRecord.status;
        if (status === 'Asistió') {
          attended++;
        } else if (status === 'Excusa') {
          excused++;
        } else if (status === 'Inasistió') {
          unexcused++;
        }
      }
    });

    return {
      Asistió: attended,
      Excusa: excused,
      Inasistió: unexcused,
      total: totalMeetings
    };
  };

  const summary = getConsolidatedAttendanceSummary();

  const data = [
    { label: 'Asistió', value: summary.Asistió, color: 'bg-green-500' },
    { label: 'Excusa', value: summary.Excusa, color: 'bg-yellow-500' },
    { label: 'Inasistió', value: summary.Inasistió, color: 'bg-red-500' },
  ];

  const totalMeetingsAttended = summary.total;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{person.name}</h2>
      <p className="text-gray-600 text-center mb-8">Grupos: {groupNames || 'N/A'}</p>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Consolidado de Asistencia</h3>
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Resumen General de Asistencia</h4>
        <p className="text-gray-600 mb-6">Total de reuniones registradas para {person.name}: {totalMeetingsAttended}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {data.map((item, index) => (
            <div key={index} className={`p-4 rounded-xl text-white ${item.color} shadow-md`}>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-3xl font-bold mt-1">{item.value}</p>
              <p className="text-xs mt-1">
                {totalMeetingsAttended > 0 ? `${((item.value / totalMeetingsAttended) * 100).toFixed(1)}%` : '0%'}
              </p>
            </div>
          ))}
        </div>

        {totalMeetingsAttended > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
            <div
              className="h-full bg-green-500 float-left transition-all duration-500"
              style={{ width: `${(summary.Asistió / totalMeetingsAttended) * 100}%` }}
            ></div>
            <div
              className="h-full bg-yellow-500 float-left transition-all duration-500"
              style={{ width: `${(summary.Excusa / totalMeetingsAttended) * 100}%` }}
            ></div>
            <div
              className="h-full bg-red-500 float-left transition-all duration-500"
              style={{ width: `${(summary.Inasistió / totalMeetingsAttended) * 100}%` }}
            ></div>
          </div>
        )}
        {totalMeetingsAttended === 0 && (
          <p className="text-center text-gray-500 mt-4">No hay datos de asistencia para esta persona en ninguna reunión.</p>
        )}
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">Historial de Asistencia a Reuniones</h3>
      {meetings.length > 0 ? (
        <div className="space-y-4">
          {meetings.map(meeting => {
            const attendanceRecord = meeting.attendance.find(att => att.personId === person.id);
            const status = attendanceRecord ? attendanceRecord.status : 'No Registrado';
            const excuse = attendanceRecord ? attendanceRecord.excuse : '';
            return (
              <div key={meeting.id} className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-800">{meeting.name}</h4>
                  <p className="text-sm text-gray-500">Fecha: {formatDate(meeting.date)}</p>
                  {status === 'Excusa' && excuse && (
                    <p className="text-xs text-gray-500 mt-1 italic">Motivo: {excuse}</p>
                  )}
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[status]}`}>
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay reuniones registradas aún.</p>
      )}
    </div>
  );
};

export default PersonDashboardView;