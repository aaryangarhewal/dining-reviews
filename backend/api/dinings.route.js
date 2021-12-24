import express from "express"
import DiningsCtrl from "./dinings.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(DiningsCtrl.apiGetDinings)
router.route("/id/:id").get(DiningsCtrl.apiGetDiningById)
router.route("/cuisines").get(DiningsCtrl.apiGetDiningCuisines)

router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router