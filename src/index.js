const express = require('express');
const path = require('path');
require("./config");
const User = require("./models/users");
const Asset = require("./models/assets")
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", 'ejs');
app.get("/home", async (req, res) => {
    try {
        const currentuser = req.query.user || "Guest";
        const userId = req.query.userid;
        const selected = req.query.category;
        let filter = {};
        if (selected) {
            filter = { category: selected };
        }
        const totalassets = await Asset.find(filter).sort({ createdAt: -1 });
        return res.render("home", {
            assets: totalassets,
            Filter: selected || "General",
            userName: currentuser,
            userId: userId
        });
    } catch (assetsError) {
        console.error("error:", assetsError);
        return res.status(500).send("Can not load assets!");
    }
});
app.get("/", (req, res) => {
    res.render("login");
});
app.get("/signup", (req, res) => {
    res.render("signup", { msg: null });
});
const bcrypt = require('bcrypt');
app.post("/signup", async (req, res) => {
    try {
        const hashpwd = await bcrypt.hash(req.body.password, 12);
        const data = {
            name: req.body.username, password: hashpwd
        }

        const reg_user = await User.findOne({ name: data.name })
        if (reg_user) {
            return res.render("signup", { msg: "Username already taken!" });
        } else {
            const userinfo = await User.create(data);
            console.log(userinfo);
            return res.render("signup", { msg: "Signup Successful!" });
        }

    }
    catch (signuperror) {
        console.error('Signup error:', signuperror);
        if (signuperror.code === 11000) {
            return res.render("signup", { msg: "Username already taken!" });
        }

        return res.status(500).render("signup", { msg: "Server error!" });
    }
}
);

app.get("/share", (req, res) => {
    const user = req.query.user || "Guest";
    res.render("share", { userName: user });
});

app.post("/share", async (req, res) => {
    try {
        const { title, description, category, link, creatorName } = req.body;
        await Asset.create({ title, description, category, link, creatorName });
        res.redirect(`/home?user=${creatorName}`);
    } catch (shareError) {
        console.error('Error!', shareError);
        res.send("sorry you can not share right now, retry later")
    }
});

app.post('/login', async (req, res) => {
    try {
        const check = await User.findOne({ name: req.body.username });
        if (!check) {
            return res.send("user can not be found");
        }
        const pwdmatch = await bcrypt.compare(req.body.password, check.password);
        if (pwdmatch) {
            return res.redirect(`/home?user=${check.name}&userid=${check._id}`);
        }
        else {
            return res.send("wrong password");
        }

    } catch (loginerror) {
        console.error("Login error:", loginerror);
        return res.send("an error occured while logging in, try again later");
    }

})



app.listen(3000, () => {
    console.log('server running on port 3000');
});
