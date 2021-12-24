import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import DiningsDAO from "./dao/diningsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.DINEREVIEWS_DB_URI,
    {
        maxpoolSize: 50,
        wtimeoutMS: 2500,
        //useNewUrlParse: true
    }
    
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await DiningsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})
