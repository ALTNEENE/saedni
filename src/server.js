import express, { urlencoded } from "express"
import "dotenv/config"
import connectDb from "./db.js"
import CaseModel from "./models/Case.model.js"


const app = express()

app.use(urlencoded())

app.get("/", async (req, res) => {
    try {
        const cases = await CaseModel.find({})

        if(!cases) res.status(404).json({
            message: "لم يتم العثور على حالات"
        })

        return res.status(200).json({
            message: "تم تحميل الحالات بنجاح",
            cases
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.log(error)
    }
})

app.post("/create", async (req, res) => {
    const data = req.body
    console.log(data)
    try {
        const theCase = await CaseModel.create(data)

        if(!theCase) {
            return res.status(400).json({
                message: "Error while creating a case"
            })
        }

        theCase.save()

        return res.status(201).json({
            message: "تم إنشاء الحالة بنجاح"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.listen(process.env.PORT, async () => {
    connectDb(process.env.MONGO_URI)
    console.log(`Server runnung on port: ${process.env.PORT}`)
})