import React from 'react';
import MeetingCard from './MeetingCard';

const MeetingsView = ({ meetings, onSelectMeeting, onAddMeeting, onDeleteMeeting }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} onClick={onSelectMeeting} onDelete={onDeleteMeeting} />
        ))}
      </div>
      <button
        onClick={() => onAddMeeting()}
        className="w-full bg-purple-600 text-white py-3 rounded-xl shadow-lg hover:bg-purple-700 transition-colors text-lg font-semibold"
      >
        Crear Nueva Reunión
      </button>
    </div>
  );
};

export default MeetingsView;