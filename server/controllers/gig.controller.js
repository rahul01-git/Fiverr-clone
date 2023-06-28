const { createError } = require("../utils/createError")
const Gig = require('../models/gig.model')

exports.createGig = async (req, res, next) => {
    if (!req.isSeller) return next(createError(403, "Only sellers can create a gig"))

    const newGig = new Gig({
        userId: req.userId,
        ...req.body,
    })

    try {
        const savedGig = await newGig.save()
        res.status(201).json(savedGig)
    } catch (error) {
        next(error)
    }
}
exports.getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if(!gig) return next(createError(404,"Gig not found"))
        res.status(200).send(gig)
    } catch (error) {
        next(error)
    }
}
exports.getGigs = async (req, res, next) => {
    try {
    const gigs = await Gig.find()
    res.status(200).send(gigs)
    } catch (error) {
        next(error)
    }
}
exports.deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if(!gig) return next(createError(404,"Gig not found"))
        if (gig.userId !== req.userId) return next(createError(403, "You can delete your gigs only"))
        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).send("Gig has been deleted")
    } catch (error) {
        next(error)
    }
}