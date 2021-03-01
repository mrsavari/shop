class UsesIntroduceController {
    async getUsesIntroduces(req,res){
        let data = await UTILS.populate('UsesIntroduce' , {} , 
        {
            path: 'customerId',
            select: ['uName' , 'uLastName' , 'uPhoneNumber'],
            model:'users'
        },
        {
            path: 'productId',
            select: 'Title',
            model:'products'
        })
        res.render('UsesIntroduces/getIntroduces' , {data})
    }
}

module.exports = new UsesIntroduceController