
// MyScene1クラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MyScene extends Phaser.Scene {

    // シーンの事前読み込み処理
    preload() {
         // 画像の読み込み(使用する時の名前, パス)
        this.load.image('sky', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
    }


    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(400, 300, 'sky');
        this.player = this.add.image(400, 300, 'taro');
        this.player_direction = 1;
    }
    
  // 毎フレーム実行される繰り返し処理
    update() {
        if (this.player.x >= D_WIDTH -230 || this.player.y >= D_HEIGHT) this.player_direction = -1;
        if (this.player.x <= 0 || this.player.y <= 0) this.player_direction = 1;

        if(this.player_direction == 1){
            this.player.y += 5;
            this.player.x += 5;
        }else{
            this.player.y -= 5;
            this.player.x -= 5;
        }
    }

}