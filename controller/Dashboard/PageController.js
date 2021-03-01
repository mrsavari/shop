const autobind = require("auto-bind")

class PageController {
    constructor(){
        autobind(this)
        this.constantSlider1 = ""
        this.constantSlider2 = ""
    }

    async getPages(req,res){
        let data = await UTILS.get("Page")
        res.render('Pages/getPages' , {data})
    }

    async getPage(req,res){
        let data = await UTILS.getOne("Page" , {pageName : req.params.pageName})
        res.render('Pages/getPage' , {data , type : "Edit"})
    }

    async newPage(req,res){
        await UTILS.new('Page' , req.body)
        FUNC.Redirect(req , res , '/dashboard/Pages' , CONSTANT.Success('') , 'success')
    }

    async postNewPage(req,res){
    }

    async editPage(req,res){
        let updateResult = await UTILS.set("Page" , {pageName : req.params.pageName} , req.body)
        FUNC.Redirect(req , res , '/dashboard/Pages' , CONSTANT.Success('') , 'success')
    }

    async getSliders(req,res){
        res.render('Pages/getSliders' , {data : []})
    }

    async postSliders(req,res){
        
        let Sliders = [];
        
        const AvailableSlider = await UTILS.getOne("Slider" , {_id : CONSTANT.SliderConstantId})

        //-----------------------[Config Sliders Array]-----------------------
        for(let i = 0 ; i<= 2 ; i++){
            if(!req.files[i]) Sliders[i] = AvailableSlider.Sliders[i] || AvailableSlider.Sliders[0]
            else {
                let image = req.files[i]
                const dest = image.destination.replace("public/" , '/')
                Sliders[i] = `${CONFIG.fullName}${dest}/${image.filename}`
            }
        }

        //----------------------[Config ConstantSlider1]----------------
        if(req.files[3]) {
            const image = req.files[3]
            const constantSlider1Dest = image.destination.replace("public/" , '/')
            this.constantSlider1 = `${CONFIG.fullName}${constantSlider1Dest}/${image.filename}`
        }

        //----------------------[Config ConstantSlider2]----------------
        if(req.files[4]) {
            const image = req.files[4]
            const constantSlider1Dest = image.destination.replace("public/" , '/')
            this.constantSlider2 = `${CONFIG.fullName}${constantSlider1Dest}/${image.filename}`
        }

        console.log(this.constantSlider1 , this.constantSlider2)

        await UTILS.set("Slider" , {_id : CONSTANT.SliderConstantId} , {
            Sliders , 
            constantSlider1 : this.constantSlider1 , 
            constantSlider2 : this.constantSlider2
        })
        
        FUNC.Redirect(req , res , '/dashboard/Sliders' , CONSTANT.Success('') , 'success')
    }
}

module.exports = new PageController