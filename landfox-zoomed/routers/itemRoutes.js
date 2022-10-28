const express = require('express');
const router = express.Router();
const Item = require('../models/items');
const uploads = require('../management/multer');
const {default: mongoose} = require('mongoose');

router.get('/', async (req, res) => {
    const items = await Item.find().populate('category');

    if (!items) {
        res.status(404).json({
            message: "No items found :/"
        })
    }

    res.status(200).json(items);

});

router.get('/:id', async (req, res) => {
    const item = await Item.findById(req.params.id).populate('category');

    if (!item) {
        res.status(404).json({
            message: "No Item was found :/"
        })
    }

    res.status(200).send(item);
})


router.post('/', uploads.single('image'), async (req, res) => {

    const category = await Category.findById(req.body.category);

    if (!category) {
        return res.status(400).send('Invalid Category');
    }

    console.log(req)

    const file = req.file;

    console.log(file)

    if (!file) {
        return res.status(400).send('No image in request :/')
    }

    const fileName = req.file.filename;
    console.log(fileName)
    const path = `${req.protocol}://${req.get('host')}/public/images/`
    console.log(path)

    let item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: `${path}${fileName}`,
        category: req.body.category

    })

    item = await item.save()
        .then(() => {
            res.status(201).json("Created successfully !")
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                message: "Creation failed :/"
            })
        })
})

router.put('/:id', uploads.single('image'), async (req, res) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send('Invalid Id');
    }

    const body = req.body;
    const category = await Category.findById(body.category);

    if (!category) {
        return res.status(400).send('Invalid Category Id')
    }

    const item = await Item.findById(id);

    if (!item) {
        return res.status(400).send('Invalid item Id');
    }

    const file = req.file;
    let image;

    if (file) {
        const fileName = file.filename;
        const path = `${req.protocol}://${req.get('host')}/public/images/`;
        image = `${path}${fileName}`
    } else {
        image = item.image;
    }


    const modifiedItem = await Item.findByIdAndUpdate(
        id,
        {
            name: body.name,
            description: body.description,
            price: body.price,
            image: image,
            category: body.category
        },
        {new: true}
    )

    if (!modifiedItem) {
        return res.status(500).send('The item cannot be updated');
    }

    res.send(modifiedItem);
})

router.delete('/:id', async (req, res) => {
    await Item.findByIdAndRemove(req.params.id)
        .then((item) => {
            if (item) {
                return res.status(200).send(item);
            } else {
                return res.status(400).send("Item not found :/");
            }
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                error: err
            })
        })
})


module.exports = router;
