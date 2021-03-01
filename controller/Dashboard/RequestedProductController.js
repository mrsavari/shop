class RequestedProductController {

    //--------------[Get Requested Products]-------------------

    async getRequestedProduct(req,res){
        let data = await UTILS.populate('RequestProduct' , {} , {
            path: 'userId',
            select: ['uName' , 'uLastName' , 'uPhoneNumber'],
            model:'users'
        })
        res.render('RequestProduct/getRequestedProduct' , {data})
    }

    //--------------[Set Requested Products Status]-------------------

    async changeRequestedProduct(req,res){
        const {status , id} = req.query
        let requestedProductDetail = await UTILS.getOne("RequestProduct" , {_id : id})
        if(status == 'finish') {
            res.render('RequestProduct/setEnglishName' , {id : requestedProductDetail.userId})
        } else {
            await UTILS.set('RequestProduct' , {"_id" : id} , {supportStatus : status})
            res.redirect('/dashboard/RequestProducts')
        }
    }

    async changeRequestedProductEnglishName(req,res){
        console.log(req.body)
        console.log(await UTILS.set("RequestProduct" , {userId : req.body.id} , {productEnglishName : req.body.productEnglishName , supportStatus : "finish"}))
        FUNC.Redirect(req,res,'/dashboard/RequestProducts' , CONSTANT.Success('') , 'success' )
    }
}

module.exports = new RequestedProductController