import { useState } from 'react';

function BusinessCard({ cardData }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="perspective-1000 w-full max-w-md">
      <div
        onClick={handleFlip}
        className={`relative w-full h-96 transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          flipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full backface-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-8 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {cardData.photo && (
            <img
              src={cardData.photo}
              alt={cardData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white mb-6 shadow-lg"
            />
          )}
          <h1 className="text-3xl font-bold text-white mb-2">{cardData.name}</h1>
          <p className="text-xl text-blue-200 mb-4">{cardData.title}</p>
          {cardData.tagline && (
            <p className="text-white text-center italic opacity-90">{cardData.tagline}</p>
          )}
          <p className="text-white text-sm mt-6 opacity-75">Click to flip</p>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full backface-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 flex flex-col justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Contact Info</h2>
          
          <div className="space-y-4">
            {cardData.email && (
              <a href={`mailto:${cardData.email}`} className="flex items-center text-gray-300 hover:text-white transition">
                <span className="mr-3">📧</span>
                <span>{cardData.email}</span>
              </a>
            )}
            
            {cardData.phone && (
              <a href={`tel:${cardData.phone}`} className="flex items-center text-gray-300 hover:text-white transition">
                <span className="mr-3">📱</span>
                <span>{cardData.phone}</span>
              </a>
            )}
            
            {cardData.linkedin && (
              <a
                href={cardData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition"
              >
                <span className="mr-3">💼</span>
                <span>LinkedIn</span>
              </a>
            )}
            
            {cardData.github && (
              <a
                href={cardData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition"
              >
                <span className="mr-3">🐙</span>
                <span>GitHub</span>
              </a>
            )}
            
            {cardData.website && (
              <a
                href={cardData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition"
              >
                <span className="mr-3">🌐</span>
                <span>Website</span>
              </a>
            )}
          </div>
          
          <p className="text-white text-sm mt-6 text-center opacity-75">Click to flip back</p>
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;
