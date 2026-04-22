import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function About() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <nav className="max-w-4xl mx-auto mb-8">
        <ul className="flex justify-center space-x-8">
          <li>
            <Link to="/" className="text-white hover:text-blue-400 transition">Home</Link>
          </li>
          <li>
            <Link to="/projects" className="text-white hover:text-blue-400 transition">Projects</Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-blue-400 transition">About</Link>
          </li>
        </ul>
      </nav>

      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            {profile.image && (
              <img 
                src={profile.image} 
                alt={profile.name}
                className="w-48 h-48 rounded-full object-cover border-4 border-blue-600"
              />
            )}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{profile.name}</h1>
              <p className="text-blue-400 text-lg mb-4">{profile.title}</p>
              <p className="text-gray-300">{profile.bio}</p>
            </div>
          </div>

          {profile.education && profile.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Education</h2>
              <div className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white">{edu.institution}</h3>
                    <p className="text-blue-400">{edu.degree}</p>
                    <p className="text-gray-400 text-sm">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {profile.experience && profile.experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Experience</h2>
              <div className="space-y-4">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white">{exp.company}</h3>
                    <p className="text-blue-400">{exp.role}</p>
                    <p className="text-gray-400 text-sm">{exp.duration}</p>
                    <p className="text-gray-300 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {profile.skills && profile.skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-blue-900 text-blue-300 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {profile.contact && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
              <div className="space-y-2">
                {profile.contact.email && (
                  <p className="text-gray-300">📧 {profile.contact.email}</p>
                )}
                {profile.contact.phone && (
                  <p className="text-gray-300">📱 {profile.contact.phone}</p>
                )}
                {profile.contact.linkedin && (
                  <p className="text-gray-300">
                    💼 
                    <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">
                      LinkedIn
                    </a>
                  </p>
                )}
                {profile.contact.github && (
                  <p className="text-gray-300">
                    🐙 
                    <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">
                      GitHub
                    </a>
                  </p>
                )}
                {profile.contact.website && (
                  <p className="text-gray-300">
                    🌐 
                    <a href={profile.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">
                      Website
                    </a>
                  </p>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default About;
