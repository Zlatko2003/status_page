function showWebsites() {
    document.querySelector('#usersTable').style.display = 'none';
    document.querySelector('#jobsTable').style.display = 'block';
    document.querySelector('#sectionForm').style.display = 'none';
}
function showAddUrlForm() {
    document.querySelector('#usersTable').style.display = 'none';
    document.querySelector('#jobsTable').style.display = 'none';
    document.querySelector('#sectionForm').style.display = 'block';
}
function showUsers() {
    document.querySelector('#usersTable').style.display = 'block';
    document.querySelector('#jobsTable').style.display = 'none';
    document.querySelector('#sectionForm').style.display = 'none';
}

function toggleForm(formId) {
    const addJobForm = document.getElementById('addJobForm');
    const addUserForm = document.getElementById('addUserForm');

    if (formId === 'addJobForm') {
        addJobForm.style.display = 'flex';
        addUserForm.style.display = 'none';
    } else if (formId === 'addUserForm') {
        addUserForm.style.display = 'flex';
        addJobForm.style.display = 'none';
    }
}
