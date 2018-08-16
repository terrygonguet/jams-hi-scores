let app = new Vue({
  el: "#container",
  data: {
    players: []
  },
  methods: {
    async changeScore(player, score) {
      let res = await fetch(`score/${player}/${score}`, { method:"POST" })
      this.players = await res.json()
    }
  },
  async mounted() {
    let players = await fetch("players")
    this.players = await players.json()
  }
})