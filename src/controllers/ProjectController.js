class project{
    async teste(req, res){
        return await res.send(req.userId)
    }
}

module.exports = new project