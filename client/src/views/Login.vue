<template >
    <form @submit.prevent="submit" class="form-signin">
        <h1 class="h3 mb-3 fw-normal">Пожалуйста войдите</h1>
        <div class="form-floating">
            <input class="form-control" v-mask="'+7##########'" v-model="data.phone_number" type="tel">
            <label for="floatingInput">Номер телефона</label>
        </div>
        <div class="form-floating">
            <input v-model="data.password" type="password" class="form-control" id="floatingPassword"
                placeholder="Password">
            <label for="floatingPassword">Пароль</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
    </form>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { mask } from 'vue-the-mask'
export default {
    directives: { mask },
    name: "Login",
    setup() {
        const data = reactive({
            phone_number: '',
            password: '',
        });
        const router = useRouter();
        const submit = async () => {
            const response = await fetch('http://localhost:3000/workers/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            });
            if (response.ok) {
                await router.push('/');
            }
            else{
                alert("Неправильный логин или пароль");
            }

        }
        return {
            data,
            submit,
        }
    }
}
</script>
<style>
.form-signin {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f5f5f5;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>