var FuelMeter = cc.Node.extend({
    ctor: function(args) {
        this._super()

        this.r = {}
        this.r.pos = args.pos
        this.r.size = args.size
        this.r.width = args.size.width
        this.r.height = args.size.height
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

        var depletion = (1.0 - level) * this.r.height
        var bottomLeft = cc.p(-1 * this.r.width / 2, -1 * this.r.height / 2)
        var topRight = cc.p(this.r.width / 2, this.r.height / 2)

        // Fuel level
        this.r.draw.drawRect(
            bottomLeft,
            rss.subY(topRight, (bottomLeft, depletion)),
            rss.setAlpha(rss.colors.green, 170),
            2,
            rss.setAlpha(rss.colors.green, 170)
        ),

        // Outline
        this.r.draw.drawRect(
            bottomLeft,
            topRight,
            rss.setAlpha(rss.colors.green, 0),
            2,
            rss.colors.green, 255
        )
    },

    setLevel: function(level) {
        this.draw(level)
    }
})

FuelMeter.create = function(args) {
    return new FuelMeter(args).init()
}