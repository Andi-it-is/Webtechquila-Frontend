import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore('checkout', {

  state: () => ({

    // handled by q-input 
    guests: null,
    date: null,

    // handled 2 ways
    time: null,
    tableId: null,

    // keep hidden from user
    bestFit: null
  }),

  actions: {

    getTableId() {
      return this.tableId
    },

    setGuestsDate(guests, date) {
      this.guests = guests
      this.date = date
    },

    setTime(time) {
      this.time = time
    },

    setTableId(id) {
      this.tableId = id
    },

    setBestFit(data) {
      this.bestFit = data
    },

    getEverything() {
      let obj = {
        guests: this.guests,
        date: this.date,
        time: this.time,
        tableId: this.tableId,
        bestFit: this.bestFit
      }

      return obj
    },

    clear() {
      this.guests = null
      this.date = null
      this.time = null
      this.tableId = null
      this.bestFit = null
    }
  }
})
