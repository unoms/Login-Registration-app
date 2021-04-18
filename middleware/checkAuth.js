module.exports = function(req, res, next){
            if(req.isAuthenticated()){
                //Only Admins may access the data on this route
                if(req.baseUrl === '/users'){
                    console.log(req.user.role[0])
                    if(req.user.role[0] === 'ADMIN'){
                        return next()
                    }else{
                        return res.json({msg: "Only Admins may access this route"})
                    }
                }
                //Print logout btn in the menu.hbs 
                res.logoutBtn = true
                return next()
            } 
            if(req.baseUrl === '/login' || req.baseUrl === '/registration'){//We don't protect these route
                return next()
            }else{
                res.redirect('/login')
            }
}