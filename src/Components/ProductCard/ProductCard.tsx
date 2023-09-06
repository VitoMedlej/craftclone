"use client"
// import {IProduct} from '@/Types/Types'
import {Box, Typography} from '@mui/material'
import React from 'react'
import Btn from '../Btn/Btn'
// import {GrAdd} from 'react-icons/gr'
import {useRouter} from 'next/navigation'
import useCart from '@/Hooks/useCart'
const ProductCard = ({
    title,
    price,
    images,
    category,
    _id,
    width,
    newPrice,
    height
} : {
    _id: string,
    title: string,
    price: number,
    images: string[],
    category: string,
    width?: string | number
    height?: string | number,
    newPrice ?: number,
}) => {
    const router = useRouter()
    const {addToCart}= useCart()
 function getDiscountPercentage(oldPrice: number, newPrice?: number): number | undefined {
        if (!oldPrice || !newPrice || !Number(oldPrice) || !Number(newPrice)) {
          return undefined;
        }
        const discount = Number(oldPrice) - Number(newPrice);
        const discountPercentage = (discount / oldPrice) * 100;
        return Number(discountPercentage.toFixed(1)) || undefined;
      }
    return (
        <Box
            className='relative  trans'
            sx={{
            border : '1px solid #000000a',
            py: 1,
            margin: '0em auto',
            minWidth: {xs:'150px',sm:'32%',md:'283px',lg:'300px'},
            width: width
                ? width
                : {
                    xs: '47%',
                    sm: '32%'
                }
        }}>
            <Box 
            className='cursor'
               onClick={() => router.push(`/product/${_id}`)}
            sx={{
                height: height || {xs:'180px',sm:'300px',md:'350px'}
            }}>
                <img
                    src={images
                    ? images[0]
                    : ''}
                    alt="Prdouct image"
                    className="img contain"/>

            </Box>
             {getDiscountPercentage(price,newPrice) &&  <Box sx={{position:'absolute',borderRadius:'50%',top:'0%',left:'1%',zIndex:1, width:'50px',height:'50px',background:'red'}}>
                  <Typography className='flex center items-center' sx={{fontSize:'.75em',alignItems:'center',justifyContent:'center',height:'100%',color:'white'}}>

                      -{getDiscountPercentage(price,newPrice) }%
                  </Typography>
                    </Box>}
            <Box 
            sx={{
                px: .95
            }}>
                    <Typography
                    sx={{
                    fontWeight: '300',
                    fontSize: '.76em'
                }}>
                    {category}
                </Typography>
               
                <Typography
            className='limited cursor '

                    onClick={() => router.push(`/product/${_id}`)}
                    sx={{
                    fontSize: {xs:'.89em',sm:'1.195em'},
                    fontWeight: '500'
                }}>
                    {title}
                </Typography>
              
              
                {/* <Typography
                    sx={{
                    my: .5,
                    color:'green',
                    fontWeight: '400',
                    fontSize: {xs:'1.01em',sm:'1.16em'}
                }}>
                    {price}$
                </Typography> */}


{newPrice ?   <Typography
                    sx={{
                    my: .5,
                    color:'green',
                    fontWeight: '400',
                    fontSize: {xs:'1.01em',sm:'1.16em'}
                }}>
                    <span>
                    ${price}
                    </span>
                    {' '}
                    <span style={{color:'red'}}>${newPrice}</span>
                    
                     </Typography>
                     
                    : 

                    <Typography
                    sx={{
                    my: .5,
                    color:'green',
                    fontWeight: '400',
                    fontSize: {xs:'1.01em',sm:'1.16em'}
                }}>
                 
                   ${price || 0}
                   
                    
                     </Typography>
                    }


                <Btn
            className='cursor gap1'
                
                     onClick={()=>addToCart(1,_id,{title,category,img:images[0],_id,price: Number(newPrice) ?Number(newPrice) : price},true)}
                    
                    sx={{
                        color:'white',
                        width:'100%',
                   
                    borderRadius:25,
                  
                 
                }}>
                    Add To Cart
                </Btn>
            </Box>
        </Box>
    )
}

export default ProductCard