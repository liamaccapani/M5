/* no next no chain -> it keeps loading, doesn't reach any endpoint,
* it doesn't have any way to reach the next error handlers */

export const badRequest = (error, request, response, next) => {
    console.log(`*********${error}`)
    if(error === 400){
        response.status(400).send()
    } else{
        next(error)
    }
}

export const forbidden = (error, request, response, next) => {
    console.log(error)
    if(error === 403){
        response.status(403).send()
    } else {
        next(error)
    }
}

export const notFound = (error, request, response, next) => {
    console.log(error)
    if(error === 404){
        response.status(404).send({error: err.message})
    } else {
        next(error)
    }
}

export const serverError = (error, request, response, next) => {
    console.log(`*********${error}`)
    response.status(500).send("Server generated error")
}

