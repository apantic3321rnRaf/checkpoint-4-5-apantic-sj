window.addEventListener('load', () => {
    document.getElementById('logout').addEventListener('click', (evt) => {
        evt.preventDefault();
        
        document.cookie = `token=;SameSite=None;Secure;path=/admin;domain=localhost`;
        document.cookie = `token=;SameSite=None;Secure;path=/admin;domain=127.0.0.1:8000`;
        window.location.href = 'login.html';
    });
});
