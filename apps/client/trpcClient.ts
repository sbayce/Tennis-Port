import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from 'trpc/routers/index'

let accessToken: string | undefined
let refreshToken: string | undefined

export function setToken(at: string | undefined, rt: string |undefined) {
    accessToken = at
    refreshToken = rt
    console.log("token updated: ", accessToken)
}

const trpc = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({
        url: String(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trpc`),
        headers() {
            if(accessToken && refreshToken) {
                return {
                    AccessToken: accessToken,
                    RefreshToken: refreshToken,
                }
            }
            return {}
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
