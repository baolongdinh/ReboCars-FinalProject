<template>
    <div class="bg-gray-50 p-4">
        <div class="font-bold text-3xl font-sans text-center">
            Đăng ký xe
        </div>


        <div class=" w-735 mx-auto mt-12">
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
import { ref } from 'vue';
import HorizontalStepper from '../../../helpers/components/stepper/HorizontalStepper.vue';

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

function finishedCarRegistrationStep(payload) {
    console.log({ payload })
}


</script>

<style lang="scss" scoped></style>