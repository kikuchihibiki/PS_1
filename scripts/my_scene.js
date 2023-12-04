
// MyScene1クラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MyScene extends Phaser.Scene {

    // シーンの事前読み込み処理
    preload() {
         // 画像の読み込み(使用する時の名前, パス)
        this.load.image('sky', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
        // this.load.image('jiro', 'assets/jiro.png');
        this.load.image('hanako', 'assets/hanako.png');
    }


    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(400, 300, 'sky');
        // const player = this.physics.add.sprite(400, 300, 'taro');
        // this.player = player
        // this.player.angle = 0;
        // this.player_direction = 1;
        const player = this.physics.add.sprite(400, 300, 'taro');
        this.player = player
        this.player.angle = 0;
        // const player1 = this.physics.add.sprite(350, 300, 'jiro');
        // this.player1 = player1
        this.player2 = this.physics.add.sprite(0, 0, 'hanako');
        this.player2.setVisible(false);

        this.flag = false;

        this.time.delayedCall(3000, () => {
            this.flag = true;
        });
        this.players = this.physics.add.group();
        this.players.add(this.player);
        // this.players.add(this.player1);
        this.players.add(this.player2);

        this.physics.add.collider(this.players, this.players, this.handleCollision, null, this);
        this.text1 = this.add.text(600, 400, 'MyWorld').setFontSize(32).setColor('#ffe');
        this.text2 = this.add.text(100, 50, "", { font: "32px Arial", fill: "#ffffff" });
        // this.keys = this.input.keyboard.addKeys('A,S,D');
        this.keys = {};
        this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    arrow_move(cursors, object){
        if(cursors.up.isDown){
            console.log("Up!!");
            object.setVelocityY(-200);// 上方向の速度を設定
            
        }else if(cursors.down.isDown){
            console.log("down!!");
            object.setVelocityY(200);// 下方向の速度を設定
    
        }else if(cursors.left.isDown){
            console.log("Left");
            object.setVelocityX(-200);
    
    
        }else if(cursors.right.isDown){
            console.log("Right!!");
            object.setVelocityX(200);
    
        }else{
            object.setVelocity(0,0);
        }
    }

    handleCollision(player, otherPlayer) {
        if (player.texture.key === 'taro' && otherPlayer.texture.key === 'hanako') {
          const text = this.add.text(100, 150, '痛い！', { font: '32px Meiryo', fill: '#ff0000' });
            otherPlayer.disableBody(true, true);
            this.time.delayedCall(3000, () => {
                text.destroy();
            });
        }
    }

    // arrow_move2(cursors, object){
    
    //     if(cursors.left.isDown){
    //         console.log("Left");
    //         object.setVelocityX(200);
    
    
    //     }else if(cursors.right.isDown){
    //         console.log("Right!!");
    //         object.setVelocityX(-200);
    
    //     }else{
    //         object.setVelocity(0,0);
    //     }
    // }

    createText() {
        if (this.keys.keyA.isDown) {
            this.text2.setText("Hello");
        }
        else if (this.keys.keyS.isDown) {
            this.text2.setText("Hey");
        }
        else if (this.keys.keyD.isDown) {
            this.text2.setText("");
        }
    }
    
  // 毎フレーム実行される繰り返し処理
    update() {
        // if (this.player.x >= D_WIDTH -230 || this.player.y >= D_HEIGHT) this.player_direction = -1;
        // if (this.player.x <= 0 || this.player.y <= 0) this.player_direction = 1;

        // if(this.player_direction == 1){
        //     this.player.setVelocity(100, -100);
        //     this.player.angle += 5;
        //     this.player.setAngle( this.player.angle );
        // }
        let cursors = this.input.keyboard.createCursorKeys();
        this.arrow_move(cursors, this.player);
        // this.arrow_move2(cursors, this.player1);
        this.createText();
        if (this.flag) {
            this.player2.x = Phaser.Math.Between(200, 400);
            this.player2.y = Phaser.Math.Between(100, 200);
            this.player2.setVisible(true);
            this.flag = false;
        }
    }

}