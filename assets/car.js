cc.Class({
  extends: cc.Component,

  properties: {
    userId: 20,
    userName: "wwmin love liyue",
    carNode: {
      type: cc.Node,
      default: null,
      name: 'car'
    },
    labelNode: {
      type: cc.Label,
      default: null
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // 获取小车节点
    let {
      carNode,
      labelNode,
      userName
    } = this;
    console.log(userName);

    labelNode.string = userName;
    // 添加变量判断用户当前鼠标是不是处于按下状态
    let mouseDown = false;
    let touchDown = false;
    // 当用户点击的时候记录鼠标点击状态
    carNode.on(cc.Node.EventType.MOUSE_DOWN, event => {
      console.log('mouse down');

      mouseDown = true;
    });
    carNode.on(cc.Node.EventType.TOUCH_START, event => {
      console.log('touch start');

      touchDown = true;
    })
    // 只有当用户鼠标按下才能拖拽
    carNode.on(cc.Node.EventType.MOUSE_MOVE, event => {
      if (!mouseDown) return;
      // 获取鼠标距离上一次点的信息
      let delta = event.getDelta();
      // 增加限定条件
      // let minX = -carNode.parent.width / 2 + carNode.width / 2;
      // let maxX = carNode.parent.width / 2 - carNode.width / 2;
      // let minY = -carNode.parent.height / 2 + carNode.height / 2;
      // let maxY = carNode.parent.height / 2 - carNode.height / 2;
      // let moveX = carNode.x + delta.x;
      // let moveY = carNode.y + delta.y;
      // // 控制移动范围
      // if (moveX < minX) {
      //   moveX = minX;
      // } else if (moveX > maxX) {
      //   moveX = maxX;
      // }
      // if (moveY < minY) {
      //   moveY = minY;
      // } else if (moveY > maxY) {
      //   moveY = maxY;
      // }
      // 移动小车节点
      carNode.x = carNode.x + delta.x;
      carNode.y = carNode.y + delta.y;
      // carNode.x = moveX;
      // carNode.y = moveY;
    });
    carNode.on(cc.Node.EventType.TOUCH_MOVE, event => {
      if (mouseDown) return;
      if (!touchDown) return;
      let delta = event.getDelta();
      carNode.x = carNode.x + delta.x;
      carNode.y = carNode.y + delta.y;
    })
    // 当鼠标抬起的时候恢复状态
    carNode.on(cc.Node.EventType.MOUSE_UP, event => {
      mouseDown = false;
    });
    carNode.on(cc.Node.EventType.TOUCH_END, event => {
      touchDown = false;
    })
    carNode.parent.on(cc.Node.EventType.MOUSE_UP, event => {
      mouseDown = false;
    })
  },

  start() {
    // console.log("start");

  },

  update(dt) {
    // console.log(dt);

  },
});