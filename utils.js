const hiddenMethodsHandler = (req, res, next) => {
	if (req.body && req.body._method) {
		req.method = req.body._method;
		delete req.body._method;
	}

	next();
};

module.exports = { hiddenMethodsHandler };
