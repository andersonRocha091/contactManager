<template>
<div class="modal fade" id="removeContactModal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0">
            <h5 class="modal-title">
                Excluir este contato?
            </h5>
            </div>
            <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary text-secondary bg-white border-0" data-bs-dismiss="modal">
                Cancelar
            </button>
            <button type="button" class="btn btn-danger text-danger bg-white border-0" @click="submitForm">
                Salvar
            </button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { Modal } from "bootstrap";
export default {
    name: 'RemoveContactModal',
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
            this.$emit("delete", this.contact);
            this.hide();
        }
    }
}
</script>