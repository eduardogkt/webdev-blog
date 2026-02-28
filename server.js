import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// render all posts
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response.data);
        res.render("index.ejs", { title: "My Blog", posts: response.data });
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
});

app.get("/posts/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
        console.log(response.data);
        res.render("post.ejs", { post: response.data });
    } catch (error) {
        res.status(500).json({ message: "Error fetching post" });
    }
});

// render new post form
app.get("/new", (req, res) => {
    res.render("create.ejs");
});

// save new post
app.post("/posts", async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}/posts`, req.body);
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
});

// render edit post form
app.get("/edit/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
        res.render("edit.ejs", { post: response.data });
    } catch (error) {
        res.status(500).json({ message: "Error editing post" });
    }
});

// save edited post
app.post("/posts/:id", async (req, res) => {
    try {
        const response = await axios.patch(
            `${API_URL}/posts/${req.params.id}`,
            req.body,
        );
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
});

// delete post
app.get("/posts/delete/:id", async (req, res) => {
    try {
        const response = await axios.delete(
            `${API_URL}/posts/delete/${req.params.id}`,
        );
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
});

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
