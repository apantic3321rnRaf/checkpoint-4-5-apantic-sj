window.addEventListener('load', () => {
    document.getElementById('login').addEventListener('click', (evt) => {
        evt.preventDefault();


        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };


        fetch('http://127.0.0.1:9001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( data => {
                if (data.msg) {
                    alert(data.msg);
                } else {
                    document.cookie = `token=;SameSite=None;Secure;path=/admin;domain=localhost`;
                    document.cookie = `token=;SameSite=None;Secure;path=/admin;domain=127.0.0.1:8000`;
                    document.cookie = `token=${data.token};SameSite=None;Secure;path=/admin;domain=localhost`;
                    document.cookie = `token=${data.token};SameSite=None;Secure;path=/admin;domain=127.0.0.1:8000`;
                    console.log('Cookie je: ' + document.cookie);
                    const cookieParts = document.cookie.split(' ');
                    console.log('cookieParts[0]: ' + cookieParts[0]);
                    console.log('cookieParts[1]: ' + cookieParts[1]);
                    if (cookieParts[1]==1) 
                        window.location.href = 'index.html';
                    else {
                        alert("Molimo ukucajte kredencijale za administratorski nalog");
                        document.cookie = `token=;SameSite=None;Secure;path=/admin;domain=localhost`;
                        document.cookie = `token=;SameSite=None;Secure;path=/admin;domain=127.0.0.1:8000`;
                        window.location.href = '/admin/login';
                    }
                        
                }
            });
    });
});
