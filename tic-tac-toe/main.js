var Game = function (blockListener) {
    var squares = []; // [{value: 'x', dom: element}]
    var squareValues = [];
    var squareElements = [];
    var scores = {}; // {x: {value: , dom: element}}

    var img = {
        'x': 'img/x.png',
        'o': 'img/o.png',
        'empty': '/img/empty.png'
    };

    var toggle = function (squareIndex, value) {
        squares[squareIndex].element.setAttribute('src', img[value]);
        squares[squareIndex].value = value;
    };

    var getHandleClick = function (id) {
        var square = squares[id];
        return function () {
            blockListener({
                toggle: function (value) {
                    toggle(id, value);
                },
                value: square.value
            });
        }
    };

    (function () { // setup
        var list = document.getElementsByClassName('tic-block');
        for (var i = 0; i < list.length; i++) {
            squares.push({ value: 'empty', element: list[i] })
            squareValues.push(0);
            squareElements.push(list[i]);
            list[i].addEventListener('click', getHandleClick(i));
        }

        // Score elements
        scores.x = { value: 0, element: document.getElementsByClassName('tic-x-score')[0] };
        scores.o = { value: 0, element: document.getElementsByClassName('tic-o-score')[0] };
    })();

    return {
        clear: function () {
            for (var i in squares) {
                this.toggle(i, 'empty');
            }
        },
        setScore: function (letter, number) {
            var element = scores[letter];
            element.element.innerHTML = number;
            element.value = number;
        },
        incrementScore: function (letter, incrementValue) {
            var element = scores[letter];

            var newNum = element.value + incrementValue;

            element.element.innerHTML = newNum;
            element.value = newNum;
        },
        toggle: toggle
    }
}

var turn = 1;

var game = new Game(function (block) {
    if (block.value == 'empty') {
        var player;
        if (turn == 1) {
            player = 'x';
            turn = 0
        } else {
            player = 'o';
            turn = 1;
        }

        game.incrementScore(player, 1);
        block.toggle(player);
    }
})