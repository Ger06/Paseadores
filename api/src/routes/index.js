const { Router } = require("express");
//const { Administrator} = require("../db");
const get_details = require("./get_details");
const postUser = require("./postUser");
const putDetailsUser = require("./putDetailsUser");
const putDetailsProfile = require("./putDetailsProfile");
const get_paseadores = require("./get_paseadores");
const login = require("./login");
const postImages = require("./postImages");
const forgotPassword = require("./forgotPassword");
const newPassword = require("./newPassword");
const get_ubication = require("../routes/FilterOrder/get_ubication");
const postClient = require("./Client/postClient");
const putClientePerfil = require("../routes/Client/putClientePerfil");
const putCliente = require("../routes/Client/putClient");
const detailsClient = require("../routes/Client/getDetailsCliente");
const sendOrden = require("./sendOrden");
const getOrden = require("./getOrden");
const answerOrden = require("./answerOrden");
const getWalkers = require("../routes/Administrator/getWalkers");
const getClients = require("../routes/Administrator/getClients");
const makeAdmin = require("../routes/Administrator/makeAdmin");
const deleteUserAccount = require("../routes/Administrator/deleteUserAccount");
const resetPassword = require("../routes/Administrator/resetPassword");
const firstAdmin = require("../routes/Administrator/firstAdmin");
const addFavorite = require("./addFavorite");
const getFavorite = require("./getFavorite");
const deleteFavorite = require("./deleteFavorite");
const getForListFav = require("./getForListFav");
const googleLogIn = require("./googleLogIn");
const getPremium = require("./getPremium");
const postPremium = require("./postPremium");
const tokenExtractor = require("../utils/tokenExtractor");
const preference = require("./preference");
const getPreferences = require("./getpreferences");
const postAssessment = require("./postAssessment");
const getAssessment = require("./getAssessment");

const router = Router();

router.use("/walkers", tokenExtractor, get_details);
router.use("/allActiveWalkers", tokenExtractor, get_paseadores);
router.use("/createUser", postUser);
router.use("/updateuser", tokenExtractor, putDetailsUser);
router.use("/updateuserProfile", tokenExtractor, putDetailsProfile);
router.use("/login", login);
router.use("/google", googleLogIn);
router.use("/ubication", get_ubication);
router.use("/postimages", tokenExtractor, postImages);
router.use("/forgotPassword", forgotPassword);
router.use("/newPassword", newPassword);
router.use("/createClient", postClient);
router.use("/updateClientProfile", tokenExtractor, putClientePerfil);
router.use("/updateCliente", tokenExtractor, putCliente);
router.use("/Cliente", tokenExtractor, detailsClient);
router.use("/sendOrden", sendOrden);
router.use("/getOrden", tokenExtractor, getOrden);
router.use("/ordenAnswer", tokenExtractor, answerOrden);
router.use("/updatePremium", tokenExtractor, postPremium);
router.use("/getWalkers", tokenExtractor, getWalkers);
router.use("/getClients", tokenExtractor, getClients);
router.use("/makeAdmin", tokenExtractor, makeAdmin);
router.use("/deleteUserAccount", tokenExtractor, deleteUserAccount);
router.use("/resetPassword", tokenExtractor, resetPassword);
router.use("/firstAdmin", firstAdmin);
router.use("/sendPreferencias", preference);
router.use("/getpreferences", getPreferences);

router.use("/addFav", tokenExtractor, addFavorite);
router.use("/getFavorite", tokenExtractor, getFavorite);
router.use("/quitFav", tokenExtractor, deleteFavorite);
router.use("/getForListFav", tokenExtractor, getForListFav);
router.use("/getPremium", tokenExtractor, getPremium);
router.use("/postAssessment", postAssessment);
router.use("/getAssessment", getAssessment);

module.exports = router;
