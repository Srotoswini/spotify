import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyapi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAcessToken(token) {
  try {

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

  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    }),
    // ...add more providers here
  ],

  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, account, user }) {
      
      // Initial Sign In
      if (account && user) {
        return {
          ...token,
          accessToken: account.accessToken,
          refreshToken: account.refreshToken,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000
        };
      }

      // Return previous token if it the pervious token is still valid
      if (token.accessTokenExpires > Date.now()) {
        return token;
      }

      // Provide a refresh token when access token expires
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username

      return session;
    }
  },
})