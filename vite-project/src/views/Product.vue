<template>
    <table class="table mt-4">
  <thead>
    <tr>
      <th width="120">分類</th>
      <th>產品名稱</th>
      <th width="120">原價</th>
      <th width="120">售價</th>
      <th width="100">是否啟用</th>
      <th width="200">編輯</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in products" :key="item.id">
      <td>{{ item.category }}</td>
      <td>{{ item.title }}</td>
      <td class="text-left">
        {{ item.origin_price }}
      </td>
      <td class="text-left">
        {{ item.price }}
      </td>
      <td>
        <span class="text-success" v-if="item.is_enabled">啟用</span>
        <span class="text-success" v-else>未啟用</span>
      </td>
      <td>
        <div class="btn-group">
          <button class="btn btn-outline-primary btn-sm">編輯</button>
          <button class="btn btn-outline-danger btn-sm">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<button @click="goToMaterial">查看材質</button>
</template>

<script>
export default{
    data(){
        return{
            products:[],
            pagination:{},
        }
    },
    methods:{
        getProducts(){
           
			const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/products?page=:page`;
			this.$http.get(api).then((res) => {
				this.products = res.data.products;
				this.pagination = res.data.pagination;
        }	
				
			);
		},
    goToMaterial(){
      this.$router.push({ name: 'material' });
    }
        },
    
    created(){
        this.getProducts();
    }
}
</script>