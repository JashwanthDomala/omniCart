function geh(error,req,res,next){
    if(error === "unAuthenticated"){
        res.status(401).json({
            message : "unAunthenticated"
        })
    }
    if(error === "unAuthorized"){
        res.status(403).json({
            message : "you are not allowed to this page"
        })
    }
}