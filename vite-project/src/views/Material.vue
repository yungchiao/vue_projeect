<template>
    <div>
      <!-- 服裝列表 -->
      <div v-for="(clothing, index) in clothingList" :key="clothing.id">
        <!-- 服裝名稱 -->
        <div @click="toggleMaterials(clothing.id)">
          {{ clothing.name }}
        </div>
  
        <!-- 材質列表：只有當前被選中的服裝才展開 -->
        <div v-if="expandedClothingId === clothing.id">
          <div v-for="material in paginatedMaterials" :key="material.id" class="material-item">
            {{ material.name }}
            <button @click="deleteMaterial(clothing.id, material.id)">刪除</button>
          </div>
          <!-- 分頁控制 -->
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">上一頁</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">下一頁</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name:'material',
    data() {
      return {
        clothingList: [
          {
            id: 1,
            name: "外套",
            materials: [
              { id: 1, name: "棉" },
              { id: 2, name: "羊毛" },
              { id: 3, name: "聚酯纖維" },
              { id: 4, name: "尼龍" },
              { id: 5, name: "亞麻" }
            ]
          },
          {
            id: 2,
            name: "T恤",
            materials: [
              { id: 1, name: "棉" },
              { id: 2, name: "聚酯纖維" },
              { id: 3, name: "人造絲" },
              { id: 4, name: "麻布" }
            ]
          }
        ],
        expandedClothingId: null, // 目前展開的服裝ID
        currentPage: 1, // 當前的分頁頁碼
        itemsPerPage: 4 // 每頁顯示的材質數量
      };
    },
    computed: {
      // 根據當前選中的服裝和當前頁碼來計算分頁後的材質列表
      paginatedMaterials() {
        const currentClothing = this.clothingList.find(
          (clothing) => clothing.id === this.expandedClothingId
        );
        if (!currentClothing) return [];
  
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return currentClothing.materials.slice(start, end);
      },
      // 計算總頁數
      totalPages() {
        const currentClothing = this.clothingList.find(
          (clothing) => clothing.id === this.expandedClothingId
        );
        if (!currentClothing) return 1;
        return Math.ceil(currentClothing.materials.length / this.itemsPerPage);
      }
    },
    methods: {
      // 切換展開的服裝，如果同一個服裝被點擊，則收起
      toggleMaterials(clothingId) {
        if (this.expandedClothingId === clothingId) {
          this.expandedClothingId = null; // 收起
        } else {
          this.expandedClothingId = clothingId; // 展開新的服裝
          this.currentPage = 1; // 每次展開時，將頁碼重置為1
        }
      },
      // 刪除某個服裝的材質
      deleteMaterial(clothingId, materialId) {
        const clothing = this.clothingList.find(
          (item) => item.id === clothingId
        );
        if (clothing) {
          clothing.materials = clothing.materials.filter(
            (material) => material.id !== materialId
          );
          if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
          }
        }
      },
      // 分頁控制：上一頁
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      // 分頁控制：下一頁
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .material-item {
    margin: 10px 0;
  }
  .pagination {
    margin-top: 10px;
  }
  </style>
  