/*
Frame handlers:
 10 - physics and collisions
 20 - frame()
 60 - screen/sprite background
 90 - drawing sprites
 95 - drawing score
100 - loops.menu()
200 - screen refresh
*/

/**
 * Sprites on screen
 */
//% weight=49 color="#4B7BEC" icon="\uf1d8"
//% groups='["Create", "Controller", "Properties", "Overlaps", "Collisions", "Lifecycle"]'
//% advanced=true
namespace sprites {

    /**
     * Create a new sprite from an image
     * @param img the image
     */
    //% group="Create"
    //% blockId=spritescreate block="sprite %img=screen_image_picker of kind %kind=spritetype"
    //% expandableArgumentMode=toggle
    //% blockSetVariable=mySprite
    //% weight=100 help=sprites/create
    export function create(img: Image, kind?: number): Sprite {
        const scene = game.currentScene();
        const sprite = new Sprite(img)
        sprite.type = kind;
        scene.allSprites.push(sprite)
        sprite.id = scene.allSprites.length
        scene.physicsEngine.addSprite(sprite);

        // run on created handlers
        scene.createdHandlers
            .filter(h => h.type == kind)
            .forEach(h => h.handler(sprite));

        return sprite
    }
	
	 /**
     * Control a sprite using the direction buttons from the controller. Note that this
     * control will take over the vx and vy of the sprite and overwrite any changes
     * made unless a 0 is passed.
     *
     * @param sprite The Sprite to control
     * @param vx The velocity used for horizontal movement when left/right is pressed
     * @param vy The velocity used for vertical movement when up/down is pressed
     */
	//% group="Controller"
	//% blockId="sprite_control_sprite" block="control sprite $sprite=variables_get(mySprite) with vx $vx vy $vy"
    //% weight=100
    //% vx.defl=100 vy.defl=100
    //% help=controller/control-sprite
    export function controlSprite(sprite: Sprite, vx: number, vy: number) {
		controller.controlSprite(sprite, vx, vy);
	}
	
	/**
     * Get the horizontal movement, given the step and state of buttons
     * @param step the distance, eg: 100
     */
    //% weight=50 blockGap=8 help=controller/dx
    //% blockId=sprite_keysdx block="dx (left-right buttons)||scaled by %step"
    //% step.defl=100
	//% group="Controller"
    export function dx(step: number = 100) {
        return controller.dx(step)
    }
	
	/**
     * Get the vertical movement, given the step and state of buttons
     * @param step the distance, eg: 100
     */
    //% weight=49 help=keys/dy
    //% blockId=sprite_keysdy block="dy (up-down buttons)||scaled by %step"
    //% step.defl=100
	//% group="Controller"
    export function dy(step: number = 100) {
        return controller.dy(step)
    }
	
	/**
     * Pause the program until a button is pressed
     */
    //% weight=10
	//% group="Controller"
    export function pauseUntilAnyButtonIsPressed() {
        controller.pauseUntilAnyButtonIsPressed()
    }


    /**
     * Return an array of all sprites of the given kind.
     * @param kind the target kind
     */
    //% blockId=allOfKind block="array of sprites of kind %kind=spritetype"
    //% blockNamespace="arrays" blockSetVariable="sprite list"
    //% weight=87
    export function allOfKind(kind: number): Sprite[] {
        const spritesByKind = game.currentScene().spritesByKind;
        if (!(kind >= 0) || !spritesByKind[kind]) return [];
        else return spritesByKind[kind].slice(0, spritesByKind[kind].length);
    }

    /**
     * Create a new sprite with given speed, and place it at the edge of the screen so it moves towards the middle.
     * The sprite auto-destroys when it leaves the screen. You can modify position after it's created.
     */
    //% group="Create"
    //% blockId=spritescreateprojectile block="projectile %img=screen_image_picker vx %vx vy %vy of kind %kind=spritetype || from sprite %sprite=variables_get"
    //% weight=99 help=sprites/create-projectile
    //% blockSetVariable=projectile
    //% inlineInputMode=inline
    //% expandableArgumentMode=toggle
    export function createProjectile(img: Image, vx: number, vy: number, kind: number, sprite?: Sprite) {
        const s = sprites.create(img, kind);
        s.vx = vx
        s.vy = vy

        // put it at the edge of the screen so that it moves towards the middle

        if (vx < 0)
            s.x = screen.width + (s.width >> 1) - 1
        else if (vx > 0)
            s.x = -(s.width >> 1) + 1

        if (vy < 0)
            s.y = screen.height + (s.height >> 1) - 1
        else if (vy > 0)
            s.y = -(s.height >> 1) + 1

        s.flags |= sprites.Flag.AutoDestroy;

        if (sprite) {
            s.x = sprite.x;
            s.y = sprite.y;
        }

        return s
    }

    /**
     * Creates a new sprite of the given kind and adds it to the game. Use this
     * with the "on sprite created" event.
     * @param kind the kind of sprite to create
     */
    //% group="Lifecycle"
    //% blockId=spritecreateempty block="create empty sprite of kind %kind=spritetype"
    //% weight=98
    export function createEmptySprite(kind: number): void {
        sprites.create(image.create(1, 1), kind);
    }

    export enum Flag {
        Ghost = 1, // doesn't collide with other sprites
        Destroyed = 2,
        AutoDestroy = 4, // remove the sprite when no longer visible
        StayInScreen = 8, // sprite cannot move outside the camera region
    }
}
