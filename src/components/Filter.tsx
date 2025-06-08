interface FilterPanelProps {
    sizes: number[];
    selectedSize: number | null;
    onSizeChange: (size: number | null) => void;
    allowsHeavy: boolean;
    onHeavyChange: (checked: boolean) => void;
    roadAllowed: boolean;
    onRoadChange: (checked: boolean) => void;
    onResetFilters: () => void;
}

export const FilterPanel = ({
    sizes,
    selectedSize,
    onSizeChange,
    allowsHeavy,
    onHeavyChange,
    roadAllowed,
    onRoadChange,
    onResetFilters,
}: FilterPanelProps) => {
    return (
        <div>
            <div className="flex justify-between md:gap-4">
                <select
                    value={selectedSize || ''}
                    onChange={(e) => onSizeChange(e.target.value ? Number(e.target.value) : null)}
                    className="w-24 border px-3 py-2 text-sm focus:outline-none focus:ring-1text-white bg-black border-gray-600"
                >
                    <option value="">Sizes</option>
                    {sizes.map((size) => (
                        <option key={size} value={size}>
                            {size} Yard
                        </option>
                    ))}
                </select>

                <button
                    onClick={onResetFilters}
                    className="text-sm underline"
                >
                    Clear Filters
                </button>
            </div>


            <div className="space-y-3 pt-4">
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={allowsHeavy}
                        onChange={(e) => onHeavyChange(e.target.checked)}
                    />
                    <span>Allows Heavy Waste</span>
                </label>

                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={roadAllowed}
                        onChange={(e) => onRoadChange(e.target.checked)}
                    />
                    <span>Road Allowed</span>
                </label>
            </div>
        </div>
    );
};