<template>
    <VueFinalModal class="justify-center items-center absolute overflow-y-auto font-sans "
        content-class="flex flex-col bg-gray-100 text-black rounded-lg space-y-2">
        <div>

            <div class="p-10 relative rounded-lg">
                <div class="absolute top-10 left-5 font-semibold text-2xl flex">
                    <div>
                        Thông tin tài khoản
                    </div>
                </div>


                <div class="flex mt-16">
                    <div class="grid grid-rows-2 gap-4">
                        <div class=" w-36 h-36">

                            <img v-if="preview" loading="lazy" class=" rounded-full object-cover w-full h-full"
                                :src="preview" alt="Bảo Long">

                            <div v-else>
                                <img v-if="user.avatar" loading="lazy" class=" rounded-full object-cover w-full h-full"
                                    :src="getImage(user.avatar)" alt="Bảo Long">

                                <img v-else loading="lazy" class=" rounded-full object-cover w-full h-full"
                                    src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                                    alt="Bảo Long">
                            </div>




                        </div>

                        <div class=" mx-auto font-semibold text-xl">
                            <button class="max-w-fit text-white mx-auto bg-blue-400 hover:bg-blue-700 px-2 py-1 rounded-md"
                                onclick="document.getElementById('my-file').click()">Chọn ảnh</button>
                            <input type="file" style="display:none" accept="image/*" @change="previewImage"
                                class="form-control-file" id="my-file">
                        </div>
                    </div>

                    <div class="bg-gray-50 rounded-xl p-10 flex flex-col gap-4 ml-20 w-full">

                        <div v-if="msgErr" class="px-8 py-5 w-full bg-rose-400 rounded-lg text-white text-center">
                            {{ msgErr }}
                        </div>

                        <div class="flex relative justify-between  ">
                            <div class="text-base  text-gray-700">
                                Họ tên
                            </div>

                            <div class="text-black font-semibold  ">
                                <input class="rounded-lg  " type="text" v-model="name" :max="new Date()">
                            </div>
                        </div>

                        <div class="flex relative  justify-between">
                            <div class="text-base  text-gray-700">
                                Ngày sinh
                            </div>

                            <div class="text-black font-semibold ">
                                <input class="rounded-lg w-218" type="date" v-model="dateOfBirth">
                            </div>
                        </div>

                        <div class=" flex space-x-12 relative justify-between">
                            <div class="text-base  text-gray-700">
                                Số điện thoại
                            </div>

                            <div class="text-black font-semibold ">
                                <input class="rounded-lg " type="text" v-model="phone">
                            </div>
                        </div>

                        <button @click="handleBtnConfirmUpdate"
                            class="bg-green-400 hover:bg-green-600 py-2 px-4 rounded-lg absolute bottom-5 right-5 ">
                            <div class="text-white font-sans font-semibold text-lg">
                                Xác nhận
                            </div>
                        </button>

                        <button @click="this.$emit('logout')"
                            class="bg-rose-400 hover:bg-rose-600 w-24 py-2 px-4 rounded-lg absolute bottom-5 right-32 ">
                            <div class="text-white font-sans font-semibold text-lg">
                                Hủy
                            </div>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { onMounted, ref, inject, onUpdated } from 'vue';
import { RepositoryFactory } from "../../../apis/repositoryFactory";
import { useStore } from 'vuex';
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification()
const carsRepo = RepositoryFactory.get('cars')
const usersRepo = RepositoryFactory.get("users");
const store = useStore()
const props = defineProps({ user: Object })
const emit = defineEmits(['confirm'])

const preview = ref()
const image = ref()
const dateOfBirth = ref(formatDateToYYYYMMDD(new Date(props?.user.dateOfBirth)))
const name = ref(props?.user.name)
const phone = ref(props?.user.phone)
const userId = props.user._id
const msgErr = ref("")


function previewImage(event) {
    var input = event.target;
    if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
            preview.value = e.target.result;
        }
        image.value = input.files[0];
        reader.readAsDataURL(input.files[0]);
    }
}

function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${month}-${day}-${year}`;
}

// handle image src
const base_url = inject('base_url')
function getImage(url) {
    return base_url + url
}

function convertObjToFormData(obj) {
    const formData = new FormData()
    for (var key in obj) {
        formData.append(key, obj[key]);
        console.log(key, obj[key])
    }
    return formData
}

function handleBtnConfirmUpdate() {
    const user = {
        avatar: image.value,
        dateOfBirth: dateOfBirth.value,
        name: name.value,
        phone: phone.value
    }

    const payload = convertObjToFormData(user)
    console.log({ user })
    usersRepo.updateUserById(userId, payload).then((result) => {
        console.log({ result })
        notify({
            title: 'Thông báo',
            text: 'Thay đổi thông tin thành công.',
            type: 'success'
        });
        const user = result.data.metadata.userUpdated
        localStorage.setItem("user", JSON.stringify(user));
        store.commit("setUser", user);
        emit('confirm')

    }).catch(err => {
        console.error(err)
        msgErr.value = err.message
    })
}

onMounted(() => {
    console.log({ props })
    console.log(dateOfBirth)

})

onUpdated(() => {
    console.log(dateOfBirth)
})

</script>

<style lang="css" scoped></style>