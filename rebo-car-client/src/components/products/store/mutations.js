export default { 
    setProductList(state, productList) { 
        state.productList = productList
    },
    setProductsLoading(state, trueOrFalse){
        state.productsLoading = trueOrFalse
    }
}