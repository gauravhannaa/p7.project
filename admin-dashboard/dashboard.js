// ==================== CONFIGURATION ====================
const API_URL = 'https://p7-project-1.onrender.com/api';
let token = localStorage.getItem('adminToken');

// Redirect if no token
if (!token) {
    window.location.href = 'admin-login.html';
}

// ==================== AUTH FETCH HELPER ====================
async function fetchWithAuth(url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
    };
    const response = await fetch(`${API_URL}${url}`, { ...options, headers });
    if (response.status === 401) {
        localStorage.removeItem('adminToken');
        window.location.href = 'admin-login.html';
    }
    return response;
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-black' : 'bg-red-500 text-white'
    }`;
    toast.innerHTML = `
        <div class="flex items-center gap-3">
            <span>${type === 'success' ? '✅' : '❌'}</span>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==================== SECTION MANAGEMENT ====================
function showSection(section) {
    document.querySelectorAll('.section').forEach(el => el.classList.add('hidden'));
    document.getElementById(`${section}Section`).classList.remove('hidden');
    loadSectionData(section);
}

async function loadSectionData(section) {
    if (section === 'profile') await loadProfile();
    else if (section === 'skills') await loadSkills();
    else if (section === 'projects') await loadProjects();
    else if (section === 'experience') await loadExperience();
    else if (section === 'reports') await loadReports();
    else if (section === 'certifications') await loadCertifications();
    else if (section === 'repositories') await loadRepositories();
    else if (section === 'contacts') await loadContacts();
}

// ==================== PROFILE CRUD ====================
let profileData = {};

async function loadProfile() {
    try {
        const res = await fetchWithAuth('/profile');
        const profile = await res.json();
        profileData = profile;
        document.getElementById('profileName').value = profile.name || '';
        document.getElementById('profileTitle').value = profile.title || '';
        document.getElementById('profileBio').value = profile.bio || '';
        document.getElementById('profileLocation').value = profile.location || '';
        document.getElementById('profileEmail').value = profile.email || '';
        document.getElementById('profilePhone').value = profile.phone || '';
        document.getElementById('profileGithub').value = profile.github || '';
        document.getElementById('profileLinkedin').value = profile.linkedin || '';
        document.getElementById('profileInstagram').value = profile.instagram || '';
        
        const photoDiv = document.getElementById('currentPhoto');
        if (profile.profileImage && profile.profileImage !== '') {
            photoDiv.innerHTML = `<img src="${profile.profileImage}" class="w-16 h-16 rounded-full object-cover border border-green-500">`;
        } else {
            photoDiv.innerHTML = '<span class="text-sm text-gray-400">No photo uploaded</span>';
        }
    } catch (error) {
        console.error('Load profile error:', error);
    }
}

document.getElementById('profileForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('profileName').value,
        title: document.getElementById('profileTitle').value,
        bio: document.getElementById('profileBio').value,
        location: document.getElementById('profileLocation').value,
        email: document.getElementById('profileEmail').value,
        phone: document.getElementById('profilePhone').value,
        github: document.getElementById('profileGithub').value,
        linkedin: document.getElementById('profileLinkedin').value,
        instagram: document.getElementById('profileInstagram').value
    };
    const res = await fetchWithAuth('/profile', { method: 'PUT', body: JSON.stringify(data) });
    if (res.ok) {
        const msg = document.getElementById('profileMessage');
        msg.textContent = '✅ Profile updated successfully!';
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 3000);
        loadProfile();
        showToast('Profile updated!', 'success');
    }
});

// Photo Upload (Base64 - No Cloudinary)
document.getElementById('uploadPhotoBtn')?.addEventListener('click', async () => {
    const fileInput = document.getElementById('profilePhoto');
    if (!fileInput.files.length) {
        showToast('Select a file first', 'error');
        return;
    }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
        const base64String = reader.result;
        try {
            const res = await fetch(`${API_URL}/upload/profile-base64`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ imageBase64: base64String })
            });
            if (res.ok) {
                showToast('Photo uploaded successfully!', 'success');
                loadProfile();
                fileInput.value = '';
            } else {
                const err = await res.json();
                showToast('Upload failed: ' + (err.message || 'Unknown error'), 'error');
            }
        } catch (err) {
            showToast('Upload failed: ' + err.message, 'error');
        }
    };
    reader.readAsDataURL(file);
});

// ==================== SKILLS CRUD ====================
async function loadSkills() {
    const res = await fetchWithAuth('/skills');
    const skills = await res.json();
    const container = document.getElementById('skillsList');
    if (skills.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-8">No skills added yet. Add your first skill above!</div>';
        return;
    }
    container.innerHTML = skills.map(skill => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 flex justify-between items-center">
            <div>
                <span class="font-bold text-green-400">${escapeHtml(skill.name)}</span>
                <span class="ml-3 text-green-500">${skill.percentage}%</span>
                <span class="ml-2 text-xs text-gray-500">${skill.category || 'Technical'}</span>
            </div>
            <div class="flex gap-3">
                <button onclick="editSkill('${skill._id}', '${escapeHtml(skill.name)}', ${skill.percentage})" class="text-blue-400 hover:text-blue-300 transition">✏️ Edit</button>
                <button onclick="deleteSkill('${skill._id}')" class="text-red-400 hover:text-red-300 transition">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

window.editSkill = (id, name, percent) => {
    const newName = prompt('Enter new skill name:', name);
    if (newName && newName.trim()) {
        const newPercent = prompt('Enter new percentage (0-100):', percent);
        if (newPercent && !isNaN(newPercent)) {
            fetchWithAuth(`/skills/${id}`, { 
                method: 'PUT', 
                body: JSON.stringify({ name: newName, percentage: parseInt(newPercent) }) 
            }).then(() => {
                loadSkills();
                showToast('Skill updated!', 'success');
            });
        }
    }
};

window.deleteSkill = async (id) => {
    if (confirm('⚠️ Delete this skill permanently?')) {
        await fetchWithAuth(`/skills/${id}`, { method: 'DELETE' });
        loadSkills();
        showToast('Skill deleted!', 'success');
    }
};

document.getElementById('skillForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { 
        name: document.getElementById('skillName').value, 
        percentage: parseInt(document.getElementById('skillPercent').value)
    };
    await fetchWithAuth('/skills', { method: 'POST', body: JSON.stringify(data) });
    loadSkills();
    e.target.reset();
    showToast('Skill added!', 'success');
});

// ==================== PROJECTS CRUD ====================
async function loadProjects() {
    const res = await fetchWithAuth('/projects');
    const projects = await res.json();
    const container = document.getElementById('projectsList');
    if (projects.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-8 col-span-2">No projects yet. Add your first project above!</div>';
        return;
    }
    container.innerHTML = projects.map(proj => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4">
            <h3 class="text-xl font-bold text-green-400">${escapeHtml(proj.title)}</h3>
            <p class="text-gray-400 text-sm mt-1">${escapeHtml(proj.description || '')}</p>
            <div class="flex flex-wrap gap-2 mt-2">
                ${proj.technologies ? proj.technologies.map(t => `<span class="text-xs px-2 py-0.5 bg-green-500/20 rounded">${escapeHtml(t)}</span>`).join('') : ''}
            </div>
            <div class="flex gap-3 mt-3 text-sm">
                ${proj.demoLink ? `<a href="${proj.demoLink}" target="_blank" class="text-green-400 hover:text-green-300">🔗 Demo</a>` : ''}
                ${proj.githubLink ? `<a href="${proj.githubLink}" target="_blank" class="text-green-400 hover:text-green-300">📦 GitHub</a>` : ''}
                ${proj.status ? `<span class="text-gray-500">📌 ${escapeHtml(proj.status)}</span>` : ''}
            </div>
            <div class="flex gap-3 mt-3 pt-3 border-t border-green-500/20">
                <button onclick="editProject('${proj._id}')" class="text-blue-400 hover:text-blue-300 text-sm">✏️ Edit</button>
                <button onclick="deleteProject('${proj._id}')" class="text-red-400 hover:text-red-300 text-sm">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

window.editProject = async (id) => {
    const res = await fetchWithAuth(`/projects/${id}`);
    const proj = await res.json();
    const newTitle = prompt('New title:', proj.title);
    if (newTitle) {
        const newDesc = prompt('New description:', proj.description);
        await fetchWithAuth(`/projects/${id}`, { 
            method: 'PUT', 
            body: JSON.stringify({ ...proj, title: newTitle, description: newDesc }) 
        });
        loadProjects();
        showToast('Project updated!', 'success');
    }
};

window.deleteProject = async (id) => {
    if (confirm('⚠️ Delete this project permanently?')) {
        await fetchWithAuth(`/projects/${id}`, { method: 'DELETE' });
        loadProjects();
        showToast('Project deleted!', 'success');
    }
};

document.getElementById('projectForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tech = document.getElementById('projectTech').value.split(',').map(s => s.trim()).filter(Boolean);
    const data = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDesc').value,
        technologies: tech,
        demoLink: document.getElementById('projectDemo').value,
        githubLink: document.getElementById('projectGithub').value,
        status: document.getElementById('projectStatus').value
    };
    await fetchWithAuth('/projects', { method: 'POST', body: JSON.stringify(data) });
    loadProjects();
    e.target.reset();
    showToast('Project added!', 'success');
});

// ==================== EXPERIENCE CRUD ====================
async function loadExperience() {
    const res = await fetchWithAuth('/experiences');
    const experiences = await res.json();
    const container = document.getElementById('experienceList');
    if (experiences.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-8">No experience entries. Add your work history above!</div>';
        return;
    }
    container.innerHTML = experiences.map(exp => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4">
            <div class="flex justify-between items-start flex-wrap gap-2">
                <div class="flex-1">
                    <h3 class="text-xl font-bold text-green-400">${escapeHtml(exp.role)} @ ${escapeHtml(exp.company)}</h3>
                    <p class="text-gray-400 text-sm">${exp.startDate} - ${exp.isCurrent ? 'Present' : (exp.endDate || 'N/A')}</p>
                    <ul class="list-disc list-inside mt-2 text-sm text-gray-300">
                        ${exp.responsibilities ? exp.responsibilities.map(r => `<li>${escapeHtml(r)}</li>`).join('') : '<li>No responsibilities listed</li>'}
                    </ul>
                </div>
                <div class="flex gap-2">
                    <button onclick="editExperience('${exp._id}')" class="text-blue-400 hover:text-blue-300">✏️ Edit</button>
                    <button onclick="deleteExperience('${exp._id}')" class="text-red-400 hover:text-red-300">🗑️ Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

window.editExperience = async (id) => {
    const res = await fetchWithAuth(`/experiences/${id}`);
    const exp = await res.json();
    const newRole = prompt('New role:', exp.role);
    if (newRole) {
        const newCompany = prompt('New company:', exp.company);
        await fetchWithAuth(`/experiences/${id}`, { 
            method: 'PUT', 
            body: JSON.stringify({ ...exp, role: newRole, company: newCompany }) 
        });
        loadExperience();
        showToast('Experience updated!', 'success');
    }
};

window.deleteExperience = async (id) => {
    if (confirm('⚠️ Delete this experience entry?')) {
        await fetchWithAuth(`/experiences/${id}`, { method: 'DELETE' });
        loadExperience();
        showToast('Experience deleted!', 'success');
    }
};

document.getElementById('experienceForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const responsibilities = document.getElementById('expResponsibilities').value.split('\n').filter(r => r.trim());
    const data = {
        company: document.getElementById('expCompany').value,
        role: document.getElementById('expRole').value,
        startDate: document.getElementById('expStartDate').value,
        endDate: document.getElementById('expEndDate').value || undefined,
        isCurrent: document.getElementById('expCurrent').checked,
        responsibilities
    };
    await fetchWithAuth('/experiences', { method: 'POST', body: JSON.stringify(data) });
    loadExperience();
    e.target.reset();
    showToast('Experience added!', 'success');
});

// ==================== REPORTS CRUD ====================
async function loadReports() {
    const res = await fetchWithAuth('/reports');
    const reports = await res.json();
    const container = document.getElementById('reportsList');
    if (reports.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-8">No reports/certificates added yet.</div>';
        return;
    }
    container.innerHTML = reports.map(r => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 flex justify-between items-center">
            <div>
                <span class="font-bold text-green-400">${escapeHtml(r.title)}</span>
                ${r.description ? `<br><span class="text-sm text-gray-400">${escapeHtml(r.description)}</span>` : ''}
                ${r.pdfUrl && r.pdfUrl !== '#' ? `<br><a href="${r.pdfUrl}" target="_blank" class="text-xs text-green-400">📄 View Certificate</a>` : ''}
            </div>
            <div class="flex gap-2">
                <button onclick="editReport('${r._id}')" class="text-blue-400 hover:text-blue-300">✏️ Edit</button>
                <button onclick="deleteReport('${r._id}')" class="text-red-400 hover:text-red-300">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

window.editReport = async (id) => {
    const res = await fetchWithAuth(`/reports/${id}`);
    const report = await res.json();
    const newTitle = prompt('New title:', report.title);
    if (newTitle) {
        await fetchWithAuth(`/reports/${id}`, { 
            method: 'PUT', 
            body: JSON.stringify({ ...report, title: newTitle }) 
        });
        loadReports();
        showToast('Report updated!', 'success');
    }
};

window.deleteReport = async (id) => {
    if (confirm('⚠️ Delete this report?')) {
        await fetchWithAuth(`/reports/${id}`, { method: 'DELETE' });
        loadReports();
        showToast('Report deleted!', 'success');
    }
};

document.getElementById('reportForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { 
        title: document.getElementById('reportTitle').value, 
        description: document.getElementById('reportDesc').value, 
        pdfUrl: document.getElementById('reportUrl').value 
    };
    await fetchWithAuth('/reports', { method: 'POST', body: JSON.stringify(data) });
    loadReports();
    e.target.reset();
    showToast('Report added!', 'success');
});

// ==================== CERTIFICATIONS CRUD ====================
async function loadCertifications() {
    const res = await fetchWithAuth('/certifications');
    const certs = await res.json();
    const container = document.getElementById('certificationsList');
    if (certs.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-8">No certifications added yet.</div>';
        return;
    }
    container.innerHTML = certs.map(c => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 flex justify-between items-center">
            <div>
                <span class="font-bold text-green-400">${escapeHtml(c.title)}</span>
                <span class="ml-2 text-sm text-gray-400">– ${escapeHtml(c.issuer)} (${c.date})</span>
                ${c.credentialId ? `<br><span class="text-xs text-gray-500">ID: ${escapeHtml(c.credentialId)}</span>` : ''}
                ${c.verifyUrl && c.verifyUrl !== '#' ? `<br><a href="${c.verifyUrl}" target="_blank" class="text-xs text-green-400">🔗 Verify</a>` : ''}
            </div>
            <div class="flex gap-2">
                <button onclick="editCert('${c._id}')" class="text-blue-400 hover:text-blue-300">✏️ Edit</button>
                <button onclick="deleteCert('${c._id}')" class="text-red-400 hover:text-red-300">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

window.editCert = async (id) => {
    const res = await fetchWithAuth(`/certifications/${id}`);
    const cert = await res.json();
    const newTitle = prompt('New title:', cert.title);
    if (newTitle) {
        await fetchWithAuth(`/certifications/${id}`, { 
            method: 'PUT', 
            body: JSON.stringify({ ...cert, title: newTitle }) 
        });
        loadCertifications();
        showToast('Certification updated!', 'success');
    }
};

window.deleteCert = async (id) => {
    if (confirm('⚠️ Delete this certification?')) {
        await fetchWithAuth(`/certifications/${id}`, { method: 'DELETE' });
        loadCertifications();
        showToast('Certification deleted!', 'success');
    }
};

document.getElementById('certForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        title: document.getElementById('certTitle').value,
        issuer: document.getElementById('certIssuer').value,
        date: document.getElementById('certDate').value,
        credentialId: document.getElementById('certId').value,
        verifyUrl: document.getElementById('certUrl').value
    };
    await fetchWithAuth('/certifications', { method: 'POST', body: JSON.stringify(data) });
    loadCertifications();
    e.target.reset();
    showToast('Certification added!', 'success');
});

// ==================== REPOSITORIES CRUD ====================
async function loadRepositories() {
    const res = await fetchWithAuth('/repositories');
    const repos = await res.json();
    const container = document.getElementById('repositoriesList');
    if (repos.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-8">No repositories added yet.</div>';
        return;
    }
    container.innerHTML = repos.map(r => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 flex justify-between items-center">
            <div>
                <span class="font-bold text-green-400">${escapeHtml(r.name)}</span>
                <span class="ml-2 text-xs text-gray-500">${r.language || 'N/A'}</span>
                ${r.description ? `<br><span class="text-sm text-gray-400">${escapeHtml(r.description)}</span>` : ''}
                <div class="flex gap-3 mt-1 text-xs text-gray-500">
                    <span>⭐ ${r.stars || 0}</span>
                    <span>🍴 ${r.forks || 0}</span>
                    <span>📅 ${r.updated || 'N/A'}</span>
                </div>
            </div>
            <div class="flex gap-2">
                <button onclick="editRepo('${r._id}')" class="text-blue-400 hover:text-blue-300">✏️ Edit</button>
                <button onclick="deleteRepo('${r._id}')" class="text-red-400 hover:text-red-300">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

window.editRepo = async (id) => {
    const res = await fetchWithAuth(`/repositories/${id}`);
    const repo = await res.json();
    const newName = prompt('New repository name:', repo.name);
    if (newName) {
        await fetchWithAuth(`/repositories/${id}`, { 
            method: 'PUT', 
            body: JSON.stringify({ ...repo, name: newName }) 
        });
        loadRepositories();
        showToast('Repository updated!', 'success');
    }
};

window.deleteRepo = async (id) => {
    if (confirm('⚠️ Delete this repository?')) {
        await fetchWithAuth(`/repositories/${id}`, { method: 'DELETE' });
        loadRepositories();
        showToast('Repository deleted!', 'success');
    }
};

document.getElementById('repoForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('repoName').value,
        description: document.getElementById('repoDesc').value,
        language: document.getElementById('repoLang').value,
        stars: parseInt(document.getElementById('repoStars').value) || 0,
        forks: parseInt(document.getElementById('repoForks').value) || 0,
        updated: document.getElementById('repoUpdated').value,
        url: document.getElementById('repoUrl').value
    };
    await fetchWithAuth('/repositories', { method: 'POST', body: JSON.stringify(data) });
    loadRepositories();
    e.target.reset();
    showToast('Repository added!', 'success');
});

// ==================== CONTACTS CRUD ====================
async function loadContacts() {
    const res = await fetchWithAuth('/contact');
    const contacts = await res.json();
    const container = document.getElementById('contactsList');
    if (contacts.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-8">No contact messages yet.</div>';
        return;
    }
    container.innerHTML = contacts.map(c => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <p class="font-bold text-green-400">${escapeHtml(c.name)}</p>
                    <p class="text-sm text-gray-400">📧 ${escapeHtml(c.email)}</p>
                    <p class="text-sm text-gray-300 mt-2">${escapeHtml(c.message)}</p>
                    <p class="text-xs text-gray-500 mt-2">📅 ${new Date(c.createdAt).toLocaleString()}</p>
                </div>
                <button onclick="deleteContact('${c._id}')" class="text-red-400 hover:text-red-300">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

window.deleteContact = async (id) => {
    if (confirm('⚠️ Delete this contact message?')) {
        await fetchWithAuth(`/contact/${id}`, { method: 'DELETE' });
        loadContacts();
        showToast('Contact deleted!', 'success');
    }
};

// ==================== HELPER FUNCTION ====================
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ==================== LOGOUT ====================
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminToken');
        window.location.href = 'admin-login.html';
    }
});

// ==================== INITIAL LOAD ====================
// Show profile section by default
showSection('profile');