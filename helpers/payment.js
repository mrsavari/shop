var express = require("express");
var soap = require('strong-soap').soap

class payment {
<<<<<<< HEAD
    getTokenForPayment(params , callback) {
        var url = 'https://pec.shaparak.ir/NewIPGServices/Sale/SaleService.asmx?wsdl';
        var args = {
            requestData: {
                LoginAccount: CONFIG.payment.pec.LoginAccount ,
                Amount: 10000 ,
                OrderId: new Date() ,
                CallBackUrl: CONFIG.payment.pec.CallBackUrl + `?token=${params.token}`,
                AdditionalData: params.token
=======
    getTokenForPayment(Amount , OrderId , AdditionalData , callback) {
        LOGGER.info(`New Get Token For Payment With : [${Amount} , ${OrderId} , ${AdditionalData}]`)
        var url = 'https://pec.shaparak.ir/NewIPGServices/Sale/SaleService.asmx?wsdl';
        var args = {
            requestData: {
                LoginAccount: '1a6IdHC7UXbhPD4d1E7f',
                Amount: Amount ,
                OrderId: new Date(),
                CallBackUrl: 'http://localhost:4750/api/v1/callback_payment',
                AdditionalData: OrderId , // Token of Order
                // Originator : AdditionalData // userId
>>>>>>> 7d24f73b5d23862bf1d2cf3119c2548eb293b6d8
            }
        };
        soap.createClient(url, function (err, client) {
            if (err)
                LOGGER.error("Error in Get Token For Payment [1]")
            else {
                // callback(err , client)
                client.SalePaymentRequest(args, function (err, result) {
                    if(err) LOGGER.error("Error in Get Token For Payment [2]")
                    callback(err, result);
                });
            }
        });
    };

    ConfirmPayment(Token , callback) {
        var url = 'https://pec.shaparak.ir/NewIPGServices/Confirm/ConfirmService.asmx?wsdl';
        var args = {
            requestData: {
                LoginAccount: CONFIG.payment.pec.LoginAccount,
                Token: Token,
            }
        };
        soap.createClient(url, function (err, client) {
            if (err)
                console.log("error in getTokenForPayment >>>>>>>>>>>>>>>>>" + err);
            else {
                client.ConfirmPayment(args, function (err, result) {
                    callback(err, result);
                });
            }
        });
    };
    
    Reserval(params, callback) {
        var url = 'https://pec.shaparak.ir/NewIPGServices/Reverse/ReversalService.asmx?wsdl';
        var args = {
            requestData: {
                LoginAccount: params.pin,
                Token: params.Token,
            }
        };
        soap.createClient(url, function (err, client) {
            if (err)
                console.log("error in getTokenForPayment >>>>>>>>>>>>>>>>>" + err);
            else {
                client.ReversalRequest(args, function (err, result) {
                    callback(err, result);
                });
            }
        });
    };
    
}

module.exports = new payment


