import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import moment from 'moment';
import { headers } from "next/headers";
import { redirect } from 'next/navigation';

// const config = {
//     "vnp_TmnCode": "E11AF02G",
//     "vnp_HashSecret": "CNKGFMJUIZHRHQYGBCIEPADGKEMIMVPD",
//     "vnp_Url": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
//     "vnp_Api": "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
//     "vnp_ReturnUrl": "http://localhost:3000/order/vnpay_return"
// }

const payment_vnpay = (req, res, order) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    let ipAddr = req.headers['x-forwarded-for'] ? (req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress) : "127.0.0.1";

    let orderId = order.id ? order.id : moment(date).format('DDHHmmss');
    let tmnCode = process.env.NEXT_PUBLIC_VNP_TMNCODE;
    let secretKey = process.env.NEXT_PUBLIC_VNP_HASHSECRET;
    let vnpUrl = process.env.NEXT_PUBLIC_VNP_URL;
    let returnUrl = process.env.NEXT_URL + "/order/vnpay_return" + `?id=${order.id}`;
    let amount = order.totalPrice * 100;
    let bankCode = order.bankCode ? order.bankCode : "";

    let locale = req.body.language ? req.body.language : 'vn';
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    return vnpUrl;
    // res.redirect(vnpUrl)
}

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
const payment_momo = async (req, res, order) => {
    let crypto = require("crypto");
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    const partnerCode = "MOMO";
    const accessKey = "F8BBA842ECF85";
    const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    const requestId = partnerCode + new Date().getTime();
    const orderId = `${order.id}-TTTTT`;
    const orderInfo = `Payment for #${order.id}-TTTTT`;
    const redirectUrl = "http://localhost:3000/order/momo_return";
    const ipnUrl = "https://callback.url/notify";
    // const ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    const amount = order.totalPrice;
    const requestType = "payWithATM"
    const extraData = ""; //pass empty value if your merchant does not have stores

    const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
    var signature = crypto.createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: 'en'
    });
    const https = require('https');
    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }
    const payUrl = await new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            res.setEncoding('utf8');
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });

            res.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    if (data.payUrl) {
                        resolve(data.payUrl);
                    } else {
                        reject(new Error(`Momo API error: ${data.localMessage}`));
                    }
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', reject);
        req.write(requestBody);
        req.end();
    });
    return payUrl;
}


export async function POST(req, res) {
    try {
        const body = await req.json();
        const data = body.purchaseForm;
        if (!data) {
            return NextResponse.json({
                success: false,
                message: "Error",
                error: "No data provided for update",
            }, { status: 400 });
        }

        const { orderItems, ...filterData } = data;

        if (orderItems) {
            for (const orderItem of orderItems) {
                try {
                    const { id, qty } = orderItem;
                    const updatedProduct = await prisma.product.update({
                        where: {
                            id: id,
                        },
                        data: {
                            quantity: {
                                decrement: qty,
                            },
                        },
                    });
                    console.log(`Updated product ${id}. New quantity: ${updatedProduct.quantity}`);
                } catch (error) {
                    console.error(`Error updating product quantity for orderItem ${orderItem.id}:`, error);
                    return NextResponse.json({
                        success: false,
                        message: `Error updating product quantity for orderItem ${orderItem.id}`, error
                    }, { status: 500 })
                }
            }
        }

        const newOrder = await prisma.order.create({
            data: {
                ...filterData,
                orderItems: {
                    create: orderItems.map((item) => ({
                        quantity: (item.qty),
                        price: item.price,
                        productId: item.id,
                    })),
                },
            },
        });
        let payUrl = "";
        if (newOrder) {
            switch (filterData.paymentMethod) {
                case "VNPay":
                    payUrl = payment_vnpay(req, res, newOrder);
                    break;
                case "Momo":
                    payUrl = await payment_momo(req, res, newOrder);
                    break;
                case "CashOnDelivery":
                    payUrl = `http://localhost:3000/order/momo_return?id=${newOrder.id}&delivery_Amount=${filterData.totalPrice}&delivery_OrderInfo=Thanh+toan+ma+GD+${newOrder.id}&delivery_PayDate=${Date.now()}`
                    break;
                default:
                    payUrl = `http://localhost:3000/order/delivery_return?id=${newOrder.id}&delivery_Amount=${filterData.totalPrice}&delivery_OrderInfo=Thanh+toan+ma+GD+${newOrder.id}&delivery_PayDate=${Date.now()}`
                    break;
            }
        }
        console.log(payUrl);

        return NextResponse.json({
            success: true,
            message: "Add order success",
            newOrder,
            payUrl,
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error", error
        }, { status: 500 })
    }
}