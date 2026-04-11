import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { 
  fetchSkillsData, fetchExperiencesData, fetchProjectsData, fetchProfileData,
  fetchCertificationsData, fetchRepositoriesData, fetchReportsData,
  createSkill, updateSkill, deleteSkill,
  createExperience, updateExperience, deleteExperience,
  createProject, updateProject, deleteProject,
  updateProfile,
  createCertification, updateCertification, deleteCertification,
  createRepository, updateRepository, deleteRepository,
  createReport, updateReport, deleteReport
} from '../data/portfolioData';
import { Plus, Edit, Trash2, Save, X, LogOut, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { logout } = useAdmin();
  const [activeTab, setActiveTab] = useState('skills');
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [reports, setReports] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [skillsData, expData, projData, profileData, certData, repoData, reportData] = await Promise.all([
        fetchSkillsData(),
        fetchExperiencesData(),
        fetchProjectsData(),
        fetchProfileData(),
        fetchCertificationsData(),
        fetchRepositoriesData(),
        fetchReportsData()
      ]);
      setSkills(skillsData);
      setExperiences(expData);
      setProjects(projData);
      setProfile(profileData);
      setCertifications(certData);
      setRepositories(repoData);
      setReports(reportData);
      toast.success('Data loaded successfully');
    } catch (error) {
      toast.error('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (type, id, data) => {
    try {
      if (type === 'skill') await updateSkill(id, data);
      if (type === 'experience') await updateExperience(id, data);
      if (type === 'project') await updateProject(id, data);
      if (type === 'certification') await updateCertification(id, data);
      if (type === 'repository') await updateRepository(id, data);
      if (type === 'report') await updateReport(id, data);
      toast.success(`${type} updated!`);
      await loadAllData();
      setEditingItem(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  const handleAdd = async (type, data) => {
    try {
      if (type === 'skill') await createSkill(data);
      if (type === 'experience') await createExperience(data);
      if (type === 'project') await createProject(data);
      if (type === 'certification') await createCertification(data);
      if (type === 'repository') await createRepository(data);
      if (type === 'report') await createReport(data);
      toast.success(`${type} added!`);
      await loadAllData();
      setShowForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Add failed');
    }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm(`Delete this ${type}?`)) {
      try {
        if (type === 'skill') await deleteSkill(id);
        if (type === 'experience') await deleteExperience(id);
        if (type === 'project') await deleteProject(id);
        if (type === 'certification') await deleteCertification(id);
        if (type === 'repository') await deleteRepository(id);
        if (type === 'report') await deleteReport(id);
        toast.success(`${type} deleted!`);
        await loadAllData();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(profile);
      toast.success('Profile updated!');
      await loadAllData();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-neon animate-pulse">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-neon p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">⚙️ Admin Dashboard</h1>
          <div className="flex gap-2">
            <button onClick={loadAllData} className="p-2 border border-neon/50 rounded hover:bg-neon/10">
              <RefreshCw size={16} />
            </button>
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2 border border-neon/50 rounded hover:bg-neon/10">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 border-b border-neon/30 pb-2">
          {['skills', 'experiences', 'projects', 'certifications', 'repositories', 'reports', 'profile'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded capitalize ${activeTab === tab ? 'bg-neon/20 border border-neon' : 'hover:bg-neon/10'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <button onClick={() => setShowForm(true)} className="mb-4 px-4 py-2 bg-neon/20 border border-neon rounded hover:bg-neon/30">
              <Plus size={16} className="inline mr-2" /> Add Skill
            </button>
            <div className="space-y-2">
              {skills.map(skill => (
                <div key={skill._id} className="glass-panel p-4 flex justify-between items-center">
                  <div>
                    <span className="font-bold">{skill.name}</span>
                    <span className="ml-4 text-neon">{skill.percentage}%</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem(skill)} className="text-blue-400"><Edit size={16} /></button>
                    <button onClick={() => handleDelete('skill', skill._id)} className="text-red-400"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && profile && (
          <div className="glass-panel p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input type="text" value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input type="email" value={profile.email || ''} onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">Bio</label>
                <textarea value={profile.bio || ''} onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2" rows="4" />
              </div>
              <button onClick={handleProfileUpdate} className="px-4 py-2 bg-neon/20 border border-neon rounded hover:bg-neon/30">
                <Save size={16} className="inline mr-2" /> Save Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;