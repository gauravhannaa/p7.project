const API_URL = 'http://localhost:5000/api';
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

function showSection(section) {
    document.querySelectorAll('.section').forEach(el => el.classList.add('hidden'));
    document.getElementById(`${section}Section`).classList.remove('hidden');
    loadSectionData(section);
}

async function loadSectionData(section) {
    if (section === 'projects') await loadProjects();
    else if (section === 'experience') await loadExperience();
    else if (section === 'skills') await loadSkills();
    else if (section === 'reports') await loadReports();
}

async function loadProjects() {
    const res = await fetchWithAuth('/projects');
    const projects = await res.json();
    const container = document.getElementById('projectsList');
    container.innerHTML = projects.map(project => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4">
            <h3 class="text-xl font-bold">${project.title}</h3>
            <p class="text-gray-400">${project.description}</p>
            <div class="flex gap-2 mt-2">
                <button onclick="editProject('${project._id}')" class="text-blue-500">Edit</button>
                <button onclick="deleteProject('${project._id}')" class="text-red-500">Delete</button>
            </div>
        </div>
    `).join('');
}

async function loadExperience() {
    const res = await fetchWithAuth('/experiences');
    const experiences = await res.json();
    const container = document.getElementById('experienceList');
    container.innerHTML = experiences.map(exp => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4">
            <h3 class="text-xl font-bold">${exp.role} @ ${exp.company}</h3>
            <p class="text-gray-400">${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate}</p>
            <div class="flex gap-2 mt-2">
                <button onclick="editExperience('${exp._id}')" class="text-blue-500">Edit</button>
                <button onclick="deleteExperience('${exp._id}')" class="text-red-500">Delete</button>
            </div>
        </div>
    `).join('');
}

async function loadSkills() {
    const res = await fetchWithAuth('/skills');
    const skills = await res.json();
    const container = document.getElementById('skillsList');
    container.innerHTML = skills.map(skill => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4">
            <h3 class="text-xl font-bold">${skill.name} - ${skill.percentage}%</h3>
            <div class="flex gap-2 mt-2">
                <button onclick="editSkill('${skill._id}')" class="text-blue-500">Edit</button>
                <button onclick="deleteSkill('${skill._id}')" class="text-red-500">Delete</button>
            </div>
        </div>
    `).join('');
}

async function loadReports() {
    const res = await fetchWithAuth('/reports');
    const reports = await res.json();
    const container = document.getElementById('reportsList');
    container.innerHTML = reports.map(report => `
        <div class="bg-gray-900/50 border border-green-500/30 rounded-lg p-4">
            <h3 class="text-xl font-bold">${report.title}</h3>
            <p class="text-gray-400">${report.description}</p>
            <div class="flex gap-2 mt-2">
                <button onclick="editReport('${report._id}')" class="text-blue-500">Edit</button>
                <button onclick="deleteReport('${report._id}')" class="text-red-500">Delete</button>
            </div>
        </div>
    `).join('');
}

document.getElementById('projectForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDesc').value,
        imageUrl: document.getElementById('projectImage').value,
        demoLink: document.getElementById('projectDemo').value,
        githubLink: document.getElementById('projectGithub').value
    };
    await fetchWithAuth('/projects', { method: 'POST', body: JSON.stringify(data) });
    loadProjects();
    e.target.reset();
});

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

document.getElementById('skillForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('skillName').value,
        percentage: parseInt(document.getElementById('skillPercent').value)
    };
    await fetchWithAuth('/skills', { method: 'POST', body: JSON.stringify(data) });
    loadSkills();
    e.target.reset();
});

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
});

window.deleteProject = async (id) => {
    if (confirm('Delete this project?')) {
        await fetchWithAuth(`/projects/${id}`, { method: 'DELETE' });
        loadProjects();
    }
};

window.deleteExperience = async (id) => {
    if (confirm('Delete this experience?')) {
        await fetchWithAuth(`/experiences/${id}`, { method: 'DELETE' });
        loadExperience();
    }
};

window.deleteSkill = async (id) => {
    if (confirm('Delete this skill?')) {
        await fetchWithAuth(`/skills/${id}`, { method: 'DELETE' });
        loadSkills();
    }
};

window.deleteReport = async (id) => {
    if (confirm('Delete this report?')) {
        await fetchWithAuth(`/reports/${id}`, { method: 'DELETE' });
        loadReports();
    }
};

document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    window.location.href = 'index.html';
});

showSection('projects');