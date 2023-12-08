// user.service.test.js
const { fileUpload, userSearch } = require('./user.service');

describe('User Service', () => {
  describe('fileUpload', () => {
    test('should upload a valid CSV file', () => {
      const buffer = Buffer.from('name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball\n');
      const result = fileUpload(buffer);
      expect(result.message).toBe('The file was uploaded successfully.');
    });

    test('should return an error for invalid CSV file', () => {
      const buffer = Buffer.from('invalid_csv_data');
      try {
        const result = fileUpload(buffer);
        expect(true).toBe(false); 
      } catch (error) {
        expect(error.message).toBe('File must contain required headers.'); 
      }
    });
  });

  describe('userSearch', () => {
    beforeEach(() => {
      // Setting up test data before each test
      const buffer = Buffer.from('name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball\n');
      fileUpload(buffer);
    });

    test('should return empty data for non-existing user', () => {
      const query = { city: 'Tokyo' };
      const result = userSearch(query);
      expect(result.data).toEqual([]);
    });

    test('should return matching user', () => {
      const query = { city: 'New York' };
      const result = userSearch(query);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe('John Doe');
    });
  });
});
