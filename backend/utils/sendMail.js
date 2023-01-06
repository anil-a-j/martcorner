export const passwordResetLinkMail = async (email, subject, content) => {
  const api = await fetch(
    `https://accounts.zoho.in/oauth/v2/token?client_id=${process.env.EMAIL_CLIENT_ID}&client_secret=${process.env.EMAIL_CLIENT_SECRET}&redirect_uri=https://martcorner.in/&grant_type=refresh_token&refresh_token=${process.env.EMAIL_REFRESH_TOKEN}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  const access_token = response.access_token;

  const send = await fetch(
    `https://mail.zoho.in/api/accounts/${process.env.EMAIL_ACCOUNT_ID}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Zoho-oauthtoken ${access_token}`,
      },
      body: JSON.stringify({
        fromAddress: "support@martcorner.in",
        toAddress: email,
        subject,
        content,
        askReceipt: "yes",
      }),
    }
  );
  const mail_response = await send.json();
  if (mail_response.message) {
    throw new Error(mail_response.message);
  }
  return mail_response.status;
};

export const feedbackMail = async (subject, content) => {
  const api = await fetch(
    `https://accounts.zoho.in/oauth/v2/token?client_id=${process.env.EMAIL_CLIENT_ID}&client_secret=${process.env.EMAIL_CLIENT_SECRET}&redirect_uri=https://martcorner.in/&grant_type=refresh_token&refresh_token=${process.env.EMAIL_REFRESH_TOKEN}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  const access_token = response.access_token;

  const send = await fetch(
    `https://mail.zoho.in/api/accounts/${process.env.EMAIL_ACCOUNT_ID}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Zoho-oauthtoken ${access_token}`,
      },
      body: JSON.stringify({
        fromAddress: "feedback@martcorner.in",
        toAddress: "feeds@martcorner.in",
        subject,
        content,
        askReceipt: "yes",
      }),
    }
  );
  const mail_response = await send.json();
  if (mail_response.message) {
    throw new Error(mail_response.message);
  }
  return mail_response.status;
};
