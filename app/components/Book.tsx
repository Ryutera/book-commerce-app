"use client";

import Image from "next/image";
import { BookType } from "../types/BookType";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


type BookProps = {
  book:BookType
}


// eslint-disable-next-line react/display-name
const Book = ({ book }: BookProps) => {
  const [showModal, setShowmodal] = useState(false)
const {data: session} = useSession()
const user = session?.user
const router = useRouter()

const stripeCheckout = async () =>{

  try {
    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/checkout`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        title: book.title,
        price: book.price
      })
    })

    

    const responseData = await response.json()
    if (responseData) {
      console.log(responseData.checkout_url)
      router.push(responseData.checkout_url)
    }

  }catch(err){
    console.log(err)
  }
}


  const handleCancel = () =>{
   
    setShowmodal(false)
    console.log(showModal)
  }
  
  const handleOpen = () => {
    setShowmodal(true)
    console.log(showModal)

  }

  const handlePurchase = () => {
    if (!user) {
     setShowmodal(false)
     router.push("/login")
    
    }else{
      //to Stripe 
     stripeCheckout()

    }
  }
  
  return (
    <>
      {/* アニメーションスタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center m-4" >
        <a onClick={handleOpen} className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none">
          <Image
            priority
            src={book.thumbnail.url}
            alt={book.title}
            width={450}
            height={350}
            className="rounded-t-md"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="mt-2 text-lg text-slate-600">Price is £{book.price}</p>
            <p className="mt-2 text-md text-slate-700">Price：£{book.price}</p>
          </div>
        </a>

{showModal && (<div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-200 bg-opacity-90 flex justify-center items-center modal">
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-xl mb-4">Do you buy the book？</h3>
            <button onClick={handlePurchase} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
              Buy
            </button>
            <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
              Cancel
            </button>
          </div>
        </div> )   }
       
      </div>
    </>
  );
};

export default Book;