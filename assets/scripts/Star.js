cc.Class({
    extends: cc.Component,

    properties: {
        // 星星和主角之间的距离小于这个数值时，就会完成收集
        picRadius: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    getPlayerDistance() {
        // 根据player节点位置判断距离
        var playerPos = this.game.player.getPosition();
        // 根据亮点位置计算亮点之间距离
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },
    onPicked() {
        // 当星星被收集时,调用Game脚本中的接口,生成一个新的星星
        this.game.spawnNewStar();
        // 调用Game脚本的得分方法
        this.game.gainScore();
        // 然后销毁当前星星节点
        this.node.destroy();
    },
    start() {

    },

    update(dt) {
        // 每帧判断和主角之间的距离是否小于收集距离
        if (this.getPlayerDistance() < this.picRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }
       // 根据 Game 脚本中的计时器更新星星的透明度
       var opacityRatio = 1 - this.game.timer/this.game.starDuration;
       var minOpacity = 50;
       this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    },
});