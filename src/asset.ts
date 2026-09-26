/** Prefix a public-folder path with the site's base URL (/portfolio/). */
export const asset = (p: string) => import.meta.env.BASE_URL + p.replace(/^\//, '')
