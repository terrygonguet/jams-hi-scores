let app = new Vue({
  el: "#container",
  data: {
    players: [],
    inputEnabled: true,
    addEnabled: true,
    saveEnabled: true,
    newName: "",
    errorMessage: "",
  },
  methods: {
    async changeScore(player, score) {
      this.inputEnabled = false
      let res = await fetch(`score/${player}/${score}`)
      if (!res.ok) {
        this.errorMessage = await res.text()
        this.clearError()
      } else {
        this.players = await res.json()
      }
      this.players.sort((a,b) => a.score < b.score ? 1 : (a.score > b.score ? -1 : 0))
      this.inputEnabled = true
    },
    async addPlayer() {
      if (!this.newName) {
        this.errorMessage = "Name cannot be empty"
        return this.clearError()
      }
      this.addEnabled = false
      let res = await fetch(`add/${this.newName}/0`)
      if (!res.ok) {
        this.errorMessage = await res.text()
        this.clearError()
      } else {
        this.players = await res.json()
      }
      this.players.sort((a,b) => a.score < b.score ? 1 : (a.score > b.score ? -1 : 0))
      this.newName = ""
      this.addEnabled = true
    },
    async removePlayer(name) {
      this.inputEnabled = false
      let res = await fetch(`remove/${name}`)
      if (!res.ok) {
        this.errorMessage = await res.text()
        this.clearError()
      } else {
        this.players = await res.json()
      }
      this.players.sort((a,b) => a.score < b.score ? 1 : (a.score > b.score ? -1 : 0))
      this.inputEnabled = true
    },
    clearError() {
      console.error(this.errorMessage);
      setTimeout(() => {
        this.errorMessage = ""
      }, 2000);
    }
  },
  async mounted() {
    let res = await fetch("players")
    if (!res.ok) {
      this.errorMessage = await res.text()
      this.clearError()
    } else {
      this.players = await res.json()
    }
    this.players.sort((a,b) => a.score < b.score ? 1 : (a.score > b.score ? -1 : 0))
  }
})