/**
 * 
 * @param Props = { @param method = GET, POST, PUT, DELETE, @param header, @param data = Json.stringify(Json) }
 * 
 */

const BaseUrl = "http://localhost:3000"

const Service = async ({
    method = "GET",
    headers = {},
    data = null,
    url = ""
}) => {
    try {
        const customUrl = BaseUrl + url
        const response = await fetch(customUrl, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: data, // body data type must match "Content-Type" header
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json()
    } catch (error) {
        //Gestor de errores relacionado con las tareas
        throw new Error('Failed to fetch data');
    }
}

export default Service;