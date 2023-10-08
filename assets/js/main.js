function showWebsites() {
    document.querySelector('#usersTable').style.display = 'none';
    document.querySelector('#websitesTable').style.display = 'block';
    document.querySelector('#sectionForm').style.display = 'none';
}
function showAddUrlForm() {
    document.querySelector('#usersTable').style.display = 'none';
    document.querySelector('#websitesTable').style.display = 'none';
    document.querySelector('#sectionForm').style.display = 'block';
}
function showUsers() {
    document.querySelector('#usersTable').style.display = 'block';
    document.querySelector('#websitesTable').style.display = 'none';
    document.querySelector('#sectionForm').style.display = 'none';
}

function toggleForm(formId) {
    const addUrlForm = document.getElementById('addUrlForm');
    const addUserForm = document.getElementById('addUserForm');

    if (formId === 'addUrlForm') {
        addUrlForm.style.display = 'flex';
        addUserForm.style.display = 'none';
    } else if (formId === 'addUserForm') {
        addUserForm.style.display = 'flex';
        addUrlForm.style.display = 'none';
    }
}
