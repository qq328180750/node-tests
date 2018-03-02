module.exports = {
    checkNotLogin:(ctx)=>{
        if(ctx.session&&ctx.session.user){
            ctx.redirect('/posts')
        }
    }
}