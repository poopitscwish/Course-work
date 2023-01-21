<template>
    <form @submit.prevent="submit" class="form-signin">
        <h1 class="h3 mb-3 fw-normal">Регистрация</h1>
        <div class="form-floating">
            <input v-model="data.first_name" type="first_name" class="form-control" id="first_name">
            <label for="first_name">Фамилия</label>
        </div>
        <div class="form-floating">
            <input v-model="data.second_name" type="second_name" class="form-control" id="second_name">
            <label for="second_name">Имя</label>
        </div>
        <div class="form-floating">
            <input v-model="data.last_name" type="last_name" class="form-control" id="last_name">
            <label for="last_name">Отчество</label>
        </div>
        <div class="form-floating">
            <input class="form-control" v-mask="'+7##########'" v-model="data.phone_number" type="tel">
            <label for="phone_number">Номер телефона</label>
        </div>
        <div class="ms-2">
            <label for="floatingInput">Должность</label>
        </div>
        <select v-model="data.job_id" name="cars" id="job_id">
            <option value="5">Повар</option>
            <option value="4">Официант</option>
            <option value="3">Менеджер</option>
            <option value="2">Заместитель Директора</option>
            <option value="1">Директор</option>
        </select>
        <div class="form-floating">
            <input v-model="data.password" type="password" class="form-control" id="floatingPassword">
            <label for="floatingPassword">Пароль</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">Подтвердить</button>
    </form>
</template>
<!-- asdadasdada -->
<script lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { mask } from 'vue-the-mask'
export default {
    directives: { mask },
    name: "Register",
    setup() {
        const data = reactive({
            first_name: '',
            second_name: '',
            last_name: '',
            phone_number: '',
            job_id: '',
            password: '',
        });
        const router = useRouter();
        const submit = async () => {
            const response = await fetch('http://localhost:3000/workers/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if(response.ok) {
                await fetch('http://localhost:3000/workers/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            });
            await router.push('/');
            }
            else{
                alert('Такой номер телефона ужре зарегистрирован');
            }
        }
        return {
            data,
            submit
        }
    }
}
</script>
<style>
select {
    border-radius: 9px;
    padding: 4px;
    outline: 0;
    width: 215px;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 2px;
    margin-right: 2px;
}
</style>