<template >
    <div v-if="auth">
        <div>
            <div class="" id="back">
                <div id="first">
                    <table id="allStaff" class="table table-hover table-striped table-dark">
                        <thead>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in staff" :key="index">
                                <td v-for="(record, rIndex) in item" :key="rIndex">
                                    {{ record }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="second">
                    <table id="allStaff" class="table table-hover table-striped table-dark">
                        <thead>
                            <tr>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in order" :key="index">
                                <td v-for="(record, rIndex) in item" :key="rIndex">
                                    {{ record }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button v-on:click="resultOfDay(staff, order)" id="total" class="" type="button">
                    Итоги
                </button>
            </div>
        </div>
    </div>

    <div v-else>
        You are not Loggin
    </div>
</template>

<script lang="ts">
import store from '@/store';
import { computed, onMounted, reactive, ref } from 'vue';
export default {
    name: 'Total',
    methods: {
        resultOfDay(staff, order) {
            let payStaff = 0;
            staff.forEach(c => {
                payStaff += c.pay_hour * c.payment
            });
            let result = 0;
            order.forEach(c => {
                result += c.check_amount;
            })
            alert(`Персонал должен получить: ${payStaff}\nВыручка за все заказы: ${result}`);
        }
    },

    setup() {
        const user_id = ref(31);
        const staff: {
            id: string, name: string, job: string, pay_hour: string, phone: string, payment: string
        }[] = reactive([])
        const order: {
            id: string, name: string, accept: string, issue: string, check_amount: string
        }[] = reactive([])
        const auth = computed(() => store.state.authenticated);
        const JOB = computed(() => store.state.worker_id);
        onMounted(async () => {
            try {
                const check = await fetch('http://localhost:3000/workers/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const content = await check.json();
                const job_id = await fetch(`http://localhost:3000/workers/jobID/${content.id}`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const id = await job_id.json();
                if (check.ok) {
                    await store.dispatch('setAuth', true);
                    await store.dispatch('setWorkerId', id.job_id);
                }
                else {
                    await store.dispatch('setAuth', false);
                }


                console.log(JOB.value)
                if (JOB.value == 1) {
                    const list = await fetch('http://localhost:3000/workers', {
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    });
                    const content_json = await list.json();
                    content_json.forEach(async element => {
                        const schedule_id = await fetch(`http://localhost:3000/schedule/hours/${element.id}`, {
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include',
                        });
                        const shedule_json = await schedule_id.json();
                        let lenght = 0;
                        shedule_json.forEach(c => {
                            let start = new Date(c.day_start);
                            let end = new Date(c.day_end);
                            lenght += end.getTime() - start.getTime();
                        })
                        staff.push(
                            {
                                id: element.id,
                                name: element.first_name + ' ' + element.second_name + ' ' + element.last_name,
                                job: element.job_id.name,
                                pay_hour: element.job_id.payment,
                                phone: element.phone_number,
                                payment: Math.round((lenght / 3600000)).toString(),
                            });
                    });
                    const reqOrders = await fetch('http://localhost:3000/orders/', {
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    });
                    const orderJson = await reqOrders.json();
                    orderJson.forEach(c => {
                        let id = c.id;
                        let start = new Date(c.accept).toLocaleString();
                        let end = new Date(c.issue).toLocaleString();
                        let name = c.worker_id.first_name + ' ' + c.worker_id.second_name + ' ' + c.worker_id.last_name;
                        let check_amount = c.check_amount;
                        order.push({
                            id: id,
                            name: name,
                            accept: start,
                            issue: end,
                            check_amount: check_amount,
                        });
                    })
                }
                else {
                    const list = await fetch('http://localhost:3000/workers/user', {
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    });
                    const content_json = await list.json();
                    const schedule_id = await fetch(`http://localhost:3000/schedule/hours/${content_json.id}`, {
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    });
                    const shedule_json = await schedule_id.json();
                    console.log(shedule_json)
                    let lenght = 0;
                    shedule_json.forEach(c => {
                        let start = new Date(c.day_start);
                        let end = new Date(c.day_end);
                        lenght += end.getTime() - start.getTime();
                    })
                    console.log("staff11")
                    console.log(content_json)
                    staff.push(
                        {
                            id: content_json.id,
                            name: content_json.first_name + ' ' + content_json.second_name + ' ' + content_json.last_name,
                            job: content_json.job_id.name,
                            pay_hour: content_json.job_id.payment,
                            phone: content_json.phone_number,
                            payment: Math.round((lenght / 3600000)).toString(),
                        })
                    console.log("staff")
                    console.log(staff)
                    const response = await fetch('http://localhost:3000/workers/user', {
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    });
                    const user = await response.json();
                    user_id.value = user.id
                    const reqOrders = await fetch(`http://localhost:3000/orders/${user_id.value}`, {
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    });
                    const ordersJson = await reqOrders.json();
                    console.log(ordersJson);
                    ordersJson.forEach(c => {
                        let id = c.id;
                        let start = new Date(c.accept).toLocaleString();
                        let end = new Date(c.issue).toLocaleString();
                        let name = c.worker_id.first_name + ' ' + c.worker_id.second_name + ' ' + c.worker_id.last_name;
                        let check_amount = c.check_amount;
                        order.push({
                            id: id,
                            name: name,
                            accept: start,
                            issue: end,
                            check_amount: check_amount,
                        });
                    });
                }


            }
            catch (e) {
                console.error(e);
            }
        });
        return {
            staff,
            order,
            auth,
            JOB,
        }
    }
}
</script>
<style>
#allStaff {

    width: 100%;
}

#getOne {
    margin-left: 3em;
}

#back {
    background-color: darkgrey;
    position: fixed;
    margin-left: 3em;
    margin-bottom: 5em;
    width: 95%;
    height: 85%;
    display: flex;
}

#total {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10em;
    max-width: 10em;
    min-height: 2em;
    margin: 1em;

}

#first {
    width: 40%;
    margin-left: 7em;
    margin-top: 2em;
    background-color: rgba(10, 10, 10, 0.486);
    margin-bottom: 4em;
}

#second {
    background-color: rgba(10, 10, 10, 0.486);
    margin-top: 2em;
    right: 0;
    width: 40%;
    margin-left: 7em;
    margin-bottom: 4em;
    color: aliceblue
}
</style>