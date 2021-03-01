class ProvidersController {

    //------------------[Get Providers]-------------------

    async getProviders(req,res){
        const page = req.query.page || 1
        let data = await UTILS.paginate('Provider' , {limit : 20 , page , sort : {RegistredAt : - 1}})
        res.render('Providers/getProviders' , {data})
    }

    //-----------[Get Page And Create a Provider]-----------------------------

    getNewProvider(req,res){res.render('Providers/getProvider' , {type : 'New'})}
    
    async postNewProvider(req,res){ 
        await UTILS.new('Provider' , req.body)
        FUNC.Redirect(req,res,'/dashboard/Providers' , CONSTANT.Success('') , 'success' )
    }


    //-----------[Get And Update A Provider]-----------------------------

    async getProvider(req,res){
        const data = await UTILS.getOne('Provider' , {"_id" : req.params.id})
        res.render('Providers/getProvider' , {type : "Edit" , data})
    }

    async setProvider(req,res){
        await UTILS.set('Provider' , {'_id' : req.params.id} , req.body)
        FUNC.Redirect(req,res,'/dashboard/Providers' , CONSTANT.Success('') , 'success' )
    }

    //-----------[Delete A Provider]-----------------------------

    async delProvider(req,res){
        await UTILS.delOne('Provider' , {"_id" : req.params.id})
        FUNC.Redirect(req,res,'/dashboard/Providers' , CONSTANT.Success('') , 'success' )
    }
}

module.exports = new ProvidersController