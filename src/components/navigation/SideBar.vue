<template>
    <v-navigation-drawer  v-model="drawerFlag" app fixed temporary dark >
        <template v-slot:append>
            <v-list nav dense>
                <SideBarItem v-for="item in items" :key="item.title" :item="item"></SideBarItem>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>

<script>
    import SideBarItem from "@/components/navigation/SideBarItem";

    export default {
        name: "SideBar",
        components: {SideBarItem},
        props:{
            drawer:Boolean
        },
        created() {
            this.userType = localStorage.getItem('userType');
        },
        data: () => ({
            userType: '',
            items: [
                { title: 'Home', icon: 'HomeW', to: { name: 'home' } },
                { title: 'contracts', icon: 'ContractW', to: { name: 'contracts' } },
                { title: 'Messages', icon: 'ChatW', to: { name: 'messages' } },
                { title: 'Notifications', icon: 'NotificationW', to: { name: 'notifications' } },
                { title: 'Profile', icon: 'ProfileW', to: { name: 'profile' } }
            ]
        }),
        computed: {
            drawerFlag: {
                get: function () {
                    return this.drawer;
                },
                set: function (newValue) {

                    this.$emit('drawerChanged',newValue);
                }
            }
        }
    }
</script>

<style scoped>
.cambio{
        -webkit-overflow-scrolling: touch;
        display: flex;
        flex-direction: column;
        left: 0;
        max-width: 100%;
        overflow: hidden;
        pointer-events: auto;
        top: 0;
        transition-duration: .2s;
        transition-timing-function: cubic-bezier(.4,0,.2,1);
        will-change: transform;
        transition-property: transform,visibility,width;

}
</style>
