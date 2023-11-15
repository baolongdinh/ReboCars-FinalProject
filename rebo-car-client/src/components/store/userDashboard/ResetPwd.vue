<template>
    <div>
        <div class="font-bold font-sans text-3xl flex">
            Đổi mật khẩu
        </div>
        <div class="p-8 bg-white w-full relative rounded-lg shadow-md mt-5 h-400 ">
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
                            Mật khẩu hiện tại
                        </div>

                        <div>
                            <input class="w-full rounded-lg border-gray-300" type="password" v-model="oldPassword">
                        </div>

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
const usersRepo = RepositoryFactory.get("users");
const store = useStore()

const userId = store.state.authStore.user._id
const oldPassword = ref("")
const newPassword = ref("")
const rePassword = ref("")
const btnDisable = ref(true)

const errMsg = ref("")
const successMsg = ref("")
watch([oldPassword, newPassword, rePassword], ([oldPassword, newPassword, rePassword]) => {
    if (oldPassword && newPassword && rePassword) {
        btnDisable.value = false
    } else {
        btnDisable.value = true
    }
})

function resetValue() {
    oldPassword.value = ""
    newPassword.value = ""
    rePassword.value = ""
}

function handleConfirmChangePwd() {
    if (newPassword.value !== rePassword.value) {
        errMsg.value = "Mật khẩu và xác nhận mật khẩu không khớp, vui lòng nhập lại mật khẩu"
    } else {
        const payload = {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value
        }
        usersRepo.resetPasswordByUserId(userId, payload).then(() => {
            errMsg.value = ""
            successMsg.value = "Đổi mật khẩu thành công"
            resetValue()
        }).catch((err) => {
            console.log(err)
            errMsg.value = err.response.data.message
        })
    }
}

</script>

<style lang="scss" scoped></style>