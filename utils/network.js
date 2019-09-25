import { globalUrls } from "urls.js";

const network = {

  getMovieList: function (params) {
    params.type = "movie";
    this.getItemList(params)
  },

  getTVList: function (params) {
    params.type = "tv";
    this.getItemList(params)
  },

  getShowList: function (params) {
    params.type = "show";
    this.getItemList(params)
  },

  getItemList: function(params){
    let url = "";
    if (params.type === "movie") {
      url = globalUrls.movieList
    } else if (params.type === "tv") {
      url = globalUrls.tvList
    } else {
      url = globalUrls.showList
    }
    const count = params.count ? params.count : 7;
    wx.request({
      url: url,
      data: {
        count: count
      },
      success: function (res) {
        let items = res.data.subject_collection_items;
        let itemsCount =  items.length;
        let left = itemsCount%3;
        if (left === 2) {
          items.push(null)
        }
        if (params && params.success) {
          params.success(items)
        }
      }
    });
  }
}

export { network }
