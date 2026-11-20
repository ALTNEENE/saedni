import mongoose, { Schema } from "mongoose";


const CaseSchema = new Schema({
    status: {
      type: String,
      required: true  
    },
    party: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    }
}, {timestamps: true})

const CaseModel = mongoose.model("Case", CaseSchema)

export default CaseModel


