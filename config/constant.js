module.exports = {
    serverStarted : `Application Started On Port : ${CONFIG.SERVER}${CONFIG.PORT}` ,
    AccessDenied : 'اعتبار زمانی به پایان رسیده است' , 
    ValidationError : 'لطفا ورودی ها را چک کنید' , 
    UnhandledError : 'مشکلی پیش آمده مجددا تلاش کنید' , 
    Success : arg => { return `عملیات ${arg} با موفقیت انجام شد` } ,
    Failure : arg => { return `عملیات ${arg} انجام نشد` } ,
    NotFound : arg => { return `${arg} یافت نشد` } ,
    AlerdyAccepted : 'شماره تلفن شما قبلا تایید شده است' ,
    InternalErrorMessage : 'مشکلی پیش آمده , با پشتیبانی وبسایت تماس بگیرید' , 
    RouteNotFound : 'آدرس وارد شده اشتباه می باشد' ,
    PleaseEnter : (arg) => { return `لطفا ${arg} را وارد کنید`},
    PleaseCorrect : (arg) => { return `لطفا ${arg} را به درستی وارد کنید`},
    AnotherFind : (arg) => {return `این ${arg} قبلا ثبت گردیده است`} ,
    SliderConstantId : "5ece0eda9620641e049eed6c" ,
    simpleUser : {
        uName : 'تنظیم نشده' ,
        uLastName : 'تنظیم نشده' , 
        uPhoneNumber : 'تنظیم نشده'
    } ,

    payment : {
        failed : "عملیات ناموفق" , 
        success : "عملیات موفق"
    },

    catAlerts : [
        { child : "mobile" , img : "https://www.kindpng.com/picc/m/79-797259_wedding-ring-marriage-wedding-ring-png-clipart-transparent.png", msg : "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیازلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز"}
    ],

    GameConsole: {
        Weight : 'وزن',
        DriveType : 'نوع درایو',
        CopyEater : 'کپی خور' ,
        ScreenSize : 'سایز صفحه' ,
        RamType : 'نوع حافظه Ram',
        Os : 'سیستم عامل',
        GraphicBrand : 'سازنده گرافیک',
        Graphic : 'ظرفیت گرافیک' ,
        internalMemory : 'فضای داخلی',
        hardType : 'نوع هارد',
        Ram : 'حافظه Ram' ,
        Cpu : 'پردازنده',
    } ,
    Laptop : {
        Type : 'کاربری',
        TouchScreen : 'نوع صفحه نمایش',
        ScreenSize : 'سایز صفجه نمایش',
        RamType : 'نوع حافظه Ram',
        Os : 'سیستم عامل',
        GraphicBrand : 'سازنده گرافیک' ,
        Graphic : 'ظرفیت گرافیک' ,
        internalMemory : 'فضای داخلی',
        hardType : 'نوع هارد',
        Ram : 'حافظه Ram' ,
        Cpu : 'پردازنده',
    } ,
    Mobile : {
        Weight : 'وزن',
        CommunicationNetwork : 'شبکه ارتباطی',
        Os : 'سیستم عامل',
        OsVersion : 'ورژن سیستم عامل',
        Ram : 'نوع حافظه رم',
    },
    Carpet : {
        Size : 'ابعاد',
        Weight : 'وزن',
        HandMade : 'دست ساز است ؟',
        Shape : 'شکل',
    },
    Furniture : {
        Detail : 'اطلاعات'
    } ,
    Refrigerator : { 
        EnergyConsumption : 'استفاده انرژی',
        Weight : 'وزن',
        RefrigeratorStorage : 'سایز یخچال',
        FreezerStorage : 'سایز فریزر',
        Floors : 'طبقات یخچال' ,
        KidLock : 'قفل کودک',
    }
}