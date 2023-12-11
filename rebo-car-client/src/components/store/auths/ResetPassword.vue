<template>
    <div class="w-1/3 mx-auto mt-12">
        <div class="font-bold font-sans text-3xl flex text-center max-w-fit">
            Đặt lại mật khẩu
        </div>
        <div class="p-8 bg-white w-full relative rounded-lg shadow-md mt-5 h-305 ">
            <div>
                <div class="flex-col space-y-3">

                    <div v-if="errMsg"
                        class="px-8 py-2 w-full font-semibold text-lg text-center rounded-md text-white bg-rose-400">
                        {{ errMsg }}
                    </div>

                    <div v-if="successMsg"
                        class="px-8 py-2 w-full font-semibold text-lg text-center rounded-md text-white bg-green-400">
                        {{ successMsg }}
                    </div>

                    <div class="flex-col space-y-1">
                        <div class="text-gray-500 font-sans font-semibold">
                            Mật khẩu mới
                        </div>

                        <div>
                            <input class="w-full rounded-lg border-gray-300" type="password" v-model="newPassword">
                        </div>

                    </div>

                    <div class="flex-col space-y-1">
                        <div class="text-gray-500 font-sans font-semibold">
                            Xác nhận mật khẩu mới
                        </div>

                        <div>
                            <input class="w-full rounded-lg border-gray-300" type="password" v-model="rePassword">
                        </div>

                    </div>

                </div>

            </div>

            <div class="">
                <button class="text-lg text-gray-700 font-semibold font-sans  w-24 h-10 rounded-lg mt-6 float-right"
                    :style="{ backgroundColor: btnDisable ? 'lightgray' : '#00CC66' }" @click="handleConfirmChangePwd"
                    :disabled='btnDisable'>
                    Xác nhận
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { RepositoryFactory } from "../../../apis/repositoryFactory";
import { useRoute, useRouter } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification()
const authRepo = RepositoryFactory.get("auths");
const route = useRoute()
const router = useRouter()
const newPassword = ref("")
const rePassword = ref("")
const btnDisable = ref(true)

const errMsg = ref("")
const successMsg = ref("")
watch([newPassword, rePassword], ([newPassword, rePassword]) => {
    if (newPassword && rePassword) {
        btnDisable.value = false
    } else {
        btnDisable.value = true
    }
})


function handleConfirmChangePwd() {
    if (newPassword.value !== rePassword.value) {
        errMsg.value = "Mật khẩu và xác nhận mật khẩu không khớp, vui lòng nhập lại mật khẩu"
    } else {
        const payload = {
            newPassword: newPassword.value,
            verifyToken: route.query.token
        }

        authRepo.resetPassword(payload).then((rs) => {
            notify({
                title: 'Thông báo',
                text: 'Đặt lại mật khẩu thành công.',
                type: 'success'
            });
            router.push({ path: "/" })


        }).catch((err) => {
            notify({
                title: 'Error',
                text: err.response.data.message,
                type: 'error'
            });
        })


    }
}

</script>

<style lang="scss" scoped></style>