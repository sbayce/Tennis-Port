"use client"
// import CheckoutForm from "@/components/checkout/CheckoutForm"
// import trpc from "@/trpcClient";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { useCart } from "@/contexts/CartContext";
// import Product from "@/types/product";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
// );

const ProductCheckoutPage = () => {
  // const params = useSearchParams()
  // console.log("got params: ", params)
  // const productId = String(params.get("id"))
  // const gripSize = String(params.get("gripSize"))
  // const stringOption = String(params.get("stringOption"))
  // console.log("id: ", productId)

  // const [clientSecret, setClientSecret] = useState<string | null>(null);
  // const [productData, setProductData] = useState<Product>();
  // const { items, total } = useCart()

  // useEffect(() => {
  //   // Fetch the client secret from your backend
  //   const fetchClientSecret = async () => {
  //     try {
  //       const res = await trpc.checkout.mutate({ amount: params.size > 0? Number(productData?.price) : total }); // Replace `amount` with the correct amount or calculation
  //       setClientSecret(res.clientSecret);
  //     } catch (error) {
  //       console.error("Error fetching client secret:", error);
  //     }
  //   };

  //   fetchClientSecret();
  //   fetchProduct()
  // }, []);

  // const fetchProduct = async () => {
  //   const productData = await trpc.getRacket.query(productId)
  //   if(productData) setProductData(productData)
  // }
  // console.log(items)

  // if (!clientSecret) {
  //   // Show a loading state while fetching the client secret
  //   return <div>Loading...</div>;
  // }
  
  return (
    <div>Checkout</div>
    // <Elements stripe={stripePromise} options={{ clientSecret, appearance: {theme: "flat"} }}>
    //   <div className="flex gap-10">
    //     <CheckoutForm amount={params.size > 0? Number(productData?.price) : total} />
    //     <div className="flex flex-col gap-2 mr-auto">
    //       {params.size === 0 && items.map(item => 
    //         <div key={item.id} className="flex gap-2 items-center">
    //           <div className="relative border rounded-lg">
    //             <div className="rounded-full w-4 h-4 flex items-center justify-center absolute text-white text-sm bg-[#202223] top-0 right-0">
    //               {item.quantity}
    //             </div>
    //             <img className="h-20 w-20" src={item.image} alt="product-img" />
    //           </div>
    //           <div>
    //             <p>{item.name}</p>
    //             <p className="text-xs">{item.price} EGP</p>
    //             <p className="text-xs">Grip: {item.gripSize}</p>
    //             <p className="text-xs">String option: {item.stringOption}</p>
    //           </div>
    //         </div>
    //       )}
    //       {params.size > 0 && productData &&
    //         <div className="flex gap-2 items-center">
    //         <img className="h-20 w-20 border rounded-lg" src={productData.image} alt="product-img" />
    //         <div>
    //           <p>{productData.name}</p>
    //           <p className="text-xs">{productData.price} EGP</p>
    //           <p className="text-xs">Grip: {gripSize}</p>
    //           <p className="text-xs">String option: {stringOption}</p>
    //         </div>
    //       </div>}
    //       <div className="flex gap-2 items-center text-xl mt-4">
    //         <h3 className="font-semibold">Total:</h3>
    //         <p>{productData? productData.price : total}</p>
    //       </div>
    //     </div>
    //   </div>
    // </Elements>
  )
}

export default ProductCheckoutPage