
require("dotenv").config();
const app = require("./app");  // <-- THIS IS WHAT WAS MISSING

const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
