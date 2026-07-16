import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/lens", async (req, res) => {
    const term = req.query.q;

    // PatentsView API
    const url = `https://api.patentsview.org/patents/query?q={"_text_any":{"patent_title":["${term}"],"patent_abstract":["${term}"],"patent_claims":["${term}"]}}&f=["patent_id"]`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const count = data.patents ? data.patents.length : 0;

        res.json({ total: count });
    } catch (error) {
        res.json({ error: "PatentsView API error" });
    }
});

app.listen(3000, () => console.log("Proxy API running"));
