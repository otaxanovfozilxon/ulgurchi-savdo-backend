const express = require("express")
const router = express.Router()
const { Products } = require("../models/ProductSchema")
const { upload } = require("../middleware/upload")


router.get("/", async (req, res) => {
    try {
        const products = await Products.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/", upload.array("photos"), async (req, res) => {
    try {
        let { files } = req
        const { title, price, about } = req.body
        let urls = []
        for (let file of files) {
            let url = `${req.protocol}://${req.get("host")}/images/${file.filename}`
            urls.push(url)
        }
        let newFIle = await Products.create({ title, price, about, urls })
        res.status(201).json({ state: true, msg: "Created", innerData: newFIle })
    }
    catch {
        res.status(500).json({ error: "Error While Creating" });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the request body using the validateProduct function
        // const { error } = validateProduct(req.body);
        // if (error) {
        //     return res.status(400).json({ error: error.details[0].message });
        // }

        // Find the product in the database by ID
        const product = await Products.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Products.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router

