const fs = require('fs');
const { validationResult } = require('express-validator');

module.exports = (_req, _res, _next) => {
    try {
        const errors = validationResult(_req);
        if (!errors.isEmpty()) {
    
            // delete file if other validation fails
            if (_req.file) {
                fs.unlink(_req.file.path, (err) => {
                    if (err) {
                        console.log('Error deleting file:', err);
                    }
                });
            }
            return _res.status(422).json({ errors: errors.array() });
        }
    
        _next();
        
    } catch (error) {
        console.log('error:', error);
    }
}