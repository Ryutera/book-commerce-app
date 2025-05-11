"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


const PurchaseSuccess = () => {
  const searchPrams = useSearchParams();
  const sessionId = searchPrams.get("session_id");

useEffect(()=>{
const fetchData = async ()=>{
    if (sessionId) {
        try {
           
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/success`,
                {method:"POST", headers:{"Content-Type": "application/json"}, body:JSON.stringify({sessionId})}
            )

            console.log(res.json())
        } catch (error) {
            console.error(error)
        }
    }

}
fetchData()

},[])

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Thank you for your purchase
        </h1>
        <p className="text-center text-gray-600">
          Details of your purchase will be sent to your registered e-mail
          address.
        </p>
        <div className="mt-6 text-center">
          <Link
            href={`/`}
            className="text-indigo-600 hover:text-indigo-800 transition duration-300"
          >
            Read the article you purchased
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
