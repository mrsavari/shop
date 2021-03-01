const _ = require('underscore')
module.exports = {

    Orders : (args) => {
        let reformated = []
        args.forEach(arg => {
            reformated.push({
                productName : arg.productId.Title ,
                Date : arg.Date , 
                ReciveDate : arg.ReciveDate
            })
        })
        return reformated
    },

    User : (arg) => {
        return {
            uFullName : `${arg.uName} ${arg.uLastName}`,
            uStatus : arg.uStatus , 
            uPhoneNumber : arg.uPhoneNumber ,
            uEmail : arg.uEmail || "" ,
            RegistredAt : arg.RegistredAt ,
            LastLogin : arg.LastLogin
        }
    } ,

    usesIntroduce : (args) => {
        let reformated = []
        args.forEach(arg => {
            reformated.push({
                productName : arg.productId.Title ,
                finalPrice : arg.finalPrice , 
                incomedPrice : arg.incomedPrice , 
                code : arg.code
            })
        })
        return reformated
    } ,

    Administrator : (admin) => {
        return {
            status : admin.status , 
            fullname : `${admin.name} ${admin.lastname}` , 
            role : admin.access ,
            thumbnail : admin.thumbnail || "https://img.favpng.com/23/0/3/computer-icons-user-profile-clip-art-portable-network-graphics-png-favpng-YEj6NsJygkt6nFTNgiXg9fg9w.jpg"
        }
    },

    HandleQuery : (params) =>{
        let returnIt = {}
        params.search != null ? returnIt.Title = {$regex : params.search} : ('')
        params.categoryChild != null  ? returnIt.CategoryChild = params.categoryChild : ('')
        params.category != null ? returnIt.Category = params.category : ('')
        params.brand != null ? returnIt.Brand = params.brand : ('')
        params.provider != null ? returnIt.Provider =  params.provider : ('')
        params.min != null && params.max === null ? returnIt.price = {$gte : params.min} : ('')
        params.max != null && params.min === null ? returnIt.price = {$lte : params.max} : ('')
        params.max && params.min ? returnIt.price = {$gte : params.min , $lte : params.max} : ('')
        params.available != null ? returnIt.Salable = true : ('')
        return returnIt
    },

    HandleSort : (sort) => {
        switch(sort) {
            case 'date' : return {PublishDate : -1}
            case 'BuyCount' : return {BuyCount : -1}
            case 'ViewCount' :  return {ViewCount : -1}
            default : return {PublishDate : -1}
        }
    } ,

    HandleBrand : (docs , params) => {
        docs = _.filter(docs , function(val) {
            return params.brand.indexOf(val.Brand) >= 0
        })
        return docs
    } ,

    Brand : (arg) => {
        return {
            enName : arg.name , 
            perName : arg.persianName
        }
    } ,

    CatChild : (arg) => {
        return {
            PersianName : arg.PersianName , 
            EnglishName : arg.EnglishName
        }
    }
}