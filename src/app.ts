import buildServer from "./server"

const server = buildServer();
const port = 5000;

const start = async () => {
    try {
        await server.listen({ port })

        console.log(`Server ready at http://localhost:${port}`);
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
start();
