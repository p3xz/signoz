import type { ConfigTileItem } from '../../controls/ConfigTiles/ConfigTiles';
import { TILE_DRAWINGS } from '../../controls/drawings/tileDrawings';

/** Every axis scale a panel can offer; each section picks the ones its spec stores. */
export type AxisScale = 'auto' | 'linear' | 'log' | 'symlog';

const SCALE_TILES: Record<AxisScale, Omit<ConfigTileItem, 'value'>> = {
	auto: { label: 'Auto', drawing: TILE_DRAWINGS.scaleAuto },
	linear: { label: 'Linear', drawing: TILE_DRAWINGS.scaleLinear },
	log: { label: 'Logarithmic', drawing: TILE_DRAWINGS.scaleLog },
	symlog: { label: 'Symlog', drawing: TILE_DRAWINGS.scaleSymlog },
};

/** Tiles for `scales`, in the order given; `T` keeps the caller's own scale type. */
export function pickScaleOptions<T extends AxisScale>(
	scales: readonly T[],
): ConfigTileItem<T>[] {
	return scales.map((scale) => ({ ...SCALE_TILES[scale], value: scale }));
}

export const SCALE_HELP: Record<AxisScale, string> = {
	auto:
		'Logarithmic when every value is positive and they span three or more orders of magnitude, otherwise linear.',
	linear: 'Evenly spaced values.',
	log: 'Spreads out values that span several orders of magnitude.',
	symlog: 'Logarithmic, but places zero and negative values too.',
};

export const LOG_SCALE_OPTIONS = pickScaleOptions(['linear', 'log'] as const);

export const RANGE_HELP =
	'The axis always shows at least this range. Data outside it still stretches the axis.';

export const RANGE_INVERTED_ERROR = "Min can't be greater than Max.";
