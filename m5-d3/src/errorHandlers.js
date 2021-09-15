export const badRequest = (error, request, response, next) => {
    if(error === 400){
        response.status(400).send()
    } else{
        // chaining differen errors
        next(error)
    }
}

export const forbidden = (error, request, response, next) => {
    if(error === 403){
        response.status(403).send()
    } else {
        next(error)
    }
}

export const notFound = (error, request, response, next) => {
    if(error === 404){
        response.status(404).send(err.message)
    } else {
        next(error)
    }
}

export const serverError = (error, request, response, next) => {
    console.log(error)
    response.status(500).send("Server generated error")
}

