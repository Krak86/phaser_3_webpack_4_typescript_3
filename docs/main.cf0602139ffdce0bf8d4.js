(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1149:function(t,e,s){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s])})(t,e)},function(t,e){function s(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(s.prototype=e.prototype,new s)});Object.defineProperty(e,"__esModule",{value:!0});var o=function(t){function e(){var e=t.call(this,{key:"BasicScene"})||this;return e.score=0,e.gameOver=!1,e}return r(e,t),e.prototype.preload=function(){this.load.image("sky","img/sprites/sky.png"),this.load.image("ground","img/sprites/platform.png"),this.load.image("star","img/sprites/star.png"),this.load.image("bomb","img/sprites/bomb.png"),this.load.spritesheet("boy","img/sprites/boySprite.png",{frameWidth:57,frameHeight:68})},e.prototype.create=function(){this.add.image(0,0,"sky").setOrigin(0,0),this.ground=this.physics.add.staticGroup(),this.ground.create(400,568,"ground").setScale(2).refreshBody(),this.ground.create(600,400,"ground"),this.ground.create(50,250,"ground"),this.ground.create(750,220,"ground"),this.player=this.physics.add.sprite(100,450,"boy"),this.player.setBounce(.2),this.player.setCollideWorldBounds(!0),this.player.setGravityY(300),this.anims.create({key:"left",frames:this.anims.generateFrameNumbers("boy",{start:0,end:7}),frameRate:8,repeat:-1}),this.anims.create({key:"turn",frames:[{key:"boy",frame:8}],frameRate:20}),this.anims.create({key:"right",frames:this.anims.generateFrameNumbers("boy",{start:8,end:15}),frameRate:8,repeat:-1}),this.cursors=this.input.keyboard.createCursorKeys(),this.stars=this.physics.add.group({key:"star",repeat:10,setXY:{x:0,y:0,stepX:70}}),this.stars.children.iterate(function(t){t.setBounceY(Phaser.Math.FloatBetween(.4,.8))},{}),this.scoreText=this.add.text(16,16,"score: 0",{fontSize:"32px",fill:"#000"}),this.bombs=this.physics.add.group(),this.physics.add.collider(this.player,this.ground),this.physics.add.collider(this.stars,this.ground),this.physics.add.collider(this.bombs,this.ground),this.physics.add.overlap(this.player,this.stars,this._collectStar,null,this),this.physics.add.overlap(this.player,this.bombs,this._hitBomb,null,this)},e.prototype.update=function(t,e){this.cursors.left.isDown?(this.player.setVelocityX(-160),this.player.anims.play("left",!0)):this.cursors.right.isDown?(this.player.setVelocityX(160),this.player.anims.play("right",!0)):(this.player.setVelocityX(0),this.player.anims.play("turn")),this.cursors.up.isDown&&this.player.body.touching.down&&this.player.setVelocityY(-500)},e.prototype._collectStar=function(t,e){e.disableBody(!0,!0),this.score+=10,this.scoreText.setText("Score: "+this.score),this._enableStars()},e.prototype._enableStars=function(){0===this.stars.countActive(!0)&&(this.stars.children.iterate(function(t){t.enableBody(!0,t.x,0,!0,!0)},{}),this._createbomb())},e.prototype._createbomb=function(){var t=this.player.x<400?Phaser.Math.Between(400,800):Phaser.Math.Between(0,400),e=this.bombs.create(t,16,"bomb");e.setBounce(1),e.setCollideWorldBounds(!0),e.setVelocity(Phaser.Math.Between(-200,200),20),e.allowGravity=!1},e.prototype._hitBomb=function(t,e){this.physics.pause(),t.setTint(16711680),t.anims.play("turn"),this.gameOver=!0},e}(Phaser.Scene);e.default=o},465:function(t,e,s){t.exports=s(466)},466:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),s(467);var i=s(1149),r={type:Phaser.AUTO,width:800,height:600,scene:[i.default],physics:{default:"arcade",arcade:{gravity:{y:300},debug:!1}}};new Phaser.Game(r),"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("service-worker.js").then(function(t){console.log("SW registered: ",t)}).catch(function(t){console.log("SW registration failed: ",t)})})}},[[465,1,2]]]);