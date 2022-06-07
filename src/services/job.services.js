import axios from 'axios'

  export const getWorks = async () => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/jobs`)
       .then(response => {
           return response.data
        });
      }

  export const getWorksCategory = async (category)  => {
      return await axios.get(`${process.env.REACT_APP_API_URL}/jobs/${category}/list`).then(response => {
            return response.data
        })
    }
