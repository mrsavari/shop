const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const initData = require('config/initData');

Prouducts = mongoose.Schema({
	Title: { type: String, require: true },
	EnglishTitle: { type: String, require: true },
	Body: { type: String, require: true },
	price: { type: Number, require: true },
	AnotherSitePrice: { type: Number, require: true },
	PublishDate: { type: Date, require: true },
	Gallery: { type: Array },
	// Colors : {type : Array , default : [{color : "black" , status : true }]} , Implement in next Version
	InventoryCount: { type: Number, default: 1 },
	ViewCount: { type: Number, default: 0 },
	BuyCount: { type: Number, default: 0 },
	Salable: { type: Boolean, default: 1 },
	Features : {type : Array} ,
	InterView : {type : Array} , 
	Meta: { type: String, default: initData.SimpleMetaForProduct },
	Category: { type: String, default: 'Uncategorized' },
	CategoryChild: { type: String, default: 'Uncategorized' },
	Brand: { type: String, default: 'miscellaneous' },
	Provider: { type: String, require: true },
});

Prouducts.plugin(mongoosePaginate);

Prouducts.pre('save', function (next) {
	REDIS.hmset(
		`product_${this.EnglishTitle}`,
		'Title',
		this.Title,
		'Price',
		this.price,
		'InventoryCount',
		this.InventoryCount,
		'Salable',
		this.Salable,
		'Thumb', // Not Staged Commit
		this.Gallery[0] // Not Staged Commit
	);
	this.PublishDate = new Date();
	next();
});

module.exports = mongoose.model('products', Prouducts);
