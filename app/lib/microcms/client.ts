import { BookType } from '@/app/types/BookType';
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});



export const getAllBooks = async () =>{

    const allbooks = await client.getList<BookType>({
        endpoint :"bookcommerce"
    })
    return allbooks
}

