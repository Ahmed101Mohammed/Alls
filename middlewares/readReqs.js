const readReqs = (req,res,next)=>{
    console.log('url:',req.url);
    next();
}

module.exports = readReqs;