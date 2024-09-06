import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  if (context.url.pathname === '/admin') {
    const session = context.cookies.get('session');
    if (!session || session.value !== 'authenticated') {
      return context.redirect('/login');
    }
  }
  return next();
})