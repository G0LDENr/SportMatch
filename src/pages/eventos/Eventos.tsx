import { useState } from 'react';

interface SportEvent {
  id: number;
  image: string;
  title: string;
  sport: 'Running' | 'Hiking' | 'Trail';
  address: string;
  date: string;
  distance: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  registered: number;
  capacity: number;
  organizer: string;
}

const initialEvents: SportEvent[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
    title: 'Ascenso al Cráter del Nevado de Toluca',
    sport: 'Hiking',
    address: 'Parque Nacional Nevado de Toluca, Punto de reunión: Caseta Raíces',
    date: '06 Dic 2026 · 07:00',
    distance: '14 km',
    difficulty: 'Intermedio',
    registered: 24,
    capacity: 30,
    organizer: 'Club Montañistas del Valle',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80',
    title: 'Carrera Nocturna Paseo Colón 10K',
    sport: 'Running',
    address: 'Glorieta del Águila, Paseo Colón, Toluca',
    date: '12 Dic 2026 · 20:00',
    distance: '10 km',
    difficulty: 'Básico',
    registered: 85,
    capacity: 100,
    organizer: 'Runners Toluca Oficial',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
    title: 'Trail Sierra Morelos: Ruta Bosque',
    sport: 'Trail',
    address: 'Parque Estatal Sierra Morelos, Acceso Principal',
    date: '19 Dic 2026 · 07:30',
    distance: '18 km',
    difficulty: 'Avanzado',
    registered: 40,
    capacity: 40, // Cupo lleno para probar estado
    organizer: 'Trail Valle de Toluca',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=600&q=80',
    title: 'Trote Recreativo Parque Bicentenario',
    sport: 'Running',
    address: 'Parque Ambiental Bicentenario, Metepec',
    date: '26 Dic 2026 · 08:00',
    distance: '5 km',
    difficulty: 'Básico',
    registered: 19,
    capacity: 45,
    organizer: 'Comunidad Activa Metepec',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&q=80',
    title: 'Senderismo Cerro de Jocotitlán',
    sport: 'Hiking',
    address: 'Entrada Parque Ecológico Xocotépetl, Jocotitlán',
    date: '03 Ene 2027 · 06:45',
    distance: '16 km',
    difficulty: 'Intermedio',
    registered: 15,
    capacity: 25,
    organizer: 'Rutas Mexiquenses',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?w=600&q=80',
    title: 'Desafío Trail La Marquesa 21K',
    sport: 'Trail',
    address: 'Valle del Silencio, Parque Nacional La Marquesa',
    date: '10 Ene 2027 · 07:00',
    distance: '21 km',
    difficulty: 'Avanzado',
    registered: 52,
    capacity: 60,
    organizer: 'Endurance Trail MX',
  },
];

const sportsFilter = ['Todos', 'Running', 'Hiking', 'Trail'] as const;

export default function Eventos() {
  const [events, setEvents] = useState<SportEvent[]>(initialEvents);
  const [selectedSport, setSelectedSport] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [joinedIds, setJoinedIds] = useState<number[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<SportEvent | null>(null);

  // Filtrado por disciplina y texto
  const filteredEvents = events.filter((event) => {
    const matchesSport = selectedSport === 'Todos' || event.sport === selectedSport;
    const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  // Manejar inscripción / cancelación local
  const handleToggleJoin = (eventId: number) => {
    const isJoined = joinedIds.includes(eventId);

    setEvents((prevEvents) =>
        prevEvents.map((ev) => {
          if (ev.id !== eventId) return ev;
          if (isJoined) {
            return { ...ev, registered: ev.registered - 1 };
          }
          if (ev.registered < ev.capacity) {
            return { ...ev, registered: ev.registered + 1 };
          }
          return ev;
        })
    );

    setJoinedIds((prev) =>
        isJoined ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  return (
      <div className="min-h-screen bg-gray-100 pb-12">
        {/* Header / Banner */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
              <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                Comunidad SportMatch
              </span>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">
                  Explora Eventos Deportivos
                </h1>
                <p className="text-gray-500 mt-1">
                  Encuentra rutas de Running, Hiking y Trail cerca de ti e inscríbete en un clic
                </p>
              </div>

              {/* Buscador */}
              <div className="w-full md:w-80">
                <input
                    type="text"
                    placeholder="Buscar por nombre o ubicación..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Filtros por disciplina */}
            <div className="flex flex-wrap gap-2 mt-6">
              {sportsFilter.map((sport) => (
                  <button
                      key={sport}
                      onClick={() => setSelectedSport(sport)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                          selectedSport === sport
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {sport}
                  </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid de Eventos */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          {filteredEvents.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <p className="text-gray-500 text-lg">
                  No se encontraron eventos con los filtros seleccionados.
                </p>
                <button
                    onClick={() => {
                      setSelectedSport('Todos');
                      setSearchQuery('');
                    }}
                    className="mt-4 text-indigo-600 font-semibold hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => {
                  const isJoined = joinedIds.includes(event.id);
                  const isFull = event.registered >= event.capacity && !isJoined;

                  return (
                      <div
                          key={event.id}
                          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          {/* Imagen y Badges */}
                          <div className="relative h-48 overflow-hidden">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {event.sport}
                      </span>
                            <span className="absolute top-3 right-3 bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {event.distance} · {event.difficulty}
                      </span>
                          </div>

                          {/* Contenido */}
                          <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                              {event.title}
                            </h3>

                            <div className="space-y-1.5 text-sm text-gray-600">
                              <div className="flex items-start gap-2">
                                <span>📍</span>
                                <p className="flex-1 line-clamp-2">{event.address}</p>
                              </div>
                              <div className="flex items-center gap-2 text-gray-500">
                                <span>🗓️</span>
                                <p>{event.date}</p>
                              </div>
                              <div className="flex items-center gap-2 text-gray-500">
                                <span>👥</span>
                                <p>
                                  {event.registered} / {event.capacity} inscritos
                                  {isFull && (
                                      <span className="ml-2 text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                                Cupo lleno
                              </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="px-5 pb-5 pt-2 flex gap-2">
                          <button
                              onClick={() => setSelectedEvent(event)}
                              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200 transition text-sm"
                          >
                            Detalles
                          </button>
                          <button
                              disabled={isFull}
                              onClick={() => handleToggleJoin(event.id)}
                              className={`flex-1 font-semibold py-2 rounded-lg transition text-sm ${
                                  isJoined
                                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                      : isFull
                                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                              }`}
                          >
                            {isJoined ? '✓ Inscrito' : isFull ? 'Lleno' : 'Inscribirme'}
                          </button>
                        </div>
                      </div>
                  );
                })}
              </div>
          )}
        </section>

        {/* Modal de Detalles del Evento */}
        {selectedEvent && (
            <div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedEvent(null)}
            >
              <div
                  className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-56">
                  <img
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover"
                  />
                  <button
                      onClick={() => setSelectedEvent(null)}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center font-bold shadow"
                  >
                    ✕
                  </button>
                  <span className="absolute bottom-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {selectedEvent.sport}
              </span>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedEvent.title}
                  </h2>
                  <p className="text-sm text-indigo-600 font-medium mt-1">
                    Organizado por: {selectedEvent.organizer}
                  </p>

                  <div className="mt-4 space-y-2.5 text-sm text-gray-600 border-t border-b border-gray-100 py-4">
                    <p>
                      <strong className="text-gray-800">📍 Punto de reunión:</strong>{' '}
                      {selectedEvent.address}
                    </p>
                    <p>
                      <strong className="text-gray-800">🗓️ Fecha y hora:</strong>{' '}
                      {selectedEvent.date}
                    </p>
                    <p>
                      <strong className="text-gray-800">📏 Distancia y nivel:</strong>{' '}
                      {selectedEvent.distance} · Nivel {selectedEvent.difficulty}
                    </p>
                    <p>
                      <strong className="text-gray-800">👥 Disponibilidad:</strong>{' '}
                      {selectedEvent.registered} de {selectedEvent.capacity} lugares ocupados
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={() => setSelectedEvent(null)}
                        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition text-sm"
                    >
                      Cerrar
                    </button>
                    <button
                        disabled={
                            selectedEvent.registered >= selectedEvent.capacity &&
                            !joinedIds.includes(selectedEvent.id)
                        }
                        onClick={() => {
                          handleToggleJoin(selectedEvent.id);
                          setSelectedEvent(null);
                        }}
                        className={`px-5 py-2 rounded-lg font-semibold transition text-sm ${
                            joinedIds.includes(selectedEvent.id)
                                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                : selectedEvent.registered >= selectedEvent.capacity
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                    >
                      {joinedIds.includes(selectedEvent.id)
                          ? 'Cancelar inscripción'
                          : 'Confirmar asistencia'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}