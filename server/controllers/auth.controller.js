const User = require('../models/user.model')
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5)
        const newUser = new User({
            ...req.body,
            password: hash,
        })
        await newUser.save()
        res.status(201).send("User has been created.")
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
}
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user) return res.status(404).send("user not found !")
        
        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if(!isCorrect) return res.status(400).send("wrong password or username")
        const {password, ...info} = user._doc
        res.status(200).send(info)


    } catch (error) {
        console.log('something went wrong')
    }
}
exports.logout = async (req, res) => {

}

