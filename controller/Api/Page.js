class Page {
    async getPage(req , res){
        const pageName = req.params.pageName
        let data = await UTILS.getOne('Page' , {pageName})
        if(data) FUNC.ApiResponse(res , 200 , CONSTANT.Success(' ') , data)
        else FUNC.ApiResponse(res , 404 , 'صفحه ی مورد نظر یافت نشد')
    }

    async getSlider(req,res){
        const slider = await UTILS.getOne("Slider" , {_id : CONSTANT.SliderConstantId})
        FUNC.ApiResponse(res , 200 , CONSTANT.Success(' ') , slider)
    }
}

module.exports = new Page