import React from 'react';
import GroupCard from './GroupCard';

const GroupView = ({ groups, onSelectGroup, onAddGroup }) => {
  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        {onAddGroup && (
          <button
            onClick={onAddGroup}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Crear Grupo
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} onClick={onSelectGroup} />
        ))}
      </div>
    </div>
  );
};

export default GroupView;