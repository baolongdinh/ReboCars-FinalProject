<template>
    <b-modal v-if="role" class="" v-model="showRoleDetailModal" title="Role Detail" hide-footer hide-header
        :scrollable="true">

        <button @click="closeModal" type="button" class="btnLogout" data-modal-hide="default-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
        </button>

        <div class="text-center my-3 text-xl">
            Role Detail
        </div>


        <b-row class="my-2">
            <b-col sm="2">
                <label for="input-small">Name:</label>
            </b-col>
            <b-col sm="10">
                <b-form-input id="input-small" size="sm" placeholder="Enter role name" v-model="name"></b-form-input>
            </b-col>
        </b-row>

        <b-row class="my-2">
            <b-col sm="2">
                <label for="input-small">Description:</label>
            </b-col>
            <b-col sm="12">
                <b-form-textarea id="input-small" class="text-area" size="sm" placeholder="Enter role description"
                    v-model="description"></b-form-textarea>
            </b-col>
        </b-row>

        <b-row class="my-2">
            <b-col sm="3">
                <label for="input-small">Permissions:</label>
            </b-col>
            <b-col sm="9">
                <b-button class="float-right" variant="primary" @click="handleSelectAllPermissions()"> Check all
                </b-button>
            </b-col>

            <b-col sm="12" class="mt-2">
                <div class="container">
                    <div v-for="(permission, index) in listPermissions" :key="index">
                        <div class="text-base font-normal flex">
                            <input class="rounded" type="checkbox" :value="permission" v-model="permissions" />
                            <label for="checkbox" class="ml-1 my-auto">
                                {{ permission.method }} -- {{ permission.endpoint }}
                            </label>

                        </div>
                    </div>
                </div>
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
const rolesRepo = RepositoryFactory.get("roles");

export default {
    data() {
        return {
            showRoleDetailModal: false,
            role: null,
            roleId: '',
            name: '',
            description: '',
            permissions: [],
            acceptUpdateBtn: false,
            isFirstChange: true,
            listPermissions: [
                {
                    endpoint: "users",
                    method: "GET"
                },
                {
                    endpoint: "users",
                    method: "PUT"
                },
                {
                    endpoint: "users",
                    method: "POST"
                },
                {
                    endpoint: "users",
                    method: "DELETE"
                },
                {
                    endpoint: "cars",
                    method: "GET"
                },
                {
                    endpoint: "cars",
                    method: "PUT"
                },
                {
                    endpoint: "cars",
                    method: "POST"
                },
                {
                    endpoint: "cars",
                    method: "DELETE"
                },
                {
                    endpoint: "discounts",
                    method: "GET"
                },
                {
                    endpoint: "discounts",
                    method: "PUT"
                },
                {
                    endpoint: "discounts",
                    method: "POST"
                },
                {
                    endpoint: "discounts",
                    method: "DELETE"
                },
                {
                    endpoint: "roles",
                    method: "GET"
                },
                {
                    endpoint: "roles",
                    method: "PUT"
                },
                {
                    endpoint: "roles",
                    method: "POST"
                },
                {
                    endpoint: "roles",
                    method: "DELETE"
                },
                {
                    endpoint: "orders",
                    method: "GET"
                },
                {
                    endpoint: "orders",
                    method: "PUT"
                },
                {
                    endpoint: "orders",
                    method: "POST"
                },
                {
                    endpoint: "orders",
                    method: "DELETE"
                },
            ]
        }
    },
    methods: {
        closeModal() {
            this.showRoleDetailModal = false
            this.resetModal()
        },
        resetModal() {
            this.isFirstChange = true
            this.acceptUpdateBtn = false
            this.role = null
        },
        fillRoleData(role) {
            this.roleId = role._id
            this.name = role.name
            this.description = role.description
            this.permissions = role.permissions
        },
        handleSelectAllPermissions() {
            this.permissions = this.listPermissions
        },
        ConfirmUpdated() {

            const payload = {
                name: this.name,
                description: this.description,
                permissions: this.permissions,
            }

            rolesRepo.updateRoleById(this.roleId, payload).then((result) => {
                console.log({ result })
                this.closeModal()
                this.$notify({
                    title: 'Notification',
                    text: 'Updated role successfully.',
                    type: 'success'
                });
                this.$emit('reloadRoles')

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
        getAllRoleProperty() {
            return `${this.name}|${this.description}|${this.permissions}`;
        }
    },
    watch: {
        role() {
            this.fillRoleData(this.role)
        },
        getAllRoleProperty() {
            console.log('change')
            if (!this.isFirstChange && this.name && this.description) {
                this.acceptUpdateBtn = true
            } else {
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
    height: 130px;
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

.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* Three equal-width columns */
}
</style>