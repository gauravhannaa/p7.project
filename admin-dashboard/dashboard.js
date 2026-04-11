const API_URL = 'https://p7-project-1.onrender.com/api';
let token = localStorage.getItem('adminToken');

if (!token) {
    window.location.href = 'index.html';
}

async function fetchWithAuth(url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
    };
    const response = await fetch(`${API_URL}${url}`, { ...options, headers });
    if (response.status === 401) {
        localStorage.removeItem('adminToken');
        window.location.href = 'index.html';
    }
    return response;
}

// ------------------- SECTION LOADING -------------------
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

// ------------------- PROFILE -------------------
let profileData = {};
async function loadProfile() {
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
    if (profile.profileImage) photoDiv.innerHTML = `<img src="${profile.profileImage}" class="w-16 h-16 rounded-full border border-green-500">`;
    else photoDiv.innerHTML = 'No photo uploaded';
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
        msg.textContent = 'Profile updated successfully!';
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 3000);
        loadProfile();
    }
});
document.getElementById('uploadPhotoBtn')?.addEventListener('click', async () => {
    const fileInput = document.getElementById('profilePhoto');
    if (!fileInput.files.length) return alert('Select a file first');
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    const res = await fetch(`${API_URL}/upload/profile-image`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    });
    if (res.ok) {
        alert('Photo uploaded');
        loadProfile();
    } else alert('Upload failed');
});

// ------------------- SKILLS -------------------
async function loadSkills() {
    const res = await fetchWithAuth('/skills');
    const skills = await res.json();
    const container = document.getElementById('skillsList');
    container.innerHTML = skills.map(skill => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 flex justify-between items-center">
            <div><span class="font-bold">${skill.name}</span> - ${skill.percentage}%</div>
            <div class="flex gap-2">
                <button onclick="editSkill('${skill._id}', '${skill.name}', ${skill.percentage})" class="text-blue-500">Edit</button>
                <button onclick="deleteSkill('${skill._id}')" class="text-red-500">Delete</button>
            </div>
        </div>
    `).join('');
}
window.editSkill = (id, name, percent) => {
    const newName = prompt('New skill name', name);
    const newPercent = prompt('New percentage', percent);
    if (newName && newPercent) {
        fetchWithAuth(`/skills/${id}`, { method: 'PUT', body: JSON.stringify({ name: newName, percentage: parseInt(newPercent) }) })
            .then(() => loadSkills());
    }
};
window.deleteSkill = async (id) => {
    if (confirm('Delete this skill?')) {
        await fetchWithAuth(`/skills/${id}`, { method: 'DELETE' });
        loadSkills();
    }
};
document.getElementById('skillForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { name: document.getElementById('skillName').value, percentage: parseInt(document.getElementById('skillPercent').value) };
    await fetchWithAuth('/skills', { method: 'POST', body: JSON.stringify(data) });
    loadSkills();
    e.target.reset();
});

// ------------------- PROJECTS -------------------
async function loadProjects() {
    const res = await fetchWithAuth('/projects');
    const projects = await res.json();
    const container = document.getElementById('projectsList');
    container.innerHTML = projects.map(proj => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4">
            <h3 class="text-xl font-bold">${proj.title}</h3>
            <p class="text-gray-400 text-sm">${proj.description}</p>
            <div class="flex flex-wrap gap-2 mt-2 text-xs">
                ${proj.technologies ? proj.technologies.map(t => `<span class="bg-green-500/20 px-2 py-0.5 rounded">${t}</span>`).join('') : ''}
            </div>
            <div class="flex gap-3 mt-3">
                ${proj.demoLink ? `<a href="${proj.demoLink}" target="_blank" class="text-green-400 text-sm">Demo</a>` : ''}
                ${proj.githubLink ? `<a href="${proj.githubLink}" target="_blank" class="text-green-400 text-sm">GitHub</a>` : ''}
                <span class="text-xs text-gray-500">${proj.status || ''}</span>
            </div>
            <div class="flex gap-2 mt-3">
                <button onclick="editProject('${proj._id}')" class="text-blue-500 text-sm">Edit</button>
                <button onclick="deleteProject('${proj._id}')" class="text-red-500 text-sm">Delete</button>
            </div>
        </div>
    `).join('');
}
window.deleteProject = async (id) => {
    if (confirm('Delete project?')) {
        await fetchWithAuth(`/projects/${id}`, { method: 'DELETE' });
        loadProjects();
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
});

// ------------------- EXPERIENCE -------------------
async function loadExperience() {
    const res = await fetchWithAuth('/experiences');
    const experiences = await res.json();
    const container = document.getElementById('experienceList');
    container.innerHTML = experiences.map(exp => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4">
            <div class="flex justify-between items-start">
                <div><h3 class="text-xl font-bold">${exp.role} @ ${exp.company}</h3>
                <p class="text-gray-400">${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate}</p></div>
                <div class="flex gap-2"><button onclick="editExperience('${exp._id}')" class="text-blue-500">Edit</button>
                <button onclick="deleteExperience('${exp._id}')" class="text-red-500">Delete</button></div>
            </div>
            <ul class="list-disc list-inside mt-2 text-sm text-gray-300">${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
        </div>
    `).join('');
}
window.deleteExperience = async (id) => {
    if (confirm('Delete experience?')) {
        await fetchWithAuth(`/experiences/${id}`, { method: 'DELETE' });
        loadExperience();
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
});

// ------------------- REPORTS -------------------
async function loadReports() {
    const res = await fetchWithAuth('/reports');
    const reports = await res.json();
    const container = document.getElementById('reportsList');
    container.innerHTML = reports.map(r => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 flex justify-between items-center">
            <div><span class="font-bold">${r.title}</span><br><span class="text-sm text-gray-400">${r.description}</span></div>
            <div class="flex gap-2"><button onclick="editReport('${r._id}')" class="text-blue-500">Edit</button><button onclick="deleteReport('${r._id}')" class="text-red-500">Delete</button></div>
        </div>
    `).join('');
}
window.deleteReport = async (id) => {
    if (confirm('Delete report?')) {
        await fetchWithAuth(`/reports/${id}`, { method: 'DELETE' });
        loadReports();
    }
};
document.getElementById('reportForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { title: document.getElementById('reportTitle').value, description: document.getElementById('reportDesc').value, pdfUrl: document.getElementById('reportUrl').value };
    await fetchWithAuth('/reports', { method: 'POST', body: JSON.stringify(data) });
    loadReports();
    e.target.reset();
});

// ------------------- CERTIFICATIONS -------------------
async function loadCertifications() {
    const res = await fetchWithAuth('/certifications');
    const certs = await res.json();
    const container = document.getElementById('certificationsList');
    container.innerHTML = certs.map(c => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 flex justify-between items-center">
            <div><span class="font-bold">${c.title}</span> – ${c.issuer} (${c.date})<br><span class="text-xs text-gray-400">ID: ${c.credentialId || 'N/A'}</span></div>
            <div class="flex gap-2"><button onclick="editCert('${c._id}')" class="text-blue-500">Edit</button><button onclick="deleteCert('${c._id}')" class="text-red-500">Delete</button></div>
        </div>
    `).join('');
}
window.deleteCert = async (id) => {
    if (confirm('Delete certification?')) {
        await fetchWithAuth(`/certifications/${id}`, { method: 'DELETE' });
        loadCertifications();
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
});

// ------------------- REPOSITORIES -------------------
async function loadRepositories() {
    const res = await fetchWithAuth('/repositories');
    const repos = await res.json();
    const container = document.getElementById('repositoriesList');
    container.innerHTML = repos.map(r => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 flex justify-between items-center">
            <div><span class="font-bold">${r.name}</span><br><span class="text-sm text-gray-400">${r.description || ''} | ⭐${r.stars || 0} 🍴${r.forks || 0}</span></div>
            <div class="flex gap-2"><button onclick="editRepo('${r._id}')" class="text-blue-500">Edit</button><button onclick="deleteRepo('${r._id}')" class="text-red-500">Delete</button></div>
        </div>
    `).join('');
}
window.deleteRepo = async (id) => {
    if (confirm('Delete repository?')) {
        await fetchWithAuth(`/repositories/${id}`, { method: 'DELETE' });
        loadRepositories();
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
});

// ------------------- CONTACTS (read only) -------------------
async function loadContacts() {
    const res = await fetchWithAuth('/contact');
    const contacts = await res.json();
    const container = document.getElementById('contactsList');
    container.innerHTML = contacts.map(c => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4">
            <p><strong>${c.name}</strong> (${c.email})</p>
            <p class="text-sm text-gray-400">${c.message}</p>
            <p class="text-xs text-gray-500">${new Date(c.createdAt).toLocaleString()}</p>
            <button onclick="deleteContact('${c._id}')" class="text-red-500 text-sm mt-2">Delete</button>
        </div>
    `).join('');
}
window.deleteContact = async (id) => {
    if (confirm('Delete this contact message?')) {
        await fetchWithAuth(`/contact/${id}`, { method: 'DELETE' });
        loadContacts();
    }
};

// ------------------- LOGOUT -------------------
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    window.location.href = 'index.html';
});

// Show first section by default
showSection('profile');