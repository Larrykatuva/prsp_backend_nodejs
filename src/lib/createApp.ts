import express, { Application, Response, Request } from 'express';
import { databaseConfig } from '../database/config';
import Routes from '../routes'
import helmet from 'helmet';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import bp from 'body-parser';
// @ts-ignore
import formData from 'express-form-data'
/**
 * 
 * @returns instance of the  application
 */
export const createApp = async () => {

    const app: Application = express();
    app.use(bp.json());
    app.use(formData.parse())

    /**
     * Swagger API documentation
     */
    const swaggerDocument = YAML.load('docs/swagger.yaml');
    app.use(helmet());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    /**
     * Connect database
     */
    databaseConfig.initialize()
        .then(() => {
            console.log("Database connected..")
        })
        .catch((error) => console.log(error))
    /**
   * Routes goes here.
   */
    app.use('/api', Routes);

    return app;
}