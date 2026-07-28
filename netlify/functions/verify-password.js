exports.handler = async function(event, context) {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const password = body.password || '';
    const secret = process.env.SITE_PASSWORD || '';

    if (!password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, message: 'Missing password' })
      };
    }

    const ok = password === secret;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, message: 'Server error' })
    };
  }
};
