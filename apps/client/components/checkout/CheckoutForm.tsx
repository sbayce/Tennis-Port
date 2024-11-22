"use client"
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe, AddressElement } from "@stripe/react-stripe-js";
// import trpc from "@/trpcClient";
import { useState } from "react";

const CheckoutForm = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>("")
    console.log(amount)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (!stripe || !elements) return; // Ensure Stripe and Elements are initialized
            setIsLoading(true);

            // Confirm the payment using PaymentElement
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/stripe/purchase-success`, // Optional: Redirect URL after payment
                },
            });

            if (error) {
                if (error.type === "card_error" || error.type === "validation_error") {
                    setErrorMessage(error.message || "Card validation error.");
                } else {
                    setErrorMessage("An unexpected error occurred.");
                }
            } 
            // else {
            //     setErrorMessage(""); // Clear errors on success
            //     // Fetch the client secret from your backend
            //     const res = await trpc.checkout.mutate({ amount });
            //     const clientSecret = res.clientSecret;
            //     console.log("client secret: ", clientSecret)
            //     if (!clientSecret) {
            //         setErrorMessage("Failed to fetch payment information.");
            //         return;
            //     }
            // }
        } catch (error) {
            setErrorMessage("An unexpected error occurred. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
  return (
        <form className="ml-auto" onSubmit={onSubmit}>
            <PaymentElement />
            <LinkAuthenticationElement />
            <AddressElement options={{ mode: "shipping" }} />
            {errorMessage && <p className="text-destructive">{errorMessage}</p>}
            <button className="mt-10 rounded-lg bg-[#202223] text-white p-2 text-sm w-full" disabled={stripe === null || elements === null || isLoading} type="submit">{isLoading? "Purchasing..." : "Purchase"}</button>
        </form>
  )
}

export default CheckoutForm