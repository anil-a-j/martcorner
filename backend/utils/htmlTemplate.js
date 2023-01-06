export const passwordChange = (securityCode) => {
  return `<div
    style="
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      width: 100%;
    "
  >
    <h3
      style="
        background-color: rgb(0 165 20);
        margin: 0 auto;
        padding: 10px;
        color: white;
      "
    >
      Password Update
    </h3>
    <div
      style="background-color: rgb(245, 245, 245); padding: 10px; margin: 0px"
    >
      <h5 style="color: rgb(255, 59, 15)">
        Do not Share this link with anyone
      </h5>
      <p>
        Follow mentioned link below to change password</p>
        <a href=${
          process.env.NODE_ENV === "development"
            ? "localhost:5173"
            : "https://www.martcorner.in"
        }/resetpassword/${securityCode}
          >${
            process.env.NODE_ENV === "development"
              ? "localhost:5173"
              : "https://www.martcorner.in"
          }/resetpassword/${securityCode}</a
        >
      

      <p style="font-weight:bold">
        If you received this email without initiation from your side. please
        Ignore this or contact support@martcorner.in
      </p>
      <p>
        Regards<br />
        Support Team at Martcorner
      </p>
    </div>
  </div>`;
};
