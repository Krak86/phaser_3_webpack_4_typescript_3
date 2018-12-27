import "phaser";
import BasicScene from "./scenes/BasicScene";

const config: GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [BasicScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
};

new Phaser.Game(config);
