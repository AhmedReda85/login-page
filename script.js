document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const togglePass = document.getElementById('togglePass');
    const eyeShow = document.getElementById('eyeShow');
    const eyeHide = document.getElementById('eyeHide');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const submitBtn = document.getElementById('submitBtn');
    const message = document.getElementById('message');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Toggle password visibility
    togglePass.addEventListener('click', () => {
        if (password.type === 'password') {
            password.type = 'text';
            eyeShow.classList.add('hidden');
            eyeHide.classList.remove('hidden');
        } else {
            password.type = 'password';
            eyeShow.classList.remove('hidden');
            eyeHide.classList.add('hidden');
        }
        password.focus();
    });

    // Validation
    const validateEmail = () => {
        const val = email.value.trim();
        const field = email.closest('.field');

        if (!val) {
            field.classList.add('error');
            emailError.textContent = 'Email is required';
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            field.classList.add('error');
            emailError.textContent = 'Enter a valid email';
            return false;
        }
        field.classList.remove('error');
        emailError.textContent = '';
        return true;
    };

    const validatePassword = () => {
        const val = password.value;
        const field = password.closest('.field');

        if (!val) {
            field.classList.add('error');
            passwordError.textContent = 'Password is required';
            return false;
        }
        if (val.length < 6) {
            field.classList.add('error');
            passwordError.textContent = 'Min 6 characters';
            return false;
        }
        field.classList.remove('error');
        passwordError.textContent = '';
        return true;
    };

    // Clear errors on input
    email.addEventListener('input', () => {
        email.closest('.field').classList.remove('error');
        emailError.textContent = '';
        hideMessage();
    });

    password.addEventListener('input', () => {
        password.closest('.field').classList.remove('error');
        passwordError.textContent = '';
        hideMessage();
    });

    // Show/hide message
    const showMessage = (text, isError) => {
        message.textContent = text;
        message.className = `message ${isError ? 'error-msg' : 'success-msg'}`;
        message.classList.remove('hidden');
    };

    const hideMessage = () => {
        message.classList.add('hidden');
    };

    // Form submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideMessage();

        const emailValid = validateEmail();
        const passValid = validatePassword();

        if (!emailValid || !passValid) return;

        // Loading state
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');

        // Simulate API call
        setTimeout(() => {
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');

            // Demo: error@test.com or password "wrong" fails
            if (email.value.includes('error') || password.value === 'wrong') {
                showMessage('Invalid email or password', true);
            } else {
                showMessage('Login successful!', false);
                form.reset();
            }
        }, 1200);
    });
});
