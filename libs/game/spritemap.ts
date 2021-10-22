namespace sprites {
    export class SpriteMap {
        private cellWidth: number;
        private cellHeight: number;
        private rowCount: number;
        private columnCount: number;
        private buckets: Sprite[][];

        constructor() {
            this.buckets = [];
        }

        /**
         * Returns a potential list of neighbors
         */
        neighbors(sprite: Sprite): Sprite[] {
            if (this.isOob(sprite)) return [];

            const n: Sprite[] = [];
            const layer = sprite.layer;
            this.mergeAtKey(sprite.left, sprite.top, layer, n)
            this.mergeAtKey(sprite.left, sprite.bottom, layer, n)
            this.mergeAtKey(sprite.right, sprite.top, layer, n)
            this.mergeAtKey(sprite.right, sprite.bottom, layer, n)
            n.removeElement(sprite);
            return n;
        }

        /**
         * Gets the overlaping sprites if any
         * @param sprite
         */
        overlaps(sprite: Sprite): Sprite[] {
            const n = this.neighbors(sprite);
            const o = n.filter(neighbor => sprite.overlapsWith(neighbor));
            return o;
        }

        draw() {
            for (let x = 0; x < this.columnCount; ++x) {
                for (let y = 0; y < this.rowCount; ++y) {
                    const left = x * this.cellWidth;
                    const top = y * this.cellHeight;
                    const k = this.key(left, top);
                    const b = this.buckets[k];
                    if (b && b.length)
                        screen.drawRect(left, top, this.cellWidth, this.cellHeight, 5);
                }
            }
        }

        /**
         * Recompute hashes for all objects
         */
        update(sprites: Sprite[]) {
            this.buckets = [];

            // rescale buckets
            let maxWidth = 0;
            let maxHeight = 0;
            for (const sprite of sprites) {
                if (sprite.width > maxWidth) maxWidth = sprite.width;
                if (sprite.height > maxHeight) maxHeight = sprite.height;
            }

            const tMap = game.currentScene().tileMap;

            const areaWidth = tMap ? tMap.areaWidth() : screen.width;
            const areaHeight = tMap ? tMap.areaHeight() : screen.height;

            this.cellWidth = Math.clamp(8, areaWidth / 4, maxWidth * 2);
            this.cellHeight = Math.clamp(8, areaHeight / 4, maxHeight * 2);
            this.rowCount = (areaHeight / this.cellHeight) >> 0
            this.columnCount = (areaWidth / this.cellWidth) >> 0;


            for (const sprite of sprites)
                this.insertAABB(sprite);
        }

        private key(x: number, y: number): number {
            const xi = Math.clamp(0, this.columnCount, (x / this.cellWidth) >> 0);
            const yi = Math.clamp(0, this.rowCount, (y / this.cellHeight) >> 0);
            return xi + yi * this.columnCount;
        }

        private insertAtKey(x: number, y: number, sprite: Sprite) {
            const k = this.key(x, y);
            let bucket = this.buckets[k];
            if (!bucket)
                bucket = this.buckets[k] = [];
            if (bucket.indexOf(sprite) < 0)
                bucket.push(sprite);
        }

        private isOob(sprite: Sprite): boolean {
            const tMap = game.currentScene().tileMap;

            const areaWidth = tMap ? tMap.areaWidth() : screen.width;
            const areaHeight = tMap ? tMap.areaHeight() : screen.height;
            return sprite.right < 0 || sprite.left > areaWidth || sprite.bottom < 0 || sprite.top > areaHeight;
        }

        private insertAABB(sprite: Sprite) {
            // is object completely out of space?
            if (this.isOob(sprite) || (sprite.flags & sprites.Flag.Ghost))
                return;

            const left = sprite.left;
            const top = sprite.top;
            const xn = Math.ceil(sprite.width / this.cellWidth)
            const yn = Math.ceil(sprite.height / this.cellHeight);
            for (let x = 0; x <= xn; x++)
                for (let y = 0; y <= yn; y++)
                    this.insertAtKey(left + Math.min(sprite.width, x * this.cellWidth), top + Math.min(sprite.height, y * this.cellHeight), sprite)
        }

        private mergeAtKey(x: number, y: number, layer: number, n: Sprite[]) {
            const k = this.key(x, y);
            const bucket = this.buckets[k];
            if (bucket) {
                for (const sprite of bucket)
                    if ((sprite.layer & layer)
                        && n.indexOf(sprite) < 0)
                        n.push(sprite);
            }
        }

        toString() {
            return `${this.buckets.length} buckets, ${this.buckets.filter(b => !!b).length} filled`;
        }
    }
}