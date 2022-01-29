<template>
<tbody class="bg-white divide-y divide-gray-200">
  <tr v-for="(person) in liwaData" :key="person.mainID" @click.prevent="sendToParent(person.mainID)">
    <td class="px-6 py-4 border-r border-gray-300 whitespace-nowrap">
      <div class="flex items-center">
        <div class="flex-shrink-0 h-10 w-10">
          <img class="h-10 w-10 rounded-full" :src="person.image" alt="" />
        </div>
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">
            {{ person.name }}
          </div>
          <div class="text-sm text-gray-500">
            {{ person.email }}
          </div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 border-r border-gray-300 whitespace-nowrap">
      <div class="text-sm text-gray-900">{{ person.title }}</div>
      <div class="text-sm text-gray-500">{{ person.department }}</div>
    </td>
    <td class="px-6 py-4 border-r border-gray-300 whitespace-nowrap">
      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        Active
      </span>
    </td>
    <td class="px-6 py-4 border-r border-gray-300 whitespace-nowrap text-sm text-gray-500">
      {{ person.role }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <!-- <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a> -->
      <div class="px-2 w-12 h-6 bg-yellow-200 text-indigo-600 hover:text-indigo-900 rounded" @click.stop.prevent="sendToParent(person.mainID)">Edit</div>
    </td>
  </tr>
</tbody>	

</template>

<script setup>
import { ref, toRefs } from 'vue' 

const props = defineProps({
  liwaData: []
})

const emits = defineEmits(["showDetail"])

const sendToParent = (idx) => { 
  emits("showDetail", idx)
}

</script>
