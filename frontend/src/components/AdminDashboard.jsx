import React, { useState, useEffect } from 'react';
import {
  fetchSkills, fetchExperiences, fetchProjects, fetchProfile,
  fetchCertifications, fetchRepositories, fetchReports,
  createSkill, updateSkill, deleteSkill,
  createExperience, updateExperience, deleteExperience,
  createProject, updateProject, deleteProject,
  updateProfile,
  createCertification, updateCertification, deleteCertification,
  createRepository, updateRepository, deleteRepository,
  createReport, updateReport, deleteReport
} from '../api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [reports, setReports] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Form states
  const [skillForm, setSkillForm] = useState({ name: '', percentage: '' });
  const [projectForm, setProjectForm] = useState({ title: '', description: '', technologies: '', demoLink: '', githubLink: '', status: '' });
  const [expForm, setExpForm] = useState({ company: '', role: '', startDate: '', endDate: '', isCurrent: false, responsibilities: '' });
  const [reportForm, setReportForm] = useState({ title: '', description: '', pdfUrl: '' });
  const [certForm, setCertForm] = useState({ title: '', issuer: '', date: '', credentialId: '', verifyUrl: '' });
  const [repoForm, setRepoForm] = useState({ name: '', description: '', language: '', stars: '', forks: '', updated: '', url: '' });

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === 'profile') loadProfile();
    else if (activeTab === 'skills') loadSkills();
    else if (activeTab === 'projects') loadProjects();
    else if (activeTab === 'experience') loadExperience();
    else if (activeTab === 'reports') loadReports();
    else if (activeTab === 'certifications') loadCertifications();
    else if (activeTab === 'repositories') loadRepositories();
    else if (activeTab === 'contacts') loadContacts();
  }, [activeTab]);

  // ---------- Profile ----------
  const loadProfile = async () => {
    try {
      const res = await fetchProfile();
      setProfile(res.data);
    } catch (err) { console.error(err); }
  };
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      toast.success('Profile updated');
    } catch (err) { toast.error('Update failed'); }
  };
  const uploadPhoto = async (file) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await fetch('https://p7-project-1.onrender.com/api/upload/profile-base64', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
          body: JSON.stringify({ imageBase64: reader.result })
        });
        toast.success('Photo uploaded');
        loadProfile();
      } catch (err) { toast.error('Upload failed'); }
    };
    reader.readAsDataURL(file);
  };

  // ---------- Skills ----------
  const loadSkills = async () => {
    try {
      const res = await fetchSkills();
      setSkills(res.data);
    } catch (err) { console.error(err); }
  };
  const addSkill = async (e) => {
    e.preventDefault();
    try {
      await createSkill({ name: skillForm.name, percentage: parseInt(skillForm.percentage) });
      toast.success('Skill added');
      setSkillForm({ name: '', percentage: '' });
      loadSkills();
    } catch (err) { toast.error('Add failed'); }
  };
  const deleteSkillHandler = async (id) => {
    if (confirm('Delete skill?')) {
      try {
        await deleteSkill(id);
        toast.success('Deleted');
        loadSkills();
      } catch (err) { toast.error('Delete failed'); }
    }
  };
  const editSkillHandler = async (id, oldName, oldPercent) => {
    const newName = prompt('New name', oldName);
    const newPercent = prompt('New percentage', oldPercent);
    if (newName && newPercent) {
      try {
        await updateSkill(id, { name: newName, percentage: parseInt(newPercent) });
        toast.success('Updated');
        loadSkills();
      } catch (err) { toast.error('Update failed'); }
    }
  };

  // ---------- Projects ----------
  const loadProjects = async () => {
    try {
      const res = await fetchProjects();
      setProjects(res.data);
    } catch (err) { console.error(err); }
  };
  const addProject = async (e) => {
    e.preventDefault();
    const techArray = projectForm.technologies.split(',').map(t => t.trim());
    try {
      await createProject({ ...projectForm, technologies: techArray });
      toast.success('Project added');
      setProjectForm({ title: '', description: '', technologies: '', demoLink: '', githubLink: '', status: '' });
      loadProjects();
    } catch (err) { toast.error('Add failed'); }
  };
  const deleteProjectHandler = async (id) => {
    if (confirm('Delete project?')) {
      try {
        await deleteProject(id);
        toast.success('Deleted');
        loadProjects();
      } catch (err) { toast.error('Delete failed'); }
    }
  };

  // ---------- Experience ----------
  const loadExperience = async () => {
    try {
      const res = await fetchExperiences();
      setExperiences(res.data);
    } catch (err) { console.error(err); }
  };
  const addExperience = async (e) => {
    e.preventDefault();
    const respArray = expForm.responsibilities.split('\n').filter(r => r.trim());
    try {
      await createExperience({ ...expForm, responsibilities: respArray });
      toast.success('Experience added');
      setExpForm({ company: '', role: '', startDate: '', endDate: '', isCurrent: false, responsibilities: '' });
      loadExperience();
    } catch (err) { toast.error('Add failed'); }
  };
  const deleteExperienceHandler = async (id) => {
    if (confirm('Delete experience?')) {
      try {
        await deleteExperience(id);
        toast.success('Deleted');
        loadExperience();
      } catch (err) { toast.error('Delete failed'); }
    }
  };

  // ---------- Reports ----------
  const loadReports = async () => {
    try {
      const res = await fetchReports();
      setReports(res.data);
    } catch (err) { console.error(err); }
  };
  const addReport = async (e) => {
    e.preventDefault();
    try {
      await createReport(reportForm);
      toast.success('Report added');
      setReportForm({ title: '', description: '', pdfUrl: '' });
      loadReports();
    } catch (err) { toast.error('Add failed'); }
  };
  const deleteReportHandler = async (id) => {
    if (confirm('Delete report?')) {
      try {
        await deleteReport(id);
        toast.success('Deleted');
        loadReports();
      } catch (err) { toast.error('Delete failed'); }
    }
  };

  // ---------- Certifications ----------
  const loadCertifications = async () => {
    try {
      const res = await fetchCertifications();
      setCertifications(res.data);
    } catch (err) { console.error(err); }
  };
  const addCertification = async (e) => {
    e.preventDefault();
    try {
      await createCertification(certForm);
      toast.success('Certification added');
      setCertForm({ title: '', issuer: '', date: '', credentialId: '', verifyUrl: '' });
      loadCertifications();
    } catch (err) { toast.error('Add failed'); }
  };
  const deleteCertificationHandler = async (id) => {
    if (confirm('Delete certification?')) {
      try {
        await deleteCertification(id);
        toast.success('Deleted');
        loadCertifications();
      } catch (err) { toast.error('Delete failed'); }
    }
  };

  // ---------- Repositories ----------
  const loadRepositories = async () => {
    try {
      const res = await fetchRepositories();
      setRepositories(res.data);
    } catch (err) { console.error(err); }
  };
  const addRepository = async (e) => {
    e.preventDefault();
    try {
      await createRepository({ ...repoForm, stars: parseInt(repoForm.stars) || 0, forks: parseInt(repoForm.forks) || 0 });
      toast.success('Repository added');
      setRepoForm({ name: '', description: '', language: '', stars: '', forks: '', updated: '', url: '' });
      loadRepositories();
    } catch (err) { toast.error('Add failed'); }
  };
  const deleteRepositoryHandler = async (id) => {
    if (confirm('Delete repository?')) {
      try {
        await deleteRepository(id);
        toast.success('Deleted');
        loadRepositories();
      } catch (err) { toast.error('Delete failed'); }
    }
  };

  // ---------- Contacts ----------
  const loadContacts = async () => {
    try {
      const res = await fetch('https://p7-project-1.onrender.com/api/contact', {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
      });
      const data = await res.json();
      setContacts(data);
    } catch (err) { console.error(err); }
  };
  const deleteContact = async (id) => {
    if (confirm('Delete contact message?')) {
      try {
        await fetch(`https://p7-project-1.onrender.com/api/contact/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
        });
        toast.success('Deleted');
        loadContacts();
      } catch (err) { toast.error('Delete failed'); }
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold glow-text">&lt; Admin Dashboard /&gt;</h1>
          <button onClick={logout} className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-black">Logout</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {['profile', 'skills', 'projects', 'experience', 'reports', 'certifications', 'repositories', 'contacts'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 border rounded ${activeTab === tab ? 'border-green-500 bg-green-500/20' : 'border-green-500/30'}`}>
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={updateProfileHandler} className="space-y-4">
              <input type="text" value={profile.name || ''} onChange={e => setProfile({...profile, name: e.target.value})} placeholder="Name" className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
              <input type="text" value={profile.title || ''} onChange={e => setProfile({...profile, title: e.target.value})} placeholder="Title" className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
              <textarea value={profile.bio || ''} onChange={e => setProfile({...profile, bio: e.target.value})} placeholder="Bio" rows="3" className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
              <input type="text" value={profile.location || ''} onChange={e => setProfile({...profile, location: e.target.value})} placeholder="Location" className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
              <input type="email" value={profile.email || ''} onChange={e => setProfile({...profile, email: e.target.value})} placeholder="Email" className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
              <input type="text" value={profile.phone || ''} onChange={e => setProfile({...profile, phone: e.target.value})} placeholder="Phone" className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
              <input type="url" value={profile.github || ''} onChange={e => setProfile({...profile, github: e.target.value})} placeholder="GitHub URL" className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
              <input type="url" value={profile.linkedin || ''} onChange={e => setProfile({...profile, linkedin: e.target.value})} placeholder="LinkedIn URL" className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
              <input type="url" value={profile.instagram || ''} onChange={e => setProfile({...profile, instagram: e.target.value})} placeholder="Instagram URL" className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
              <div>
                <label className="block mb-2">Profile Photo</label>
                <input type="file" accept="image/*" onChange={e => e.target.files[0] && uploadPhoto(e.target.files[0])} className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                {profile.profileImage && <img src={profile.profileImage} alt="Profile" className="w-16 h-16 rounded-full mt-2 border border-green-500" />}
              </div>
              <button type="submit" className="bg-green-500 text-black px-6 py-2 rounded hover:bg-green-600">Update Profile</button>
            </form>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Add Skill</h2>
              <form onSubmit={addSkill} className="space-y-4">
                <input type="text" placeholder="Skill Name" value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="number" placeholder="Percentage (0-100)" value={skillForm.percentage} onChange={e => setSkillForm({...skillForm, percentage: e.target.value})} required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <button type="submit" className="bg-green-500 text-black px-6 py-2 rounded hover:bg-green-600">Add Skill</button>
              </form>
            </div>
            <div className="space-y-4">
              {skills.map(skill => (
                <div key={skill._id} className="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 flex justify-between items-center">
                  <div><span className="font-bold">{skill.name}</span> - {skill.percentage}%</div>
                  <div className="flex gap-2">
                    <button onClick={() => editSkillHandler(skill._id, skill.name, skill.percentage)} className="text-blue-500">Edit</button>
                    <button onClick={() => deleteSkillHandler(skill._id)} className="text-red-500">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Add Project</h2>
              <form onSubmit={addProject} className="space-y-4">
                <input type="text" placeholder="Title" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <textarea placeholder="Description" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="text" placeholder="Technologies (comma separated)" value={projectForm.technologies} onChange={e => setProjectForm({...projectForm, technologies: e.target.value})} className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="url" placeholder="Demo URL" value={projectForm.demoLink} onChange={e => setProjectForm({...projectForm, demoLink: e.target.value})} className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="url" placeholder="GitHub URL" value={projectForm.githubLink} onChange={e => setProjectForm({...projectForm, githubLink: e.target.value})} className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="text" placeholder="Status" value={projectForm.status} onChange={e => setProjectForm({...projectForm, status: e.target.value})} className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <button type="submit" className="bg-green-500 text-black px-6 py-2 rounded hover:bg-green-600">Add Project</button>
              </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(proj => (
                <div key={proj._id} className="bg-gray-900/50 border border-green-500/30 rounded-lg p-4">
                  <h3 className="text-xl font-bold">{proj.title}</h3>
                  <p className="text-gray-400 text-sm">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">{proj.technologies?.map(t => <span key={t} className="bg-green-500/20 px-2 py-0.5 rounded text-xs">{t}</span>)}</div>
                  <div className="flex gap-3 mt-3">{proj.demoLink && <a href={proj.demoLink} target="_blank" className="text-green-400 text-sm">Demo</a>}{proj.githubLink && <a href={proj.githubLink} target="_blank" className="text-green-400 text-sm">GitHub</a>}</div>
                  <button onClick={() => deleteProjectHandler(proj._id)} className="text-red-500 text-sm mt-2">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div>
            <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Add Experience</h2>
              <form onSubmit={addExperience} className="space-y-4">
                <input type="text" placeholder="Company" value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="text" placeholder="Role" value={expForm.role} onChange={e => setExpForm({...expForm, role: e.target.value})} required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="text" placeholder="Start Date" value={expForm.startDate} onChange={e => setExpForm({...expForm, startDate: e.target.value})} required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="text" placeholder="End Date" value={expForm.endDate} onChange={e => setExpForm({...expForm, endDate: e.target.value})} className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <label className="flex items-center gap-2"><input type="checkbox" checked={expForm.isCurrent} onChange={e => setExpForm({...expForm, isCurrent: e.target.checked})} /> Currently working here</label>
                <textarea placeholder="Responsibilities (one per line)" value={expForm.responsibilities} onChange={e => setExpForm({...expForm, responsibilities: e.target.value})} rows="4" required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <button type="submit" className="bg-green-500 text-black px-6 py-2 rounded hover:bg-green-600">Add Experience</button>
              </form>
            </div>
            <div className="space-y-6">{experiences.map(exp => (
              <div key={exp._id} className="bg-gray-900/50 border border-green-500/30 rounded-lg p-4"><div className="flex justify-between items-start"><div><h3 className="text-xl font-bold">{exp.role} @ {exp.company}</h3><p className="text-gray-400">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p></div><button onClick={() => deleteExperienceHandler(exp._id)} className="text-red-500">Delete</button></div><ul className="list-disc list-inside mt-2 text-sm text-gray-300">{exp.responsibilities.map(r => <li key={r}>{r}</li>)}</ul></div>))}</div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div>
            <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Add Report</h2>
              <form onSubmit={addReport} className="space-y-4">
                <input type="text" placeholder="Title" value={reportForm.title} onChange={e => setReportForm({...reportForm, title: e.target.value})} required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <textarea placeholder="Description" value={reportForm.description} onChange={e => setReportForm({...reportForm, description: e.target.value})} required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="url" placeholder="PDF URL" value={reportForm.pdfUrl} onChange={e => setReportForm({...reportForm, pdfUrl: e.target.value})} required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <button type="submit" className="bg-green-500 text-black px-6 py-2 rounded hover:bg-green-600">Add Report</button>
              </form>
            </div>
            <div className="space-y-4">{reports.map(r => (
              <div key={r._id} className="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 flex justify-between items-center"><div><span className="font-bold">{r.title}</span><br /><span className="text-sm text-gray-400">{r.description}</span></div><button onClick={() => deleteReportHandler(r._id)} className="text-red-500">Delete</button></div>
            ))}</div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div>
            <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Add Certification</h2>
              <form onSubmit={addCertification} className="space-y-4">
                <input type="text" placeholder="Title" value={certForm.title} onChange={e => setCertForm({...certForm, title: e.target.value})} required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="text" placeholder="Issuer" value={certForm.issuer} onChange={e => setCertForm({...certForm, issuer: e.target.value})} required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="text" placeholder="Date" value={certForm.date} onChange={e => setCertForm({...certForm, date: e.target.value})} required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="text" placeholder="Credential ID" value={certForm.credentialId} onChange={e => setCertForm({...certForm, credentialId: e.target.value})} className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="url" placeholder="Verify URL" value={certForm.verifyUrl} onChange={e => setCertForm({...certForm, verifyUrl: e.target.value})} className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <button type="submit" className="bg-green-500 text-black px-6 py-2 rounded hover:bg-green-600">Add Certification</button>
              </form>
            </div>
            <div className="space-y-4">{certifications.map(c => (
              <div key={c._id} className="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 flex justify-between items-center"><div><span className="font-bold">{c.title}</span> – {c.issuer} ({c.date})<br /><span className="text-xs text-gray-400">ID: {c.credentialId || 'N/A'}</span></div><button onClick={() => deleteCertificationHandler(c._id)} className="text-red-500">Delete</button></div>
            ))}</div>
          </div>
        )}

        {/* Repositories Tab */}
        {activeTab === 'repositories' && (
          <div>
            <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Add Repository</h2>
              <form onSubmit={addRepository} className="space-y-4">
                <input type="text" placeholder="Repository Name" value={repoForm.name} onChange={e => setRepoForm({...repoForm, name: e.target.value})} required className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="text" placeholder="Description" value={repoForm.description} onChange={e => setRepoForm({...repoForm, description: e.target.value})} className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="text" placeholder="Language" value={repoForm.language} onChange={e => setRepoForm({...repoForm, language: e.target.value})} className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="number" placeholder="Stars" value={repoForm.stars} onChange={e => setRepoForm({...repoForm, stars: e.target.value})} className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="number" placeholder="Forks" value={repoForm.forks} onChange={e => setRepoForm({...repoForm, forks: e.target.value})} className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="text" placeholder="Last updated (YYYY-MM-DD)" value={repoForm.updated} onChange={e => setRepoForm({...repoForm, updated: e.target.value})} className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <input type="url" placeholder="Repository URL" value={repoForm.url} onChange={e => setRepoForm({...repoForm, url: e.target.value})} className="w-full bg-black border border-green-500/30 rounded px-3 py-2" />
                <button type="submit" className="bg-green-500 text-black px-6 py-2 rounded hover:bg-green-600">Add Repository</button>
              </form>
            </div>
            <div className="space-y-4">{repositories.map(r => (
              <div key={r._id} className="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 flex justify-between items-center"><div><span className="font-bold">{r.name}</span><br /><span className="text-sm text-gray-400">{r.description || ''} | ⭐{r.stars || 0} 🍴{r.forks || 0}</span></div><button onClick={() => deleteRepositoryHandler(r._id)} className="text-red-500">Delete</button></div>
            ))}</div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">{contacts.map(c => (
            <div key={c._id} className="bg-gray-900/50 border border-green-500/30 rounded-lg p-4"><p><strong>{c.name}</strong> ({c.email})</p><p className="text-sm text-gray-400">{c.message}</p><p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</p><button onClick={() => deleteContact(c._id)} className="text-red-500 text-sm mt-2">Delete</button></div>
          ))}</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;