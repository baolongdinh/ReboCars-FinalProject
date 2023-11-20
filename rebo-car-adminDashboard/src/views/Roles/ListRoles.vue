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

                            <select>
                                <option :value="row.permissions[0]" selected> {{ row.permissions[0].method }}
                                    -----------------
                                    {{ row.permissions[0].endpoint }} </option>
                                <option v-for="permission in row.permissions" :key="permission._id" :value="permission"
                                    :disabled="true">
                                    {{ permission.method }} ----------------- {{ permission.endpoint }}</option>
                            </select>

                        </b-media-body>
                    </b-media>
                </template>

            </el-table-column>

            <el-table-column label="Action" min-width="150px">
                <template v-slot="{ row }">

                    <button class="px-4 py-1">
                        Update
                    </button>


                    <button class="px-4 py-1 mt-2">
                        Delete
                    </button>

                </template>
            </el-table-column>
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <paginate :page-count="pageCount" :page-range="3" :margin-pages="5" :click-handler="clickPageChange"
                :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
            </paginate>
        </b-card-footer>
    </b-card>
</template>
<script>
import { Table, TableColumn } from 'element-ui'
import { RepositoryFactory } from "../../apis/repositoryFactory";
const rolesRepo = RepositoryFactory.get("roles");
export default {
    name: 'light-table',
    components: {
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