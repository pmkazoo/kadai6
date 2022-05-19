window.addEventListener('load', () => {
    const canvas = document.querySelector('#draw-area');
    const context = canvas.getContext('2d');
    const lastPosition = { x: null, y: null };
    let isDrag = false;

    const aquarium = document.querySelector("#aquarium-area");  //getElementById()等でも可。オブジェクトが取れれば良い。
    const aquarium_ctx = aquarium.getContext("2d");

    const aquarium_img = new Image();
    aquarium_img.src = "./img/aquarium.png";  // 画像のURLを指定

    aquarium_img.onload = () => {
        aquarium_ctx.drawImage(aquarium_img, 0, 0);
    };

    // 現在の線の色を保持する変数(デフォルトは黒(#000000)とする)
    let currentColor = '#000000';

    function draw(x, y) {
        if (!isDrag) {
            return;
        }
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = 5;
        context.strokeStyle = currentColor;
        if (lastPosition.x === null || lastPosition.y === null) {
            context.moveTo(x, y);
        } else {
            context.moveTo(lastPosition.x, lastPosition.y);
        }
        context.lineTo(x, y);
        context.stroke();

        lastPosition.x = x;
        lastPosition.y = y;
    }

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        $("#name").val('');
        $("#aquarium_name").val('');
    }

    function register() {
        // let key = $("#name").val();
        // let value = canvas.toDataURL();

        document.getElementById('canvas').value = canvas.toDataURL();
        // alert(document.getElementById('canvas').value);
        // localStorage.setItem(key, value);

        context.clearRect(0, 0, canvas.width, canvas.height);

        // $("#name").val('');
        // $("#aquarium_name").val('');
        // $("#canvas").val('');
    }

    function dispAquarium(){
        updateAquarium();

        var js_array = JSON.parse('<?php echo $php_json; ?>');

        console.log(js_array.length);

        for(let i=0; i<js_array.length; i++){
            // let key   = localStorage.key(i);
            // let value = localStorage.getItem(key);

            let value = js_array[i];

            console.log(value);

            let x = Math.random()*(aquarium.width-aquarium.height*0.3);
            let y = Math.random()*aquarium.height*0.7;

            let image = new Image();
            image.src = value;
            image.onload = function () {
                aquarium_ctx.drawImage(image, x, y,aquarium.height*0.3, aquarium.height*0.3);
            }
        }
    }


    function dragStart(event) {
        context.beginPath();

        isDrag = true;
    }

    function dragEnd(event) {
        context.closePath();
        isDrag = false;
        lastPosition.x = null;
        lastPosition.y = null;
    }

    function initEventHandler() {
        const registerButton = document.querySelector('#register-button');
        registerButton.addEventListener('click', register);

        const clearButton = document.querySelector('#clear-button');
        clearButton.addEventListener('click', clear);

        // 消しゴムモードを選択したときの挙動
        // const eraserButton = document.querySelector('#eraser-button');
        // eraserButton.addEventListener('click', () => {
        //     // 消しゴムと同等の機能を実装したい場合は現在選択している線の色を
        //     // 白(#FFFFFF)に変更するだけでよい
        //     currentColor = '#FFFFFF';
        // });

        canvas.addEventListener('mousedown', dragStart);
        canvas.addEventListener('mouseup', dragEnd);
        canvas.addEventListener('mouseout', dragEnd);
        canvas.addEventListener('mousemove', (event) => {
            let rect = canvas.getBoundingClientRect();
            draw(event.layerX-rect.left, event.layerY-rect.top);
        });
    }

    function updateAquarium(){
        aquarium_ctx.clearRect(0, 0, aquarium.width, aquarium.height);
        const aquarium_img = new Image();
        aquarium_img.src = "./img/aquarium.png";  // 画像のURLを指定
    
        aquarium_img.onload = () => {
            aquarium_ctx.drawImage(aquarium_img, 0, 0);
        };
    }

    function setAquarium() {        
        localStorage.clear();
        updateAquarium();
    }

    // カラーパレットの設置を行う
    function initColorPalette() {
        const joe = colorjoe.rgb('color-palette', currentColor);

        // 'done'イベントは、カラーパレットから色を選択した時に呼ばれるイベント
        // ドキュメント: https://github.com/bebraw/colorjoe#event-handling
        joe.on('done', color => {
            // コールバック関数の引数からcolorオブジェクトを受け取り、
            // このcolorオブジェクト経由で選択した色情報を取得する

            // color.hex()を実行すると '#FF0000' のような形式で色情報を16進数の形式で受け取れる
            // draw関数の手前で定義されている、線の色を保持する変数に代入して色情報を変更する
            currentColor = color.hex();
        });
    }

    function initAquariumHandler() {
        const setNewAquariumButton = document.querySelector('#new-area-button');
        setNewAquariumButton.addEventListener('click', setAquarium);

        const updateAquariumButton = document.querySelector('#new-area-button');
        setNewAquariumButton.addEventListener('click', updateAquarium);

        const showAquariumButton = document.querySelector('#show-area-button');
        showAquariumButton.addEventListener('click', dispAquarium);

    }

    initEventHandler();

    // カラーパレット情報を初期化する
    initColorPalette();

    initAquariumHandler();
});