<template>
    <div>
        <base-header class="pb-2 pt-2 pt-md-8 bg-gradient-success">
            <!-- Card stats -->

        </base-header>
        <b-container fluid class="mt-4">
            <b-row>
                <b-col>
                    <ListDiscounts />
                </b-col>
            </b-row>

        </b-container>
    </div>
</template>
<script>
import ListDiscounts from './ListDiscounts.vue';


export default {
    components: {
        ListDiscounts
    },
    data() {
        return {

        }
    }
};
</script>
<style>
.el-table.table-dark {
    background-color: #172b4d;
    color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr {
    background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf {
    border-bottom: none;
}
</style>
