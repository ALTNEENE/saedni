import mongoose from "mongoose"
import * as dns from "node:dns"

async function connectDb(uri) {
    
    try {
        dns.setServers(['1.1.1.1'])
        await mongoose.connect(uri)

        console.log("DB connected")
        
    } catch (error) {
        console.log("error connecting to mongoose", error)
        return
    }
}

export default connectDb