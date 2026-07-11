import crypto from "crypto";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { signToken } from "@/lib/auth";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

interface GoogleTokenResponse {
  access_token: string;
  id_token: string;
  expires_in: number;
  token_type: string;
}

interface GoogleUserInfo {
  sub: string;
  email: string;
  name: string;
  picture: string;
  email_verified: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const storedState = request.cookies.get("google_oauth_state")?.value;

    if (!CLIENT_ID || !CLIENT_SECRET) {
      return new Response(
        `<html><body><script>window.opener?.postMessage({ type: "GOOGLE_ERROR", error: "Google OAuth is not configured" }, "${APP_URL}"); window.close();</script></body></html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    if (!state || state !== storedState) {
      return new Response(
        `<html><body><script>window.opener?.postMessage({ type: "GOOGLE_ERROR", error: "State mismatch" }, "${APP_URL}"); window.close();</script></body></html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    if (!code) {
      const error = searchParams.get("error") || "unknown";
      return new Response(
        `<html><body><script>window.opener?.postMessage({ type: "GOOGLE_ERROR", error: "${error}" }, "${APP_URL}"); window.close();</script></body></html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    const redirectUri = `${APP_URL}/api/auth/google/callback`;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error("Google token exchange failed:", errText);
      return new Response(
        `<html><body><script>window.opener?.postMessage({ type: "GOOGLE_ERROR", error: "Token exchange failed" }, "${APP_URL}"); window.close();</script></body></html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    const tokenData: GoogleTokenResponse = await tokenRes.json();

    const userInfoRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
    );

    if (!userInfoRes.ok) {
      return new Response(
        `<html><body><script>window.opener?.postMessage({ type: "GOOGLE_ERROR", error: "Failed to get user info" }, "${APP_URL}"); window.close();</script></body></html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    const googleUser: GoogleUserInfo = await userInfoRes.json();

    if (!googleUser.email || !googleUser.email_verified) {
      return new Response(
        `<html><body><script>window.opener?.postMessage({ type: "GOOGLE_ERROR", error: "Email not verified" }, "${APP_URL}"); window.close();</script></body></html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    await connectDB();

    let user = await User.findOne({ email: googleUser.email.toLowerCase() });

    if (!user) {
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email.toLowerCase(),
        password: cryptoRandomString(),
        role: "user",
      });
    }

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    const headers = new Headers({ "Content-Type": "text/html" });
    headers.append("Set-Cookie", `token=${token}; HttpOnly; ${process.env.NODE_ENV === "production" ? "Secure;" : ""} SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}; Path=/`);
    headers.append("Set-Cookie", "google_oauth_state=; HttpOnly; Max-Age=0; Path=/");

    return new Response(
      `<html><body><script>
        window.opener?.postMessage({
          type: "GOOGLE_SUCCESS",
          token: "${token}",
          user: ${JSON.stringify(userData)}
        }, "${APP_URL}");
        window.close();
      </script></body></html>`,
      { headers }
    );
  } catch (error) {
    console.error("Google callback error:", error);
    return new Response(
      `<html><body><script>window.opener?.postMessage({ type: "GOOGLE_ERROR", error: "Internal error" }, "${APP_URL}"); window.close();</script></body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}

function cryptoRandomString(): string {
  return crypto.randomBytes(32).toString("hex");
}
