const { Router } = require("express");
const get_details = require("./get_details");
const postUser = require("./postUser");
const putDetailsUser = require("./putDetailsUser");
const putDetailsProfile = require("./putDetailsProfile");
const get_paseadores = require("./get_paseadores");
const login = require("./login");
const putHorarios = require("./putHorarios");
const postImages = require("./postImages");
const forgotPassword = require ("./forgotPassword")
const newPassword = require ("./newPassword")
const get_ubication = require ("../routes/FilterOrder/get_ubication")
const postClient = require ("./Client/postClient")
const putClientePerfil = require ("../routes/Client/putClientePerfil")
const putCliente = require ("../routes/Client/putClient")
const detailsClient = require("../routes/Client/getDetailsCliente")
const sendOrden = require ("./sendOrden")
const getOrden = require ("./getOrden")
const answerOrden = require("./answerOrden")
const postPremium = require("./postPremium")

const router = Router();

router.use("/walkers", get_details);
router.use("/allActiveWalkers", get_paseadores);
router.use("/createUser", postUser);
router.use("/updateuser", putDetailsUser);
router.use("/updateuserProfile", putDetailsProfile);
router.use("/login", login);
router.use("/walkers", putHorarios);
router.use("/ubication", get_ubication);
router.use("/postimages", postImages);
router.use("/forgotPassword",forgotPassword);
router.use("/newPassword", newPassword);
router.use("/createClient", postClient);
router.use("/updateClientProfile", putClientePerfil);
router.use("/updateCliente", putCliente);
router.use("/Cliente", detailsClient);
router.use("/sendOrden", sendOrden)
router.use('/getOrden', getOrden)
router.use('/ordenAnswer', answerOrden)
router.use("/updatePremium", postPremium);

module.exports = router;