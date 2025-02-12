const db = require('../config/db');
const _ = require('lodash');
const { removeSpecialChars } = require('../utils/index');

function DataServiceClass(tableName, key1, { searchKey } = {}) {
    const TABLE_NAME = tableName;
    const key2 = searchKey;

    return {
        get: get,
        save: save,
        update: update,
        query: query,
        scan: scan,
    };

    async function get(value1, value2) {
        let queryText = `SELECT * FROM ${TABLE_NAME} WHERE ${key1} = $1`;
        const queryParams = [value1];

        if (key2 && value2) {
            queryText += ` AND ${key2} = $2`;
            queryParams.push(value2);
        }

        console.log('Executing query:', queryText);
        console.log('With parameters:', queryParams);

        try {
            const result = await db.any(queryText, queryParams);
            return result[0] || null;
        } catch (error) {
            console.error('Error executing query:', error);
            throw new Error('Failed to get entity: ' + error.message);
        }
    }

    async function save(item) {
        const columns = Object.keys(item).join(', ');
        const values = Object.values(item);
        const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

        const queryText = `INSERT INTO ${TABLE_NAME} (${columns}) VALUES (${placeholders}) RETURNING *`;
        console.log('Executing query:', queryText);
        console.log('With values:', values);

        try {
            const result = await db.one(queryText, values);
            return result;
        } catch (error) {
            console.error('Error executing query:', error);
            throw new Error('Failed to save entity: ' + error.message);
        }
    }

    async function update(value1, value2_Or_dataHolder, dataHolder = null) {
        let data = null;
        let value2 = null;

        if (dataHolder == null) {
            data = value2_Or_dataHolder;
        } else {
            data = dataHolder;
            value2 = value2_Or_dataHolder;
        }

        const setExpressions = _.map(data, (v, k) => `"${removeSpecialChars(k)}" = $${_.keys(data).indexOf(k) + 1}`);
        const queryText = `UPDATE ${TABLE_NAME} SET ${setExpressions.join(', ')} WHERE ${key1} = $${_.keys(data).length + 1}` + (key2 && value2 ? ` AND ${key2} = $${_.keys(data).length + 2}` : '');

        const values = [...Object.values(data), value1];
        if (key2 && value2) values.push(value2);

        console.log('Executing query:', queryText);
        console.log('With values:', values);

        try {
            await db.none(queryText, values);
        } catch (error) {
            console.error('Error executing query:', error);
            throw new Error('Failed to update entity: ' + error.message);
        }
    }

    async function scan() {
        const queryText = `SELECT * FROM ${TABLE_NAME}`;
        console.log('Executing query:', queryText);

        try {
            const result = await db.any(queryText);
            return { Items: result };
        } catch (error) {
            console.error('Error executing query:', error);
            throw new Error('Failed to scan entities: ' + error.message);
        }
    }

    async function query(value1, value2) {
        let queryText = `SELECT * FROM ${TABLE_NAME} WHERE ${key1} = $1`;
        const queryParams = [value1];

        if (key2 && value2) {
            queryText += ` AND ${key2} = $2`;
            queryParams.push(value2);
        }

        console.log('Executing query:', queryText);
        console.log('With parameters:', queryParams);

        try {
            const result = await db.any(queryText, queryParams);
            return { Items: result };
        } catch (error) {
            console.error('Error executing query:', error);
            throw new Error('Failed to query entities: ' + error.message);
        }
    }
}

module.exports = {
    bookService: DataServiceClass('books', 'name'),
    userService: DataServiceClass('users', 'email')
};