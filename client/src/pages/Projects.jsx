import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <nav className="max-w-6xl mx-auto mb-8">
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

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">My Projects</h1>
        
        {categories.length > 1 && (
          <div className="flex justify-center mb-8 flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full transition ${
                  filter === cat 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div key={project._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
              {project.thumbnail && (
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack?.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-900 text-blue-300 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {project.liveDemo && (
                    <a 
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition"
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
