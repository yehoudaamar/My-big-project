const express = require('express');
const router = express.Router();
const ApiUser = require('../api/User.api');
const path = require('path');
const viewsPath = path.join(__dirname + '/../views');
router.use("/", express.static(viewsPath + "/singin"));


router.get("/", (req, res) => {
    res.sendFile((viewsPath + "/singin/singin.html"));
}
)



router.post("/", async (req, res) => {
    const data = req.body;
    const pass = data.password

    // console.log(password)

    const myData = ApiUser.ReadUsers()

    const pswHash = await ApiUser.hashpsw(pass);
    data.password = pswHash



       myData.forEach(o => {
            const email = data.email
            if (o.email === `${email}`) {
                console.log("email exist")
            }
            if (o.email !== `${email}`) {
                console.log("email not exist")
            }
        }
        )
    ApiUser.AddaUser(data)





    // const myData = await ApiUser.ReadUsers();






})








module.exports = router;