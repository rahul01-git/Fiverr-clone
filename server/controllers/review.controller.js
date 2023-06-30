const {createError} = require('../utils/createError')
const Review = require('../models/review.model')
const Gig = require('../models/gig.model')
exports.createReview = async (req, res, next) => {
    if (req.isSeller) return next(createError(403, "Seller cannot create a review"))

    const newReview = new Review({
        userId: req.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star,
    })
    try {
        const review = await Review.findOne({ gigId: req.body.gigId, userId: req.userId })

        if(review) return next(createError(403, "You have already created a review"))

        const savedReview = await newReview.save()
        await Gig.findByIdAndUpdate(req.body.gigId,{$inc: {totalStars: req.body.star, starNumber:1}})
        res.status(201).send(savedReview)
    } catch (error) {
        next(error)
    }
}
exports.getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({gigId: req.params.id})
        res.status(200).send(reviews)
    } catch (error) {
        next(error)
    }
}
exports.deleteReview = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}