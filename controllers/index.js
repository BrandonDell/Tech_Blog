const router = require("express").Router();
// api routes
const apiRouters = require("./api");
// home routes
const homeRoutes = require("./homeRoutes");
// dashboard routes
const dashboardRoutes = require("./dashboardRoutes");
// router.use home
router.use("/", homeRoutes);
// router.use dashboard
router.use("/dashboard", dashboardRoutes);
// router.use api
router.use("/api", apiRouters);
// export router
module.exports = router;