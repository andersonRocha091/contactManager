<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" @click="$emit('sort', 'name')" style="cursor: pointer; width: 30%">
            Nome <i class="bi bi-arrow-down-up text-muted ms-1"></i>
          </th>
          <th scope="col" style="width: 35%">Email</th>
          <th scope="col" style="width: 30%">Telefone</th>
          <th scope="col" style="width: 5%"></th>
        </tr>
      </thead>
      <tbody>
        <contact-item 
          v-for="contact in contacts" 
          :key="contact.id"
          :contact="contact"
          @edit="$emit('edit', contact)"
          @delete="$emit('delete', contact)"
          @view="$emit('view', contact)"
          @call="$emit('call', contact)"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import ContactItem from './ContactItem.vue'

export default {
  name: 'ContactList',
  components: {
    ContactItem
  },
  props: {
    contacts: {
      type: Array,
      required: true
    }
  },
  emits: ['sort', 'edit', 'delete', 'view', 'call']
}
</script>