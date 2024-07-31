<script setup>
    import { onMounted } from 'vue'
    import { useHomeStore } from '../stores/home'

    const store = useHomeStore()

    onMounted(() => {
        store.fetch()
        store.fetchSubjects()
        store.fetchStudents()
    })
</script>

<template>
    <div class="flex justify-center">
        <Button @click="store.openModalNew = true" text="Nuevo registro" icon="fas fa-plus" class="btn-success shadow-green-800"/>
    </div>
    <Data-Table :headers="store.headers" :data="store.grades" :loading="store.loading">
        <template #actions="{item}">
            <div class="flex gap-3">
                <Tool-Tip message="Editar" class="-mt-8">
                    <Icon @click="store.edit(item)" icon="far fa-edit" class="text-2xl hover:text-blue-500" />
                </Tool-Tip>
                <Tool-Tip message="Borrar" class="-mt-8">
                    <Icon @click="store.trash(item)" icon="far fa-trash-can" class="text-2xl hover:text-red-500" />
                </Tool-Tip>
            </div>
        </template>
    </Data-Table>
    
    <Modal :open="store.openModalEdit">
        <template #head>
            <div class="p-4">
                <h1 class="text-2xl font-semibold text-gray-400">
                    Editar registro
                </h1>
            </div>
        </template>
        <div class="p-4 grid gap-3 w-72">
            <h1 class="text-2xl font-semibold text-center text-gray-600">
                {{ store.grade?.student?.name }}
            </h1>
            <label>
                Materia:
                <select class="input" v-model="store.grade.subject_id">
                    <option selected>Seleccione materia</option>
                    <option v-for="subject in store.subjects" :value="subject.id">{{ subject.name }}</option>
                </select>
            </label>
            <label>
                Nota: 
                <Input v-model="store.grade.score" icon="fas fa-calculator" type="number" min="0" max="100" class="w-full" placeholder="Nota" />
            </label>
        </div>
        <template #foot> 
            <hr class="mt-4">
            <div class="flex justify-around items-center py-4">
                <Button @click="store.resetData" text="Cancelar" icon="fas fa-xmark" class="btn-danger shadow-red-800 rounded-full" />
                <Button @click="store.update" text="Guardar" icon="fas fa-save" class="btn-dark shadow-black rounded-full" />
            </div>
        </template>
    </Modal>

    <Modal :open="store.openModalDelete">
        <div class="flex items-center gap-2 p-5">
            <Icon icon="fas fa-triangle-exclamation" class="text-6xl text-orange-500" />
            <h1 class="text-gray-700 font-bold text-xl">
                ¿ Esta seguro de eliminar el registro ?
            </h1>
        </div>
        <template #foot> 
            <hr class="mt-4">
            <div class="flex justify-around items-center py-4">
                <Button @click="store.resetData" text="Cancelar" icon="fas fa-xmark" class="btn-danger shadow-red-800 rounded-full" />
                <Button @click="store.destroy" text="Si, estoy seguro" icon="fas fa-check" class="btn-dark shadow-black rounded-full" />
            </div>
        </template>
    </Modal>
    
    <Modal :open="store.openModalNew">
        <template #head>
            <div class="p-4">
                <h1 class="text-2xl font-semibold text-gray-400">
                    Editar registro
                </h1>
            </div>
        </template>
        <div class="p-4 grid gap-3 w-72">
            <label>
                Estudiante:
                <select class="input" v-model="store.grade.user_id">
                    <option selected>Seleccione estudiante</option>
                    <option v-for="student in store.students" :value="student.id">{{ student.name }}</option>
                </select>
            </label>
            <label>
                Materia:
                <select class="input" v-model="store.grade.subject_id">
                    <option selected>Seleccione materia</option>
                    <option v-for="subject in store.subjects" :value="subject.id">{{ subject.name }}</option>
                </select>
            </label>
            <label>
                Nota: 
                <Input v-model="store.grade.score" icon="fas fa-calculator" type="number" min="0" max="100" class="w-full" placeholder="Nota" />
            </label>
        </div>
        <template #foot> 
            <hr class="mt-4">
            <div class="flex justify-around items-center py-4">
                <Button @click="store.resetData" text="Cancelar" icon="fas fa-xmark" class="btn-danger shadow-red-800 rounded-full" />
                <Button @click="store.store" text="Guardar" icon="fas fa-save" class="btn-dark shadow-black rounded-full" />
            </div>
        </template>
    </Modal>

</template>

