import { host, port } from "../constants"

const getRelatedUrl = (path: string) => {
    return `http://${host}:${port}${path}`;
}

export { getRelatedUrl };
