<template>
    <div class="text-center">
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs"
                       v-on="on">
                    <v-icon :color="color">notification_important</v-icon> {{unreadCount}}
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="unread_not in unread" :key="unread_not.id">
                    <router-link :to="unread_not.path">
                        <v-list-item-title @click="readNotification(unread_not)">{{unread_not.question}}</v-list-item-title>
                    </router-link>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item v-for="read_not in read" :key="read_not.id">
                    <v-list-item-title>{{read_not.question}}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
    export default {
        name: "AppNotification",
        data() {
            return {
                read: {},
                unread: {},
                unreadCount: 0,
                sound: "https://soundbible.com/mp3/glass_ping-Go445-1207030150.mp3"
            }
        },
        created() {
            if(User.loggedIn()) {
                this.getNotifications();
            }

            Echo.private('App.User.' + User.id())
                .notification((notification) => {
                    this.playSound();
                    this.unread.unshift(notification)
                    this.unreadCount++;
                });
        },
        computed: {
            color() {
                return this.unreadCount > 0 ? 'red' : 'red lighten-4';
            }
        },
        methods: {
            getNotifications() {
                axios.post(`/api/notifications`)
                .then(res => {
                    this.read = res.data.read;
                    this.unread = res.data.unRead;
                    this.unreadCount = res.data.unRead.length;
                })
                .catch(e => {
                    Exception.handle(e);
                });
            },
            readNotification(notification) {
                axios.post(`/api/markAsRead`, {id: notification.id})
                .then(res => {
                    this.unread.splice(notification, 1);
                    this.read.push(notification);
                    this.unreadCount--;
                })
            },
            playSound() {
                let alert = new Audio(this.sound);
                alert.play();
            }
        }
    }
</script>

<style scoped>

</style>
