import { FilterOptions } from '@/types/filter';

interface MovieFilterProps {
  options: {
    genres: string[];
    years: number[];
    regions: string[];
  };
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
}

export default function MovieFilter({ options, filters, onChange }: MovieFilterProps) {
  const handleGenreChange = (genre: string) => {
    const newGenres = filters.genres.includes(genre)
      ? filters.genres.filter(g => g !== genre)
      : [...filters.genres, genre];
    onChange({ ...filters, genres: newGenres });
  };

  const handleYearChange = (year: number) => {
    const newYears = filters.years.includes(year)
      ? filters.years.filter(y => y !== year)
      : [...filters.years, year];
    onChange({ ...filters, years: newYears });
  };

  const handleRegionChange = (region: string) => {
    const newRegions = filters.regions.includes(region)
      ? filters.regions.filter(r => r !== region)
      : [...filters.regions, region];
    onChange({ ...filters, regions: newRegions });
  };

  const handleRatingChange = (rating: number) => {
    onChange({ ...filters, rating });
  };

  return (
    <div className="space-y-8">
      {/* 类型筛选 */}
      <div>
        <h3 className="text-gray-200 font-medium mb-4">类型</h3>
        <div className="space-y-3">
          {options.genres.map(genre => (
            <label key={genre} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                checked={filters.genres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
                className="hidden"
              />
              <span className={`
                w-4 h-4 border rounded mr-3 flex items-center justify-center transition-colors
                ${filters.genres.includes(genre) 
                  ? 'bg-red-600 border-red-600' 
                  : 'border-gray-600 group-hover:border-gray-400'
                }
              `}>
                {filters.genres.includes(genre) && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              <span className={`text-sm transition-colors ${
                filters.genres.includes(genre) ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
              }`}>
                {genre}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 年份筛选 */}
      <div>
        <h3 className="text-gray-200 font-medium mb-4">年份</h3>
        <div className="space-y-3">
          {options.years.map(year => (
            <label key={year} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                checked={filters.years.includes(year)}
                onChange={() => handleYearChange(year)}
                className="hidden"
              />
              <span className={`
                w-4 h-4 border rounded mr-3 flex items-center justify-center transition-colors
                ${filters.years.includes(year) 
                  ? 'bg-red-600 border-red-600' 
                  : 'border-gray-600 group-hover:border-gray-400'
                }
              `}>
                {filters.years.includes(year) && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              <span className={`text-sm transition-colors ${
                filters.years.includes(year) ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
              }`}>
                {year}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 地区筛选 */}
      <div>
        <h3 className="text-gray-200 font-medium mb-4">地区</h3>
        <div className="space-y-3">
          {options.regions.map(region => (
            <label key={region} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                checked={filters.regions.includes(region)}
                onChange={() => handleRegionChange(region)}
                className="hidden"
              />
              <span className={`
                w-4 h-4 border rounded mr-3 flex items-center justify-center transition-colors
                ${filters.regions.includes(region) 
                  ? 'bg-red-600 border-red-600' 
                  : 'border-gray-600 group-hover:border-gray-400'
                }
              `}>
                {filters.regions.includes(region) && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              <span className={`text-sm transition-colors ${
                filters.regions.includes(region) ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
              }`}>
                {region}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 评分筛选 */}
      <div>
        <h3 className="text-gray-200 font-medium mb-4">最低评分</h3>
        <div className="px-2">
          <input
            type="range"
            min={0}
            max={10}
            step={0.5}
            value={filters.rating}
            onChange={(e) => handleRatingChange(Number(e.target.value))}
            className="w-full accent-red-600"
          />
          <div className="text-sm text-gray-400 mt-2">
            {filters.rating > 0 ? `${filters.rating} 分以上` : '不限'}
          </div>
        </div>
      </div>
    </div>
  );
} 