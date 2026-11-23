import { useState } from 'react';

interface EventCard {
  id: number;
  image: string;
  title: string;
  address: string;
  date: string;
  sport: string;
}

const carouselImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80',
    title: 'Maratón Ciudad 2024',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
    title: 'Torneo de Fútbol',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80',
    title: 'Liga de Baloncesto',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80',
    title: 'Ciclismo Nocturno',
  },
];

const events: EventCard[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80',
    title: 'Carrera 10K Nocturna',
    address: 'Parque Central, Av. Principal 123, Madrid',
    date: '15 Jun 2024 · 20:00',
    sport: 'Running',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&q=80',
    title: 'Torneo Fútbol 7',
    address: 'Complejo Deportivo Norte, Calle 45 #12-30',
    date: '22 Jun 2024 · 10:00',
    sport: 'Fútbol',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&q=80',
    title: 'Partido Baloncesto Pro',
    address: 'Arena Sur, Av. de los Deportes 789',
    date: '30 Jun 2024 · 18:30',
    sport: 'Baloncesto',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    title: 'Clase de Yoga al Aire Libre',
    address: 'Plaza del Sol, Paseo Marítimo 45',
    date: '05 Jul 2024 · 08:00',
    sport: 'Yoga',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80',
    title: 'Competición de Natación',
    address: 'Piscina Olímpica Municipal, Calle 8 #22',
    date: '12 Jul 2024 · 09:00',
    sport: 'Natación',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80',
    title: 'Crossfit Challenge',
    address: 'Box Central, Av. Industrial 300',
    date: '20 Jul 2024 · 17:00',
    sport: 'Crossfit',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Carousel */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg">
          {carouselImages.map((img, index) => (
            <div
              key={img.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                <span className="bg-indigo-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                  Destacado
                </span>
                <h2 className="text-2xl md:text-4xl font-bold mt-3">
                  {img.title}
                </h2>
              </div>
            </div>
          ))}

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition"
            aria-label="Siguiente"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Title */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Próximos Eventos Deportivos
        </h2>
        <p className="text-gray-500 mt-1">
          Descubre los eventos cerca de ti
        </p>
      </section>

      {/* Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 mt-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {event.sport}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <div className="flex items-start gap-2 text-gray-600 text-sm mb-1">
                  <span>📍</span>
                  <p className="flex-1">{event.address}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span>🗓️</span>
                  <p>{event.date}</p>
                </div>
                <button className="mt-4 w-full bg-indigo-50 text-indigo-600 font-semibold py-2 rounded-lg hover:bg-indigo-100 transition">
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}