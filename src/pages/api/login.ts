// src/pages/api/login.ts

import type { APIRoute } from 'astro';

export const prerender = false;

export const post: APIRoute = async ({ request, cookies, redirect }) => {
  const data = await request.formData();
  const username = data.get('username');
  const password = data.get('password');

  if (
    typeof username === 'string' &&
    typeof password === 'string' &&
    username === import.meta.env.ADMIN_USERNAME &&
    password === import.meta.env.ADMIN_PASSWORD
  ) {
    cookies.set('session', 'authenticated', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return new Response(JSON.stringify({ success: true, redirect: '/admin' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ error: 'Invalid username or password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};