import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import cheerio from "cheerio";

const app = express();
app.use(cors());

app.get("/lens", async (req, res) => {
    const term = req.query.q;

    const url = `https://patents.google.com/?q=${encodeURIComponent(term)}`;

    try {
        const response = await fetch(url);
        const html = await response.text();

        const $ = cheerio.load(html);

        const countText = $('span.results-count').text() || "";
        const count = parseInt(countText.replace(/\D+/g, "")) || 0;

        res.json({ total: count });
    } catch (error) {
        res.json({ error: "Google Patents error" });
    }
});

app.listen(3000, () => console.log("Proxy API running"));
