<template>
    <div>
        <div>
            <h3>Sortable control</h3>
            <div><a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Documents</a></div>
            <div><label><input type="checkbox" v-model="editable">Enable drag and drop</label></div>
            <div><button type="button" class="btn btn-default" @click="orderList">Sort by original order</button></div>
        </div>
        <div class="list-wrap">
            <div>
                <Draggable
                    tag="ul"
                    v-model="list"
                    v-bind="draggableOptions"
                    :move="onMove"
                    @start="isDragging = true"
                    @end="isDragging = false"
                >
                    <transition-group type="transition" :name="'list'">
                        <template v-for="v in list">
                            <li :key=" v.id">
                                {{ v.value }}
                            </li>
                        </template>
                    </transition-group>
                </Draggable>
            </div>

            <div>
                <pre>{{ listString }}</pre>
            </div>
        </div>
    </div>
</template>

<script>
const listItems = [
    'items-0',
    'items-1',
    'items-2',
    'items-3',
    'items-4',
    'items-5',
    'items-6',
    'items-7',
    'items-8',
    'items-9'
].map((value, index) => ({ id: index + 1, value, index }));

export default {
    data() {
        return {
            list: listItems,
            editable: true,
            isDragging: false,
            delayedDragging: false
        };
    },
    computed: {
        listString() {
            return JSON.stringify(this.list, null, 2);
        },
        draggableOptions() {
            return {
                group: 'description',
                animation: 0,
                ghostClass: 'ghost',
                disabled: !this.editable
            };
        }
    },
    watch: {
        'isDragging': {
            handler: function(nV) {
                if (nV) return this.delayedDragging = true;

                this.$nextTick(() => this.delayedDragging = false);
            }
        }
    },
    methods: {
        orderList() {
            this.list = this.list.sort((a, b) => a.id - b.id);
        },
        onMove({ relatedContext: rc, draggedContext: dc }) {
            const rEl = rc.element;
            const dEl = dc.element;

            return (!rEl || !rEl.fixed) && !dEl.fixed;
        }
    }
};
</script>

<style>
.ghost { background: #c8ebfb; opacity: 0.5; }

.list-wrap { display: flex; }
.list-wrap div { width: 50%; }
.list-wrap ul { width: 100%; min-height: 20px; }
.list-wrap ul li { border: 1px solid #ccc; cursor: move; }
</style>
