import { useState, useEffect } from 'react';
import { getByLocation } from '../api';
import { ItemCard } from '../components/ItemCard';
import { FilterPanel } from '../components/Filter';
import { SortDropdown } from '../components/SortDropdown';
import type { Skip, SortOption } from '../types/item';

export const ItemListPage = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [allowsHeavy, setAllowsHeavy] = useState(false);
  const [roadAllowed, setRoadAllowed] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');

  const loadSkips = async () => {
    try {
      setLoading(true);
      const data = await getByLocation("NR32", "Lowestoft");
      setSkips(data);
      setError(null);
    } catch (err) {
      setError('Failed to load skips');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sizes = [...new Set(skips.map(skip => skip.size))].sort((a, b) => a - b);

  // Apply filters and sorting
  const filteredSkips = skips
    .filter(skip => selectedSize === null || skip.size === selectedSize)
    .filter(skip => !allowsHeavy || skip.allows_heavy_waste)
    .filter(skip => !roadAllowed || skip.allowed_on_road)
    .sort((a, b) => {
      const priceA = a.price_before_vat;
      const priceB = b.price_before_vat;

      switch (sortBy) {
        case 'price-asc': return priceA - priceB;
        case 'price-desc': return priceB - priceA;
        case 'size-asc': return a.size - b.size;
        case 'size-desc': return b.size - a.size;
        default: return 0;
      }
    });

  useEffect(() => {
    loadSkips();
  }, []);

  const handleResetFilters = () => {
    setSelectedSize(null);
    setAllowsHeavy(false);
    setRoadAllowed(false);
  };

  if (loading) return <div className="text-center py-8">Loading skips...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div>
      <aside className="flex flex-col sm:flex-row w-full justify-between gap-4 pb-4">
        <FilterPanel
          sizes={sizes}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
          allowsHeavy={allowsHeavy}
          onHeavyChange={setAllowsHeavy}
          roadAllowed={roadAllowed}
          onRoadChange={setRoadAllowed}
          onResetFilters={handleResetFilters}
        />
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </aside>

      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-1">
          {filteredSkips.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No skips match your filters
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkips.map((skip) => (
                <ItemCard key={skip.id} skip={skip} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};