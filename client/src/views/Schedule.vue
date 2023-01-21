<template>
  <table v-if="auth" class="table table-hover table-dark">
    <thead>
      <tr>
        <th v-for="column in columns" v-bind:key="column">
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(records, recordIndex) in record" v-bind:key="recordIndex">
        <td v-for="(item, itemIndex) in records" :key="itemIndex">
          {{ item }}
        </td>
        <td>
          <i v-on:click="update(record)" class="fa-solid fa-check me-3"></i>
          <i v-on:click="delet(record)" class="fa-solid fa-xmark"></i>
        </td>
      </tr>
      <tr>
        <td>
          #
        </td>
        <td>
          <select v-model="selected" id="select">
            <option v-for="(user, itemIndex) in user_list" v-bind:key="itemIndex"
              v-bind:value="{ name: user['job_id']['name'], id: user['id'] }">
              {{ user["first_name"] + " " + user["last_name"] + " " + user["last_name"] }}
            </option>
          </select>
        </td>
        <td>
          {{ selected.name }}
        </td>
        <td>
          <input v-model="data.day_start" v-mask="'##/##/#### ##:##'">
        </td>
        <td>
          <input v-model="data.day_end" v-mask="'##/##/#### ##:##'">
        </td>
        <td>
          <span>
            Уход минус Приход
          </span>
        </td>
        <td>
          <i v-on:click="add(selected.id, data)" class="fa-solid fa-plus"></i>
        </td>
      </tr>
    </tbody>
  </table>
  <span v-else>
    You are not allowed to POOP
  </span>

</template>
<script lang="ts">
import { mask } from 'vue-the-mask'
import Datepicker from '@vuepic/vue-datepicker';
import { computed, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';
export default {
  name: "Schedule",
  directives: { mask, Datepicker },
  methods: {
    async update(record) {
      console.log(record);
    },

    async delet(record) {
      console.log(record);
    },
    async add(id, data) {
      const result = reactive({
        day_start: moment("01/01/1995", "DD-MM-YYYY").format(data.day_start),
        day_end: moment("01/01/1995", "DD-MM-YYYY").format(data.day_end),
        worker_id: id,
      });
      const start = new Date(result.day_start);
      const end = new Date(result.day_end);
      if (end.getTime() > start.getTime()) {
        const response = await fetch('http://localhost:3000/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result)
        });
        if (response.ok) {
          location.reload();
        }
        else {
          alert(result.day_start);
        }
      }
      else{
        alert("Дата ухода стоит раньше даты прихода");
      }
    }
  },
  data() {
    return {
      data: { day_start: '', day_end: '', worker_id: '' },
      selected: { name: '', id: '' }
    }
  },
  setup() {
    const user_list = ref(Object);
    const store = useStore();
    const auth = computed(() => store.state.authenticated);
    const item = ref(
      {
        items: {
          id: '',
          name: '',
          job: '',
          start: '',
          end: '',
          lenght: ''
        }
      }
    )
    const record: { id: string, name: string, job: string, start: string, end: string, lenght: string }[] = reactive([])
    onMounted(async () => {
      try {
        const check = await fetch('http://localhost:3000/workers/user', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        if (check.ok) {
          await store.dispatch('setAuth', true);
        }
        else {
          await store.dispatch('setAuth', false);
        }


        const response = await fetch('http://localhost:3000/schedule', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const content = await response.json();
        content.forEach(c => {
          let start = new Date(c.day_start);
          let end = new Date(c.day_end);
          const lenght = end.getTime() - start.getTime();
          c.day_start = start.toLocaleString();
          c.day_end = end.toLocaleString();
          item.value = {
            items: {
              id: c.id,
              name: c.worker_id.first_name + ' ' + c.worker_id.second_name + ' ' + c.worker_id.last_name,
              job: c.worker_id.job_id.name,
              start: c.day_start,
              end: c.day_end,
              lenght: Math.round((lenght/3600000)).toString()
            }
          };
          record.push(item.value.items);
        });
        const list = await fetch('http://localhost:3000/workers', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        user_list.value = await list.json();
      }
      catch (e) {
        // message.value = ('Error');
      }
    });
    return {
      user_list,
      auth,
      record,
      columns: ["#", 'Сотрудник', 'Должность', 'Приход', 'Уход', 'Продолжительность', ''],
    }
  }
}
</script>

<style>
table,
th,
td {
  border: 1px solid;
  text-align: center;

}

input {
  width: 70%;
  text-align: center;
}

select {
  width: 50%;
}
</style>