<template>     
    <div>
     <button v-on:click="swap(items,records)" >
        Staff         
     </button>         
     <button v-on:click="swap(items,records)">
        Orders         
     </button>     
     <!-- dadsadasda -->
    </div>     
    <div>
      <b-table striped hover :items="records"></b-table>     
  </div>
   </template>
<script lang="ts">
export default {
    name: 'Total',
    methods: {
        swap(items, records) {
            const temp = items;
            this.items = records;
            this.records = temp;
        }
    },
    data() {
        return {
            items: [
                { age: 40, first_name: 'Dickerson', last_name: 'Macdonald', Тайтл: 'Macdonald' },
                { age: 21, first_name: 'Larsen', last_name: 'Shaw', Тайтл: 'Macdonald' },
                { age: 89, first_name: 'Geneva', last_name: 'Wilson', Тайтл: 'Macdonald' },
                { age: 38, first_name: 'Jami', last_name: 'Carney', Тайтл: 'Macdonald' }
            ],
            records: [
                { age: 40, first_name: 'Фомин', last_name: 'Евгений', Тайтл: 'Macdonald' },
                { age: 21, first_name: 'Домолего', last_name: 'Захар', Тайтл: 'Macdonald' },
                { age: 89, first_name: 'Акулин', last_name: 'Александр', Тайтл: 'Macdonald' },
                { age: 38, first_name: 'Бобков', last_name: 'Илья', Тайтл: 'Macdonald' }
            ],
        }
    },

}
</script> 