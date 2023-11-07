<template>
    <div class="bg-gray-50 p-4">
        <div class="font-bold text-3xl font-sans text-center">
            Đăng ký xe
        </div>


        <div v-if="successCompShow" class="pt-5">
            <CarRegistraionSuccess></CarRegistraionSuccess>
        </div>

        <div v-else class=" w-735 mx-auto mt-12">
            <div class="columns">
                <div class="column is-8 is-offset-2">
                    <HorizontalStepper :steps="carRegisterSteps" @completed-step="completeStep" :top-buttons="true"
                        @active-step="isStepActive" @stepper-finished="finishedCarRegistrationStep">
                    </HorizontalStepper>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import CarRegisterStep1 from './CarRegisterStep1.vue';
import CarRegisterStep2 from './CarRegisterStep2.vue';
import CarRegisterStep3 from './CarRegisterStep3.vue';
import CarRegistraionSuccess from './CarRegistraionSuccess.vue';
import CarRegisterConfirmStep from './CarRegisterConfirmStep.vue';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import HorizontalStepper from '../../../helpers/components/stepper/HorizontalStepper.vue';
import { RepositoryFactory } from "../../../apis/repositoryFactory";
const carsRepo = RepositoryFactory.get("cars");

const carStore = useStore()
const carRegistration = computed(() => carStore.getters.getCarRegistration)
const successCompShow = ref(false)


const carRegisterSteps = ref([
    {
        icon: 'directions_car',
        name: 'first',
        title: 'Thông tin ',
        component: CarRegisterStep1,
        completed: false
    },
    {
        icon: 'description',
        name: 'second',
        title: 'Cho thuê',
        component: CarRegisterStep2,
        completed: false
    },
    {
        icon: 'photo_camera',
        name: 'third',
        title: 'Hình ảnh',
        component: CarRegisterStep3,
        completed: false
    },
    {
        icon: 'confirmation_number',
        name: 'fourth',
        title: 'Xác nhận thông tin',
        component: CarRegisterConfirmStep,
        completed: false
    }
])

function completeStep(payload) {
    carRegisterSteps.value.forEach((step) => {
        if (step.name === payload.name) {
            step.completed = true;
        }
    })
}

function isStepActive(payload) {
    carRegisterSteps.value.forEach((step) => {
        if (step.name === payload.name) {
            if (step.completed === true) {
                step.completed = false;
            }
        }
    })
}

function convertObjToFormData(obj) {
    const formData = new FormData()
    for (var key in obj) {
        if (key === 'images') {
            for (let i = 0; i < obj.images.length; i++) {
                formData.append(key, obj.images[i]);
            }
        } else {
            formData.append(key, obj[key]);
        }

    }
    return formData
}

function finishedCarRegistrationStep() {
    const { preview_list, ...carRegistrationPayload } = carRegistration.value
    const formData = convertObjToFormData(carRegistrationPayload)
    carsRepo.addCar(formData).then(res => {
        console.log(res)
        successCompShow.value = true
    }).catch(err => {
        console.error(err)
    })
}

onMounted(() => {
    console.log({ carRegistration })
})



</script>

<style lang="scss" scoped></style>