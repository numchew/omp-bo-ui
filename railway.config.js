// railway.config.js

module.exports = {
    webpack: (config, { dev, isServer }) => {
        if (dev) {
            // Add your custom dev server configuration here
            config.devServer = {
                setupMiddlewares: (middlewares, devServer) => {
                    if (!devServer) {
                        throw new Error('webpack-dev-server is not defined')
                    }

                    if (fs.existsSync(paths.proxySetup)) {
                        require(paths.proxySetup)(devServer.app)
                    }

                    middlewares.push(
                        evalSourceMapMiddleware(devServer),
                        redirectServedPath(paths.publicUrlOrPath),
                        noopServiceWorkerMiddleware(paths.publicUrlOrPath)
                    )

                    return middlewares;
                },
            };
        }

        // Return the updated webpack config
        return config;
    },
};
