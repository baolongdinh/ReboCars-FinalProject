const slackNotify = require("slack-notify");
const MY_SLACK_WEBHOOK_URL =
  "https://hooks.slack.com/services/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";

const slack = slackNotify(MY_SLACK_WEBHOOK_URL);

const sendAlertToSlack = (error, apiUrl) => {
  slack
    .send({
      channel: "#rebocars-webserver-error-message",
      icon_url: ":warning:",
      text: "This is rebocars website alert",
      fields: {
        api_url: apiUrl,
        error_name: error.name,
        error_message: error.message,
        error_statusCode: error.status,
      },
    })
    .catch((err) => {
      console.error("API error:", err);
    });
};

module.exports = { sendAlertToSlack };
