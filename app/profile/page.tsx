import Image from "next/image";
import { getServerSession } from "next-auth";
import { User,  Purchase, BookType } from "../types/BookType";
import { nextAuthOptions } from "../lib/next-auth/options";
import { getDetailBook } from "../lib/microcms/client";
import PurchasesDetailBooks from "../components/PurchasesDetailBooks";


export default async function ProfilePage() {

    const session = await getServerSession(nextAuthOptions)
const user = session?.user as User

let  purchasesDetailBooks:BookType[] = []

if (user) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`)
  const purchasesData = await response.json()
  console.log(purchasesData)

  //複数購入履歴がある場合は全ての処理の終了を待つ必要があるのでpromiseAll
purchasesDetailBooks = await Promise.all(purchasesData.map(async(purchase: Purchase)=>{
return await getDetailBook(purchase.bookId)
  }))

}


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Profile</h1>

      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <Image
            priority
            src={user.image || "/default_icon.png"}
            alt="user profile_icon"
            width={60}
            height={60}
            className="rounded-t-md"
          />
          <h2 className="text-lg ml-4 font-semibold">Name：
        {user.name}
          </h2>
        </div>
      </div>

      <span className="font-medium text-lg mb-4 mt-4 block">Purchased books</span>
      {purchasesDetailBooks.map((purchasesDetailBook:BookType)=>(
<PurchasesDetailBooks key={purchasesDetailBook.id} purchasesDetailBook={purchasesDetailBook} />

      ))}
      <div className="flex items-center gap-6"></div>
    </div>
  );
}