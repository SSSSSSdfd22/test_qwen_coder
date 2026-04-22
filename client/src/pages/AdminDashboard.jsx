import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('card');
  const [cardData, setCardData] = useState({});
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Form states
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: '',
    techStack: '',
    liveDemo: '',
    github: '',
  });

  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    year: '',
  });

  const [newExperience, setNewExperience] = useState({
    company: '',
    role: '',
    duration: '',
    description: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [cardRes, projectsRes, profileRes] = await Promise.all([
        axios.get(`${API_URL}/card`),
        axios.get(`${API_URL}/projects`),
        axios.get(`${API_URL}/profile`),
      ]);
      setCardData(cardRes.data || {});
      setProjects(projectsRes.data || []);
      setProfile(profileRes.data || {});
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const updateCard = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${API_URL}/card`, cardData);
      setMessage('Business card updated successfully!');
    } catch (error) {
      setMessage('Error updating card');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${API_URL}/profile`, profile);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const addProject = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const projectData = {
        ...newProject,
        techStack: newProject.techStack.split(',').map(s => s.trim()).filter(Boolean),
      };
      await axios.post(`${API_URL}/projects`, projectData);
      setMessage('Project added successfully!');
      setNewProject({
        title: '',
        description: '',
        category: '',
        techStack: '',
        liveDemo: '',
        github: '',
      });
      fetchData();
    } catch (error) {
      setMessage('Error adding project');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`${API_URL}/projects/${id}`);
      setMessage('Project deleted successfully!');
      fetchData();
    } catch (error) {
      setMessage('Error deleting project');
    } finally {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [...(prev.education || []), newEducation],
    }));
    setNewEducation({ institution: '', degree: '', year: '' });
  };

  const addExperience = () => {
    setProfile(prev => ({
      ...prev,
      experience: [...(prev.experience || []), newExperience],
    }));
    setNewExperience({ company: '', role: '', duration: '', description: '' });
  };

  const addSkill = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setProfile(prev => ({
        ...prev,
        skills: [...(prev.skills || []), e.target.value.trim()],
      }));
      e.target.value = '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              View Site →
            </a>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {message && (
          <div className={`mb-6 px-4 py-3 rounded ${message.includes('Error') ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'}`}>
            {message}
          </div>
        )}

        <div className="flex space-x-2 mb-8 border-b border-gray-700">
          {['card', 'projects', 'profile'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition ${
                activeTab === tab 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'card' && (
          <form onSubmit={updateCard} className="bg-gray-800 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Business Card Details</h2>
            
            <div>
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={cardData.name || ''}
                onChange={(e) => setCardData({...cardData, name: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Job Title</label>
              <input
                type="text"
                value={cardData.title || ''}
                onChange={(e) => setCardData({...cardData, title: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Tagline</label>
              <input
                type="text"
                value={cardData.tagline || ''}
                onChange={(e) => setCardData({...cardData, tagline: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Photo URL</label>
              <input
                type="url"
                value={cardData.photo || ''}
                onChange={(e) => setCardData({...cardData, photo: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={cardData.email || ''}
                  onChange={(e) => setCardData({...cardData, email: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  value={cardData.phone || ''}
                  onChange={(e) => setCardData({...cardData, phone: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={cardData.linkedin || ''}
                  onChange={(e) => setCardData({...cardData, linkedin: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">GitHub</label>
                <input
                  type="url"
                  value={cardData.github || ''}
                  onChange={(e) => setCardData({...cardData, github: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Website</label>
                <input
                  type="url"
                  value={cardData.website || ''}
                  onChange={(e) => setCardData({...cardData, website: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-8">
            <form onSubmit={addProject} className="bg-gray-800 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Add New Project</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <input
                    type="text"
                    value={newProject.category}
                    onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                    placeholder="e.g., Web App, Mobile App"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={newProject.techStack}
                  onChange={(e) => setNewProject({...newProject, techStack: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Live Demo URL</label>
                  <input
                    type="url"
                    value={newProject.liveDemo}
                    onChange={(e) => setNewProject({...newProject, liveDemo: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={newProject.github}
                    onChange={(e) => setNewProject({...newProject, github: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition disabled:opacity-50"
              >
                {saving ? 'Adding...' : 'Add Project'}
              </button>
            </form>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Existing Projects</h2>
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project._id} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-white">{project.title}</h3>
                      <p className="text-gray-400 text-sm">{project.category}</p>
                    </div>
                    <button
                      onClick={() => deleteProject(project._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <form onSubmit={updateProfile} className="bg-gray-800 rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={profile.name || ''}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={profile.title || ''}
                  onChange={(e) => setProfile({...profile, title: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Bio</label>
              <textarea
                value={profile.bio || ''}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                rows="4"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Image URL</label>
              <input
                type="url"
                value={profile.image || ''}
                onChange={(e) => setProfile({...profile, image: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Education */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-white mb-4">Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Institution"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={newEducation.year}
                  onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={addEducation}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
              >
                Add Education
              </button>

              <div className="mt-4 space-y-2">
                {profile.education?.map((edu, index) => (
                  <div key={index} className="bg-gray-700 rounded p-3 flex justify-between">
                    <span className="text-gray-300">{edu.institution} - {edu.degree} ({edu.year})</span>
                    <button
                      type="button"
                      onClick={() => setProfile(prev => ({
                        ...prev,
                        education: prev.education.filter((_, i) => i !== index)
                      }))}
                      className="text-red-400 hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-white mb-4">Experience</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Company"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={newExperience.role}
                  onChange={(e) => setNewExperience({...newExperience, role: e.target.value})}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={newExperience.duration}
                  onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={addExperience}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
              >
                Add Experience
              </button>

              <div className="mt-4 space-y-2">
                {profile.experience?.map((exp, index) => (
                  <div key={index} className="bg-gray-700 rounded p-3 flex justify-between">
                    <span className="text-gray-300">{exp.company} - {exp.role} ({exp.duration})</span>
                    <button
                      type="button"
                      onClick={() => setProfile(prev => ({
                        ...prev,
                        experience: prev.experience.filter((_, i) => i !== index)
                      }))}
                      className="text-red-400 hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-white mb-4">Skills</h3>
              <input
                type="text"
                placeholder="Type skill and press Enter"
                onKeyDown={addSkill}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills?.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => setProfile(prev => ({
                        ...prev,
                        skills: prev.skills.filter((_, i) => i !== index)
                      }))}
                      className="ml-2 text-blue-400 hover:text-blue-300"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-white mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.contact?.email || ''}
                    onChange={(e) => setProfile({...profile, contact: {...profile.contact, email: e.target.value}})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profile.contact?.phone || ''}
                    onChange={(e) => setProfile({...profile, contact: {...profile.contact, phone: e.target.value}})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={profile.contact?.linkedin || ''}
                    onChange={(e) => setProfile({...profile, contact: {...profile.contact, linkedin: e.target.value}})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">GitHub</label>
                  <input
                    type="url"
                    value={profile.contact?.github || ''}
                    onChange={(e) => setProfile({...profile, contact: {...profile.contact, github: e.target.value}})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Website</label>
                  <input
                    type="url"
                    value={profile.contact?.website || ''}
                    onChange={(e) => setProfile({...profile, contact: {...profile.contact, website: e.target.value}})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
