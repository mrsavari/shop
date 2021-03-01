class PaymentController {

    async getPayments(req,res){
        let data = await UTILS.populate('Payment' , {} , [{
            path: 'customerId',
            select: ['uName' , 'uLastName' , 'uPhoneNumber'],
            model:'users'
        },
        {
            path: 'productId',
            select: 'Title',
            model:'products'
        }] , {})
        res.render('Payments/getPayments' , {data})
    }

    async getPayment(req,res){
        let data = await UTILS.populate('Payment' , {_id : req.params.id} , ['customerId'])
        res.render('Payments/getPayment' , {data : data[0]})
    }
}

module.exports = new PaymentController