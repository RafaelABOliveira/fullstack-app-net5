import axios from 'axios';

const ApiService = {
  endpoint:'https://localhost:44355/api/',
  //endpoint: 'https://homologapi.guarany.calculadora.nacaointerativa.com.br/api/',
  //endpoint: "https://api.guarany.nacaointerativa.com.br/api/",
  //endpoint: 'https://api.guarany.calculadora.guaranyind.com.br/api/',

  get(url, data = {}) {
    return axios.get(this.endpoint + url, data);
  },

  post(url, data) {
    return axios.post(this.endpoint + url, data);
  },

  put(url, data, headers = {}) {
    return axios.put(this.endpoint + url, data, headers);
  },

  patch(url, data, headers = {}) {
    return axios.patch(this.endpoint + url, data, headers);
  },

  delete(url, data, headers = {}) {
    return axios.delete(this.endpoint + url, data, headers);
  },

  getEndpoint() {
    return this.endpoint;
  },

  parseDate(dateStr) {
    let parts = dateStr.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  },


  formatDate(dateToFormat, showHours = false) {
    let date = new Date(dateToFormat);
    let d = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    let m =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1);

    let mins =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();

    return (
      d +
      '/' +
      m +
      '/' +
      date.getFullYear() +
      (showHours ? ' ' + hours + ':' + mins : '')
    );
  },
};

export default ApiService;
