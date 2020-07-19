/**
 * geodesic tiles go through a few different shapes
 * there the minimum descriptor used to extrapolate the rest,
 * then there's the values used for the HTML: the norm, spin, and polygon number
 * 
 * for the stylesheet, I use polygon and scale of each motif for the clippath, apply scale via  [polygon="0"] style
 * a <geodesy> element has origin, motif, bitmask, and radius descriptors. modifying the radius just modifies a CSS stylesheet var(--scale)
 * selecting some subset of a lattice allows calculating a new bitmask: setting that bitmask should reload the grid as a polygon matching that bitmask.
 * maybe setting the bitmask back to 0 turns it into a space filling grid again.
 * 
 */


interface Motif {
    basis: string[][],
    offset: string[],
    scale: string,
    polygon: string[][]
}


interface PolygonData {
    // x: string,
    // y: string,
    // norm: string, // already represented on the parentNode /* I don't want to throw away the math of norm, but I'll need to convert it to number for sorting */
    spin: number, /* for spin I'm using Math.atan2 because it figures out +/- for me, and it returns a javascript number */
    polygon: number, /* just 0 1 or 2... the index of the original motif list. */
}

interface GeodesyElement {
    geodesy: GeodesyAttributes
}

interface GeodesyAttributes {
    origin: string[],
    motif: string,
    bitmask: string,
    radius: string,
}

// for each norm (used as object keys), there is a list of Tile objects, each may be a different polygon, each has its own spin...x and y.
interface NormData {
    [index: string]: PolygonData[]
}

// tuples of form [symbolicNorm, numericNorm, [tile, tile, tile]]
type SortedNormData = [string, number, PolygonData[]][]
