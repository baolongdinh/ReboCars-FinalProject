<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <div class="flex">
                <div>
                    <h3 class="mb-0 font-semibold text-xl">List Roles</h3>
                </div>

                <div>
                    <b-input-group
                        class="input-group-alternative input-group-merge shadow-2xl                                                                                                                                              ">
                        <b-form-input placeholder="Search" type="text" v-model="matchString"> </b-form-input>

                        <div @click="loadRoles()" class="input-group-append">
                            <span class="input-group-text"><i class="fas fa-search"></i></span>
                        </div>
                    </b-input-group>
                </div>

            </div>

            <div class="pt-3">
                <b-button @click="handleBtnAddRole()" variant="primary">Add new role</b-button>
            </div>

        </b-card-header>

        <el-table class="table-responsive table" v-if="loaded" header-row-class-name="thead-light" :data="roles">
            <el-table-column label="Role Name" min-width="210px">
                <template v-slot="{ row }">
                    <b-media no-body class="align-items-center">
                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{ row.name }}</span>
                        </b-media-body>
                    </b-media>
                </template>
            </el-table-column>
            <el-table-column label="Permissions" min-width="270px">

                <template v-slot="{ row }">
                    <b-media no-body class="align-items-center">

                        <b-media-body>

                            <select v-if="row.permissions.length > 0">
                                <option :value="row.permissions[0]" selected> {{ row.permissions[0].method }}
                                    -----------------
                                    {{ row.permissions[0].endpoint }} </option>
                                <option v-for="permission in row.permissions" :key="permission._id" :value="permission"
                                    :disabled="true">
                                    {{ permission.method }} ----------------- {{ permission.endpoint }}</option>
                            </select>

                            <span v-else class="text-center"> No permissions exists </span>

                        </b-media-body>
                    </b-media>
                </template>

            </el-table-column>

            <el-table-column label="Action" min-width="140px">
                <template v-slot="{ row }">

                    <b-button variant="primary" @click="handleShowRoleDetail(row)" class=" px-4 py-1 mt-2">
                        Detail
                    </b-button>


                    <b-button variant="danger" class="ml-1 px-4 py-1 mt-2" @click="handleBtnDeleteRole(row._id)">
                        Delete
                    </b-button>

                </template>
            </el-table-column>
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <paginate :page-count="pageCount" :page-range="3" :margin-pages="5" :click-handler="clickPageChange"
                :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
            </paginate>
        </b-card-footer>

        <role-detail-modal ref="roleDetailModal" @reloadRoles="loadRoles()"> </role-detail-modal>

        <add-role-modal ref="addRoleModal" @reloadRoles="loadRoles()"> </add-role-modal>

    </b-card>
</template>
<script>
import { Table, TableColumn } from 'element-ui'
import { RepositoryFactory } from "../../apis/repositoryFactory";
import RoleDetailModal from './RoleDetailModal.vue';
import AddRoleModal from './AddRoleModal.vue';
const rolesRepo = RepositoryFactory.get("roles");
export default {
    name: 'light-table',
    components: {
        RoleDetailModal,
        AddRoleModal,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn
    },
    data() {
        return {
            roles: {},
            currentPage: 1,
            limit: 6,
            matchString: "",
            timeout: null,
            pageCount: 1,
            loaded: false
        };
    },
    methods: {
        loadRoles() {
            rolesRepo.getRolesWithSearchString({ page: this.currentPage, limit: this.limit, matchString: this.matchString }).then((response) => {
                this.roles = response.data.metadata.roles
                console.log(this.roles)
                this.loaded = true
                // Number of users per page
                const totalRoles = response.data.metadata.totalRoles
                this.pageCount = Math.ceil(totalRoles / this.limit);
            })
        },
        getImage(url) {
            return this.$baseUrl + url
        },

        clickPageChange(pageNum) {
            this.currentPage = pageNum
            this.loadRoles()
        },
        handleShowRoleDetail(role) {
            this.$refs.roleDetailModal.showRoleDetailModal = true
            this.$refs.roleDetailModal.role = role
        },
        handleBtnAddRole() {
            this.$refs.addRoleModal.showAddRoleModal = true
        },
        handleBtnDeleteRole(id) {
            this.$dialog
                .confirm("Confirm to delete this role", {
                    loader: true // default: false - when set to true, the proceed button shows a loader when clicked.
                    // And a dialog object will be passed to the then() callback
                })
                .then(dialog => {
                    // Triggered when proceed button is clicked
                    // dialog.close() // stops the loader and close the dialog

                    rolesRepo.deleteRoleById(id).then((result) => {
                        this.$notify({
                            title: 'Notification',
                            text: 'Delete role success.',
                            type: 'success'
                        });
                        this.loadRoles()
                        dialog.close()

                    }).catch(err => {
                        this.$notify({
                            title: 'Notification',
                            text: err.response.data.message,
                            type: 'error'
                        });
                    })


                })
                .catch(() => {
                    // Triggered when cancel button is clicked

                    console.log('Delete aborted');
                });
        }
    },
    computed: {
    },
    watch: {
        matchString(value) {
            this.currentPage = 1
            this.loadRoles()
        },
        currentPage(value) {

        }
    },
    mounted() {
        this.loadRoles()
    },
}

</script>
<style lang="css">
.pagination {
    display: flex;
    justify-content: center;
    margin-left: 4px;
}

.page-item {
    display: inline-block;
    margin: 0 5px;
    padding: 8px 12px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    color: #000;
}

.page-item.active {
    background-color: #67ccf7;
    color: #ffffff;
    border-color: #67ccf7;
}

.page-item:hover {
    background-color: #67ccf7;
    color: #fff;
    border-color: #67ccf7;
}

.page-item:disabled {
    color: #ccc;
    cursor: not-allowed;
}

.custom-row {
    margin-left: -10px;
    margin-right: -10px;
}

.custom-row>.el-col {
    padding-left: 10px;
    padding-right: 10px;
}
</style>