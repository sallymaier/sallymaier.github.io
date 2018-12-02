int numRows = height/tileHeight;
int numCols = width/tileWidth;

void swapTwoRandomTiles (BufferedImage b) {
    //choose x and y coordinates randomly for the tiles
    int xt1 = random.nextInt (numCols);
    int yt1 = random.nextInt (numRows);
    int xt2 = random.nextInt (numCols);
    int yt2 = random.nextInt (numRows);

    swapTiles (b,xt1,yt1,xt2,yt2);
}

void swapTiles(BufferedImage b, int xt1, int yt1, int xt2, int yt2) {
    int tempPixel = 0;
    for (int x=0; x<tileWidth; x++) {
        for (int y=0; y<tileHeight; y++) {
            //save the pixel value to temp
            tempPixel = b.getRGB(x + xt1*tileWidth, y + yt1*tileHeight);
            //write over the part of the image that we just saved, getting data from the other tile
            b.setRGB ( x + xt1*tileWidth, y + yt1*tileHeight, b.getRGB ( x+xt2*tileWidth, y+yt2*tileHeight));
            //write from temp back to the other tile
            b.setRGB ( x + xt2*tileWidth, y + yt2*tileHeight, tempPixel);
        }
    }
}