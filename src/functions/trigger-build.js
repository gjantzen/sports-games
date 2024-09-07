export async function onRequestPost(context) {
  const { CLOUDFLARE_DEPLOY_HOOK } = context.env;

  if (!CLOUDFLARE_DEPLOY_HOOK) {
    return new Response("Deploy hook not configured", { status: 500 });
  }

  const response = await fetch(CLOUDFLARE_DEPLOY_HOOK, {
    method: 'POST',
  });

  if (response.ok) {
    return new Response("Build triggered successfully", { status: 200 });
  } else {
    return new Response("Failed to trigger build", { status: 500 });
  }
}