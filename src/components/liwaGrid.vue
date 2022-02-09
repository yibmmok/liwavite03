<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="liwaData.length">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="barPanel relative">
            {{ tblTitle }}
            <div class="top-icon add absolute left-[3px] top-[9px]" @click="showDetail('')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="#fee" viewBox="-1 -1 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke="#fee" stroke-linejoin="round" stroke-width="6" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-x divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 border-r border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    姓名
                  </th>
                  <th scope="col" class="px-6 py-3 border-r border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    職稱
                  </th>
                  <th scope="col" class="px-6 py-3 border-r border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    在職狀態
                  </th>
                  <th scope="col" class="px-6 py-3 border-r border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    角色
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <singleCol 
                :liwaData="liwaData" 
                @setMainID="setMainID"
              />
            </table>
          </div>
        </div>
      </div>
    </div>    
  </div>
   <div v-else>載入中...</div>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue"
import singleCol from "./singleCol.vue"

const tblTitle = '人員列表'
const detailTitle = ref('')
const mainID = ref('')
const action = ref('')

const liwaData = ref([])
const error = ref(null)

const emits = defineEmits(["showDetail"])

const load = async () => {
  try {
   let data = await fetch("http://localhost:8102/tmp_havePeople.php?mainID=")
    if (!data.ok) {
      throw Error('無法載入資料')
    }
   let res = await data.json()
   liwaData.value = res.people
  }
  catch (err) {
      error.value = err.message
      console.log(error.value)
  }
}

const setMainID = (idx) => {
  emits("showDetail", idx)
}

load()

</script>
