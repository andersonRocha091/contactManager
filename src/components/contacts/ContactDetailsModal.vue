<template>
  <div class="modal fade" id="contactDetailModal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content px-4">
        <div class="modal-header border-0 d-flex align-items-center justify-content-between py-4">
          <div class="d-flex align-items-center">
            <div class="avatar avatar-sm me-2" :style="avatarStyle">{{ initials }}</div>
            <h5 class="modal-title mb-0">{{ contact.name }}</h5>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
          </button>
        </div>
        <div class="modal-body">
          <dl class="row">
            <div class="row mb-3">
              <dt class="col-4 text-end pe-4">Email</dt>
              <dd class="col-8">{{ contact.email || 'N/A' }}</dd>
            </div>
            <div class="row mb-3">
              <dt class="col-4 text-end pe-4">Endereço</dt>
              <dd class="col-8">{{ contact.address || 'N/A' }}</dd>
            </div>
            <div class="row mb-3">
              <dt class="col-4 text-end pe-4">Bairro</dt>
              <dd class="col-8">{{ contact.district || 'N/A' }}</dd>
            </div>
            <div class="row mb-3">
              <dt class="col-4 text-end pe-4">Estado</dt>
              <dd class="col-8">{{ contact.state || 'N/A' }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  name: "ContactDetailModal",
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
  data() {
    return {
      modal: null,
    };
  },
  computed: {
    initials() {
      return this.contact.name
        .split(' ')
        .map(part => part[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
    },
    avatarStyle() {
      return {
        backgroundColor: '#2d2d2d',
        color: 'white'
      };
    }
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
      console.log("Show modal");
    },
    hide() {
      this.modal.hide();
      console.log("Hide modal");
    }
  }
}
</script>

<style scoped>
.avatar-sm {
  width: 24px;
  height: 24px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
}

/* Ensure consistent styling for definition list */
dt {
  font-weight: 600;
  color: #6c757d;
}

dd {
  color: #212529;
}
</style>