import type { APIRoute } from "astro";

export const post: APIRoute = async ({ cookies, redirect }) => {
  // Clear session cookie
  cookies.delete('session', {
    path: '/'
  });

  // Redirect to login page
  return redirect('/login');
}