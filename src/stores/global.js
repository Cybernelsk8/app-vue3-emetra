import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useGlobalStore = defineStore('global', () => {

    // AÑOS
    //----------------------------------------
    const year = new Date()
    //----------------------------------------

    // INICIO SIDEBAR
    //----------------------------------------
    const showSide = ref(false)

    const toggleSide = () => {
        showSide.value = !showSide.value
    }
    //----------------------------------------
    // FIN SIDEBAR

    // INICIO TITLE PAGE
    //----------------------------------------

    const titlePage = ref({
        title : '',
        icon : 'fas fa-home',
        textColor : 'text-white',
        color : 'bg-blue-muni'
    })

    function changeTitlePage (title = 'Home',icon = 'fas fa-home',color = 'bg-blue-muni',textColor = 'text-white') {
        titlePage.value.title = title
        titlePage.value.icon = icon
        titlePage.value.textColor = textColor
        titlePage.value.color = color
    }   
    //----------------------------------------
    // FIN TITLE PAGE


    // INICIO ALERTA TOAST
    //----------------------------------------
    const toast = ref({
        message: '',
        type: '',
        title: ' A T E N C I O N '
    })

    function setAlert(message,type,title = ' A T E N C I O N '){
        toast.value.message = message
        toast.value.type = type
        toast.value.title = title
    }
    //----------------------------------------
    // FIN ALERTA TOAST





    return {
        showSide,
        toggleSide,

        titlePage,
        changeTitlePage,

        toast,
        setAlert,

        year,
    }
})