rss.Spaceship = rss.RectPhysicsSprite.extend({
    DEG_VERTICAL: 0,
    DEG_HORIZONTAL: 0,

    ctor:function(args) {
        cc.log("Spaceship.ctor ...")
        args.spriteCfg = {
            image: rss.res.spaceship0_png
        }
        //args.spriteCfg = {
        //    image: rss.res.spaceship_png,
        //    pList: rss.res.spaceship_plist,
        //    name: ""
        //}
        args.mass = rss.spaceship.mass

        this._super(args)
    },

    init:function() {
        cc.log("Spaceship.init ...")
        this._super()

        this.r.fuel = 100

        return this
    },

    getPos: function() {
        return this.r.body.p
    },

    setVel: function(vx, vy) {
        this.r.body.setVel(cp.v(vx, vy))
    },

    incFuel: function() {
        this.r.fuel = Math.min(100, this.r.fuel + 1)
    },

    decFuel: function() {
        this.r.fuel = Math.max(0, this.r.fuel - 0.5)
    },

    getAngle: function() {
        return this._super() - this.DEG_VERTICAL
    },

    setAngle: function(angle) {
        this._super(this.DEG_VERTICAL + angle)
    },

    angleFromVertical: function() {
        return this.r.angleFromAngle(this.DEG_VERTICAL)
    },

    angleFromHorizontal: function() {
        return this.r.angleFromAngle(this.DEG_HORIZONTAL)
    },

    angleFromAngle: function(baseAngle) {
        var ang = this.getAngle() - baseAngle

        if (ang > 180) {
            return 360 - ang
        }
        else if (ang < -180) {
            return ang + 360
        }
        return -1 * ang
    },

    getFuel: function() {
        return this.r.fuel
    },

    update: function(dt) {
        var p = this.getPos()
        var winSize = cc.director.getWinSize()
        var x = p.x
        var y = p.y
        var dix = 0.0, diy = 0.0

        if (rss.upInput()) {
            if (this.r.fuel > 0) {
                rss.spaceship.acc += 100
                this.applyImpulse(cp.v(0, Math.min(this.getMass() * rss.spaceship.acc * dt, rss.spaceship.maxImp)))
                this.decFuel()
            }
        }
        else {
            rss.spaceship.acc = 1000
        }

        this.setAngle(0)
        this.setAngVel(0)

        if (rss.player.state == rss.player.states.refuelling) {
            this.incFuel()
        }
    }
})

rss.Spaceship.create = function(args) {
    return new rss.Spaceship(args).init()
}