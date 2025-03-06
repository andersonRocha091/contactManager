<template>
  <tr>
    <td>
      <div class="d-flex align-items-center" @click="$emit('view', contact)">
        <div class="avatar avatar-sm me-2" :style="avatarStyle">
          {{ initials }}
        </div>
        {{ contact.name }}
      </div>
    </td>
    <td @click="$emit('view', contact)">{{ contact.email }}</td>
    <td @click="$emit('view', contact)">{{ contact.phone }}</td>
    <td>
      <div class="d-flex">
        <button 
          class="btn btn-sm btn-link text-muted" 
          @click="$emit('edit', contact)"
        >
          <i class="bi bi-pencil"></i>
        </button>
        <button 
          class="btn btn-sm btn-link text-muted" 
          @click="$emit('delete', contact)"
        >
          <i class="bi bi-trash"></i>
        </button>
        <button 
            v-if="contact.phone"
          class="btn btn-sm btn-link text-muted" 
          @click="$emit('call', contact)"
        >
          <i class="bi bi-telephone"></i>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ContactItem',
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete','view','call'],
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
</style>