const Item = require('../../models/item');

module.exports = {
    index,
    show,
    create,
    update,
    delete: deleteOne,
    addPhoto
}

async function index(req, res) {
    const items = await Item.find({});
    res.status(200).json(items);
}

async function show(req, res) {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
}

async function create(req, res) {
    req.body.user = req.user;
    const item = await Item.create(req.body);
    res.status(201).json(item);
}

async function update(req, res) {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
}

async function addPhoto(req, res) {
    const item = await Item.findById(req.params.id);
    try {
        const photo = req.body.photo;
        photo.name = `photo_${item._id}`
        AWS.config.update({
            accessKeyID: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        });
        const s3 = new AWS.S3();
        const params = {
            Bucket: S3_BUCKET,
            Key: photo.name,
        
        }
        res.status(200).json(item);
    }
    catch(err) {
        console.log(err)
    }
}

async function deleteOne(req, res) {
    const deletedItem = await Item.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedItem);
}
