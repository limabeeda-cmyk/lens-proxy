import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/lens", async (req, res) => {
    const term = req.query.q;
    const url = `https://api.lens.org/patent/search?q=${encodeURIComponent(term)}&size=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.json({ error: "Lens API error" });
    }
});

app.listen(3000, () => console.log("Proxy API running"));
