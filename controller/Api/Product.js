const _ = require('underscore')
const async = require('async')
class Product { 
    constructor(){
        this.Brands = []
    }

    async GetProducts(req,res){
        let response = {Brands : [] , alert : {msg : '' , img : ''}}

        let Cat = {
            subCategory : [] , 
            childs : []
        }

        let params =  {
            search : req.body.search || null ,
            provider : req.body.provider || null ,
            category : req.body.category || null ,
            categoryChild : req.body.categoryChild || req.params.child , 
            brand : req.body.brand || null ,
            page : req.body.page || 1 ,
            sort : req.body.sort || 'date' ,
            min : req.body.min || null ,
            max : req.body.max || null ,
            available : req.body.available || null
        }

        CONSTANT.catAlerts.forEach(child => {
            if(child.child == params.categoryChild) {
                response.alert.msg = child.msg
                response.alert.img = child.img
            }
        })

        // REDIS.hget('childs' , req.params.child , async (err1 , father) => {
        //     REDIS.hget('categories' , father , async (err2 , persianName) => {
        //         Cat.subCategory[1] = persianName
        //         Cat.subCategory[0] = father
                
        //         let childs = await UTILS.get("CategoryChild" , {father : father})
        //         _.each(childs , child => {
        //             Cat.childs.push(FUNC.Reformaters.CatChild(child))
        //         })
        //         response.Categories = Cat
        //     })
        // })
        // console.log(response.Categories == undefined)
        let father = await UTILS.getOne('CategoryChild' , {EnglishName : req.params.child})
        if(father) {
        let fatherFull = await UTILS.getOne('Categories' , {EnglishName : father.father})
        Cat.subCategory[0] = fatherFull.EnglishName 
        Cat.subCategory[1] = fatherFull.PersianName
        
        let childs = await UTILS.get("CategoryChild" , {father : father.father})
        _.each(childs , child => {
            Cat.childs.push(FUNC.Reformaters.CatChild(child))
        })
        response.Categories = Cat
        } else {response.Categories = ''}

        let query = FUNC.Reformaters.HandleQuery(params)
        let sort = FUNC.Reformaters.HandleSort(params.sort)
        let Products = await UTILS.paginate('Product' , {limit : 20 , page : params.page , sort } , query)

        if(query.brand) FUNC.Reformaters.HandleBrand(Products.docs , params)
        
        response.Products = Products

        let returnedBrand = []
        const Brands = await UTILS.get("Brand")
        _.each(Brands , Brand => {
            if(Brand.category.indexOf(req.params.child) >= 0) returnedBrand.push(FUNC.Reformaters.Brand(Brand))
        })
        response.Brands = returnedBrand
        
        
        // REDIS.get(`${req.params.child}_brands` , (err , result) => {
            
        //     console.log('con' ,addToBrands('get'))
        //     response.Brands = containBrand
        FUNC.ApiResponse(res,200, CONSTANT.Success('') , response)
        // })
    }

    async GetProduct(req,res){
        let Query = { "_id" : req.body.id}
        if(req.body.EnglishTitle) Query = {"EnglishTitle" : req.body.EnglishTitle}
        let result = await UTILS.get('Product' , Query)
        FUNC.ApiResponse(res , 200 , CONSTANT.Success('') , result)
    }

    async RequestProduct(req,res){
        let params = {
            userId : req.token.userId , 
            productName : req.body.productName ,  
            familiar : req.body.familiar
        }
        let result = await UTILS.new('RequestProduct' , params)
        if(result)FUNC.ApiResponse(res , 200 , CONSTANT.Success(' '))
        else FUNC.ApiResponse(res , 500 , CONSTANT.Failure(' '))
    }

    async getComment(req,res){
        let data = await UTILS.get('Comment' , {productEnglishName : req.params.productEnglishName})
        if(data) FUNC.ApiResponse(res,200,CONSTANT.Success('') , data)
        else FUNC.ApiResponse(res,200,CONSTANT.Success(''))
    }

    async newComment(req,res){
        const params = {
            productEnglishName : req.body.productEnglishName ,
            Body : req.body.Body , 
            userId : req.token.userId
        }
        await UTILS.new("Comment" , params)
        FUNC.ApiResponse(res , 200 , CONSTANT.Success('افزودن کامنت'))
    }

}

module.exports = new Product