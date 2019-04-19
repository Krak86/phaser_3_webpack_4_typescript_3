class BasicScene extends Phaser.Scene {
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private ground: Phaser.Physics.Arcade.StaticGroup;
  private player: Phaser.Physics.Arcade.Sprite;
  private stars: Phaser.Physics.Arcade.Group;
  private bombs: Phaser.Physics.Arcade.Group;
  private scoreText: Phaser.GameObjects.Text;
  private score: number = 0;
  private gameOver: boolean = false;

  constructor() {
    super({
      key: "BasicScene"
    });
  }

  public preload(): void {
    this.load.image("sky", "assets/sprites/sky.png");
    this.load.image("ground", "assets/sprites/platform.png");
    this.load.image("star", "assets/sprites/star.png");
    this.load.image("bomb", "assets/sprites/bomb.png");
    this.load.spritesheet("boy", "assets/sprites/boySprite.png", {
      frameWidth: 57,
      frameHeight: 74
    });
  }

  public create(): void {

    this.add.image(0, 0, "sky").setOrigin(0, 0);

    this.ground = this.physics.add.staticGroup();
    this.ground
      .create(400, 568, "ground")
      .setScale(2)
      .refreshBody();
    this.ground.create(600, 400, "ground");
    this.ground.create(50, 250, "ground");
    this.ground.create(750, 220, "ground");

		this.player = this.physics.add.sprite(0, 0, "boy");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
		this.player.setGravityY(300);
		
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("boy", { start: 0, end: 7 }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "boy", frame: 8 }],
      frameRate: 20
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("boy", { start: 8, end: 15 }),
      frameRate: 8,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.stars = this.physics.add.group({
      key: "star",
      repeat: 10,
      setXY: { x: 0, y: 0, stepX: 70 }
    });
    this.stars.children.iterate(child => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    }, {});

    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000"
    });

    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.stars, this.ground); 
    this.physics.add.collider(this.bombs, this.ground);
    
    this.physics.add.overlap(this.player,this.stars,this._collectStar,null,this);
    this.physics.add.overlap(this.player,this.bombs,this._hitBomb,null,this);
  }

  public update(time: number, delta: number): void {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-500);
    }
  }

  private _collectStar(player, star): void {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);
    this._enableStars();
  }

  private _enableStars(): void {
    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(child => {
        child.enableBody(true, child.x, 0, true, true);
      }, {});
      this._createbomb();
    }
  }

  private _createbomb(): void {
    const x =
      this.player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
    const bomb = this.bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
  }

  private _hitBomb(player, bomb): void {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    this.gameOver = true;
  }
}

export default BasicScene;
