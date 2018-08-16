let app = new Vue({
  el: "#container",
  data: {
    players: [],
    errorMessage: ""
  },
  async mounted() {
    let res = await fetch("players")
    if (!res.ok) {
      this.errorMessage = await res.text()
      console.error(this.errorMessage);
      setTimeout(() => {
        this.errorMessage = ""
      }, 2000);
    } else {
      this.players = await res.json()
    }
    this.players.sort((a,b) => a.score < b.score ? 1 : (a.score > b.score ? -1 : 0))
  }
})
setInterval(async () => {
  let res = await fetch("players")
  if (!res.ok) {
    app.errorMessage = await res.text()
    console.error(this.errorMessage);
    setTimeout(() => {
      app.errorMessage = ""
    }, 2000);
  } else {
    app.players = await res.json()
  }
  app.players.sort((a,b) => a.score < b.score ? 1 : (a.score > b.score ? -1 : 0))
}, 10000)