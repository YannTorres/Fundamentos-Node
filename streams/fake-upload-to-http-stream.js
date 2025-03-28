import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i <= 10) {
        const buf = Buffer.from(`${i}`)
  
        this.push(buf)
      } else {
        this.push(null)
      }
    }, 500)
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half'
}).then(response => {
  response.text().then(data => {
    console.log(data)
  })
})