const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      email, password, action,
    } = event.target;

    if (!email.value || !password.value) {
      alert('Логин и пароль не должен быть пустым');
      return;
    }

    const response = await fetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const res = await response.json();

    if (res.auth) {
      alert(res.message);
      window.location.href = '/';
    } else {
      alert(res.message);
    }
  });
}
