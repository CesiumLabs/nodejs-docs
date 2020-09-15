export interface FileData {
    name: string;
    size: number;
    url: string;
    github: string;
    raw: string;
    path: string;
    version: string;
}

export interface ResponseData {
    version: string;
    data: FileData[];
}

export interface fetchOptions {
    force: boolean;
    all: boolean;
}

export interface ParsedData {
    info: FileData;
    content: string;
}

/**
 * Fetches node.js documentation files
 * @param version Node.js version
 * @param options Fetch options
 * @example const data = await docs.fetch("v12.x");
 */
export function fetch(version?: string, options?: fetchOptions): Promise<ResponseData>;

/**
 * Returns markdown from node.js documentation
 * @param content Content query, or global modules name.
 * @param version Node version
 * @example const data = await docs.find("buffer", "v12.x");
 */
export function find(content: string, version: string): Promise<ParsedData>;