namespace sprites {
    /**
     * Gets the sprite type
     */
    //% blockHidden=1 shim=ENUM_GET
    //% blockId=spritetype block="$kind" enumInitialMembers="Player,Enemy"
    //% enumName=SpriteKind enumMemberName=kind enumPromptHint="e.g. Coin, Fireball, Asteroid..."
    export function _spriteType(kind: number): number {
        return kind;
    }

    /**
     * Run code when a certain kind of sprite is created
     * @param kind
     * @param sprite
     */
    //% group="Lifecycle" draggableParameters weight=97
    //% blockId=spritesoncreated block="on created $sprite of kind $kind=spritetype"
    //% help=sprites/on-created
    export function onCreated(kind: number, handler: (sprite: Sprite) => void): void {
        if (!handler || kind == undefined) return;

        const scene = game.currentScene();
        scene.createdHandlers.push({
            type: kind,
            handler: handler
        })
    }

    /**
     * Run code when a certain kind of sprite is destroyed
     * @param kind
     * @param sprite
     */
    //% group="Lifecycle"
    //% weight=96 draggableParameters
    //% blockId=spritesondestroyed block="on destroyed $sprite of kind $kind=spritetype "
    //% help=sprites/on-destroyed
    export function onDestroyed(kind: number, handler: (sprite: Sprite) => void) {
        if (!handler || kind == undefined) return;

        const scene = game.currentScene();
        scene.destroyedHandlers.push({
            type: kind,
            handler: handler
        })
    }

    /**
     * Run code when two kinds of sprites overlap
     */
    //% group="Overlaps"
    //% weight=100 draggableParameters
    //% blockId=spritesoverlap block="on $sprite of kind $kind=spritetype overlaps $otherSprite of kind $otherKind=spritetype"
    //% help=sprites/on-overlap
    export function onOverlap(kind: number, otherKind: number, handler: (sprite: Sprite, otherSprite: Sprite) => void) {
        if (kind == undefined || otherKind == undefined ||!handler) return;

        const scene = game.currentScene();
        scene.overlapHandlers.push({
            type: kind,
            otherType: otherKind,
            handler: handler
        })
    }
}

namespace scene {
    /**
     * Run code when a certain kind of sprite hits a tile
     * @param direction
     * @param tile
     * @param handler
     */
    //% group="Collisions"
    //% weight=100 draggableParameters
    //% blockId=spritesollisions block="on $sprite of kind $kind=spritetype hits wall $tile=colorindexpicker"
    //% help=scene/on-hit-tile
    export function onHitTile(kind: number, tile: number, handler: (sprite: Sprite) => void) {
        if (kind == undefined || !handler) return;

        const scene = game.currentScene();
        scene.collisionHandlers.push({
            type: kind,
            tile: tile,
            handler: handler
        })
    }
}