import apiAxios from './../axios'

const demo = (data) => {
  apiAxios({
    type: "GET",
    url: "/v2/movie/coming_soon",
    data
  })
}

const demo2 = (data) => {
  apiAxios({
    type: "POST",
    url: "/v2/movie/coming_soon",
    data
  })
}

export default {
  demo,
  demo2
}