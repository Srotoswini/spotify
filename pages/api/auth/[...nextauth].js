import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyapi, { LOGIN_URL} from "../../../lib/spotify"

async function refreshAcessToken(token) {
    try{

        spotifyapi.setAcessToken(token.accessToken)
        spotifyapi.setRefreshToken(token.refreshToken)

        const { body: refreshedToken } = await spotifyapi.refreshAccessToken();
        console.log("REFRESHED TOKEN IS", refreshedToken)
        
        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refresh_token
        }
    
    } catch(error){
        console.error(error);

        return{
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: NEXT_PUBLIC_CLIENT_ID,
      clientSecret: NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    }),
    // ...add more providers here
  ],

  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({token, account, user }){
        //initial signin
        if (account && user) 
        return {
            ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
    }
  }

  if (Date.now() < token.accessTokenExpires) 
  {
    console.log("VALID")
    return token;
  }

  console.log("ACCESS TOKEN HAS EXPIRED, RESPONDING...")
  return await refreshAccessToken(token)
  }
}
);