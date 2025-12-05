import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../constants';

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to move to next slide
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  }, [isAnimating]);

  // Function to move to previous slide
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    if (currentIndex === index || isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
  };

  // Reset animation lock after transition
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Matches CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-slate-900 group">
      {/* Slides */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
              <div className="max-w-2xl text-white transform transition-all duration-700 delay-300 translate-y-0 opacity-100">
                <span className="inline-block py-1 px-3 rounded-full bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                  GenAI & Modern Web
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
                  {slide.subtitle}
                </p>
                <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1">
                  {slide.ctaText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-indigo-500 w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;