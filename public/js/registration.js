const registrationForm = document.getElementById('regForm');

if (registrationForm) {
  registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      login, email, password, repeatPassword, action,
    } = event.target;

    if (password.value !== repeatPassword.value) {
      alert('Пароли должны совпадать');
      return;
    }
    if (!email.value || !login.value || !password.value) {
      alert('Поля не должны быть пустыми');
    }

    const response = await fetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: login.value,
        email: email.value,
        password: password.value,
      }),
    });
    const result = await response.json();
    if (result.thisUser) {
      alert(result.message);
      window.location.href = '/login';
    } else {
      alert(result.message);
    }
  });
}
