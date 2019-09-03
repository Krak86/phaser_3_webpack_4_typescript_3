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

if('serviceWorker' in navigator){
     window.addEventListener('load', () => {
       navigator.serviceWorker.register('service-worker.js').then(registration => {
         console.log('SW registered: ', registration);
       }).catch(registrationError => {
         console.log('SW registration failed: ', registrationError);
       });
     });
}