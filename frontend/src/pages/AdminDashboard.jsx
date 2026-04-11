import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { 
  fetchSkillsData, fetchExperiencesData, fetchProjectsData, fetchProfileData,
  updateSkill, addSkill, deleteSkill,
  updateExperience, addExperience, deleteExperience,
  updateProject, addProject, deleteProject,
  updateProfile
} from '../data/portfolioData';
import { Plus, Edit, Trash2, Save, X, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { logout } = useAdmin();
  const [activeTab, setActiveTab] = useState('skills');
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const skillsData = await fetchSkillsData();
    const expData = await fetchExperiencesData();
    const projData = await fetchProjectsData();
    const profileData = await fetchProfileData();
    setSkills(skillsData);
    setExperiences(expData);
    setProjects(projData);
    setProfile(profileData);
  };

  const handleUpdate = async (type, id, data) => {
    try {
      if (type === 'skill') await updateSkill(id, data);
      if (type === 'experience') await updateExperience(id, data);
      if (type === 'project') await updateProject(id, data);
      toast.success(`${type} updated!`);
      await loadData();
      setEditingItem(null);
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const handleAdd = async (type, data) => {
    try {
      if (type === 'skill') await addSkill(data);
      if (type === 'experience') await addExperience(data);
      if (type === 'project') await addProject(data);
      toast.success(`${type} added!`);
      await loadData();
      setShowForm(false);
    } catch (error) {
      toast.error('Add failed');
    }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm('Delete this item?')) {
      try {
        if (type === 'skill') await deleteSkill(id);
        if (type === 'experience') await deleteExperience(id);
        if (type === 'project') await deleteProject(id);
        toast.success(`${type} deleted!`);
        await loadData();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(profile);
      toast.success('Profile updated!');
      await loadData();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-black text-neon p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">⚙️ Admin Dashboard</h1>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 border border-neon/50 rounded hover:bg-neon/10">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-neon/30 pb-2">
          {['skills', 'experiences', 'projects', 'profile'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-neon/20 border border-neon' : 'hover:bg-neon/10'}`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <button onClick={() => setShowForm(true)} className="mb-4 px-4 py-2 bg-neon/20 border border-neon rounded hover:bg-neon/30">
              <Plus size={16} className="inline mr-2" /> Add Skill
            </button>
            {showForm && (
              <SkillForm onSave={(data) => handleAdd('skill', data)} onCancel={() => setShowForm(false)} />
            )}
            <div className="space-y-2">
              {skills.map(skill => (
                <div key={skill.id} className="glass-panel p-4 flex justify-between items-center">
                  {editingItem?.id === skill.id ? (
                    <SkillEditForm skill={skill} onSave={(data) => handleUpdate('skill', skill.id, data)} onCancel={() => setEditingItem(null)} />
                  ) : (
                    <>
                      <div>
                        <span className="font-bold">{skill.name}</span>
                        <span className="ml-4 text-neon">{skill.percentage}%</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingItem(skill)} className="text-blue-400"><Edit size={16} /></button>
                        <button onClick={() => handleDelete('skill', skill.id)} className="text-red-400"><Trash2 size={16} /></button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experiences Tab */}
        {activeTab === 'experiences' && (
          <div>
            <button onClick={() => setShowForm(true)} className="mb-4 px-4 py-2 bg-neon/20 border border-neon rounded hover:bg-neon/30">
              <Plus size={16} className="inline mr-2" /> Add Experience
            </button>
            {showForm && (
              <ExperienceForm onSave={(data) => handleAdd('experience', data)} onCancel={() => setShowForm(false)} />
            )}
            <div className="space-y-4">
              {experiences.map(exp => (
                <div key={exp.id} className="glass-panel p-4">
                  {editingItem?.id === exp.id ? (
                    <ExperienceEditForm experience={exp} onSave={(data) => handleUpdate('experience', exp.id, data)} onCancel={() => setEditingItem(null)} />
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold">{exp.role}</h3>
                          <p className="text-sm text-gray-400">{exp.company} | {exp.duration}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingItem(exp)}><Edit size={16} /></button>
                          <button onClick={() => handleDelete('experience', exp.id)}><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <button onClick={() => setShowForm(true)} className="mb-4 px-4 py-2 bg-neon/20 border border-neon rounded hover:bg-neon/30">
              <Plus size={16} className="inline mr-2" /> Add Project
            </button>
            {showForm && (
              <ProjectForm onSave={(data) => handleAdd('project', data)} onCancel={() => setShowForm(false)} />
            )}
            <div className="grid gap-4">
              {projects.map(project => (
                <div key={project.id} className="glass-panel p-4">
                  {editingItem?.id === project.id ? (
                    <ProjectEditForm project={project} onSave={(data) => handleUpdate('project', project.id, data)} onCancel={() => setEditingItem(null)} />
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold">{project.title}</h3>
                          <p className="text-sm text-gray-400">{project.summary}</p>
                          <div className="flex gap-1 mt-2">
                            {project.tech?.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-neon/10 rounded">{t}</span>)}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingItem(project)}><Edit size={16} /></button>
                          <button onClick={() => handleDelete('project', project.id)}><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </>
                  )}
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
                <input
                  type="text"
                  value={profile.name || ''}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Role</label>
                <input
                  type="text"
                  value={profile.role || ''}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email || ''}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Bio</label>
                <textarea
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2"
                  rows="4"
                />
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

// Form Components
const SkillForm = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [percentage, setPercentage] = useState(50);
  return (
    <div className="glass-panel p-4 mb-4">
      <input type="text" placeholder="Skill Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2 mb-2" />
      <input type="number" placeholder="Percentage" value={percentage} onChange={(e) => setPercentage(e.target.value)} className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2 mb-2" />
      <div className="flex gap-2">
        <button onClick={() => onSave({ name, percentage: parseInt(percentage) })} className="px-3 py-1 bg-green-500/20 rounded">Save</button>
        <button onClick={onCancel} className="px-3 py-1 bg-red-500/20 rounded">Cancel</button>
      </div>
    </div>
  );
};

const ExperienceForm = ({ onSave, onCancel }) => {
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [duration, setDuration] = useState('');
  return (
    <div className="glass-panel p-4 mb-4">
      <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2 mb-2" />
      <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2 mb-2" />
      <input type="text" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2 mb-2" />
      <div className="flex gap-2">
        <button onClick={() => onSave({ role, company, duration, responsibilities: [], tools: [] })} className="px-3 py-1 bg-green-500/20 rounded">Save</button>
        <button onClick={onCancel} className="px-3 py-1 bg-red-500/20 rounded">Cancel</button>
      </div>
    </div>
  );
};

const ProjectForm = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  return (
    <div className="glass-panel p-4 mb-4">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2 mb-2" />
      <textarea placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2 mb-2" rows="3" />
      <div className="flex gap-2">
        <button onClick={() => onSave({ title, summary, tech: [], github: '#', demo: '#', status: 'Active' })} className="px-3 py-1 bg-green-500/20 rounded">Save</button>
        <button onClick={onCancel} className="px-3 py-1 bg-red-500/20 rounded">Cancel</button>
      </div>
    </div>
  );
};

const SkillEditForm = ({ skill, onSave, onCancel }) => {
  const [name, setName] = useState(skill.name);
  const [percentage, setPercentage] = useState(skill.percentage);
  return (
    <div className="flex-1 flex gap-2">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-black/50 border border-neon/30 rounded px-2 py-1" />
      <input type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} className="w-20 bg-black/50 border border-neon/30 rounded px-2 py-1" />
      <button onClick={() => onSave({ name, percentage: parseInt(percentage) })} className="text-green-400"><Save size={16} /></button>
      <button onClick={onCancel} className="text-red-400"><X size={16} /></button>
    </div>
  );
};

const ExperienceEditForm = ({ experience, onSave, onCancel }) => {
  const [role, setRole] = useState(experience.role);
  const [company, setCompany] = useState(experience.company);
  return (
    <div className="flex-1 flex gap-2 flex-wrap">
      <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="bg-black/50 border border-neon/30 rounded px-2 py-1" />
      <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="bg-black/50 border border-neon/30 rounded px-2 py-1" />
      <button onClick={() => onSave({ ...experience, role, company })} className="text-green-400"><Save size={16} /></button>
      <button onClick={onCancel} className="text-red-400"><X size={16} /></button>
    </div>
  );
};

const ProjectEditForm = ({ project, onSave, onCancel }) => {
  const [title, setTitle] = useState(project.title);
  const [summary, setSummary] = useState(project.summary);
  return (
    <div className="flex-1 flex gap-2 flex-wrap">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-black/50 border border-neon/30 rounded px-2 py-1" />
      <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} className="flex-1 bg-black/50 border border-neon/30 rounded px-2 py-1" />
      <button onClick={() => onSave({ ...project, title, summary })} className="text-green-400"><Save size={16} /></button>
      <button onClick={onCancel} className="text-red-400"><X size={16} /></button>
    </div>
  );
};

export default AdminDashboard;