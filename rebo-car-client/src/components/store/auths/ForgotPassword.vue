<template>
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center ">
            Quên mật khẩu
        </h1>
        <div v-if="alertMessage" class="text-center py-2 rounded-md w-full bg-red-400 text-white font-medium text-lg">
            {{ alertMessage }}
        </div>

        <div v-if="successMsg" class="text-center py-2 rounded-md w-full bg-green-400 text-white font-medium text-lg">
            {{ successMsg }}
        </div>

        <div class="space-y-4 md:space-y-6">
            <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                <input type="email" name="email" id="email" v-model="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="youremail@gmail.com" required="">
            </div>

            <button type="submit"
                class="w-full text-black bg-primary-600 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-2 border-gray-500 "
                @click="handleResetPwdBtn">
                Thay đổi mật khẩu</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { RepositoryFactory } from "../../../apis/repositoryFactory";
const authRepo = RepositoryFactory.get("auths");


const emit = defineEmits(['logout'])
const store = useStore()
const alertMessage = ref('')
const successMsg = ref('')

const email = ref('')

function emitPopDownDialog() {
    emit('logout')
}

async function handleResetPwdBtn() {
    const payload = {
        email: email.value,
    }
    authRepo.forgotPassword(payload).then((rs) => {
        alertMessage.value = ""
        successMsg.value = "gửi yêu cầu đặt lại mật khẩu thành công, vui lòng vào email để xác thực và đặt lại mật khẩu"
    }).catch((err) => {
        alertMessage.value = err.response.data.message
    })
}


</script>

<style lang="scss" scoped></style>