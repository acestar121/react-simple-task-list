const app = require("./app");

// app listens to defined port
const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
