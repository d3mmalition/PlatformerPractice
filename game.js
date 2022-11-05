kaboom({
    global: true,
    fullscreen: true,
    scale: 1.5,
    debug: true,
    clearColor: [0, 0, 0, 1],
})

loadRoot("https://i.postimg.cc")
loadSprite("coin", "/wBB5WDrd/coin.png")
loadSprite("evil-shroom", "/C1BG0SYP/evil-shroom.png")
loadSprite("brick", "/Mp0F0t70/pogC9x5.png")
loadSprite("mario", "/sxGZkcYt/mario.png")
loadSprite("fire-flower", "/hG3LNfFQ/fireflower.png")
loadSprite("mystery-block", "/5yzSB1RY/mystery-block.png")
loadSprite("top-left", "/tChz7q68/top-right.png")
loadSprite("top-right", "/x1n3zwy8/top-left.png")
loadSprite("bottom-left", "/V6pF05DP/bottom-left.png")
loadSprite("bottom-right", "/fWSCnjRz/bottom-right.png")

const MOVE_SPEED = 120;
const JUMP_FORCE = 360;

scene("game", () => {
    layers(["bg","obj","ui"], "obj")

    const map= [
        '                                                ',
        '                                                ',
        '                                                ',
        '                                                ',
        '                                                ',
        '                                                ',
        '                                                ',
        '      $$$                                       ',
        '   ==?=====                                 - + ',
        '                                                ',
        '                $                           ( ) ',
        '    $$  ^^           ^^^               $  ^     ',
        '===============   ===========    ===============',
    ]
const levelCfg = {
    width: 20,
    height: 20,
    '=': [sprite("brick", solid())],
    '$': [sprite("coin", solid())],
    '(': [sprite("bottom-left", solid(), scale(0.5))],
    ')': [sprite("bottom-right", solid(), scale(0.5))],
    '-': [sprite("top-right", solid(), scale(0.5))],
    '+': [sprite("top-left", solid(), scale(0.5))],
    '%': [sprite("evil-shroom", solid())],
    '?': [sprite("mystery-block", solid())],
    '^': [sprite("evil-shroom", solid())],
}

const gameLevel = addLevel(map, levelCfg)

const scoreLabel = add([
    text("Score"),
    pos(30, 6),
    layer("ui"),
    {
        value: "score",
    }
])

add([text("level " + "score", pos(4, 6))])

const player = add([
    sprite("mario"), solid(), 
    pos(30, 0),
    body(),
    origin("bot")
])
player.collides('brick', ()=>{
    player.move(0,-2000)
})

action("tile", (t) => {
    t.solid = player.pos.dist(btpos) <= 32; // arbitrary distance based on you tile size
});

keyDown("left", () => {
    player.move(-MOVE_SPEED, 0);
});

keyDown("right", () => {
    player.move(MOVE_SPEED, 0);
});

keyPress("space", () => {
    if(player.grounded()) {
        player.jump(JUMP_FORCE)
    }
})

});

start("game");