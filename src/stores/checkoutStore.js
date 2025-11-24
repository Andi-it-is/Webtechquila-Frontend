import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    orderId: null,
    orderData: null,
  }),

  actions: {

    getOrderId() {
      return this.orderId
    },

    getOrderData() {
      return this.orderData
    },

    setOrderId(id) {
      this.orderId = id
    },

    setOrderData(data) {
      this.orderData = data
    },

    clear() {
      this.orderId = null
      this.orderData = null
    }
  }
})
