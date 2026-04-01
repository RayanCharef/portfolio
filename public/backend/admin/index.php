<?php
session_start();

// Block access to CMS if not logged in and trying to access directly
if (isset($_GET['check']) && !isset($_SESSION['admin'])) {
    http_response_code(401);
    exit;
}

// Regenerate session ID to prevent session fixation attacks
if (isset($_SESSION['admin'])) {
    session_regenerate_id(true);
}

$isLoggedIn = isset($_SESSION['admin']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin CMS</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, sans-serif; background: #0a0a0a; color: #e8e8e8; min-height: 100vh; }
        
        /* LOGIN */
        .login-container { max-width: 400px; margin: 10rem auto; padding: 2rem; background: #111; border: 1px solid #222; border-radius: 8px; }
        .login-container h1 { margin-bottom: 1.5rem; font-size: 1.5rem; }
        .login-container input { width: 100%; padding: 0.7rem 1rem; margin-bottom: 1rem; background: #0a0a0a; border: 1px solid #333; color: #e8e8e8; border-radius: 4px; font-size: 1rem; }
        .login-container button { width: 100%; padding: 0.7rem; background: white; color: black; border: none; border-radius: 4px; font-size: 1rem; font-weight: bold; cursor: pointer; }
        .login-container button:hover { background: #e0e0e0; }
        .error { color: #e74c3c; margin-bottom: 1rem; font-size: 0.9rem; }

        /* CMS */
        .cms-container { max-width: 800px; margin: 0 auto; padding: 2rem; }
        .cms-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #222; }
        .cms-header h1 { font-size: 1.5rem; }
        .logout-btn { padding: 0.5rem 1rem; background: transparent; border: 1px solid #333; color: #aaa; border-radius: 4px; cursor: pointer; }
        .logout-btn:hover { border-color: white; color: white; }

        /* FORM */
        .add-form { background: #111; border: 1px solid #222; border-radius: 8px; padding: 1.5rem; margin-bottom: 2rem; }
        .add-form h2 { margin-bottom: 1rem; font-size: 1.1rem; }
        .add-form input, .add-form textarea { width: 100%; padding: 0.7rem 1rem; margin-bottom: 1rem; background: #0a0a0a; border: 1px solid #333; color: #e8e8e8; border-radius: 4px; font-size: 0.95rem; }
        .add-form textarea { resize: vertical; min-height: 100px; }
        .add-form button { padding: 0.7rem 2rem; background: white; color: black; border: none; border-radius: 4px; font-size: 0.95rem; font-weight: bold; cursor: pointer; }
        .add-form button:hover { background: #e0e0e0; }
        .success { color: #2ecc71; margin-bottom: 1rem; font-size: 0.9rem; }

        /* PROJECTS LIST */
        .project-item { background: #111; border: 1px solid #222; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: start; }
        .project-item h3 { margin-bottom: 0.3rem; }
        .project-item p { color: #aaa; font-size: 0.9rem; }
        .project-tags { display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap; }
        .tag { background: #1a1a1a; border: 1px solid #333; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; color: #aaa; }
        .delete-btn { padding: 0.4rem 0.8rem; background: transparent; border: 1px solid #e74c3c; color: #e74c3c; border-radius: 4px; cursor: pointer; font-size: 0.85rem; white-space: nowrap; }
        .delete-btn:hover { background: #e74c3c; color: white; }
        .no-projects { color: #555; text-align: center; padding: 2rem; }
    </style>
</head>
<body>

<!-- LOGIN SCREEN -->
<div id="loginScreen" style="display: <?= $isLoggedIn ? 'none' : 'block' ?>">
    <div class="login-container">
        <h1>Admin Login</h1>
        <div id="loginError" class="error" style="display:none"></div>
        <input type="text" id="username" placeholder="Username" />
        <input type="password" id="password" placeholder="Password" />
        <button onclick="login()">Login</button>
    </div>
</div>

<!-- CMS SCREEN -->
<div id="cmsScreen" style="display: <?= $isLoggedIn ? 'block' : 'none' ?>">
    <div class="cms-container">
        <div class="cms-header">
            <h1>Projects CMS</h1>
            <button class="logout-btn" onclick="logout()">Logout</button>
        </div>

        <!-- ADD PROJECT FORM -->
        <div class="add-form">
            <h2>Add New Project</h2>
            <div id="formSuccess" class="success" style="display:none">Project added!</div>
            <input type="text" id="title" placeholder="Project title" />
            <input type="text" id="tags" placeholder="Tags (comma separated e.g. PHP, TypeScript)" />
            <textarea id="description" placeholder="Project description"></textarea>
            <textarea id="code" placeholder="Code snippet (optional)"></textarea>
            <button onclick="addProject()">Add Project</button>
        </div>

        <!-- PROJECTS LIST -->
        <h2 style="margin-bottom: 1rem;">Your Projects</h2>
        <div id="projectsList"></div>
    </div>
</div>

<script>
    // Load projects on page load if logged in
    <?php if ($isLoggedIn): ?>
    loadProjects()
    <?php endif; ?>

    async function login() {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const error = document.getElementById('loginError')

        const res = await fetch('../api/auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

        const data = await res.json()

        if (data.success) {
            document.getElementById('loginScreen').style.display = 'none'
            document.getElementById('cmsScreen').style.display = 'block'
            loadProjects()
        } else {
            error.style.display = 'block'
            error.textContent = data.error || 'Login failed'
        }
    }

    async function logout() {
        await fetch('../api/auth.php', { method: 'DELETE' })
        document.getElementById('cmsScreen').style.display = 'none'
        document.getElementById('loginScreen').style.display = 'block'
    }

    async function loadProjects() {
        const res = await fetch('../api/projects.php')
        const projects = await res.json()
        const list = document.getElementById('projectsList')

        if (!projects.length) {
            list.innerHTML = '<p class="no-projects">No projects yet. Add one above!</p>'
            return
        }

        list.innerHTML = projects.map(p => `
            <div class="project-item">
                <div>
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    <div class="project-tags">
                        ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                </div>
                <button class="delete-btn" onclick="deleteProject(${p.id})">Delete</button>
            </div>
        `).join('')
    }

    async function addProject() {
        const title = document.getElementById('title').value
        const description = document.getElementById('description').value
        const tags = document.getElementById('tags').value.split(',').map(t => t.trim()).filter(Boolean)
        const code = document.getElementById('code').value
        const success = document.getElementById('formSuccess')

        if (!title || !description) {
            alert('Title and description are required!')
            return
        }

        const res = await fetch('../api/projects.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, tags, code })
        })

        const data = await res.json()

        if (data.success) {
            success.style.display = 'block'
            setTimeout(() => success.style.display = 'none', 3000)
            document.getElementById('title').value = ''
            document.getElementById('tags').value = ''
            document.getElementById('description').value = ''
            document.getElementById('code').value = ''
            loadProjects()
        }
    }

    async function deleteProject(id) {
        if (!confirm('Delete this project?')) return

        await fetch(`../api/projects.php?id=${id}`, { method: 'DELETE' })
        loadProjects()
    }
</script>

</body>
</html>