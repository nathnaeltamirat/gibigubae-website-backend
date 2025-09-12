import path from "path";
import { PORT, NODE_ENV } from "./env.js";
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "My Express API",
            version: "1.0.0",
            description: "Backend Documentation for GibiGubae System Administration",
        },
        servers: [
            NODE_ENV === "production"
                ? { url: "https://gibigubae-website-backend.onrender.com/", description: "Production server" }
                : { url: `http://localhost:${PORT}`, description: "Development server" },
        ],
    },
    apis: [
        path.join(process.cwd(), "src/api/v1/*.ts"),
        path.join(process.cwd(), "dist/api/v1/*.js"),
    ],
};
export default swaggerOptions;
//# sourceMappingURL=swagger.js.map