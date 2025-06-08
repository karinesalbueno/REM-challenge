import { SortOption } from "@/types/item";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="flex items-center space-x-2 justify-end">
      <span className="text-sm font-medium">Sort by:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="border text-white bg-black border-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-1 hover:bg-gray-800"
      >
        <option value="price-asc">Price, low to high</option>
        <option value="price-desc">Price, high to low</option>
        <option value="size-asc">Size, small to large</option>
        <option value="size-desc">Size, large to small</option>
      </select>
    </div>
  );
};