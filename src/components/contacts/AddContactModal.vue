<template>
  <div class="modal fade" id="addContactModal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ isEditing ? "Editar contato" : "Adicionar novo contato" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent>
            <div class="mb-3 text-start">
              <label for="name" class="form-label">Nome</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="formData.name"
                placeholder="Nome"
                required
                :class="{ 'text-muted': !formData.name, 'is-invalid': nameError!=='' }"
                @input="nameError=''"
                @blur="validateName"
              />
              <div class="invalid-feedback" v-show="nameError">{{nameError}}</div>
            </div>
            <div class="mb-3 text-start">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="formData.email"
                placeholder="Email"
                :class="{ 'text-muted': !formData.email, 'is-invalid': emailError }"
                @focus="emailError=''"
              />
              <div class="invalid-feedback" v-show="emailError">{{emailError}}</div>
            </div>
            <div class="mb-3 text-start">
              <label for="phone" class="form-label">Telefone</label>
              <input
                type="text"
                class="form-control"
                id="phone"
                v-model="formData.phone"
                placeholder="Telefone"
                :class="{ 'text-muted': !formData.phone, 'is-invalid': phoneError!=='' }"
                @input="phoneError=''"
                @blur="validatePhone"
              />
               <div class="invalid-feedback" v-show="phoneError">{{phoneError}}</div>
            </div>
            <div class="mb-3 text-start">
              <label for="mobile" class="form-label">Celular</label>
              <input
                type="text"
                class="form-control"
                id="mobile"
                v-model="formData.mobile"
                placeholder="Celular"
                :class="{ 'text-muted': !formData.mobile, 'is-invalid': mobileError }"
                @input="mobileError=''"
                @blur="validateMobile"
              />
              <div class="invalid-feedback" v-show="mobileError">{{mobileError}}</div>
            </div>
            <div class="mb-3 text-start">
              <label for="address" class="form-label">Endereço</label>
              <input
                type="text"
                class="form-control"
                id="address"
                v-model="formData.address"
                placeholder="Endereço"
                :class="{ 'text-muted': !formData.address }"
              />
            </div>
            <div class="row mb-3 text-start">
              <div class="col">
                <label for="district" class="form-label">Bairro</label>
                <input
                  type="text"
                  class="form-control"
                  id="district"
                  v-model="formData.district"
                  placeholder="Bairro"
                  :class="{ 'text-muted': !formData.district }"
                />
              </div>
              <div class="col">
                <label for="state" class="form-label">Estado</label>
                <input
                  type="text"
                  class="form-control"
                  id="state"
                  v-model="formData.state"
                  placeholder="Estado"
                  :class="{ 'text-muted': !formData.state }"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cancelar
          </button>
          <button type="button" class="btn btn-primary" @click="submitForm">
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import { Modal } from "bootstrap";
const nameError = ref('');
const emailError = ref('');
const phoneError = ref('');
const mobileError = ref('');
export default {
  name: "AddContactModal",
  props: {
    contact: {
      type: Object,
      default: () => ({
        id: null,
        name: "",
        email: "",
        phone: "",
        mobile: "",
        address: "",
        district: "",
        state: ""
      }),
    },
  },
  emits: ["save"],
  data() {
    return {
      formData: {
        id: null,
        name: "",
        email: "",
        phone: "",
        mobile: "",
        address: "",
        district: "",
        state: ""
      },
      modal: null,
      nameError: '',
      emailError: '',
      phoneError:'',
      mobileError: ''
    };
  },
  computed: {
    isEditing() {
      return this.formData.id !== null;
    },
  },
  watch: {
    contact: {
      handler(newVal) {
        this.formData = { ...newVal };
      },
      immediate: true,
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      backdrop: "static",
      keyboard: false,
    });
  },
  unmounted() {
    if (this.modal) {
      this.modal.dispose();
    }
  },
  methods: {
    show() {
      this.modal.show();
    },
    hide() {
      this.modal.hide();
    },
    submitForm() {
      
        this.validateName();
        this.validateEmail();
        this.validatePhone();
        this.validateMobile();
        if (this.nameError || this.emailError || this.phoneError || this.mobileError) {
            return;
        }

      this.$emit("save", { ...this.formData });
      this.resetForm();
      this.hide();
    },
    validateEmail () {
        const email = this.formData.email;
        if (!email) {
            this.emailError = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            this.emailError = 'Please enter a valid email address';
        } else {
            this.emailError = '';
        }
        
    },

    validateName () {
        const name = this.formData.name;
        if (!name || name.length === 0) {
            this.nameError = 'Name is required.';
        } else {
            this.nameError = '';
        }
    },
    validatePhone() {
        if (!this.formData.phone || this.formData.phone.length === 0) {
            this.phoneError = 'Phone is required.'
        } else {
            this.phoneError = '';
        } 
    },
    validateMobile() {
        if (!this.formData.mobile || this.formData.mobile.length === 0) {
                this.mobileError = 'Mobile is required.'
        } else {
            this.mobileError = '';
        }
    },
    resetForm() {
      this.formData = {
        id: null,
        name: "",
        email: "",
        phone: "",
      };
    },
  },
};
</script>
<style scoped>
.modal-dialog {
  max-width: 800px;
  width: 90%;
}
</style>
