<template>
  <div class="card shadow-sm">
    <div class="card-body position-relative" style="min-heigh: 200px">
      <div
        v-if="contactStore.loading"
        class="position-absolute top-100 start-50 translate-middle"
        style="z-index: 10"
      >
        <div class="spinner-grow text-primary spinner-grow-custom" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-6">
          <contact-search-bar v-model="searchQuery" />
        </div>
        <div class="col-md-6 text-end">
          <button class="btn btn-primary" @click="openAddContactModal">
            <i class="bi bi-plus-circle me-1"></i>
            Adicionar contato
          </button>
        </div>
      </div>

      <contact-list
        :contacts="filteredContacts"
        @sort="sortBy"
        @edit="editContact"
        @delete="deleteContact"
        @view="viewDetails"
        @call="callContact"
      />

      <add-contact-modal
        ref="contactModal"
        :contact="currentContact"
        @save="saveContact"
      />

      <remove-contact-modal
        ref="removeContactModal"
        :contact="currentContact"
        @delete="removeContact"
      />

      <contact-details-modal
        ref="contactDetailsModal"
        :contact="currentContact"
        @view="viewDetails"
      />
       <call-contact-modal
        ref="callContactModal"
        :contact="currentContact"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useContactStore } from "../../stores/contacts.js";
import { useAuthStore } from "../../stores/auth.js";
import ContactSearchBar from "./ContactSearchBar.vue";
import ContactList from "./ContactList.vue";
import AddContactModal from "./AddContactModal.vue";
import RemoveContactModal from "./removeContactModal.vue";
import LoadSpinner from "../LoadSpinner.vue";
import ContactDetailsModal from './ContactDetailsModal.vue';
// import TwillioCallModal from '../call/TwillioCallModal.vue'

export default {
  name: "ContactsView",
  components: {
    ContactSearchBar,
    ContactList,
    AddContactModal,
    RemoveContactModal,
    LoadSpinner,
    ContactDetailsModal
  },
  setup() {
    const contactStore = useContactStore();
    const { loading, contacts } = storeToRefs(contactStore);
    console.log("LOADING: ", loading);
    return {
      contactStore,
      loading,
      contacts,
    };
  },
  data() {
    return {
      searchQuery: "",
      sortKey: "name",
      sortOrder: "asc",
      currentContact: {
        id: null,
        name: "",
        email: "",
        phone: "",
      },
    };
  },
  computed: {
    filteredContacts() {
      this.contactStore.setSearchQuery(this.searchQuery);
      return this.contactStore.sortedContacts("name", "asc");
    },
  },
  created() {
    this.contactStore.fetchContacts();
  },
  methods: {
    async addContact(contact) {
      const response = await this.contactStore.addContact(contact);
    },
    async updateContact(contact) {
      const response = await this.contactStore.updateContact(contact, contact.id);
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortOrder = "asc";
      }
    },
    openAddContactModal() {
      this.currentContact = {
        id: null,
        name: "",
        email: "",
        phone: "",
      };
      this.$refs.contactModal.show();
    },
    editContact(contact) {
      this.currentContact = { ...contact };
      this.$refs.contactModal.show();
    },
    async deleteContact(contact) {
      this.currentContact = { ...contact };
      this.$refs.removeContactModal.show();
    },
    removeContact(contact) {
      if (contact.id) {
        try {
          const response = this.contactStore.deleteContact(contact.id);
        } catch (error) {
          console.log(error.message);
        }
      }
    },
    saveContact(contact) {
      if (contact.id) {
        this.updateContact(contact);
      } else {
        this.addContact(contact);
      }
    },
    viewDetails(contact) {
      this.currentContact = { ...contact };
      this.$refs.contactDetailsModal.show();
    },
    callContact(contact) {
      console.log("this.$refs", this.$refs);
      this.currentContact = { ...contact };
      this.$refs.callContactModal.show();
    }
  },
};
</script>
<style scoped>
 .card {
    width: 1400px;
    margin-left: 200px;
    margin-top: 50px;
    margin-bottom: 50px;
 }
</style>
