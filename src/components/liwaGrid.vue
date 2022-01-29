<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="liwaData.length">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="barPanel relative">
            {{ tblTitle }}
            <div class="top-icon add absolute left-[3px] top-[9px]" @click="showDetail('')"></div>
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
                @showDetail="showDetail"
              />
            </table>
          </div>
        </div>
      </div>
    </div>    
  </div>
   <div v-else>載入中...</div>

<!--   <liwaModal 
    v-if="isModal"
    :mainID="mainID"
    :detailTitle="detailTitle"
    :action="action"
    @hideDetail="hideDetail"
  /> -->
</template>

<script setup>
import { ref, reactive, toRefs } from "vue"
import singleCol from "./singleCol.vue"
// import liwaModal from "./liwaModal.vue"

const tblTitle = '人員列表'
const isModal = ref(false)
const detailTitle = ref('')
const mainID = ref('')
const action = ref('')

const liwaData = ref([])
const error = ref(null)

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

const toggleModal = () => {  
  isModal.value = !isModal.value
}

const hideDetail = () => {
  isModal.value = false
}

const showDetail = (idx) => {
  mainID.value = idx
  if (idx !== "") {
    detailTitle.value = '修改員工聯絡資料'
    action.value = 'view'
    isModal.value = true
  } else {
    detailTitle.value = '新增員工聯絡資料'
    action.value = 'add'
    isModal.value = true
  }
}

load()

</script>
