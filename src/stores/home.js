
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue'
import { useGlobalStore } from './global'


 export const useHomeStore = defineStore('home', () => {
    

    const global = useGlobalStore()

    const headers = [
        { title : 'id', key : 'id' },
        { title : 'estudiante', key : 'student.name' },
        { title : 'correo', key : 'student.email' },
        { title : 'materia', key : 'subject.name' },
        { title : 'Nota', key : 'score' },
        { title : '', key : 'actions', width : '20px' }
    ]
    const grades = ref([])
    const subjects = ref([])
    const students = ref([])
    const loading = ref(false)
    const errors = ref([])
    const grade = ref({})
    const openModalNew = ref(false)
    const openModalEdit = ref(false)
    const openModalDelete = ref(false)
    const loadingProcess = ref(false)

    const fetch = () => {
        loading.value = true
        axios.get('grade/grades')
        .then(response => {
            if (!response.data.error) {
				grades.value = response.data
			} else {
				errors.value = { error: [response.data.error] }
			}
        })
        .catch(err => {
			errors.value = err.response.data.errors
		})
		.finally(() => loading.value = false)
    }

    const fetchSubjects = () => {
        axios.get('grade/subjects')
        .then(response => {
            if (!response.data.error) {
				subjects.value = response.data
			} else {
				errors.value = { error: [response.data.error] }
			}
        })
        .catch(err => {
			errors.value = err.response.data.errors
		})
    }

    const fetchStudents = () => {
        axios.get('grade/students')
        .then(response => {
            if (!response.data.error) {
				students.value = response.data
			} else {
				errors.value = { error: [response.data.error] }
			}
        })
        .catch(err => {
			errors.value = err.response.data.errors
		})
    }

    const edit = (item) => {
        openModalEdit.value = true
        grade.value = item
    }

    const trash = (item) => {
        openModalDelete.value = true
        grade.value = item
    }

    const update = () => {
        loadingProcess.value = true
        axios.post('grade/update/'+ grade.value.id,{
            user_id : grade.value.user_id,
            subject_id : grade.value.subject_id,
            score : grade.value.score,
        })
        .then(response => {
            if (!response.data.error) {
				global.setAlert(response.data,'success')
                fetch()
                resetData()
			} else {
				errors.value = { error: [response.data.error] }
			}
        })
        .catch(err => {
			errors.value = err.response.data.errors
		})
        .finally(() => loadingProcess.value = false)

    }

    const store = () => {
        loadingProcess.value = true
        axios.post('grade/store',{
            user_id : grade.value.user_id,
            subject_id : grade.value.subject_id,
            score : grade.value.score,
        })
        .then(response => {
            if (!response.data.error) {
				global.setAlert(response.data,'success')
                fetch()
                resetData()
			} else {
				errors.value = { error: [response.data.error] }
			}
        })
        .catch(err => {
			errors.value = err.response.data.errors
		})
        .finally(() => loadingProcess.value = false)

    }

    const destroy = () => {
        loadingProcess.value = true
        axios.post('grade/destroy/' + grade.value.id)
        .then(response => {
            if (!response.data.error) {
				global.setAlert(response.data,'success')
                fetch()
                resetData()
			} else {
				errors.value = { error: [response.data.error] }
			}
        })
        .catch(err => {
			errors.value = err.response.data.errors
		})
        .finally(() => loadingProcess.value = false)

    }

    const resetData = () => {
        errors.value = []
        grade.value = {}
        openModalNew.value = false
        openModalEdit.value = false
        openModalDelete.value = false
    }

    return {
         headers,
         grades,
         subjects,
         students,
         grade,
         loading,
         errors,
         openModalNew,
         openModalEdit,
         openModalDelete,

         fetch,
         edit,
         trash,
         resetData,

         fetchSubjects,
         fetchStudents,

         update,
         destroy,
         store,
    }
 });
 