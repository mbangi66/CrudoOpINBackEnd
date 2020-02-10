const router = require('express').Router();
const Subscriber = require('../model/Schema')

// Get all subscribers
router.get('/',async (req, res) => {
    try {
        const subscriberss = await Subscriber.find();
        res.status(200).json(subscriberss)
        res.send('Server is Running')
    } catch (error) {
        res.status(500).json({Message: "Server Not Working"})
    }
})

// Get one subscriber
router.get('/:id',getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

// Create one subscriber
router.post('/', async(req, res) => {
    const subscriber = new Subscriber({
        name:req.body.name,
        subscribedChannel :req.body.subscribedChannel
    })
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({Message : error.Message})
    }
})

// Update one subscriber
router.patch('/:id',getSubscriber ,async(req, res) => {
    if(req.body.name != null){
        res.subscriber.name =req.body.name 
    }
    if(req.body.subscribedChannel != null){
        res.subscriber.subscribedChannel = req.body.subscribedChannel
    }
    try {
        const updateSubscriber = await res.subscriber.save()
        res.json(updateSubscriber)
    } catch (error) {
        res.status(400).json({Message:"Update Not Working"})
    }
})

// Delete one subscriber
router.delete('/:id',getSubscriber,async (req, res) => {
    try {
        await res.subscriber.remove(),
        res.json({Message:'This users has been deleted'})
    } catch (error) {
        res.status(500).json("User Not Fund")
    }
})

async function getSubscriber(req,res,next){
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({massage:'Subscriber not Found'})
        }
    } catch (error) {
        res.status(500).json({Massage : error.Massage})
    }
    res.subscriber =subscriber;
    next()
}

module.exports = router;