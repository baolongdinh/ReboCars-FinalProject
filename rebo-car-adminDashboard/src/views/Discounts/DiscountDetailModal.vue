<template>
    <b-modal v-if="discount" class="" v-model="showDiscountDetailModal" title="Discount Detail" hide-footer hide-header
        :scrollable="true">

        <button @click="closeModal" type="button" class="btnLogout" data-modal-hide="default-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
        </button>

        <div class="text-center my-3 text-xl">
            Discount Detail
        </div>

        <div class="my-3">
            <div class="">

                <img v-if="preview" loading="lazy" class="image" :src="preview" alt="Preview">

                <div v-else>
                    <img v-if="discount.discount_image" loading="lazy" class="image"
                        :src="getImage(discount.discount_image)" alt="Discount Image">

                    <img v-else loading="lazy" class="image"
                        src="https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"
                        alt="noImage">
                </div>


            </div>

            <div class=" mx-auto font-semibold text-xl">

                <b-button variant="primary"
                    class="max-w-fit text-white mx-auto bg-blue-400 hover:bg-blue-700 px-2 py-1 rounded-md"
                    onclick="document.getElementById('my-file').click()">Choose Image</b-button>
                <input type="file" style="display:none" accept="image/*" @change="previewImage" class="form-control-file"
                    id="my-file">
            </div>
        </div>

        <b-row class="my-2">
            <b-col sm="2">
                <label for="input-small">Code:</label>
            </b-col>
            <b-col sm="10">
                <b-form-input id="input-small" size="sm" placeholder="Enter discount code"
                    v-model="discount_code"></b-form-input>
            </b-col>
        </b-row>

        <b-row class="my-2">
            <b-col sm="2">
                <label for="input-small">Name:</label>
            </b-col>
            <b-col sm="10">
                <b-form-input id="input-small" size="sm" placeholder="Enter discount name"
                    v-model="discount_name"></b-form-input>
            </b-col>
        </b-row>

        <b-row class="my-2">
            <b-col sm="2">
                <label for="input-small">Value:</label>
            </b-col>
            <b-col sm="10">
                <b-form-input id="input-small" size="sm" placeholder="Enter discount value in percent"
                    v-model="discount_value"></b-form-input>
            </b-col>
        </b-row>

        <b-row class="my-2">
            <b-col sm="3">
                <label for="input-small">Description:</label>
            </b-col>
            <b-col sm="12">
                <b-form-textarea id="input-small" class="text-area" size="sm" placeholder="Enter discount description"
                    v-model="discount_description"></b-form-textarea>
            </b-col>
        </b-row>

        <b-row class="float-right my-2">
            <b-col>
                <b-button @click="closeModal">Close</b-button>
            </b-col>
            <b-col>
                <b-button v-if="acceptUpdateBtn" variant="primary" @click="ConfirmUpdated">Confirm</b-button>

                <b-button v-else variant="secondary" @click="ConfirmUpdated" :disabled="true">Confirm</b-button>
            </b-col>
        </b-row>



    </b-modal>
</template>

<script>

import { RepositoryFactory } from "../../apis/repositoryFactory";
const discountsRepo = RepositoryFactory.get("discounts");

export default {
    data() {
        return {
            showDiscountDetailModal: false,
            discount: null,
            discount_id: '',
            discount_name: '',
            discount_code: '',
            discount_value: '',
            discount_image: '',
            discount_description: '',
            preview: null,
            image: null,
            acceptUpdateBtn: false,
            isFirstChange: true
        }
    },
    methods: {
        previewImage(event) {
            var input = event.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.preview = e.target.result;
                }
                this.image = input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },
        closeModal() {
            this.showDiscountDetailModal = false
            this.resetModal()
        },
        resetModal() {
            this.isFirstChange = true
            this.acceptUpdateBtn = false
            this.discount = null
            this.preview = null
            this.image = null
        },
        getImage(url) {
            return this.$baseUrl + url
        },
        fillDiscountData(discount) {
            this.discount_name = discount.discount_name
            this.discount_code = discount.discount_code
            this.discount_value = discount.discount_value
            this.discount_description = discount.discount_description
            this.discount_id = discount._id
            this.discount_image = discount.discount_image
        },
        convertObjToFormData(obj) {
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
        },
        ConfirmUpdated() {

            const data = {
                discount_name: this.discount_name,
                discount_code: this.discount_code,
                discount_value: this.discount_value,
                discount_description: this.discount_description,
                discount_image: this.image,
            }

            const payload = this.convertObjToFormData(data)

            discountsRepo.updateDiscountById(this.discount_id, payload).then((result) => {
                this.closeModal()
                this.resetModal()
                this.$notify({
                    title: 'Notification',
                    text: 'Updated discount successfully.',
                    type: 'success'
                });
                this.$emit('reloadDiscounts')

            }).catch((err) => {
                this.$notify({
                    title: 'Notification',
                    text: err.response.data.message,
                    type: 'error'
                });
            })
        }

    },
    computed: {
        getAllDiscountProperty() {
            return `${this.discount_name}|${this.discount_code}|${this.discount_value}|${this.discount_description}|${this.preview}`;
        },

    },
    watch: {
        discount() {
            this.fillDiscountData(this.discount)
        },
        getAllDiscountProperty() {
            console.log(this.discount_name)
            if (!this.isFirstChange && this.discount_name && this.discount_code && this.discount_value && this.discount_description && (this.preview || this.discount_image)) {
                this.acceptUpdateBtn = true
            } else {
                console.log(false)
                this.isFirstChange = false;
            }

        }
    },

}
</script>

<style lang="css" scoped>
.image {
    width: 100%;
    height: 280px;
    object-fit: cover;
    object-position: center;
}

.text-area {
    height: 220px;
}

.btnLogout {
    width: 32px;
    height: 32px;
    text-align: center;
    justify-content: center;
    color: black;
    background: #fff;
    position: absolute;
    top: 12px;
    right: 12px;
}

btnLogout :hover {
    background: gray;
}
</style>