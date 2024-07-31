<script setup>
    const props = defineProps({
        icon: '',
        title: '',
        option: '',
        modelValue: '',
        error: false
    })
    defineEmits(['update:modelValue'])
    defineOptions({
        inheritAttrs: false
    })
</script>

<template>
    <div v-if="props.option === 'label'" class="relative mb-3">
        <input
            v-bind="$attrs"
            :class="{'border-red-500' : props.error }"
            class="peer m-0 block h-[58px] bg-white rounded border-2 focus-within:border-blue-400 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
            placeholder="name@example.com"
            :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)"
        />
        <label
            class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 font-bold transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-gray-400 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none uppercase">
            {{ props.title }}
        </label>
    </div>
    <div v-else class="input flex items-center bg-white" :class="{'border-red-500' : props.error }" >
        <Icon v-if="props.icon" :icon="props.icon" class="text-gray-500 mr-2" />
        <input v-bind="$attrs" :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)"  class="focus:outline-none h-auto text-lg w-full">
    </div>
</template>