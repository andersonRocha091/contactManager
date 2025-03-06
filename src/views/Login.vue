<template>
    <div class="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
        <div class="card login-card shadow-lg">
            <div class="card-body p-5">
                 <div class="text-center mb-4">
                    <h2>{{isRegisterMode ? 'Create Account' : 'Login'}}</h2>
                 </div>
                 <form @submit.prevent="isRegisterMode ? handleRegister(): handleLogin()" class="needs-validation" novalidate>
                         <div v-if="isRegisterMode" class="form-floating mb-3">
                            <input type="text" 
                              id="nameInput"
                              class="form-control"
                              placeholder="Name"
                              v-model="name"
                              :class="{'is-invalid': nameError}"
                              required
                              @focus="nameError=''"
                              >
                              <label for="nameInput">Name</label>
                            <div class="invalid-feedback">{{nameError || 'Please enter a valid name.'}}</div>
                         </div>   
                        <div class="form-floating mb-3">
                            <input type="email" 
                                class="form-control"
                                id="emailInput" 
                                placeholder="nome@example.com"
                                v-model="email"
                                :class="{'is-invalid': emailError}"
                                required
                                @focus="emailError = ''">
                            <label for="emailInput">Email address</label>
                            <div class="invalid-feedback">{{emailError || 'Please enter a valid email.'}}</div>
                        </div>
                        <div class="form-floating mb-4">
                            <div class="password-input-wrapper">
                                
                            </div>
                            <input 
                                :type="showPassword ? 'text' : 'password'"
                                class="form-control"
                                id="passwordInput"
                                placeholder="Password"
                                v-model="password"
                                :class="{'is-invalid': passwordError}"
                                required
                                @focus="passwordError=''">
                                <label for="passwordInput">Password</label>
                                <div class="invalid-feedback">{{passwordError || 'Please enter your password.'}}</div>
                                <button 
                                    type="button"
                                    class="btn btn-link password-toggle-btn"
                                    @click="showPassword = !showPassword">
                                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                </button>
                        </div>
                        <div class="form-floating mb-4"v-if="isRegisterMode">
                            <input
                                :type="showConfirmPassword ? 'text': 'password'"
                                class="form-control"
                                id="confirmPasswordInput"
                                placeholder="Confirm Password"
                                v-model="confirmPassword"
                                :class="{'is-invalid': confirmPasswordError}"
                                required
                                @focus="confirmPasswordError=''"
                            />
                            <label for="confirmPasswordInput">Confirm Password</label>
                            <div class="invalid-feedback">{{confirmPasswordError || 'Please confirm your password.'}}</div>
                            <button 
                                    type="button"
                                    class="btn btn-link password-toggle-btn"
                                    @click="showConfirmPassword = !showConfirmPassword">
                                    <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                            </button>
                        </div>
                        <div class="d-grid">
                            <button 
                                type="submit"
                                class="btn btn-primary btn-lg py-3"
                                :disable="isLoading">
                                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                {{ isLoading ? (isRegisterMode ? 'Creating account...' : 'Signing in...') : 
                                              (isRegisterMode ? 'Create Account' : 'Sign in') }}
                            </button>
                            <!-- <span class="text-danger" v-if="invalidCredentials">{{invalidCredentials ?'Invalid credentials.' : 'Login Error'}}</span> -->
                            <div class="text-center mt-2">
                                <span class="text-danger" v-if="errorMessage">{{ errorMessage }}</span>
                                <span class="text-success" v-if="successMessage">{{ successMessage }}</span>
                            </div>
                        </div>
                    </form>
                    <div class="text-center mt-4">
                        <p class="text-muted" v-if="!isRegisterMode">
                            Don't have an account? 
                            <a href="#" class="text-decoration-none" @click.prevent="toggleMode">Create account</a>
                        </p>
                        <p class="text-muted" v-else>
                            Already have an account? 
                            <a href="#" class="text-decoration-none" @click.prevent="toggleMode">Sign in</a>
                        </p>
                    </div>   
            </div>
        </div>
    </div>
</template>
<script setup>

import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const invalidCredentials = ref(false);
const email = ref('');
const name = ref('');
const nameError = ref('');
const password = ref('');
const confirmPassword = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isRegisterMode = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

const validateEmail = (email) => {
    if (!email) {
        return 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
};

const validateName = (name) =>{
    if (!name || name.length === 0) {
        return 'Name is obligatory for creating account.'
    }
    return '';
}

const validateConfirmPassword = (password, confirmPassword) => {

    if (!confirmPassword) {
        return 'Please confirm your password.';
    } else if (password !== confirmPassword) {
        return 'Passwords do not match.'
    }

    return '';
}

const validatePassword = (password) => {
    if (!password) {
        return 'Password is required';
    } else if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }
    return '';
};

const handleLogin = async () => {
    
    errorMessage.value = '';
    successMessage.value= '';

    emailError.value = validateEmail(email.value);
    passwordError.value = validatePassword(password.value);

    if (emailError.value || passwordError.value) {
        return;
    }
    isLoading.value = true;
    const result = await authStore.signIn(email.value, password.value);

    if (!result.success) {
        errorMessage.value = result.error || 'Invalid Credentials';
        alert('login error');
    } else {
        alert('Login Succeed');
    }
    isLoading.value = false;
}

const handleRegister = async () => {
    
    errorMessage.value = '';
    successMessage.value = '';
    nameError.value = validateName(name.value);
    emailError.value = validateEmail(email.value);
    passwordError.value = validatePassword(password.value);
    confirmPasswordError.value = validateConfirmPassword(password.value, confirmPassword.value);
    
    if (emailError.value || passwordError.value || confirmPasswordError.value || nameError.value) {
        return;
    }
    isLoading.value = true;
    const result = await authStore.signUp(name.value, email.value, password.value, confirmPassword.value);
    if (result.success) {
        successMessage.value = 'Account created succesfully'
        setTimeout(() => {
            toggleMode();
        }, 2000);
    } else {
        errorMessage.value = result?.error || 'Registration failed.';
    }
    isLoading.value = false;
}

const toggleMode = () => {
    isRegisterMode.value = !isRegisterMode.value;
    email.value = '';
    password.value = '';
    if(name) name.value = '';
    if (confirmPassword) confirmPassword.value = '';
    errorMessage.value = '';
    successMessage.value = '';
    emailError.value = '';
    passwordError.value = '';
    if(nameError) nameError.value = '';
    if (confirmPasswordError) confirmPasswordError.value = '';
    isLoading.value = false;
}

</script>
<style scoped>
    .login-card {
        width: 100%;
        max-width: 450px;
        border-radius: 15px;
        border: none;
    }
    .password-toggle-btn {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        background: transparent;
        padding: 0 8px;
        color: #6c757d;
        border: none;
        font-size: 1.2rem;
    }
    .form-floating {
        position: relative;
    }
    .form-floating>.form-control:focus~label,
    .form-floating>.form-control:not(:placeholder-show)~label {
        color:#0d6efd;
        opacity: 0.8;
    }
    .form-control {
        border-color: #86b7fe;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
    i {
        font-size: 1.2rem;
    }

    @media (max-width: 576px) {
        .login-card {
            margin: 0 20px;
        }
    }
</style>