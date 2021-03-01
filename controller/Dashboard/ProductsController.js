const options = require('config/pageOptions')

class ProductsController {

    async getProducts(req,res){
        let searched = req.query.search || ""
        let search = {}
        const page = req.query.page || 1
        search !== "" ? (search ={
            Title : {$regex : searched}
        }) : (search = {})
        let data = await UTILS.paginate('Product' , {limit : 20 , page , sort : {PublishDate : - 1}} , search)
        res.render('Products/getProducts' , {data})
    }

    async GetNewProducts(req,res){
        let categories = await UTILS.get('Categories') ,
        providers = await UTILS.get('Provider') ,
        categoryChilds = await UTILS.get("CategoryChild")
        res.render('Products/newProduct' , {providers , categoryChilds , categories , type : "New"})
    }

    async PostNewProducts(req,res){
        let Gallery = []
        req.files.forEach(image => {
            // console.log(`https://shop.ir:4750/${dest}/${image.filename}`)
            const dest = image.destination.replace("public/" , '/')
            Gallery.push(`https://shop.ir:4750/${dest}/${image.filename}`)
        })
        req.body.Gallery = Gallery
        await UTILS.new('Product' , req.body)
        req.flash('success' , CONSTANT.Success('اضافه کردن محصول'))
        res.redirect('/dashboard/NewProduct')
    }

    async GetEditProduct(req,res){
        let data = await UTILS.getOne('Product' , {"_id" : req.params.id}) ,
        categories = await UTILS.get('Categories') ,
        categoryChilds = await UTILS.get("CategoryChild") ,
        providers = await UTILS.get('Provider')
        res.render('Products/newProduct' , {data , providers , categoryChilds , categories , type : "Edit"})
    }

    async SetProduct(req,res){
        await UTILS.set('Product' , {_id : req.params.id} , req.body)
        FUNC.Redirect(req,res,'/dashboard/Products' , CONSTANT.Success('') , 'success' )
    }

    async DeleteProduct(req,res){
        await UTILS.delOne('Product' , {"_id" : req.params.id})
        res.redirect('/dashboard/products')
    }

    async getComments(req,res){
        let data = await UTILS.populate('Comment' , {} , ["userId"] , 3 , 1)
        // FUNC.HandleUndefinedUser(data)
        res.render('Products/getComments' , {data})
    }


    async getInterView(req,res){
        let data = await UTILS.getOne('Product' , {_id : req.params.id})
        res.render('Products/Interview' , {productName : data.Title , productId : req.params.id})
    }

    async postInterView(req,res){
        let Gallery = []
        req.files.forEach(image => {
            const dest = image.destination.replace("public/" , '/')
            Gallery.push(`${CONFIG.fullName}${dest}/${image.filename}`)
        })
        req.body.images = Gallery
        let InterView = [
            {
                shortIntro : req.body.shortIntro,
                image : req.body.images[0]
            } , 
            {
                desc1 : req.body.desc1,
                thumbnail :  req.body.images[1]
            } , 
            {
                desc2 : req.body.desc2,
                thumbnail :  req.body.images[2]
            }
        ]
        let updateResult = await UTILS.set('Product' , {_id : req.body.id} , {InterView})
        if(updateResult && updateResult.ok == 1 ) FUNC.Redirect(req,res, '/dashboard/Products' , CONSTANT.Success('افزودن توضیحات اجمالی') , 'success' )
        else FUNC.Redirect(req,res, '/dashboard/Products' , CONSTANT.Failure('افزودن توضیحات اجمالی') , 'error' )
    }
}

module.exports = new ProductsController