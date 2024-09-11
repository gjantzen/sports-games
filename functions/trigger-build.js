export async function onRequest(context) {
  if (context.request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { CLOUDFLARE_DEPLOY_HOOK } = context.env;

  if (!CLOUDFLARE_DEPLOY_HOOK) {
    return new Response("Deploy hook not configured", { status: 500 });
  }

  try {
    console.log("Attempting to trigger build with hook:", CLOUDFLARE_DEPLOY_HOOK);
    const response = await fetch(CLOUDFLARE_DEPLOY_HOOK, {
      method: 'POST',
    });

    if (response.ok) {
      return new Response("Build triggered successfully", { status: 200 });
    } else {
      const errorText = await response.text();
      console.error("Failed to trigger build:", response.status, errorText);
      return new Response(`Failed to trigger build: ${response.status} ${errorText}`, { status: 500 });
    }
  } catch (error) {
    console.error("Error triggering build:", error);
    return new Response(`Error triggering build: ${error.message}`, { status: 500 });
  }
}