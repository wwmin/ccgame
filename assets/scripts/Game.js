cc.Class({
    extends: cc.Component,
    isGameOver: false,
    properties: {
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: "预制星星"
        },
        // 星星产生后小时时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点,用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node,
            tooltip: "地面"
        },
        // player 节点,用于获取主角弹跳的高度,和控制主角行动开关
        player: {
            default: null,
            type: cc.Node,
            displayName: "main player",
            tooltip: "主角"
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        // 得分音效资源
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height / 2;
        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        // 生成一个新的星星
        this.spawnNewStar();
        // 初始化计分
        this.score = 0;
    },
    spawnNewStar() {
        // 使用给定的模板在场景中生成一个新节点
        let newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上暂存Game对象的引用
        newStar.getComponent('Star').game = this;
        // 在玩家组件上暂存Game对象的引用
        this.player.getComponent('Player').game = this;
        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },
    getNewStarPosition() {
        let randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        let randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        let maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // 返回星星坐标
        return cc.v2(randX, randY);
    },
    start() {

    },
    update(dt) {

        if (!this.isGameOver) {
            // 每帧更新计时器，超过限度还没有生成新的星星
            // 就会调用游戏失败逻辑
            if (this.timer > this.starDuration) {
                this.isGameOver = true;
                this.gameOver();
                return;
            }
            this.timer += dt;
        }
    },
    gainScore() {
        this.score += 1;
        // 更新scoreDisplay Label 的文字
        this.scoreDisplay.string = "Score: " + this.score;
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },
    gameOver() {
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        this.isGameOver = true;
        cc.director.loadScene('game');
    }
});