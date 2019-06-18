const cacheableResponse = require("cacheable-response");
const express = require("express");
const next = require("next");
require("dotenv").config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

const serverSideRender = (req, res, pagePath, queryParams) => {
	console.log(`Server side rendering... => pagePath [ ${pagePath} ]`);
	return app.renderToHTML(req, res, pagePath, queryParams);
};

const ssrCache = cacheableResponse({
	ttl: 1000 * 60 * 5, // 5분
	get: async ({ req, res, pagePath, queryParams }) => ({
		data: await serverSideRender(req, res, pagePath, queryParams)
	}),
	send: ({ data, res, req }) => {
		const heeaderInfo = res.getHeaders();
		console.log(
			`[ ${heeaderInfo["x-cache-status"]}(${
				heeaderInfo["x-cache-expired-at"]
			}) ] Send page : ${req.path}`
		);
		res.send(data);
	}
});

app.prepare().then(() => {
	const server = express();

	server.get("/", (req, res) => ssrCache({ req, res, pagePath: "/" }));
	server.get("/signin", (req, res) => ssrCache({ req, res, pagePath: "/signin" }));

	/** id를 통한 라우팅 들어가는 경우 참고 */
	// server.get("/blog/:id", (req, res) => {
	// 	const queryParams = { id: req.params.id };
	// 	const pagePath = "/blog";
	// 	return ssrCache({ req, res, pagePath, queryParams });
	// });

	server.get("*", (req, res) => handle(req, res));

	server.listen(port, err => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
