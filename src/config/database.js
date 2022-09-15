const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(()=> console.log('veritabanına bağlanıldı'))
.catch(err=> console.log(`veritabanı bağlantı hatası ${err}`))


