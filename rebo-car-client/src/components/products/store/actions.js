export default {
  async updateProductList({ commit, state}) {
    try {
      const data = await fetch("https://dummyjson.com/products").then(res=>res.clone().json())
      commit("setProductList", data.products);
      console.log('action UpdateProduct', data.products)
      commit("setProductsLoading", false);

    } catch (error) {
      console.error(error);
    }
  },

  deleteProduct({commit,state}, productId ) { 
    try {
      const newProductList = state.productList.filter(products => products.id != productId)
      commit('setProductList', newProductList) 
      
    } catch (error) {
      
    }
  }
};
