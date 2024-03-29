import client from '@/database/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'


import nodemailer from 'nodemailer';
import { nanoid } from 'nanoid'
import totalCal from '@/Utils/totalCal';
import { PromoType } from '../use-promo/route';
import { ObjectId } from 'mongodb';

const transporter = nodemailer.createTransport({
    host: "host",
    port: 1234,
    secure: true,
    auth: {
        user: "",
        pass: "",
    },
});


async function increaseUsageCountPromo(code:PromoType) {
    try{
    // Update usageCount in MongoDB
    const Codes = await client.db('DATABASE').collection('Coupons');
    const res =  await Codes.updateOne(
        // { _id: new ObjectId(code._id) },
        { code },
        { $inc: { usageCount: 1 } }
        );

        console.log('res: ', res);
   if( !res?.acknowledged) {
       return 
   }
   console.log('res: ', res);
    }
    catch(e){
        console.log('e: ', e);

    }
}
 async function sendOrderConfirmationEmail(discountedPrice: number | undefined,orderId: string, toEmail: string, order: any[]): Promise<boolean> {
    try {
        // let orderId = nanoid()
        // orderId = `${orderId}`.replace(/[^a-zA-Z0-9]/g, '')?.slice(0,6)?.toUpperCase()
        let total = discountedPrice ? discountedPrice : totalCal(order);

        // Create dynamic HTML content based on the order data
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                
                header {
                    text-align: center;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #ccc;
                }
        
                h1 {
                    color: #333;
                }
        
                p {
                    color: #666;
                }
        
                .buttons {
                    text-align: center;
                    margin: 0 auto;
                    color: white;
                    margin-top: 20px;
                    width:max-content;
                    
                }
        
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    text-decoration: none;
                    color: white !important;
                    margin-top:4px !important;
                    width:max-content;
                    background-color: #007bff;
                    border-radius: 3px;
                }
        
                .order-id {
                    margin-top: 20px;
                    color: #333;
                }
        
                .product {
                    margin-top: 20px;
                    border-top: 1px solid #ccc;
                    padding-top: 10px;
                    display: flex;
                }
        
                .product img {
                    max-width: 150px;
                    max-height: 150px;
                    margin-right: 10px;
                }
        
                .product-details {
                    flex-grow: 1;
                }
        
                .product-title {
                    font-weight: bold;
                    color: #333;
                }
        
                .product-description {
                    color: #666;
                }
        
                .product-price {
                    color: #333;
                }
                .centered {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin:0 auto;
                }
                .class12 {
                    padding:1;
                    objectFit:contain !important;
                    width: 100px !important;
                    height: 100px !important;
                }
                .font1 {
                    font-size:1.2em;
                }
                footer {
                    background-color: #333;
                    color: white;
                    margin: 0 auto;
                    padding: 20px;
                    text-align: center;
                  }
              
                  footer a {
                    text-align: center;
                    margin: 0 auto;
                    color: white;
                    text-decoration: none;
                  }
                  .col {
                    flex-direction: column;
                  }
            </style>
        </head>
        <body>
            <div class="container">
                <header>
                <div class='class12'>
    <img
    style="width:100px;height:100px"
        class='img contain'
        src=""
        alt="the craft room logo"/> 
</div>
                <h1>The Craft Room</h1>
                <p>Thank you for shopping with us! Your order is confirmed and will be processed shortly.</p>
                </header>
        
                <div class="buttons">
                    <a href="https://wa.me/+96103874743" class="button">Reach Us</a>
                    <a href="https://thecraftroom-lb.com/" class="button">Visit Our Website</a>
                </div>
        
                <div class="order-id">
                    <p>Order ID:
                    <strong>
                    ${orderId}
                    </strong>
                    </p>
                </div>
        
                ${
                    order && order.map(product => {
                        if (!product?._id) return '';
                        return `
                            <div class="product">
                                <div style="max-width:150px;max-height:150px;min-height:50px;">
                                    <img src='${product?.img}' alt="Product Image">
                                </div>
                                <div class="product-details">
                                    <p class="product-title">${product?.title}</p>
                                    <p class="product-description">
                                        Quantity: ${product?.qty}
                                    </p>
                                </div>
                            </div>
                        `;
                    }).join('')
                }
                
                <hr/>
                ${Number(total) < 60 ? `<div>
                <p>
                Delivery Fees:
                <span>
                   $4
                </span>
                </p>

                </div>`: '' }   
                
                <div class='font1'>
                ${
                `Order Total:
                <strong>
                $${Number(total) > 60 ? total : Number(total) + 4 }
                </strong>
                `
                }
                </div>
        
               
            </div>
        </body>
        <footer>
        <br />
        <div style='text-align:center;align-items:center;margin:0 auto;'>
        <p><a href="mailto:email@gmail.com">email@gmail.com</a></p>
        <p style='padding-top:2px;padding-bottom:2px;'>+961 03874743</p>
        <p><a href="https://thecraftroom-lb.com/unsubscribe">unsubscribe</a></p>
        </div>
      </footer>
        </html> `;

        // Send the email
        const info = await transporter.sendMail({
            from: '"The Craft Room" <email@gmail.com>',
            to: toEmail,
            subject: "Thank You For Your Order!",
            html: htmlContent,
        });

        console.log("Email sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
}

export  async function POST(req: NextRequest, res: NextApiResponse) {
  // const order = req?.body.get('order')
  const {order} = await req.json()
  
  let orderId = nanoid()
        orderId = `${orderId}`.replace(/[^a-zA-Z0-9]/g, '')?.slice(0,6)?.toUpperCase()
  console.log('order: ', order);


let discountedPrice = order?.discountedPrice || 0
  if (req.method === 'POST') {
    // Process a POST request
    if (!order || !order?.info?.email) return NextResponse.json({success:false})
       const insertReq = await client.db('DATABASE').collection("Orders").insertOne({...order,orderID: `${orderId}`});
        await client.db('DATABASE').collection("OrdersBACKUP").insertOne({...order,orderID: `${orderId}`});
       if (insertReq.acknowledged ) {         
        if (order?.promoCode ) {

            await increaseUsageCountPromo(order?.promoCode)
        }         
         await sendOrderConfirmationEmail(discountedPrice,orderId,`${order?.info?.email}`,order?.products)




         return NextResponse.json({success:true});
        }
}
return NextResponse.json({success:false});

}


