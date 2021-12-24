import DiningsDAO from "../dao/diningsDAO.js"

export default class DiningsController {
  static async apiGetDinings(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { restaurantsList, totalNumRestaurants } = await DiningsDAO.getDinings({
      filters,
      page,
      restaurantsPerPage,
    })

    let response = {
      dinings: restaurantsList,
      page: page,
      filters: filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    }
    res.json(response)
  }
  static async apiGetDiningById(req, res, next) {
    try {
      let id = req.params.id || {}
      let dining = await DiningsDAO.getDiningByID(id)
      if (!dining) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(dining)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetDiningCuisines(req, res, next) {
    try {
      let cuisines = await DiningsDAO.getCuisines()
      res.json(cuisines)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}