const { bookService } = require('../libs/dataService');
const db = require('../config/db');
const bookModel = {
  async getList(NE_name) {
    return await bookService.scan(NE_name);
  },
};

module.exports = { bookModel };