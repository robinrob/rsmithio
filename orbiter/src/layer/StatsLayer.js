var StatsLayer = rss.BaseLayer.extend({
    FONT_SIZE: 20,
    MSG_FONT_SIZE: 40,

    ctor: function() {
        this._super()
    },

    init: function() {
        this._super()

        this.constructFuelMeter()
        this.constructAngleMeter()
        this.constructMsg()

        return this
    },

    constructFuelLabel: function() {
        var width = "Fuel: 100".length * this.FONT_SIZE
        this.fuel = cc.LabelTTF.create(
            "Fuel: 100",
            "res/Arial.ttf", this.FONT_SIZE,
            cc.size(width, 2 * this.FONT_SIZE),
            cc.TEXT_ALIGNMENT_LEFT, cc.TEXT_ALIGNMENT_CENTER
        )
        this.fuel.setPosition(rss.right().x - width, rss.top().y - 2 * this.FONT_SIZE)
        this.addChild(this.fuel)
    },

    constructFuelMeter: function() {
        var width = 30
        var height = 150
        this.graphicFuel = FuelMeter.create({
            pos: rss.add(rss.topRight(), cc.p(-width - 20, -height * 0.5 - 30)),
            size: cc.size(width, height)
        })
        this.addChild(this.graphicFuel)
    },

    constructAngleLabel: function() {
        var width = "Angle: 360".length * this.FONT_SIZE
        this.r.angle = cc.LabelTTF.create(
            "Angle: 0",
            "res/Arial.ttf", this.FONT_SIZE,
            cc.size(width, 2 * this.FONT_SIZE),
            cc.TEXT_ALIGNMENT_RIGHT, cc.TEXT_ALIGNMENT_CENTER
        )
        this.r.angle.setPosition(cc.p(rss.left().x + width / 2, rss.top().y - 2 * this.FONT_SIZE))
        this.addChild(this.r.angle)
    },

    constructAngleMeter: function() {
        var radius = 40
        this.graphicAngle = AngleMeter.create({
            pos: rss.add(rss.topLeft(), cc.p(radius + 20, -radius - 30)),
            radius: radius
        })
        this.addChild(this.graphicAngle)
    },

    constructMsg: function() {
        var msg = "Touch to begin!"
        var width = msg.length * this.MSG_FONT_SIZE
        this.msg = cc.LabelTTF.create(
            msg,
            "res/Arial.ttf", this.MSG_FONT_SIZE,
            cc.size(width, 2 * this.MSG_FONT_SIZE),
            cc.TEXT_ALIGNMENT_CENTER, cc.TEXT_ALIGNMENT_CENTER
        )
        this.msg.setPosition(rss.center())
        this.addChild(this.msg)
    },

    updateDistanceMeter: function(val) {
        this.graphicAngle.setLevel(val)
    },

    updateFuelMeter: function(val) {
        this.graphicFuel.setLevel(val)
    },

    updateMsg: function(msg) {
        this.msg.setString(msg)
    },

    update: function() {
        var gameLayer = this.getParent().getChildByTag(rss.tag.gameLayer)
        this.updateFuelMeter(gameLayer.getPlayer().getFuel() / 100)
        this.updateDistanceMeter(gameLayer.getLevel().getWorld().getAngle() / rss.twoPI)
    }
})

StatsLayer.create = function() {
    return new StatsLayer().init()
}