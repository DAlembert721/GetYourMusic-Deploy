<template>
    <div>
        <AppBar @drawerChanged="setDrawer"></AppBar>
        <SideBar :drawer="drawer" @drawerChanged="setDrawer"></SideBar>
    </div>
</template>

<script>
    import AppBar from "@/components/navigation/AppBar";
    import SideBar from "@/components/navigation/SideBar";

    export default {
        name: "SideMenu",
        props:{

        },
        data() {
            return {
                drawer: false
            }
        },
        components: {SideBar, AppBar},
        methods: {
            setDrawer(newValue){
                this.drawer=newValue;
            }
        }
    }
</script>

<style scoped>

</style>
