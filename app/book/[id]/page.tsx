
import { getDetailBook } from "@/app/lib/microcms/client";
import Image from "next/image";
import React from "react";

const DetailBook = async ({params} :{params: Promise<{id:string}>}) => {


    const book = await getDetailBook((await params).id)

    console.log(book)
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
                  className="w-full h-80 object-cover object-center"
                  width={700}
                  height={700} src={book.thumbnail.url} alt={"bookimg"}        />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <div
            className="text-gray-700 mt-2"
            dangerouslySetInnerHTML={{ __html: book.content }}
          />

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">Release date:{book.publishedAt}</span>
            <span className="text-sm text-gray-500">Latest update:{book.createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;