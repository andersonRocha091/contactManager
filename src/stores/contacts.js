import { defineStore } from 'pinia';
import axios from 'axios';

export const useContactStore = defineStore('contacts', {
    state: () => ({
        contacts: [],
        loading: false,
        error: null,
        searchQuery: '',
    }),

    getters: {
        filteredContacts: (state) => {
            if (!state.searchQuery) return state.contacts;

            const query = state.searchQuery.toLowerCase();
            return state.contacts.filter(contact => 
                contact.name.toLowerCase().includes(query) || 
                contact.email.toLowerCase().includes(query) || 
                contact.phone.toLowerCase().includes(query)
            )
        },
        sortedContacts: (state) => (field, direction) => {
            return [...state.filteredContacts].sort((a, b) => {
                let valueA = a[field] || '';
                let valueB = b[field] || '';

                if (typeof valueA === 'string') {
                    valueA = valueA.toLowerCase();
                    valueB = valueB.toLowerCase();
                }
                if (valueA < valueB) return direction === 'asc' ? -1 : 1;
                if (valueA > valueB) return direction === 'asc' ? 1 : -1;
                return 0;
            })
        },
        // os relatorios contando por cidade, ou por estado
        // estao sendo feitos aqui, mas nao é uma boa pratica,
        // o ideal era utilizar o proprio backend para ja retornar esses dados prontos
        // para consumo. Fica esse ponto como melhoria futura
        groupedByField: (state) => (fieldName) => {
            
            const counts = state.contacts.reduce((acc, contact) => {
                
                let fieldValue = contact[fieldName]?.trim() || 'N/A';
                if (fieldValue !== 'N/A') {
                    fieldValue = fieldValue.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
                }

                acc[fieldValue] = (acc[fieldValue] || 0) + 1;
                return acc;
            }, {});

                const sortedEntries = Object.entries(counts)
                    .sort(([, countA], [, countB]) => countB - countA);
                const labels = sortedEntries.map(([label]) => label);
                const data = sortedEntries.map(([, count]) => count);

                return { labels, data };
        },
        isLoading(state) {
            return state.loading;
        }
    },
    actions: {
        async fetchContacts() {
            
            this.loading = true;
            this.error = null;

            try {
                
                if (localStorage.getItem('token')) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                }
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/client`,{headers:{
                    Accept: 'application/json',
                    "Content-Type":'application/json',
                     "ngrok-skip-browser-warning": 69420
                }});
                this.contacts = response.data.data.data;
                return {success: true};
            } catch (error) {
                console.error('Error fetching contacts:', error);
                this.error = error?.response?.data?.error || 'Failed to load contacts';
                return {
                    success: false,
                    error: this.error
                }
            } finally {
                this.loading = false
            }
        },
        
        async addContact(contact) {
            
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/client`,
                    {
                        name: contact.name,
                        email:contact.email,
                        phone: contact.phone,
                        mobile: contact.mobile,
                        district: contact.district,
                        address: contact.address,
                        city: contact.city,
                        state: contact.state,
                        zip: contact.zip,
                        picture: contact.picture ?? '',
                        age: contact.age
                    }
                );

                this.contacts.push(response.data.client);
                return { success: true, data: response.data };
            } catch (error) {
                console.error('Error adding contact:', error);
                this.error = error?.response?.data?.error || 'Failed to add contact';
                return { 
                    success: false, 
                    error: this.error 
                };
            } finally {
                this.loading = false;
            }
        },

        async updateContact(contact, id) {
            
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/client/${id}`,
                    {
                        name: contact.name,
                        email:contact.email,
                        phone: contact.phone,
                        mobile: contact.mobile,
                        district: contact.district,
                        address: contact.address,
                        city: contact.city,
                        state: contact.state??'',
                        zip: contact.zip,
                        picture: contact.picture ?? '',
                        age: contact.age
                    }
                );
                const index = this.contacts.findIndex(contact => contact.id === id);
                if (index !== -1) {
                    this.contacts[index] = response.data.data;
                }
                return { success: true, data: response.data.data};
            } catch (error) {
                console.error('Error updating contact:', error);
                this.error = error?.response?.data?.error || 'Failed to update contact';
                return { 
                    success: false, 
                    error: this.error 
                };
            } finally {
                this.loading = false;
            }
        },

        async deleteContact(id) {

            this.loading = true;
            this.error = null;

            try {
                await axios.delete(`${import.meta.env.VITE_BASE_URL}/client/${id}`);
                this.contacts = this.contacts.filter(contact => contact.id !== id);
                return { succes: true };
            } catch (error) {
                console.error('Error deleting contact:', error);
                this.error = error?.response?.data?.error || 'Failed to delete contact';
                return { 
                    success: false, 
                    error: this.error 
                };
            } finally {
                this.loading = false;
            }
        },
        setSearchQuery(query) {
            this.searchQuery = query;
        }
    }
});