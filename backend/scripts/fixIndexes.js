import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const fixIndexes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        const collection = mongoose.connection.collection("users");

        // List indexes to be sure
        const indexes = await collection.indexes();
        console.log("Current Indexes:", indexes.map(i => i.name));

        const phoneIndex = indexes.find(i => i.name === "phoneNumber_1");

        if (phoneIndex) {
            console.log("Found legacy 'phoneNumber_1' index. Dropping it...");
            await collection.dropIndex("phoneNumber_1");
            console.log("Successfully dropped 'phoneNumber_1' index.");
        } else {
            console.log("'phoneNumber_1' index not found. No action needed.");
        }

        console.log("Index fix complete.");
        process.exit(0);
    } catch (error) {
        console.error("Error fixing indexes:", error);
        process.exit(1);
    }
};

fixIndexes();
