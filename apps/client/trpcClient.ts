import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from 'trpc/routers/index'


let accessToken: string | undefined
let refreshToken: string | undefined

export function setToken(accessToken: string | undefined, refreshToken: string |undefined) {
    accessToken = accessToken
    refreshToken = refreshToken
}

const trpc = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({
        url: String(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trpc`),
        headers() {
            console.log("sending trpc req: ", accessToken, refreshToken)
            return {
                AccessToken: accessToken,
                RefreshToken: refreshToken,
            }
        },
        fetch(url, options) {
            return fetch(url, {
                ...options,
                credentials: "include",
            })
        }
    })],
})
export default trpc
