import { defineStore } from 'pinia';
import axios from 'axios'
import router from '../router';


export const useAuthStore = defineStore('auth', {
   state: () => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        return {
            user: storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null,
            token: storedToken && storedToken !== 'undefined' ? storedToken : null,
            loading: false,
            error: null
        }
   },
   getters: {
    isAuthenticated: (state) => {
        return !!state.token
    },
    userEmail: (state) => state.user?.email
   },
   actions: {
    async signIn(email, password) {
        this.loading = true;
        this.error = null;

        try {
            localStorage.removeItem('token');
            const headers = {
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
            };
            console.log();
            const response = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/login`,
              {
                email: email,
                password: password,
              },
              { headers }
            );
            this.setAuthData(response.data);
            router.push('/contacts');
            return {success: true, data: response.data}
        } catch (error) {
            console.error('Login error:', error);
            this.logout();
            this.error = error?.response?.data?.error || 'Login Failed';
            return {
                success: false,
                error: this.error
            }
        } finally {
            this.loading = false;
        }
    },

    async signUp(name, email, password, passwordConfirm) {
        
        this.loading = true;
        this.error = null;

        try {
            localStorage.removeItem('token');
            const headers = {
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
            };
            const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/register`,
            {   name: name,
                email: email,
                password: password
            },
            {headers}
            );
            this.setAuthData(response.data);
            router.push('/contacts');
            return {success: true, data: response.data};
        } catch (error) {
            this.error = error?.response?.data?.error || 'Registration failed';
            return {
                success: false,
                error: this.error
            };
        } finally {
            this.loading = false;
        }
    },
    
    setAuthData(data) {
        this.token = data.access_token;
        localStorage.setItem('token', this.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
    },
    // Aplicar essa rotina também em ocasiao de erro 401 durante requisições pois significa
    // que o token expirou
    logout() {
        this.user = null;
        this.token = null;
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
    }
   } 
})