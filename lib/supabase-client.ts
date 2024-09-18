// import { createClient } from "@supabase/supabase-js"

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

// export const supabaseClient = async (supabaseAccessToken: string) => {
//   const supabase = createClient(
//     supabaseUrl as string,
//     supabaseKey as string,
//     {
//       global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
//     }
//   )

//   return supabase
// }

// export const supabaseClientPublic = async () => {
//   const supabase = createClient(
//     supabaseUrl as string,
//     supabaseKey as string
//   )

//   return supabase
// }

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // Use anon key for public client

// Authenticated Supabase Client
export const supabaseClient = (supabaseAccessToken: string) => {
  const supabase = createClient(
    supabaseUrl as string,
    supabaseAnonKey as string,  // Use anon key, NOT service role key
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`, // Attach user token from Clerk
        },
      },
    }
  )

  return supabase
}

// Public Supabase Client (No Auth Required)
export const supabaseClientPublic = () => {
  const supabase = createClient(
    supabaseUrl as string,
    supabaseAnonKey as string  // Use anon key for unauthenticated access
  )

  return supabase
}
