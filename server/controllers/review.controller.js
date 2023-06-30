const {createError} = require('../utils/createError')
const Review = require('../models/review.model')
const Gig = require('../models/gig.model')
const Order = require('../models/order.model')

exports.createReview = async (req, res, next) => {
    if (req.isSeller) return next(createError(403, "Seller cannot create a review"))
    const orders = await Order.findOne({
        ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
        isCompleted: true
    })
    if(!orders) return next(createError(403, "You cannot post review without completing an order"))
    const newReview = new Review({
        userId: req.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star,
    })
    try {
        const review = await Review.findOne({ gigId: req.body.gigId, userId: req.userId })

        if(review) return next(createError(403, "You have already submitted a review"))

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
      const review = await Review.findByIdAndDelete(req.params.id);
      await Gig.findByIdAndUpdate(req.params.gigId, {
        $inc: { totalStars: -review.star, starNumber: -1 }
      });
      res.status(200).send('Review deleted successfully.');
    } catch (error) {
      next(error);
    }
  };
  