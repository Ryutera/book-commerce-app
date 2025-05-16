// 購入履歴の保存
import prisma from "@/app/lib/prisma"

import {NextResponse} from "next/server"
import Stripe from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST (request:Request){


    const {sessionId} = await request.json()

 

    try {
// セッションのメタデータをsessionIdから取得する
        const session = await stripe.checkout.sessions.retrieve(sessionId)



const existingPurchase = await prisma.purchase.findFirst({
    where:{
        userId: session.client_reference_id!, 
        bookId: session.metadata?.bookId!,
    }
})

if (!existingPurchase) {
    const purchase = await prisma.purchase.create({
        data:{
            userId: session.client_reference_id!, 
            bookId: session.metadata?.bookId!,
        } 
    })

    return NextResponse.json({purchase})
}else{
    return NextResponse.json({message : "already purchased"})
}

        
        
    } catch (error) {
        return NextResponse.json(error)
    }


}