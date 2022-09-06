const capi = async (event, path) => {
  fetch(
    `https://graph.facebook.com/v11.0/${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL}/events`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            event_name: event,
            event_time: Math.floor(new Date() / 1000),
            user_data: {
              client_ip_address: await getIp(),
              client_user_agent: window.navigator.userAgent,
            },
            event_source_url: path,
            action_source: "website",
          },
        ],
        access_token: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ACCESS_TOKEN,
        test_event_code: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_TEST_EVENT_CODE
          ? process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_TEST_EVENT_CODE
          : undefined,
      }),
    }
  )
    .then((res) => res.json())
    .then((resData) => {
      console.log("*********");
      console.log(resData);
    })
    .catch((err) => {
      console.error("err", err);
    });
};

const getIp = async () => {
  if (!localStorage.getItem("ip")) {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const { ip } = await response.json();
      localStorage.setItem("ip", ip);
      return ip;
    } catch (error) {
      console.error("Error on get IP:", error);
    }
  } else {
    return localStorage.getItem("ip");
  }
};

export default capi;
