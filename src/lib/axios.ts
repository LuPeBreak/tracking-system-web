import axios from 'axios'
import Cookies from 'js-cookie'

import { env } from '@/env'

const cookies = Cookies.get()
export const api = axios.create({
  baseURL: env.VITE_API_URL,
  // withCredentials: true,
  headers: {
    Authorization: cookies.track_token ? `Bearer ${cookies.track_token}` : '',
  },
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config
  })
}
