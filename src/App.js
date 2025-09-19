import React, { useState, useEffect } from 'react';
import LayoutHeader from './components/LayoutHeader';
import GroupView from './components/GroupView';
import PersonView from './components/PersonView';
import AddEditGroupModal from './components/AddEditGroupModal';
import AddEditPersonModal from './components/AddEditPersonModal';
import GroupDetailView from './components/GroupDetailView';
import MeetingsView from './components/MeetingsView';
import AddMeetingModal from './components/AddMeetingModal';
import MeetingDetailView from './components/MeetingDetailView';
import PersonDashboardView from './components/PersonDashboardView';
import RegisterAttendanceView from './components/RegisterAttendanceView';
import DeletedPeopleHistoryView from './components/DeletedPeopleHistoryView';
import AdminView from './components/AdminView';
import AdminLoginModal from './components/AdminLoginModal';
import LeaderLoginModal from './components/LeaderLoginModal';
import HamburgerMenu from './components/HamburgerMenu';
import BackendConnectionTest from './components/BackendConnectionTest';
import { getPersons, createPerson, updatePerson, deletePerson, getMeetings, createMeeting, updateMeeting, deleteMeeting, getDeletedPersons, createDeletedPerson, isLeaderLoggedIn, getLeaderData, leaderLogin, leaderLogout } from './utils/api';

const App = () => {
  const [currentPage, setCurrentPage] = useState('groups');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState(null);
  const [showPersonModal, setShowPersonModal] = useState(false);
  const [personToEdit, setPersonToEdit] = useState(null);
  const [showAddMeetingModal, setShowAddMeetingModal] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [showLeaderLoginModal, setShowLeaderLoginModal] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLeaderAuthenticated, setIsLeaderAuthenticated] = useState(false); // Estado para autenticación de líder
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true); // Nuevo estado para el menú lateral
  const [currentLeader, setCurrentLeader] = useState(null); // Estado para el líder actual

  const staticGroups = [
    { id: 1, name: 'Alabanza', description: 'Grupo encargado de la música y el canto.' },
    { id: 2, name: 'Ujieres', description: 'Grupo de apoyo y bienvenida en las reuniones.' },
    { id: 3, name: 'Audiovisuales', description: 'Grupo encargado del sonido y proyección.' },
    { id: 4, name: 'Evangelismo', description: 'Grupo dedicado a la difusión del mensaje.' },
    { id: 5, name: 'Grupos familiares', description: 'Grupos de estudio y convivencia en hogares.' },
    { id: 6, name: 'Clinica del alma', description: 'Grupo de apoyo emocional y espiritual.' },
    { id: 7, name: 'Escuela Dominical', description: 'Grupo de enseñanza bíblica para niños y jóvenes.' },
    { id: 8, name: 'Escuela Biblica', description: 'Grupo de estudio profundo de la Biblia.' },
    { id: 9, name: 'Consolidación', description: 'Grupo de seguimiento y fortalecimiento de nuevos miembros.' },
    { id: 10, name: 'Jóvenes', description: 'Grupo de jóvenes de la comunidad.' },
  ];

  const [people, setPeople] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [deletedPeople, setDeletedPeople] = useState([]);

  const [groups, setGroups] = useState(staticGroups);

  useEffect(() => {
    // Check if leader is logged in
    if (isLeaderLoggedIn()) {
      setIsLeaderAuthenticated(true);
      setCurrentLeader(getLeaderData());
    }

    const fetchData = async () => {
      try {
        const fetchedPeople = await getPersons();
        const mappedPeople = fetchedPeople.map(person => {
          const groupNames = person.groupIds
            ? person.groupIds.map(id => staticGroups.find(g => g.id === id)?.name || 'Grupo Desconocido')
            : [];
          return { ...person, id: person._id, groupNames };
        });
        setPeople(mappedPeople);

        const fetchedMeetings = await getMeetings();
        const mappedMeetings = fetchedMeetings.map(meeting => ({ ...meeting, id: meeting._id }));
        setMeetings(mappedMeetings);

        const fetchedDeletedPeople = await getDeletedPersons();
        const mappedDeletedPeople = fetchedDeletedPeople.map(person => ({ ...person, id: person._id }));
        setDeletedPeople(mappedDeletedPeople);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (isLeaderAuthenticated) {
      fetchData();
    }
  }, [isLeaderAuthenticated]);

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setCurrentPage('groupDetail');
  };

  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
    setCurrentPage('personDashboard');
  };

  const handleSelectMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setCurrentPage('meetingDetail');
  };

  const handleBack = () => {
    if (currentPage === 'groupDetail') {
      setCurrentPage('groups');
      setSelectedGroup(null);
    } else if (currentPage === 'meetingDetail') {
      setCurrentPage('meetings');
      setSelectedMeeting(null);
    } else if (currentPage === 'personDashboard') {
      setCurrentPage('people');
      setSelectedPerson(null);
    } else if (currentPage === 'registerAttendance') {
      setCurrentPage('meetings');
    } else if (currentPage === 'deletedHistory') {
      setCurrentPage('people');
    } else if (currentPage === 'admin') {
      setCurrentPage('groups');
      setIsAdminAuthenticated(false);
    } else if (currentPage === 'adminLogin') {
      setCurrentPage('groups');
      setShowAdminLoginModal(false);
    }
  };

  const handleSavePerson = async (personData) => {
    const dataToSave = {
      name: personData.name,
      groupIds: personData.groupIds,
    };
    if (personData.email) dataToSave.email = personData.email;
    if (personData.phone) dataToSave.phone = personData.phone;

    try {
      if (personData._id) {
        // update
        const updated = await updatePerson(personData._id, dataToSave);
        const groupNames = updated.groupIds
          ? updated.groupIds.map(id => staticGroups.find(g => g.id === id)?.name || 'Grupo Desconocido')
          : [];
        setPeople(people.map(p => p._id === updated._id ? { ...updated, id: updated._id, groupNames } : p));
      } else {
        // create
        const newPerson = await createPerson(dataToSave);
        const groupNames = newPerson.groupIds
          ? newPerson.groupIds.map(id => staticGroups.find(g => g.id === id)?.name || 'Grupo Desconocido')
          : [];
        setPeople([...people, { ...newPerson, id: newPerson._id, groupNames }]);

        // Add to existing meetings
        setMeetings(prevMeetings => prevMeetings.map(meeting => {
          const updatedAttendance = [...meeting.attendance];
          if (!updatedAttendance.some(att => att.personId === newPerson._id)) {
            updatedAttendance.push({ personId: newPerson._id, status: 'Inasistió', excuse: '' });
          }
          return { ...meeting, attendance: updatedAttendance };
        }));
      }
    } catch (error) {
      console.error('Error saving person:', error);
    }
  };

  const handleEditPerson = (person) => {
    setPersonToEdit(person);
    setShowPersonModal(true);
  };

  const handleDeletePerson = async (personIdToDelete) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a esta persona?')) {
      const personToDelete = people.find(p => p.id === personIdToDelete);
      if (personToDelete) {
        try {
          await createDeletedPerson({
            name: personToDelete.name,
            email: personToDelete.email,
            phone: personToDelete.phone,
            groupIds: personToDelete.groupIds,
            deletedAt: new Date().toISOString()
          });
          // Refresh deleted people
          const fetchedDeletedPeople = await getDeletedPersons();
          const mappedDeletedPeople = fetchedDeletedPeople.map(person => ({ ...person, id: person._id }));
          setDeletedPeople(mappedDeletedPeople);
        } catch (error) {
          console.error('Error saving to deleted history:', error);
        }
      }
      try {
        await deletePerson(personToDelete._id);
        setPeople(prevPeople => prevPeople.filter(p => p.id !== personIdToDelete));
        setMeetings(prevMeetings => prevMeetings.map(meeting => ({
          ...meeting,
          attendance: meeting.attendance.filter(att => att.personId !== personIdToDelete)
        })));
      } catch (error) {
        console.error('Error deleting person:', error);
      }
    }
  };

  const handleAddMeeting = async (newMeeting) => {
    if (!newMeeting || typeof newMeeting !== 'object' || !newMeeting.name || !newMeeting.date) {
      console.error('Datos inválidos para nueva reunión:', newMeeting);
      return;
    }
    const initialAttendance = people.map(person => ({
      personId: person.id,
      status: 'Inasistió',
      excuse: ''
    }));
    const data = { ...newMeeting, attendance: initialAttendance };
    try {
      const newMeetingFromDB = await createMeeting(data);
      setMeetings([...meetings, { ...newMeetingFromDB, id: newMeetingFromDB._id }]);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  const handleDeleteMeeting = async (meetingId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reunión?')) {
      try {
        await deleteMeeting(meetingId);
        setMeetings(meetings.filter(m => m.id !== meetingId));
      } catch (error) {
        console.error('Error deleting meeting:', error);
      }
    }
  };

  const handlePersonStatusChange = (personId, newStatus) => {
    setPeople(people.map(p =>
      p.id === personId ? { ...p, status: newStatus } : p
    ));
  };

  const handleMeetingAttendanceChange = async (meetingId, newAttendanceRecords) => {
    try {
      await updateMeeting(meetingId, { attendance: newAttendanceRecords });
      setMeetings(meetings.map(m =>
        m.id === meetingId ? { ...m, attendance: newAttendanceRecords } : m
      ));
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  const handleUpdateMeetingAttendance = (meetingId, newAttendanceRecords) => {
    setMeetings(meetings.map(meeting => {
      if (meeting.id === meetingId) {
        return { ...meeting, attendance: newAttendanceRecords };
      }
      return meeting;
    }));
  };

  const handleClearAllData = () => {
    if (window.confirm('¡Cuidado! ¿Estás seguro de que quieres borrar TODOS los datos (personas, reuniones, historial)? Esta acción es irreversible.')) {
      setPeople([]);
      setMeetings([]);
      setDeletedPeople([]);
      localStorage.removeItem('attendancePeople');
      localStorage.removeItem('attendanceMeetings');
      alert('¡Todos los datos han sido borrados! La aplicación se reiniciará.');
      window.location.reload();
    }
  };

  const handleAdminLogin = (username, password) => {
    if (username === 'andresc' && password === 'andresc') {
      setIsAdminAuthenticated(true);
      setCurrentPage('admin');
      return true;
    }
    return false;
  };

  const handleLeaderLogin = async (email, password) => {
    try {
      const data = await leaderLogin(email, password);
      setIsLeaderAuthenticated(true);
      setCurrentLeader(data.leader);
    } catch (error) {
      throw error;
    }
  };

  const handleLeaderLogout = () => {
    leaderLogout();
    setIsLeaderAuthenticated(false);
    setCurrentLeader(null);
  };

  const getTitle = () => {
    if (currentPage === 'groups') return 'Asistencia ICC Luz a las Naciones';
    if (currentPage === 'people') return 'Gestión de Personas';
    if (currentPage === 'meetings') return 'Gestión de Reuniones';
    if (currentPage === 'registerAttendance') return 'Registrar Asistencia';
    if (currentPage === 'deletedHistory') return 'Historial de Eliminados';
    if (currentPage === 'admin' || currentPage === 'adminLogin') return 'Administración';
    if (currentPage === 'groupDetail' && selectedGroup) return selectedGroup.name;
    if (currentPage === 'meetingDetail' && selectedMeeting) return selectedMeeting.name;
    if (currentPage === 'personDashboard' && selectedPerson) return `Dashboard de ${selectedPerson.name}`;
    return 'Asistencia ICC Luz a las Naciones';
  };

  const showBackButton = currentPage !== 'groups' && currentPage !== 'people' && currentPage !== 'meetings' && currentPage !== 'registerAttendance' && currentPage !== 'deletedHistory' && currentPage !== 'admin' && currentPage !== 'adminLogin';

  const renderContent = () => {
    if (currentPage === 'backend-test') {
      return <BackendConnectionTest />;
    }
    if (currentPage === 'groups') {
      return <GroupView groups={groups} onSelectGroup={handleSelectGroup} />;
    }
    if (currentPage === 'people') {
      return <PersonView
        people={people}
        onAddPerson={() => { setPersonToEdit(null); setShowPersonModal(true); }}
        onSelectPerson={handleSelectPerson}
        onEditPerson={handleEditPerson}
        onDeletePerson={handleDeletePerson}
      />;
    }
    if (currentPage === 'meetings') {
      return <MeetingsView meetings={meetings} onSelectMeeting={handleSelectMeeting} onAddMeeting={() => setShowAddMeetingModal(true)} onDeleteMeeting={handleDeleteMeeting} />;
    }
    if (currentPage === 'registerAttendance') {
      return <RegisterAttendanceView meetings={meetings} people={people} onUpdateMeetingAttendance={handleMeetingAttendanceChange} groups={groups} />;
    }
    if (currentPage === 'deletedHistory') {
      return <DeletedPeopleHistoryView deletedPeople={deletedPeople} groups={groups} />;
    }
    if (currentPage === 'groupDetail' && selectedGroup) {
      return <GroupDetailView group={selectedGroup} people={people} meetings={meetings} groups={groups} onStatusChange={handlePersonStatusChange} onAddPerson={() => setShowPersonModal(true)} onSelectPerson={handleSelectPerson} onEditPerson={handleEditPerson} onDeletePerson={handleDeletePerson} />;
    }
    if (currentPage === 'personDashboard' && selectedPerson) {
      return <PersonDashboardView person={selectedPerson} meetings={meetings} groups={groups} />;
    }
    if (currentPage === 'meetingDetail' && selectedMeeting) {
      return <MeetingDetailView meeting={selectedMeeting} people={people} groups={groups} onStatusChange={handleMeetingAttendanceChange} onEditPerson={handleEditPerson} />;
    }
    return <div>Página no encontrada</div>;
  };

  if (!isLeaderAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Asistencia ICC Luz a las Naciones</h1>
          <button
            onClick={() => setShowLeaderLoginModal(true)}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            Iniciar Sesión
          </button>
        </div>
        {showLeaderLoginModal && (
          <LeaderLoginModal
            onClose={() => setShowLeaderLoginModal(false)}
            onLogin={handleLeaderLogin}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <LayoutHeader
        title={getTitle()}
        onBack={handleBack}
        showBack={currentPage !== 'groups' && currentPage !== 'people' && currentPage !== 'meetings'}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        currentLeader={currentLeader}
        onLeaderLogout={handleLeaderLogout}
      />

      <div className="flex">
        <HamburgerMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
          isLeaderAuthenticated={isLeaderAuthenticated}
          showSidebar={showSidebar}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
        />

        <main className={`flex-1 p-6 transition-all duration-300 ${showSidebar ? 'md:ml-64' : ''}`}>
          {/* Botón para mostrar el menú lateral si está oculto (solo escritorio) */}
          {!showSidebar && (
            <button
              className="hidden md:block fixed top-24 left-2 z-40 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowSidebar(true)}
              title="Mostrar menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h16M4 6h16M4 18h16" />
              </svg>
            </button>
          )}
          {renderContent()}
        </main>
      </div>

      {showGroupModal && (
        <AddEditGroupModal
          onClose={() => setShowGroupModal(false)}
          onSave={() => {}}
          groupToEdit={groupToEdit}
        />
      )}
      {showPersonModal && (
        <AddEditPersonModal
          onClose={() => setShowPersonModal(false)}
          onSave={handleSavePerson}
          groups={groups}
          personToEdit={personToEdit}
        />
      )}
      {showAddMeetingModal && (
        <AddMeetingModal
          onClose={() => setShowAddMeetingModal(false)}
          onSave={handleAddMeeting}
        />
      )}

      {showAdminLoginModal && !isAdminAuthenticated && (
        <AdminLoginModal
          onClose={() => {
            setShowAdminLoginModal(false);
            setCurrentPage('groups');
          }}
          onLogin={handleAdminLogin}
        />
      )}
    </div>
  );
};

export default App;