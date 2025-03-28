import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i <= 100) {
        const buf = Buffer.from(`${i}`)
  
        this.push(buf)
      } else {
        this.push(null)
      }
    }, 500)
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

class TransformNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const result = Number(chunk.toString()) * -1

    callback(null, Buffer.from(`${result}`))
  }
}

new OneToHundredStream()
  .pipe(new TransformNumberStream())  
  .pipe(new MultiplyByTenStream())