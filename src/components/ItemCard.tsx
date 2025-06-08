import type { Skip } from '../types/item';

interface ItemCardProps {
  skip: Skip;
}

export const ItemCard = ({ skip }: ItemCardProps) => {
  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);
  const isLargeSkip = skip.size >= 20;

  return (
    <div className="p-4 shadow-lg hover:shadow-xl transition-all flex gap-4 bg-gray-800 text-white">

      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold">{skip.size} Yard</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${skip.allowed_on_road ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
            {skip.allowed_on_road ? 'Road Allowed' : 'Road Not Allowed'}
          </span>
        </div>

        <div className="mt-2 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Hire:</span>
            <span>{skip.hire_period_days} days</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Total Price:</span>
            <span className="font-bold">£{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center md:gap-2 ">
          <div className="flex flex-col gap-2 w-34">
            <div className="inline-block h-8 flex-wrap">
              {skip.allows_heavy_waste ?
                <span className=" bg-blue-100 text-blue-800 text-xs h-8 px-1 md:px-3 py-1 rounded-full font-medium w-full">Allows Heavy Waste</span> : ''
              }
            </div>

            <button className=" bg-yellow-400 text-gray-700 text-xs h-8 px-1 md:px-3 py-1 rounded-lg font-bold cursor-pointer">
              Select This Skip
            </button>
          </div>

          <img
            src={isLargeSkip ? "/large-skip.jpg" : "/skip.jpg"}
            alt={`${skip.size} yard skip`}
            className="w-24 h-24 object-cover rounded-md"
          />

        </div>
      </div>
    </div>
  );
};