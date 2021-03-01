const _ = require('underscore')
const moment = require('moment-jalaali')
const unique = require('unique-string')
class User {
    async getProfile(req,res){
        const UserId = req.token.userId
        const user =  await UTILS.get('User' , {"_id" : UserId})
        let usesIntroduce = await UTILS.get('UsesIntroduce' , {'customerId' : UserId})
        let order = await UTILS.get('Order' , {'userId' : UserId , Status : 'Paid'})
        let requestedProduct = await UTILS.get("RequestProduct" , {userId : UserId})
        FUNC.ApiResponse(res , 200 , CONSTANT.Success('دریافت پروفایل') , {
            order : FUNC.Reformaters.Orders(order),
            user : FUNC.Reformaters.User(user[0]),
            usesIntroduce : FUNC.Reformaters.usesIntroduce(usesIntroduce) ,
            requestedProduct
        })
    }

    async editProfile(req,res){
        if(req.body.uBirthday) {
            let m = moment(req.body.uBirthday , 'jYYYY/jMM/jDD')
            m.format('jYYYY/jMM/jDD [is] YYYY/MM/DD')
            req.body.uBirthday = m
        }
        const Result = await UTILS.set("User" , {_id : req.token.userId} , req.body)
        Result.ok === 1 ? FUNC.ApiResponse(res , 200 , CONSTANT.Success('')) : FUNC.ApiResponse(res , 200 , CONSTANT.Failure(''))
    }

    async logout(req,res){
        const Token = req.headers.token || req.cookies.Token
        REDIS.hset('token_blacklist' , Token , 'logout' , (err , reply) => {
            if(err) FUNC.ApiResponse(res , 500 , CONSTANT.Failure(''))
            else FUNC.ApiResponse(res , 200 , CONSTANT.Success(''))
        })
    }

    async addCard(req,res){
        let user = await UTILS.getOne('User' , {_id : req.token.userId});
        // user == null ? FUNC.ApiResponse(res,404,CONSTANT.Failure('')) : user = user[0]
        if(!user) FUNC.ApiResponse(res,404,CONSTANT.Failure(''));
        else{
            let cart = user.Cart || []
            let NewCart = []
            let mod = 'add'
            _.each(cart , item => {
                if(item.productName === req.body.EnglishName){
                    mod='update'
                    switch(req.body.operation) {
                        case 'mm' : {
                            item.count-=1
                            item.count != 0 ? NewCart.push(item) : ('')
                            break
                        }
                        case 'pp' : {
                            item.count+=1; 
                            NewCart.push(item)
                            break
                        }
                        default : {
                            item.count+=1; 
                            NewCart.push(item)
                            break
                        }
                    }
                } else NewCart.push(item)
                cart = NewCart
            })
            
            if(mod=='add') {
                REDIS.hget(`product_${req.body.EnglishName}`, 'Title', async (err, title) => {
                    REDIS.hget(`product_${req.body.EnglishName}`, 'Thumb', async (err, thumb) => {
                        REDIS.hget(`product_${req.body.EnglishName}`, 'Price', async (err, Price) => {
                        if(!title || !thumb || !Price) FUNC.ApiResponse(res, 404 , 'محصول مورد نظر یافت نشد')
                        cart.push({
                            productName: req.body.EnglishName,
                            Title: title,
                            Price ,
                            Thumbnail: thumb,
                            count: 1,
                        });
                        await UTILS.set('User', { _id: req.token.userId }, { Cart: cart });
                        FUNC.ApiResponse(res, 200, CONSTANT.Success('اضافه کردن به سبد خرید'));
                    })
                });
            });
            } else{
                await UTILS.set("User" , {_id : req.token.userId} , {Cart : cart})
                FUNC.ApiResponse(res , 200 , CONSTANT.Success('اضافه کردن به سبد خرید')) 
            }
        }        
    }

    async getCard(req,res){
        let user = await UTILS.getOne('User' , {_id : req.token.userId});
        if(!user) FUNC.ApiResponse(res,404,CONSTANT.Failure(''))
        else {
            FUNC.ApiResponse(res , 200 , CONSTANT.Success(''),user.Cart)
        }
    }

    async patchCard(req,res){
        let user = await UTILS.get('User' , {_id : req.token.userId});
        user == null ? FUNC.ApiResponse(res,404,CONSTANT.Failure('')) : user = user[0]

        let cart = user.Cart,
        NewCart = [] ,
        stat = false

        _.each(cart , item => {
            if(item.productName === req.body.EnglishName){
                stat = true
                switch(req.body.operation) {
                    case 'mm' : {
                        item.count-=1
                        item.count != 0 ? NewCart.push(item) : ('')
                        break
                    }
                    case 'pp' : {
                        item.count+=1; 
                        NewCart.push(item)
                        break
                    }
                    default : {
                        item.count+=1; 
                        NewCart.push(item)
                        break
                    }
                }
            } else NewCart.push(item)
            cart = NewCart
        })

        if(stat){
            await UTILS.set("User" , {_id : req.token.userId} , {Cart : NewCart})
            FUNC.ApiResponse(res , 200 , CONSTANT.Success('') , NewCart)
        } else {
            FUNC.ApiResponse(res , 404 , 'این محصول در سبد خرید شما موجود نمیباشد')
        }
    }
    
}

module.exports = new User