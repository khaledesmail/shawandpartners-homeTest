const { fileUpload, userSearch } = require('./services/user.service');
const data = [];

function handleFileUpload(req, res) {
    try {
        if (!req.file) {
            return res.status(500).json({ message: 'Please attach the csv file' })
        }
        if (!req.file.originalname.match(/\.(csv)$/)) {
            return res.status(500).json({ message: 'Only CSV files are allowed!' })
        }
        const { buffer } = req.file;
        const response = fileUpload(buffer);
        return res.status(200).json(response);
    } catch (error) {
        console.log("err", error);
        return res.status(500).json(error);
    }
}

function handleUserSearch(req, res) {
    try {
        const searchTerm = req.query ? req.query : '';
        const response = userSearch(searchTerm);
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

function handleNotFound(res) {
    res.status(404).json({ message: 'Not Found' });
}

module.exports = { handleFileUpload, handleUserSearch, handleNotFound };
