import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const [showWork, setShowWork] = useState(false);
  const [showPrograms, setShowPrograms] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);
  
  const heroTexts = [
    "Привет, это мое портфолио",
    "Выберите интересующий вас каталог работ"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const galleryItems = [
    {
      image: "/images/digital-experience.jpg",
      title: "Цифровой Опыт",
      description: "Интерактивная веб-платформа"
    },
    {
      image: "/images/brand-identity.jpg",
      title: "Айдентика Бренда",
      description: "Визуальная система бренда"
    },
    {
      image: "/images/motion-design.jpg",
      title: "Моушн-Дизайн",
      description: "Анимированные проекты"
    },
    {
      image: "/images/product-design.jpg",
      title: "Дизайн Продукта",
      description: "Пользовательские интерфейсы"
    }
  ];

  const programItems = [
    {
      image: "/images/digital-experience.jpg",
      title: "Цифровой Опыт",
      description: "Интерактивная веб-платформа"
    },
    {
      image: "/images/brand-identity.jpg",
      title: "Айдентика Бренда",
      description: "Визуальная система бренда"
    },
    {
      image: "/images/motion-design.jpg",
      title: "Моушн-Дизайн",
      description: "Анимированные проекты"
    },
    {
      image: "/images/product-design.jpg",
      title: "Дизайн Продукта",
      description: "Пользовательские интерфейсы"
    }
  ];

  const scrollGallery = (direction: 'prev' | 'next', currentIndex: number, setIndex: (index: number) => void, itemsLength: number) => {
    const newIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, itemsLength - 1)
      : Math.max(currentIndex - 1, 0);
    
    setIndex(newIndex);
  };

  useEffect(() => {
    const handleWheelScroll = (event: WheelEvent) => {
      if (galleryRef.current) {
        event.preventDefault();
        galleryRef.current.scrollBy({
          left: event.deltaY,
          behavior: 'smooth'
        });
      }
      if (programsRef.current) {
        event.preventDefault();
        programsRef.current.scrollBy({
          left: event.deltaY,
          behavior: 'smooth'
        });
      }
    };

    const gallery = galleryRef.current;
    const programs = programsRef.current;
    
    gallery?.addEventListener('wheel', handleWheelScroll);
    programs?.addEventListener('wheel', handleWheelScroll);

    return () => {
      gallery?.removeEventListener('wheel', handleWheelScroll);
      programs?.removeEventListener('wheel', handleWheelScroll);
    };
  }, []);

  const AboutModal = () => (
    <div 
      className={`fixed inset-0 z-50 transition-all duration-500 ease-out ${
        showAbout ? 'visible bg-black/60 backdrop-blur-sm' : 'invisible'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowAbout(false);
        }
      }}
    >
      <div 
        className={`fixed inset-x-0 bottom-0 bg-black/90 border-t border-white/10 transition-all duration-500 ease-out transform ${
          showAbout ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-2xl mx-auto relative p-8 max-h-[80vh] overflow-y-auto">
          <button 
            onClick={() => setShowAbout(false)}
            className="absolute top-8 right-8 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold mb-6 glow">О Портфолио</h2>
          <div className="space-y-4 text-white/90">
            <p>
              Добро пожаловать в мое портфолио! Меня зовут Александр Зайцев, я работаю в сфере разработки, видеомонтажа и дизайна для различных проектов.
            </p>
            <p>
              Это портфолио демонстрирует мои работы в различных областях, от веб-разработки до дизайн-проектов. Каждая работа отражает мои навыки и стремление к совершенствованию своих работ.
            </p>
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-xl font-semibold mb-3 glow">Технические Детали</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Разработка:</h4>
                  <p>Языки программирования: C#, JavaScript, TypeScript, React, HTML, CSS</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Дизайн и видеомонтаж:</h4>
                  <p>Инструменты: Figma, Canva, Adobe Photoshop, Adobe Illustrator, Cinema 4D</p>
                  <p>Работа с видео: Adobe After Effects, Davinci Resolve</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-xl font-semibold mb-3 glow">Контакты</h3>
              <p>
                Для сотрудничества или вопросов пишите на:
                <br />
                <a href="mailto:contact@example.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                  contact@example.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Main Section */}
      <section className={`relative h-screen flex items-center justify-center transition-transform duration-700 
        ${showWork ? '-translate-y-full' : ''} 
        ${showPrograms ? '-translate-y-full' : ''}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white mb-8 transition-all duration-500 ease-in-out glow-strong">
              {heroTexts[currentTextIndex]}
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setShowWork(true)}
                className="inline-flex items-center space-x-2 text-lg font-medium bg-glass px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 glow"
              >
                <span>Дизайн Проекты</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowPrograms(true)}
                className="inline-flex items-center space-x-2 text-lg font-medium bg-glass px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 glow"
              >
                <span>Программы</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowAbout(true)}
                className="inline-flex items-center space-x-2 text-lg font-medium bg-glass px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 glow"
              >
                <span>Обо Мне</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 bg-glass border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-16">
              <div className="text-2xl font-bold glow">ЗАЙЦЕВ АЛЕКСАНДР</div>
            </div>
          </div>
        </nav>
      </section>

      {/* Work Section */}
      <section className={`absolute inset-0 h-screen bg-black transition-transform duration-700 ${showWork ? '' : 'translate-y-full'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent opacity-30" />
        
        <div className="h-full flex flex-col relative">
          <div className="pt-8 px-8">
            <button 
              onClick={() => setShowWork(false)}
              className="inline-flex items-center space-x-2 text-lg font-medium bg-glass px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Назад</span>
            </button>
            
            <h2 className="text-4xl font-bold glow mt-8">Избранные Проекты</h2>
          </div>

          <div className="relative flex-1 flex items-center mt-8">
            <div 
              ref={galleryRef}
              className="w-full overflow-hidden"
            >
              <div 
                className="flex"
                style={{ 
                  transform: `translateX(-${currentGalleryIndex * 1067}px)`,
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {galleryItems.map((item, index) => (
                  <div 
                    key={index}
                    className="flex-none px-4"
                    style={{ width: '1067px' }}
                  >
                    <div 
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-glass"
                      style={{ height: '587px' }}
                    >
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 p-8">
                          <h3 className="text-3xl font-bold text-white glow">{item.title}</h3>
                          <p className="mt-2 text-white/90">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={() => scrollGallery('prev', currentGalleryIndex, setCurrentGalleryIndex, galleryItems.length)}
              className={`absolute left-4 z-10 bg-glass p-3 rounded-full transition-opacity ${
                currentGalleryIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
              }`}
              disabled={currentGalleryIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scrollGallery('next', currentGalleryIndex, setCurrentGalleryIndex, galleryItems.length)}
              className={`absolute right-4 z-10 bg-glass p-3 rounded-full transition-opacity ${
                currentGalleryIndex === galleryItems.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
              }`}
              disabled={currentGalleryIndex === galleryItems.length - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className={`absolute inset-0 h-screen bg-black transition-transform duration-700 ${showPrograms ? '' : 'translate-y-full'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent opacity-30" />
        
        <div className="h-full flex flex-col relative">
          <div className="pt-8 px-8">
            <button 
              onClick={() => setShowPrograms(false)}
              className="inline-flex items-center space-x-2 text-lg font-medium bg-glass px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Назад</span>
            </button>
            
            <h2 className="text-4xl font-bold glow mt-8">Избранные Проекты</h2>
          </div>

          <div className="relative flex-1 flex items-center mt-8">
            <div 
              ref={programsRef}
              className="w-full overflow-hidden"
            >
              <div 
                className="flex"
                style={{ 
                  transform: `translateX(-${currentProgramIndex * 1067}px)`,
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {programItems.map((item, index) => (
                  <div 
                    key={index}
                    className="flex-none px-4"
                    style={{ width: '1067px' }}
                  >
                    <div 
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-glass"
                      style={{ height: '587px' }}
                    >
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 p-8">
                          <h3 className="text-3xl font-bold text-white glow">{item.title}</h3>
                          <p className="mt-2 text-white/90">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={() => scrollGallery('prev', currentProgramIndex, setCurrentProgramIndex, programItems.length)}
              className={`absolute left-4 z-10 bg-glass p-3 rounded-full transition-opacity ${
                currentProgramIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
              }`}
              disabled={currentProgramIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scrollGallery('next', currentProgramIndex, setCurrentProgramIndex, programItems.length)}
              className={`absolute right-4 z-10 bg-glass p-3 rounded-full transition-opacity ${
                currentProgramIndex === programItems.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
              }`}
              disabled={currentProgramIndex === programItems.length - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* About Modal */}
      <AboutModal />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg">
          <div className="flex flex-col items-center space-y-8 pt-16">
            <button onClick={() => { setShowWork(true); setIsMenuOpen(false); }} className="text-2xl glow hover:text-white/70 transition-colors">Дизайн Проекты</button>
            <button onClick={() => { setShowPrograms(true); setIsMenuOpen(false); }} className="text-2xl glow hover:text-white/70 transition-colors">Программы</button>
            <button onClick={() => { setShowAbout(true); setIsMenuOpen(false); }} className="text-2xl glow hover:text-white/70 transition-colors">Обо Мне</button>
            <button onClick={() => setIsMenuOpen(false)} className="text-2xl glow hover:text-white/70 transition-colors">Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;