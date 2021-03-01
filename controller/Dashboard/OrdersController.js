class OrdersController {
    async getOrders(req,res){
        //TODO Implement Below With Populate
        let data = await UTILS.populate('Order' , {} , ['userId' , 'payId'])
        res.render('Orders/getOrders' , {data })
    }

    async getOrder(req,res){
        let data = await UTILS.getOne('Order' , {_id : req.params.id})
        res.send("Implementing...")
    }
}

module.exports = new OrdersController