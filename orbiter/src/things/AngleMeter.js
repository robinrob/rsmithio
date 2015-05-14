var AngleMeter = cc.Node.extend({
    ctor: function(args) {
        this._super()

        this.r = {}
        this.r.pos = args.pos
        this.r.radius = args.radius
    },

    init: function() {
        this._super()

        this.r.draw = new cc.DrawNode()
        this.addChild(this.r.draw)
        this.r.draw.setPosition(this.r.pos)
        this.draw(1.0)

        return this
    },

    draw: function(level) {
        this.r.draw.clear()

        //this.r.draw.drawDot(
        //    cc.p(0, 0),
        //    this.r.radius,
        //    rss.setAlpha(rss.colors.red, 128)
        //)
        this.r.draw.drawCircle(
            cc.p(0, 0),
            this.r.radius,
            rss.toRad(90) - level * rss.twoPI,
            50,
            false,
            2,
            rss.colors.red
        )
        if (level * rss.twoPI > rss.toRad(1)) {
            this.r.draw.drawPoly(
                rss.circSegmentVerts(this.r.radius, level * rss.twoPI, rss.toRad(90), 50),
                rss.setAlpha(rss.colors.red, 170),
                2,
                rss.colors.red
            )
        }
    },

    setLevel: function(level) {
        this.draw(level)
    }
})

AngleMeter.create = function(args) {
    return new AngleMeter(args).init()
}