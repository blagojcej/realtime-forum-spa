<template>
    <div class="mt-3">
        <v-card>
            <v-card-title>
                <div class="headline">{{data.user}}</div>
                <div class="ml-2">said {{data.created_at}}</div>
                <v-spacer></v-spacer>
                <like :content="data"></like>
            </v-card-title>
            <v-divider></v-divider>
            <edit-reply v-if="editing" :reply="data"></edit-reply>
            <v-card-text v-else v-html="reply">
            </v-card-text>
            <v-divider></v-divider>
            <div v-if="!editing">
                <v-card-actions v-if="own">
                    <v-btn icon small @click.prevent="edit">
                        <v-icon color="orange">edit</v-icon>
                    </v-btn>
                    <v-btn icon small @click.prevent="destroy">
                        <v-icon color="red">delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </div>
        </v-card>
    </div>
</template>

<script>
    import EditReply from "./EditReply";
    import Like from "../likes/Like";

    export default {
        components: {EditReply, Like},
        name: "Reply",
        props: ['data', 'index'],
        data() {
            return {
                editing: false,
                beforeEditReplyBody: ''
            }
        },
        computed: {
            own() {
                return User.own(this.data.user_id);
            },
            reply() {
                return md.parse(this.data.reply);
            }
        },
        methods: {
            destroy() {
                EventBus.$emit('delete-reply', this.index);
            },
            edit() {
                this.editing = true;
                this.beforeEditReplyBody = this.data.reply;
            },
            listen() {
                EventBus.$on('cancel-edit-reply', (reply) => {
                    this.editing = false;
                    if (reply !== this.data.reply) {
                        this.data.reply = this.beforeEditReplyBody;
                        this.beforeEditReplyBody = '';
                    }
                });
            }
        },
        created() {
            this.listen();
        }
    }
</script>

<style scoped>

</style>
