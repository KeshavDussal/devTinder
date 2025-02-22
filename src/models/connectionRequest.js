const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        },
        required: true
    }
}, { timestamps: true })
//ConnectionRequest.find({fromUserId: 67b3056ea3d80714849d5599, toUserId: 67b55bc1d282d3e4167ac930})
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 })
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    //Check if my fromUserId is same as toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("You can send connection request to yourself");
    }
    next();
})
const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;