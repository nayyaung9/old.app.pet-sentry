import chalk from "chalk";

const ctx = new chalk.Instance({ level: 3 });

export const handleError = (error: any) => {
  console.error(
    ctx.bold("API Error Handler Log"),
    "\n",
    ctx.bold("Response Code:"),
    error.response.status,
    "\n",
    ctx.bold("Endpoint:"),
    error.request._url,
    "\n",
    ctx.bold("Error Message:"),
    error?.response.data?.error || error?.response.message || "Unknown error",
  );

  return Promise.reject({
    status: error?.response.status,
    message:
      error?.response.data?.error || error?.response.message || "Unknown error",
  });
};
