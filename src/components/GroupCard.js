import React from 'react';

const GroupCard = ({ group, onClick }) => { // Eliminado onEdit y onDelete
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      <div onClick={() => onClick(group)} className="cursor-pointer flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{group.name}</h3>
        <p className="text-gray-600 text-sm">{group.description}</p>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <span onClick={() => onClick(group)} className="text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800 transition-colors">
          Ver detalles
        </span>
      </div>
    </div>
  );
};

export default GroupCard;