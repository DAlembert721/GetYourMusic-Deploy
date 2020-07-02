<template>
    <section>
        <Navigation :userType="userType"></Navigation>
        <v-main>
            <v-card class="ma-5 d-flex" v-for="notification in notifications" :key="notification.id">
                <v-card-text>
                    {{ notification.text }}
                </v-card-text>
<!--                <v-card-actions>-->
<!--                    <v-btn text small color="purple darken-2" @click="deleteNotification(notification.id)">OK</v-btn>-->
<!--                </v-card-actions>-->
            </v-card>
        </v-main>
    </section>
</template>

<script>
    import Navigation from "./navigation/Navigation";
    import NotificationDataService from "../services/NotificationDataService";

    export default {
        name: "Notifications",
        components: {Navigation},
        data: () => ({
            userType: '',
            notifications: Array
        }),
        mounted() {
            this.userType = localStorage.getItem('userType');
            NotificationDataService.getAllByAccountIdAsync(+localStorage.getItem('id')).then(response => {
                this.notifications = response.data;
            });
        },
        methods: {
            // deleteNotification(notificationId) {
            //     // TODO: Delete notification
            //     console.log(notificationId);
            // }
        }
    }
</script>

<style scoped>
    section{
        height: 100%;
        width: 100%;
        color: #ffff;
        background: linear-gradient(45deg, #c074b2, #8ab5e8) ;
        margin: 0;
        overflow-y: scroll;
        position: absolute;
        display: inline-table;
        background-attachment: fixed;
    }
</style>
